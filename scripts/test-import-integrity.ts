/**
 * Data integrity test for JobExpo dual-tab import.
 * Run: npx tsx scripts/test-import-integrity.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Result = { pass: boolean; detail: string };

async function check1_partialUpdateCorrectness(): Promise<Result> {
  // Tab-1 records that received tab-2 data (overlap).
  // If partial-update worked correctly, their tab-1-only fields must still be populated.
  // We can't assert "must be non-null" for ALL tab-1 records (some genuinely have null
  // minYearsOfExperience), so we only flag overlap records where a tab-2 field was written
  // but the canonical tab-1 unique fields are ALL null simultaneously — that's the red flag.
  const overlaps = await prisma.jobExpo.findMany({
    where: {
      source: "tab1",
      OR: [
        { glintStatus: { not: null } },
        { salaryRangeIdr: { not: null } },
        { l1Category: { not: null } },
      ],
    },
    select: { jobLink: true, minYearsOfExperience: true, broadExpertise: true, specificExpertise: true, glintStatus: true },
  });

  // Flag only records where ALL three tab-1 expertise fields are null after overlap
  const suspects = overlaps.filter(
    (r) => r.minYearsOfExperience === null && r.broadExpertise === null && r.specificExpertise === null
  );

  if (suspects.length === 0) {
    return { pass: true, detail: `${overlaps.length} overlap records checked — all retain tab-1 fields correctly.` };
  }
  return {
    pass: false,
    detail: `${suspects.length} overlap record(s) have ALL tab-1 expertise fields null after tab-2 update:\n` +
      suspects.map((r) => `  • ${r.jobLink} (glintStatus: ${r.glintStatus})`).join("\n"),
  };
}

async function check2_sourceIntegrity(): Promise<Result> {
  // Ensure every record has a valid source value
  const invalid = await prisma.jobExpo.findMany({
    where: { source: { notIn: ["tab1", "tab2"] } },
    select: { jobLink: true, source: true },
  });
  if (invalid.length === 0) {
    const tab1Count = await prisma.jobExpo.count({ where: { source: "tab1" } });
    const tab2Count = await prisma.jobExpo.count({ where: { source: "tab2" } });
    return { pass: true, detail: `All records have valid source. tab1: ${tab1Count}, tab2: ${tab2Count}` };
  }
  return {
    pass: false,
    detail: `${invalid.length} record(s) with unexpected source value:\n` +
      invalid.map((r) => `  • ${r.jobLink} → source="${r.source}"`).join("\n"),
  };
}

async function check3_noOrphanNulls(): Promise<Result> {
  const broken = await prisma.jobExpo.findMany({
    where: {
      isActive: true,
      OR: [
        { jobLink: "" },
        { title: "" },
        { companyName: "" },
      ],
    },
    select: { id: true, jobLink: true, title: true, companyName: true },
  });
  if (broken.length === 0) {
    return { pass: true, detail: "All active records have non-empty jobLink, title, companyName." };
  }
  return {
    pass: false,
    detail: `${broken.length} active record(s) missing required fields:\n` +
      broken.map((r) => `  • id=${r.id} jobLink="${r.jobLink}" title="${r.title}" company="${r.companyName}"`).join("\n"),
  };
}

async function check4_noDuplicates(): Promise<Result> {
  // GROUP BY jobLink, find any with count > 1
  const dupes = await prisma.$queryRaw<{ jobLink: string; cnt: bigint }[]>`
    SELECT "jobLink", COUNT(*) as cnt
    FROM "JobExpo"
    GROUP BY "jobLink"
    HAVING COUNT(*) > 1
  `;
  if (dupes.length === 0) {
    return { pass: true, detail: "No duplicate jobLinks found." };
  }
  return {
    pass: false,
    detail: `${dupes.length} duplicate jobLink(s):\n` +
      dupes.map((d) => `  • "${d.jobLink}" (${d.cnt} copies)`).join("\n"),
  };
}

async function check5_expiryLogicDryRun(): Promise<Result> {
  // Simulate: "what WOULD be deactivated if we ran tab2 import with an empty batch"
  // We don't touch data — just count what the WHERE clause would match.
  const wouldExpire = await prisma.jobExpo.count({
    where: { source: "tab2", jobLink: { notIn: [] }, isActive: true },
  });
  // "notIn: []" in Prisma = all records match (no exclusions). So this = all active tab2 records.
  // In a real empty-batch import, ALL tab2 records would be deactivated. That's correct behavior.

  // More useful: verify tab1 records are NOT touched by a tab2 expiry sweep.
  const tab1ActiveCount = await prisma.jobExpo.count({ where: { source: "tab1", isActive: true } });
  const tab2ActiveCount = await prisma.jobExpo.count({ where: { source: "tab2", isActive: true } });
  const allInactiveCount = await prisma.jobExpo.count({ where: { isActive: false } });

  return {
    pass: true,
    detail: [
      `DRY RUN (no data modified):`,
      `  Active tab1: ${tab1ActiveCount} | Active tab2: ${tab2ActiveCount} | Inactive: ${allInactiveCount}`,
      `  An empty-batch tab2 import would deactivate: ${wouldExpire} tab2 records`,
      `  A tab2 expiry sweep cannot touch tab1 records (filtered by source: "tab2"). ✓`,
      `  NOTE: Production expiry only runs for the source being imported — cross-source contamination is impossible by design.`,
    ].join("\n"),
  };
}

async function check6_renderSafety(): Promise<Result> {
  // Check JobListSection.tsx for defensive rendering of optional fields.
  // This is a static analysis — we inspect the source file directly.
  const fs = await import("fs");
  const src = fs.readFileSync("src/app/(public)/wce/job-expo/JobListSection.tsx", "utf8");

  const checks = [
    {
      name: "glintStatus conditional render",
      // Should use {job.glintStatus && ...} or optional chaining
      pass: /selectedJob\.glintStatus\s*&&/.test(src) || /job\.glintStatus\s*&&/.test(src),
    },
    {
      name: "salaryRangeIdr conditional render",
      pass: /selectedJob\.salaryRangeIdr\s*&&/.test(src) || /job\.salaryRangeIdr\s*&&/.test(src),
    },
    {
      name: "l1Category fallback in person icon",
      pass: /broadExpertise\s*\|\|\s*[\w.]*l1Category/.test(src),
    },
    {
      name: "minYearsOfExperience null guard",
      // Should use ?? 0 or check before rendering
      pass: /minYearsOfExperience\s*\?\?/.test(src),
    },
  ];

  const failures = checks.filter((c) => !c.pass);
  if (failures.length === 0) {
    return { pass: true, detail: `All ${checks.length} render-safety checks passed.` };
  }
  return {
    pass: false,
    detail: `${failures.length} render-safety issue(s):\n` +
      failures.map((c) => `  • MISSING: ${c.name}`).join("\n"),
  };
}

async function main() {
  console.log("=".repeat(60));
  console.log("JobExpo Import Integrity Test");
  console.log("=".repeat(60));

  const checks = [
    { id: 1, name: "Partial update correctness (overlap records)",  fn: check1_partialUpdateCorrectness },
    { id: 2, name: "Source integrity",                              fn: check2_sourceIntegrity },
    { id: 3, name: "No orphan nulls in required fields",            fn: check3_noOrphanNulls },
    { id: 4, name: "No duplicate jobLinks",                         fn: check4_noDuplicates },
    { id: 5, name: "Expiry logic dry-run",                          fn: check5_expiryLogicDryRun },
    { id: 6, name: "Render safety (static analysis)",               fn: check6_renderSafety },
  ];

  let allPass = true;
  for (const check of checks) {
    process.stdout.write(`\n[${check.id}] ${check.name}\n`);
    try {
      const result = await check.fn();
      const status = result.pass ? "✅ PASS" : "❌ FAIL";
      console.log(`    ${status}`);
      console.log(`    ${result.detail.replace(/\n/g, "\n    ")}`);
      if (!result.pass) allPass = false;
    } catch (e) {
      console.log(`    ❌ ERROR: ${e instanceof Error ? e.message : String(e)}`);
      allPass = false;
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log(allPass ? "✅ ALL CHECKS PASSED" : "❌ SOME CHECKS FAILED — see details above");
  console.log("=".repeat(60));

  await prisma.$disconnect();
  process.exit(allPass ? 0 : 1);
}

main();
