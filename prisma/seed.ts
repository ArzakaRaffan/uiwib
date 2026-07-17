// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Seed admin account
  const hashedPassword = await bcrypt.hash("admin123", 12);

  await prisma.admin.upsert({
    where: { email: "admin@uiwib.com" },
    update: {},
    create: {
      email: "admin@uiwib.com",
      password: hashedPassword,
      name: "UIWIB Admin",
    },
  });

  // Seed sample competition
  await prisma.competition.createMany({
    skipDuplicates: true,
    data: [
      {
        id: "comp-1",
        imageUrl: "https://placehold.co/600x400/f9a8d4/831843?text=Mini+Case+Competition",
        title: "Mini Case Competition",
        description:
          "Test your analytical and problem-solving skills in a real-world business case competition. Open for all UI students.",
        timeline: "Registration: May 26 – June 15, 2025 | Competition: June 20–21, 2025",
        applyUrl: "https://forms.google.com",
      },
    ],
  });

  // Seed sample training
  await prisma.training.createMany({
    skipDuplicates: true,
    data: [
      {
        id: "training-1",
        type: "External",
        title: "Breaking into Product Management",
        date: "Thursday, June 26, 2025",
        place: "Wisma Barito Pacific II (8th Floor) / tiket.com HQ",
        description:
          "External Training is an exclusive event under Weekend Career Expo 2025 that offers participants the chance to gain direct exposure to professional environments and industry knowledge. The upcoming External Training will be held on Thursday, June 26, 2025, featuring Tiket.com as the company partner with the theme: 'Breaking into Product Management: Develop Customer-Centric Products in the Digital Era.'",
      }],
  });

  // Seed sample job expo
  await prisma.jobExpo.createMany({
    skipDuplicates: true,
    data: [
      {
        id: "job-1",
        jobLink: "https://glints.com/opportunities/jobs/sample-1",
        title: "AI Scientist & Engineer",
        employmentType: "FULL_TIME",
        companyName: "Advance Intelligence Group",
        companyLogoUrl: "https://placehold.co/100x100/e0f2fe/0284c7?text=AIG",
        city: "Jakarta Selatan",
        province: "DKI Jakarta",
        broadExpertise: "Computer & Software",
        specificExpertise: "Data",
      },
      {
        id: "job-2",
        jobLink: "https://glints.com/opportunities/jobs/sample-2",
        title: "Digital Marketing Internship",
        employmentType: "INTERNSHIP",
        companyName: "Phiraka Sinergi Indonesia",
        companyLogoUrl: "https://placehold.co/100x100/fce7f3/db2777?text=PSI",
        city: "Jakarta Selatan",
        province: "DKI Jakarta",
        broadExpertise: "Marketing",
        specificExpertise: "Marketing",
      },
    ],
  });

  console.log("✅ Seed completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
