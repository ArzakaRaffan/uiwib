/**
 * compress-assets.mjs
 * Converts all PNG/JPG in public/ to WebP (quality 80)
 * Keeps original files intact — safe to run, nothing deleted
 *
 * Usage: node compress-assets.mjs
 */

import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, extname, dirname, basename } from "path";
import { existsSync } from "fs";

const PUBLIC_DIR = "./public";
const QUALITY = 80;
const SKIP_ALREADY_WEBP = true;

// Extensions to convert
const TARGET_EXTS = [".png", ".jpg", ".jpeg", ".PNG", ".JPG", ".JPEG"];

async function getAllFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = join(dir, entry.name);
      return entry.isDirectory() ? getAllFiles(fullPath) : fullPath;
    })
  );
  return files.flat();
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function compress() {
  console.log("🗜️  Starting compression: PNG/JPG → WebP\n");

  const allFiles = await getAllFiles(PUBLIC_DIR);
  const targets = allFiles.filter((f) => TARGET_EXTS.includes(extname(f)));

  console.log(`📁 Found ${targets.length} files to convert\n`);

  let totalOriginal = 0;
  let totalCompressed = 0;
  let converted = 0;
  let skipped = 0;
  let failed = 0;

  for (const filePath of targets) {
    const webpPath = filePath.replace(/\.(png|jpg|jpeg|PNG|JPG|JPEG)$/, ".webp");

    // Skip if WebP already exists
    if (SKIP_ALREADY_WEBP && existsSync(webpPath)) {
      console.log(`⏭️  Already exists: ${webpPath}`);
      skipped++;
      continue;
    }

    try {
      const originalStat = await stat(filePath);
      const originalSize = originalStat.size;

      await sharp(filePath)
        .webp({ quality: QUALITY })
        .toFile(webpPath);

      const newStat = await stat(webpPath);
      const newSize = newStat.size;
      const savings = ((1 - newSize / originalSize) * 100).toFixed(0);

      totalOriginal += originalSize;
      totalCompressed += newSize;

      console.log(
        `✅ ${filePath}\n   ${formatSize(originalSize)} → ${formatSize(newSize)} (-${savings}%)\n`
      );
      converted++;
    } catch (err) {
      console.error(`❌ Failed: ${filePath}\n   ${err.message}\n`);
      failed++;
    }
  }

  console.log("─────────────────────────────────────────────");
  console.log(`✅ Converted : ${converted}`);
  console.log(`⏭️  Skipped   : ${skipped}`);
  console.log(`❌ Failed    : ${failed}`);
  console.log(`\n📦 Total original  : ${formatSize(totalOriginal)}`);
  console.log(`📦 Total compressed: ${formatSize(totalCompressed)}`);
  console.log(
    `💾 Total savings   : ${formatSize(totalOriginal - totalCompressed)} (${((1 - totalCompressed / totalOriginal) * 100).toFixed(0)}%)`
  );
  console.log("\n⚠️  Original files NOT deleted — still safe.");
  console.log(
    "Next step: update file references in code (.png → .webp), then delete originals."
  );
}

compress().catch((e) => {
  console.error(e);
  process.exit(1);
});
