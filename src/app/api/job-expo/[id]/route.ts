// src/app/api/job-expo/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadImage, deleteImage } from "@/lib/supabase";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const { id } = await params;
    const existing = await prisma.jobExpo.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

    const logoFile = formData.get("logo") as File | null;
    let companyLogoUrl = existing.companyLogoUrl;

    if (logoFile && logoFile.size > 0) {
      if (existing.companyLogoUrl) await deleteImage(existing.companyLogoUrl);
      companyLogoUrl = await uploadImage(logoFile, "job-expo", logoFile.name);
    }

    const updated = await prisma.jobExpo.update({
      where: { id: id },
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

    if (existing.companyLogoUrl) await deleteImage(existing.companyLogoUrl);
    await prisma.jobExpo.delete({ where: { id: id } });

    return NextResponse.json({ success: true, data: null });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: "Failed to delete" }, { status: 500 });
  }
}
