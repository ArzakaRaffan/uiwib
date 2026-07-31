import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") ?? "";
    const employmentType = searchParams.get("employmentType") ?? "";
    const broadExpertise = searchParams.get("broadExpertise") ?? "";
    const companyName = searchParams.get("companyName") ?? "";

    const jobs = await prisma.jobExpo.findMany({
      where: {
        isActive: true,
        source: "tab1",
        ...(search && {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { companyName: { contains: search, mode: "insensitive" } },
            { broadExpertise: { contains: search, mode: "insensitive" } },
            { specificExpertise: { contains: search, mode: "insensitive" } },
            { skills: { contains: search, mode: "insensitive" } },
          ],
        }),
        ...(employmentType && { employmentType }),
        ...(broadExpertise && { broadExpertise }),
        ...(companyName && { companyName: { contains: companyName, mode: "insensitive" } }),
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: jobs });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch jobs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();

    const job = await prisma.jobExpo.create({
      data: {
        jobLink: body.jobLink,
        title: body.title,
        employmentType: body.employmentType,
        jobDescriptionSummary: body.jobDescriptionSummary ?? null,
        jobDescriptionFull: body.jobDescriptionFull ?? null,
        skills: body.skills ?? null,
        educationLevel: body.educationLevel ?? null,
        minYearsOfExperience: body.minYearsOfExperience != null ? Number(body.minYearsOfExperience) : null,
        broadExpertise: body.broadExpertise ?? null,
        specificExpertise: body.specificExpertise ?? null,
        city: body.city,
        province: body.province ?? null,
        companyName: body.companyName,
        companyAddress: body.companyAddress ?? null,
        companyLogoUrl: body.companyLogoUrl ?? "",
      },
    });

    return NextResponse.json({ success: true, data: job }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: "Failed to create job" }, { status: 500 });
  }
}
