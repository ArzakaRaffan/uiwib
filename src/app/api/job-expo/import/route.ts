import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Papa from "papaparse";

type GlintsRow = Record<string, string>;

function mapRowTab1(row: GlintsRow) {
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

// Tab-2 mapper: only picks known tab-2 columns.
// Unknown/extra columns (e.g. min_years_of_experience, company_id) are silently ignored
// because we never access them — no strict column count check, no crash on extras.
function mapRowTab2(row: GlintsRow) {
  return {
    jobLink:               row["job_link"]?.trim() ?? "",
    title:                 row["title"]?.trim() ?? "",
    employmentType:        row["employment_type"]?.trim() ?? "",
    jobDescriptionSummary: row["job_description_summary"]?.trim() || null,
    jobDescriptionFull:    row["job_description_full"]?.trim() || null,
    skills:                row["skills"]?.trim() || null,
    educationLevel:        row["education_level"]?.trim() || null,
    city:                  row["city"]?.trim() ?? "",
    province:              row["province"]?.trim() || null,
    companyName:           row["company_name"]?.trim() ?? "",
    companyAddress:        row["company_address"]?.trim() || null,
    companyLogoUrl:        row["company_logo_url"]?.trim() || "",
    // Tab-2-specific fields
    glintStatus:           row["status"]?.trim() || null,
    salaryRangeIdr:        row["salary_range_idr"]?.trim() || null,
    locationGroup:         row["location_group"]?.trim() || null,
    l1Category:            row["L1_category"]?.trim() || null,
    l2Category:            row["L2_category"]?.trim() || null,
  };
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const source: "tab1" | "tab2" = body.source === "tab2" ? "tab2" : "tab1";
    const defaultEnvUrl = source === "tab2"
      ? process.env.GOOGLE_SHEETS_CSV_URL_2
      : process.env.GOOGLE_SHEETS_CSV_URL;
    const csvUrl: string = body.csvUrl || defaultEnvUrl || "";

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

    // Collect all valid job_links (including rows that will be skipped for other reasons)
    // so per-source expiry doesn't falsely deactivate them.
    const allSheetLinks = data
      .map((row) => row["job_link"]?.trim())
      .filter((link): link is string => Boolean(link));

    for (const row of data) {
      if (source === "tab2") {
        const job = mapRowTab2(row);
        if (!job.jobLink || !job.title || !job.companyName || !job.city) { skipped++; continue; }

        const existing = await prisma.jobExpo.findUnique({ where: { jobLink: job.jobLink }, select: { id: true } });

        // Partial update: only write tab-2 fields so tab-1 fields are never nullified.
        await prisma.jobExpo.upsert({
          where:  { jobLink: job.jobLink },
          update: {
            glintStatus:    job.glintStatus,
            salaryRangeIdr: job.salaryRangeIdr,
            locationGroup:  job.locationGroup,
            l1Category:     job.l1Category,
            l2Category:     job.l2Category,
            isActive:       true,
          },
          create: { ...job, source: "tab2", isActive: true },
        });

        if (existing) updated++; else added++;
      } else {
        const job = mapRowTab1(row);
        if (!job.jobLink || !job.title || !job.companyName || !job.city) { skipped++; continue; }

        const existing = await prisma.jobExpo.findUnique({ where: { jobLink: job.jobLink }, select: { id: true } });

        await prisma.jobExpo.upsert({
          where:  { jobLink: job.jobLink },
          update: { ...job, isActive: true },
          create: { ...job, source: "tab1", isActive: true },
        });

        if (existing) updated++; else added++;
      }
    }

    // Per-source expiry: deactivate records from this source that are no longer in the sheet.
    const expired = await prisma.jobExpo.updateMany({
      where: {
        source,
        jobLink: { notIn: allSheetLinks },
        isActive: true,
      },
      data: { isActive: false },
    });

    return NextResponse.json({ success: true, source, added, updated, skipped, expired: expired.count, total: data.length });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: "Import failed" }, { status: 500 });
  }
}
