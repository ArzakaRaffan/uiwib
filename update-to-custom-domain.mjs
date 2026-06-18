/**
 * update-to-custom-domain.mjs
 * Updates CompanyPartner.logoUrl and MediaPartner.logoUrl
 * from the r2.dev public URL to the custom domain URL.
 *
 * Usage: node --env-file=.env.migration update-to-custom-domain.mjs
 */

import { PrismaClient } from "@prisma/client";

const OLD_DOMAIN = "https://pub-5080dc5a6739471db0d03a2c2b4f8381.r2.dev";
const NEW_DOMAIN = "https://assets.uiwomeninbusiness.com";

const prisma = new PrismaClient();

async function updateUrls() {
  console.log("🔄 Updating logoUrl: r2.dev → custom domain\n");

  const [companyPartners, mediaPartners] = await Promise.all([
    prisma.companyPartner.findMany({ select: { id: true, name: true, logoUrl: true } }),
    prisma.mediaPartner.findMany({ select: { id: true, name: true, logoUrl: true } }),
  ]);

  let updated = 0;
  let skipped = 0;

  console.log("── CompanyPartner ──────────────────────────────────");
  for (const partner of companyPartners) {
    if (!partner.logoUrl || !partner.logoUrl.startsWith(OLD_DOMAIN)) {
      skipped++;
      continue;
    }
    const newUrl = partner.logoUrl.replace(OLD_DOMAIN, NEW_DOMAIN);
    await prisma.companyPartner.update({
      where: { id: partner.id },
      data: { logoUrl: newUrl },
    });
    console.log(`✅ ${partner.name}`);
    updated++;
  }

  console.log("\n── MediaPartner ────────────────────────────────────");
  for (const partner of mediaPartners) {
    if (!partner.logoUrl || !partner.logoUrl.startsWith(OLD_DOMAIN)) {
      skipped++;
      continue;
    }
    const newUrl = partner.logoUrl.replace(OLD_DOMAIN, NEW_DOMAIN);
    await prisma.mediaPartner.update({
      where: { id: partner.id },
      data: { logoUrl: newUrl },
    });
    console.log(`✅ ${partner.name}`);
    updated++;
  }

  console.log("\n─────────────────────────────────────────────────────");
  console.log(`✅ Updated : ${updated}`);
  console.log(`⏭️  Skipped : ${skipped} (already custom domain or no logoUrl)`);
  console.log("\n🎉 Done! Don't forget to update R2_PUBLIC_URL env var too:");
  console.log(`   R2_PUBLIC_URL=${NEW_DOMAIN}`);
}

updateUrls()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
