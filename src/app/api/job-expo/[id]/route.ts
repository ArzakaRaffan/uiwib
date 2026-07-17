import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await prisma.jobExpo.update({
      where: { id },
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
        isActive: body.isActive ?? true,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const existing = await prisma.jobExpo.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

    await prisma.jobExpo.delete({ where: { id } });
    return NextResponse.json({ success: true, data: null });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: "Failed to delete" }, { status: 500 });
  }
}
