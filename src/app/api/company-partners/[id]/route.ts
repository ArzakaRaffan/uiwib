// src/app/api/company-partners/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadImage, deleteImage } from "@/lib/supabase";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const formData = await req.formData();
    const existing = await prisma.companyPartner.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

    const logoFile = formData.get("logo") as File | null;
    let logoUrl = existing.logoUrl;

    if (logoFile && logoFile.size > 0) {
      if (existing.logoUrl) await deleteImage(existing.logoUrl);
      logoUrl = await uploadImage(logoFile, "partners", logoFile.name);
    }

    const updated = await prisma.companyPartner.update({
      where: { id },
      data: {
        name: formData.get("name") as string,
        logoUrl,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: "Failed to update company partner" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const existing = await prisma.companyPartner.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

    if (existing.logoUrl) await deleteImage(existing.logoUrl);
    await prisma.companyPartner.delete({ where: { id } });

    return NextResponse.json({ success: true, data: null });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: "Failed to delete company partner" }, { status: 500 });
  }
}
