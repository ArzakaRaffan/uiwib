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
    broadExpertise:        (row["Broad  Expertise"] ?? row["Broad Expertise"])?.trim() || null,
    specificExpertise:     row["Specific Expertise"]?.trim() || null,
    city:                  row["city"]?.trim() ?? "",
    province:              row["province"]?.trim() || null,
    companyName:           row["company_name"]?.trim() ?? "",
    companyAddress:        row["company_address"]?.trim() || null,
    companyLogoUrl:        row["company_logo_url"]?.trim() || "",
  };
}

// Unknown/extra columns (e.g. min_years_of_experience, company_id in W3) are silently
// ignored — we only access named keys we know about.
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
    glintStatus:           row["status"]?.trim() || null,
    salaryRangeIdr:        row["salary_range_idr"]?.trim() || null,
    locationGroup:         row["location_group"]?.trim() || null,
    l1Category:            row["L1_category"]?.trim() || null,
    l2Category:            row["L2_category"]?.trim() || null,
  };
}

type Tab1Row = ReturnType<typeof mapRowTab1>;
type Tab2Row = ReturnType<typeof mapRowTab2>;

async function importTab1(rows: Tab1Row[]) {
  const links = rows.map((r) => r.jobLink);
  const existing = await prisma.jobExpo.findMany({
    where: { jobLink: { in: links } },
    select: { jobLink: true },
  });
  const existingSet = new Set(existing.map((r) => r.jobLink));

  const toCreate = rows.filter((r) => !existingSet.has(r.jobLink));
  const toUpdate = rows.filter((r) => existingSet.has(r.jobLink));

  if (toCreate.length > 0) {
    await prisma.jobExpo.createMany({
      data: toCreate.map((job) => ({ ...job, source: "tab1", isActive: true })),
      skipDuplicates: true,
    });
  }

  if (toUpdate.length > 0) {
    await prisma.$transaction(
      toUpdate.map((job) =>
        prisma.jobExpo.update({
          where: { jobLink: job.jobLink },
          data: { ...job, isActive: true },
        })
      )
    );
  }

  return { added: toCreate.length, updated: toUpdate.length };
}

async function importTab2(rows: Tab2Row[]) {
  const links = rows.map((r) => r.jobLink);
  const existing = await prisma.jobExpo.findMany({
    where: { jobLink: { in: links } },
    select: { jobLink: true },
  });
  const existingSet = new Set(existing.map((r) => r.jobLink));

  const toCreate = rows.filter((r) => !existingSet.has(r.jobLink));
  const toUpdate = rows.filter((r) => existingSet.has(r.jobLink));

  if (toCreate.length > 0) {
    await prisma.jobExpo.createMany({
      data: toCreate.map((job) => ({ ...job, source: "tab2", isActive: true })),
      skipDuplicates: true,
    });
  }

  if (toUpdate.length > 0) {
    // Partial update: only write tab-2 fields so tab-1 fields are never nullified.
    await prisma.$transaction(
      toUpdate.map((job) =>
        prisma.jobExpo.update({
          where: { jobLink: job.jobLink },
          data: {
            glintStatus:    job.glintStatus,
            salaryRangeIdr: job.salaryRangeIdr,
            locationGroup:  job.locationGroup,
            l1Category:     job.l1Category,
            l2Category:     job.l2Category,
            isActive:       true,
          },
        })
      )
    );
  }

  return { added: toCreate.length, updated: toUpdate.length };
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

    const fetchRes = await fetch(csvUrl, { cache: "no-store" });
    if (!fetchRes.ok) {
      return NextResponse.json({ success: false, error: `Failed to fetch CSV: ${fetchRes.status}` }, { status: 502 });
    }
    const csvText = await fetchRes.text();

    const { data, errors } = Papa.parse<GlintsRow>(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    if (data.length === 0) {
      return NextResponse.json({ success: false, error: "CSV is empty or failed to parse", details: errors }, { status: 422 });
    }

    // Collect all valid job_links before validation so expiry doesn't false-deactivate skipped rows.
    const allSheetLinks = data
      .map((row) => row["job_link"]?.trim())
      .filter((link): link is string => Boolean(link));

    let skipped = 0;
    let added = 0;
    let updated = 0;

    if (source === "tab2") {
      const validRows: Tab2Row[] = [];
      for (const row of data) {
        const job = mapRowTab2(row);
        if (!job.jobLink || !job.title || !job.companyName || !job.city) { skipped++; continue; }
        validRows.push(job);
      }
      ({ added, updated } = await importTab2(validRows));
    } else {
      const validRows: Tab1Row[] = [];
      for (const row of data) {
        const job = mapRowTab1(row);
        if (!job.jobLink || !job.title || !job.companyName || !job.city) { skipped++; continue; }
        validRows.push(job);
      }
      ({ added, updated } = await importTab1(validRows));
    }

    // Per-source expiry: deactivate records from this source no longer in the sheet.
    const expired = await prisma.jobExpo.updateMany({
      where: { source, jobLink: { notIn: allSheetLinks }, isActive: true },
      data: { isActive: false },
    });

    return NextResponse.json({
      success: true, source, added, updated, skipped,
      expired: expired.count, total: data.length,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 });
  }
}
