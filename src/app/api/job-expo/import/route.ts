import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Papa from "papaparse";

type RawRow = Record<string, string>;

// ── Tab 1 mapper (existing schema — Glints old format) ───────────────────────
function mapRowTab1(row: RawRow) {
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
    // Glints sometimes exports with double space: "Broad  Expertise"
    broadExpertise:        (row["Broad  Expertise"] ?? row["Broad Expertise"])?.trim() || null,
    specificExpertise:     row["Specific Expertise"]?.trim() || null,
    city:                  row["city"]?.trim() ?? "",
    province:              row["province"]?.trim() || null,
    companyName:           row["company_name"]?.trim() ?? "",
    companyAddress:        row["company_address"]?.trim() || null,
    companyLogoUrl:        row["company_logo_url"]?.trim() || "",
  };
}

// ── Tab 2 mapper (new schema) ────────────────────────────────────────────────
function mapRowTab2(row: RawRow) {
  return {
    jobLink:               row["job_link"]?.trim() ?? "",
    title:                 row["title"]?.trim() ?? "",
    employmentType:        row["employment_type"]?.trim() ?? "",
    jobDescriptionSummary: row["job_description_summary"]?.trim() || null,
    jobDescriptionFull:    row["job_description_full"]?.trim() || null,
    skills:                row["skills"]?.trim() || null,
    educationLevel:        row["education_level"]?.trim() || null,
    glintStatus:           row["status"]?.trim() || null,
    salaryRangeIdr:        row["salary_range_idr"]?.trim() || null,
    locationGroup:         row["location_group"]?.trim() || null,
    l1Category:            row["L1_category"]?.trim() || null,
    l2Category:            row["L2_category"]?.trim() || null,
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
    const source: "tab1" | "tab2" = body.source === "tab2" ? "tab2" : "tab1";
    const defaultUrl = source === "tab2"
      ? process.env.GOOGLE_SHEETS_CSV_URL_2
      : process.env.GOOGLE_SHEETS_CSV_URL;
    const csvUrl: string = body.csvUrl || defaultUrl || "";

    if (!csvUrl) {
      return NextResponse.json({ success: false, error: "No CSV URL provided" }, { status: 400 });
    }

    const res = await fetch(csvUrl, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ success: false, error: `Failed to fetch CSV: ${res.status}` }, { status: 502 });
    }
    const csvText = await res.text();

    const { data, errors } = Papa.parse<RawRow>(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    if (data.length === 0) {
      return NextResponse.json({ success: false, error: "CSV is empty or failed to parse", details: errors }, { status: 422 });
    }

    let added = 0;
    let updated = 0;
    let skipped = 0;

    // Collect all job_links with a valid key from the sheet (including skipped rows),
    // so a malformed-but-present row doesn't get falsely deactivated by expiry.
    const allSheetLinks: string[] = [];

    for (const row of data) {
      const jobLink = (source === "tab2" ? mapRowTab2(row) : mapRowTab1(row)).jobLink;
      if (jobLink) allSheetLinks.push(jobLink);
    }

    for (const row of data) {
      if (source === "tab2") {
        const job = mapRowTab2(row);

        if (!job.jobLink || !job.title || !job.companyName || !job.city) {
          skipped++;
          continue;
        }

        const existing = await prisma.jobExpo.findUnique({
          where: { jobLink: job.jobLink },
          select: { id: true },
        });

        if (existing) {
          // Partial update — only touch fields tab 2 knows about.
          // Tab-1-specific fields (minYearsOfExperience, broadExpertise, specificExpertise)
          // are intentionally omitted so overlapping records keep their tab-1 data.
          await prisma.jobExpo.update({
            where: { jobLink: job.jobLink },
            data: {
              title:                 job.title,
              employmentType:        job.employmentType,
              jobDescriptionSummary: job.jobDescriptionSummary,
              jobDescriptionFull:    job.jobDescriptionFull,
              skills:                job.skills,
              educationLevel:        job.educationLevel,
              glintStatus:           job.glintStatus,
              salaryRangeIdr:        job.salaryRangeIdr,
              locationGroup:         job.locationGroup,
              l1Category:            job.l1Category,
              l2Category:            job.l2Category,
              city:                  job.city,
              province:              job.province,
              companyName:           job.companyName,
              companyAddress:        job.companyAddress,
              companyLogoUrl:        job.companyLogoUrl,
              isActive:              true,
              // source intentionally not overwritten on update
            },
          });
          updated++;
        } else {
          await prisma.jobExpo.create({
            data: { ...job, source: "tab2", isActive: true },
          });
          added++;
        }
      } else {
        // Tab 1 — existing behavior preserved
        const job = mapRowTab1(row);

        if (!job.jobLink || !job.title || !job.companyName || !job.city) {
          skipped++;
          continue;
        }

        const existing = await prisma.jobExpo.findUnique({
          where: { jobLink: job.jobLink },
          select: { id: true },
        });

        // mapRowTab1 only returns tab-1 fields — spreading it will never touch
        // the new tab-2 columns (glintStatus, salaryRangeIdr, etc.) because
        // those keys are absent from the object, so Prisma leaves them as-is.
        await prisma.jobExpo.upsert({
          where: { jobLink: job.jobLink },
          update: { ...job, isActive: true },
          create: { ...job, source: "tab1", isActive: true },
        });

        if (existing) updated++;
        else added++;
      }
    }

    // Per-source expiry: deactivate records from this source that are no longer
    // in the sheet. Uses allSheetLinks (includes skipped rows with valid jobLink)
    // to avoid false deactivation of malformed-but-present rows.
    const expired = await prisma.jobExpo.updateMany({
      where: {
        source,
        jobLink: { notIn: allSheetLinks },
        isActive: true,
      },
      data: { isActive: false },
    });

    return NextResponse.json({
      success: true,
      source,
      added,
      updated,
      skipped,
      expired: expired.count,
      total: data.length,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: "Import failed" }, { status: 500 });
  }
}
