/**
 * Migration script: Supabase Storage → Cloudflare R2
 * Updates CompanyPartner.logoUrl and MediaPartner.logoUrl in DB
 *
 * Usage:
 *   node migrate-to-r2.mjs
 */

import { createClient } from "@supabase/supabase-js";
import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";
import path from "path";

// ─── CONFIG — isi semua ini dulu ─────────────────────────────────────────────
const CONFIG = {
  supabase: {
    url: process.env.SUPABASE_URL,                        // https://xxxx.supabase.co
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY, // service_role secret
    bucket: "uiwib-assets",
    folder: "partners",
  },
  r2: {
    accountId: process.env.R2_ACCOUNT_ID,
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    bucket: process.env.R2_BUCKET_NAME,                   // nama bucket R2 lo
    publicUrl: process.env.R2_PUBLIC_URL,                 // https://pub-xxxx.r2.dev
  },
};
// ─────────────────────────────────────────────────────────────────────────────

// Validate config
const missing = Object.entries({
  SUPABASE_URL: CONFIG.supabase.url,
  SUPABASE_SERVICE_ROLE_KEY: CONFIG.supabase.serviceRoleKey,
  R2_ACCOUNT_ID: CONFIG.r2.accountId,
  R2_ACCESS_KEY_ID: CONFIG.r2.accessKeyId,
  R2_SECRET_ACCESS_KEY: CONFIG.r2.secretAccessKey,
  R2_BUCKET_NAME: CONFIG.r2.bucket,
  R2_PUBLIC_URL: CONFIG.r2.publicUrl,
}).filter(([, v]) => !v).map(([k]) => k);

if (missing.length > 0) {
  console.error("❌ Missing env vars:", missing.join(", "));
  process.exit(1);
}

const supabase = createClient(CONFIG.supabase.url, CONFIG.supabase.serviceRoleKey);

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${CONFIG.r2.accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: CONFIG.r2.accessKeyId,
    secretAccessKey: CONFIG.r2.secretAccessKey,
  },
});

const prisma = new PrismaClient();

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function getFilenameFromUrl(url) {
  try {
    return decodeURIComponent(new URL(url).pathname.split("/").pop());
  } catch {
    return url.split("/").pop();
  }
}

function getMimeType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const map = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
  };
  return map[ext] ?? "application/octet-stream";
}

async function fileExistsInR2(key) {
  try {
    await r2.send(new HeadObjectCommand({ Bucket: CONFIG.r2.bucket, Key: key }));
    return true;
  } catch {
    return false;
  }
}

async function migrateFile(logoUrl) {
  if (!logoUrl) return null;

  // Already migrated to R2
  if (logoUrl.includes(CONFIG.r2.publicUrl)) {
    return logoUrl;
  }

  const filename = getFilenameFromUrl(logoUrl);
  const r2Key = `partners/${filename}`;
  const newUrl = `${CONFIG.r2.publicUrl}/${r2Key}`;

  // Skip if already uploaded
  if (await fileExistsInR2(r2Key)) {
    console.log(`  ⏭️  Already in R2: ${filename}`);
    return newUrl;
  }

  // Download from Supabase Storage
  const response = await fetch(logoUrl);
  if (!response.ok) {
    console.error(`  ❌ Failed to download: ${logoUrl} (${response.status})`);
    return null;
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const contentType = getMimeType(filename);

  // Upload to R2
  await r2.send(new PutObjectCommand({
    Bucket: CONFIG.r2.bucket,
    Key: r2Key,
    Body: buffer,
    ContentType: contentType,
  }));

  console.log(`  ✅ Migrated: ${filename} (${(buffer.length / 1024).toFixed(1)} KB)`);
  return newUrl;
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function migrate() {
  console.log("🚀 Starting migration: Supabase Storage → Cloudflare R2\n");

  // Fetch all records
  const [companyPartners, mediaPartners] = await Promise.all([
    prisma.companyPartner.findMany({ select: { id: true, name: true, logoUrl: true } }),
    prisma.mediaPartner.findMany({ select: { id: true, name: true, logoUrl: true } }),
  ]);

  console.log(`📦 Found ${companyPartners.length} CompanyPartners, ${mediaPartners.length} MediaPartners\n`);

  let success = 0;
  let failed = 0;
  let skipped = 0;

  // Migrate CompanyPartner
  console.log("── CompanyPartner ──────────────────────────────────");
  for (const partner of companyPartners) {
    console.log(`→ ${partner.name}`);
    const newUrl = await migrateFile(partner.logoUrl);

    if (!newUrl) {
      failed++;
      continue;
    }

    if (newUrl === partner.logoUrl) {
      skipped++;
      continue;
    }

    await prisma.companyPartner.update({
      where: { id: partner.id },
      data: { logoUrl: newUrl },
    });
    success++;
  }

  // Migrate MediaPartner
  console.log("\n── MediaPartner ────────────────────────────────────");
  for (const partner of mediaPartners) {
    console.log(`→ ${partner.name}`);
    const newUrl = await migrateFile(partner.logoUrl);

    if (!newUrl) {
      failed++;
      continue;
    }

    if (newUrl === partner.logoUrl) {
      skipped++;
      continue;
    }

    await prisma.mediaPartner.update({
      where: { id: partner.id },
      data: { logoUrl: newUrl },
    });
    success++;
  }

  console.log("\n─────────────────────────────────────────────────────");
  console.log(`✅ Migrated  : ${success}`);
  console.log(`⏭️  Skipped   : ${skipped} (already in R2)`);
  console.log(`❌ Failed    : ${failed}`);
  console.log("\n🎉 Done! Update your .env:");
  console.log(`   NEXT_PUBLIC_R2_URL=${CONFIG.r2.publicUrl}`);
  console.log("\nJangan lupa hapus file lama di Supabase Storage setelah verify website normal.");
}

migrate()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
