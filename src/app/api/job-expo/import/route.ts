import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Papa from "papaparse";

type GlintsRow = Record<string, string>;

function mapRow(row: GlintsRow) {
  const yearsRaw = row["min_years_of_experience"]?.trim();
  return {
    jobLink:               row["job_link"]?.trim() ?? "",
    title:                 row["title"]?.trim() ?? "",
    employmentType:        row["employment_type"]?.trim() ?? "",
    jobDescriptionSummary: row["job_description_summary"]?.trim() || null,
    jobDescriptionFull:    row["job_description_full"]?.trim() || null,
    skills:                row["skills"]?.trim() || null,
    educationLevel:        row["education_level"]?.trim() || null,
    minYearsOfExperience:  yearsRaw ? Number(yearsRaw) : null,
    // Glints exports with double space: "Broad  Expertise"
    broadExpertise:        (row["Broad  Expertise"] ?? row["Broad Expertise"])?.trim() || null,
    specificExpertise:     row["Specific Expertise"]?.trim() || null,
    city:                  row["city"]?.trim() ?? "",
    province:              row["province"]?.trim() || null,
    companyName:           row["company_name"]?.trim() ?? "",
    companyAddress:        row["company_address"]?.trim() || null,
    companyLogoUrl:        row["company_logo_url"]?.trim() || "",
  };
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const csvUrl: string = body.csvUrl || process.env.GOOGLE_SHEETS_CSV_URL || "";

    if (!csvUrl) {
      return NextResponse.json({ success: false, error: "No CSV URL provided" }, { status: 400 });
    }

    const res = await fetch(csvUrl, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ success: false, error: `Failed to fetch CSV: ${res.status}` }, { status: 502 });
    }
    const csvText = await res.text();

    const { data, errors } = Papa.parse<GlintsRow>(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    if (data.length === 0) {
      return NextResponse.json({ success: false, error: "CSV is empty or failed to parse", details: errors }, { status: 422 });
    }

    let added = 0;
    let updated = 0;
    let skipped = 0;

    // Collect all valid job_links from the sheet (including skipped rows) for expiry check.
    const allSheetLinks = data
      .map((row) => row["job_link"]?.trim())
      .filter((link): link is string => Boolean(link));

    for (const row of data) {
      const job = mapRow(row);

      if (!job.jobLink || !job.title || !job.companyName || !job.city) {
        skipped++;
        continue;
      }

      const existing = await prisma.jobExpo.findUnique({
        where: { jobLink: job.jobLink },
        select: { id: true },
      });

      // mapRow only returns tab-1 fields — the new tab-2 columns (glintStatus,
      // salaryRangeIdr, etc.) are not in the spread, so Prisma leaves them untouched.
      await prisma.jobExpo.upsert({
        where: { jobLink: job.jobLink },
        update: { ...job, isActive: true },
        create: { ...job, source: "tab1", isActive: true },
      });

      if (existing) updated++;
      else added++;
    }

    // Per-source expiry: deactivate tab1 records no longer present in this batch.
    const expired = await prisma.jobExpo.updateMany({
      where: {
        source: "tab1",
        jobLink: { notIn: allSheetLinks },
        isActive: true,
      },
      data: { isActive: false },
    });

    return NextResponse.json({ success: true, added, updated, skipped, expired: expired.count, total: data.length });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: "Import failed" }, { status: 500 });
  }
}
