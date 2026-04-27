// src/app/api/job-expo/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") ?? "";
    const location = searchParams.get("location") ?? "";
    const employmentType = searchParams.get("employmentType") ?? "";

    const jobs = await prisma.jobExpo.findMany({
      where: {
        isActive: true,
        ...(search && {
          OR: [
            { jobTitle: { contains: search, mode: "insensitive" } },
            { companyName: { contains: search, mode: "insensitive" } },
          ],
        }),
        ...(location && { location }),
        ...(employmentType && { employmentType }),
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
    const formData = await req.formData();
    const logoFile = formData.get("logo") as File | null;

    let companyLogoUrl = "";
    if (logoFile && logoFile.size > 0) {
      companyLogoUrl = await uploadImage(logoFile, "job-expo", logoFile.name);
    }

    const job = await prisma.jobExpo.create({
      data: {
        companyLogoUrl,
        companyName: formData.get("companyName") as string,
        jobTitle: formData.get("jobTitle") as string,
        industry: formData.get("industry") as string,
        salary: (formData.get("salary") as string) || null,
        employmentType: formData.get("employmentType") as string,
        qualification: formData.get("qualification") as string,
        city: formData.get("city") as string,
        location: formData.get("location") as string,
        deadline: new Date(formData.get("deadline") as string),
        applyUrl: formData.get("applyUrl") as string,
      },
    });

    return NextResponse.json({ success: true, data: job }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: "Failed to create job" }, { status: 500 });
  }
}
