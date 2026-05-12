// src/app/api/media-partners/[id]/route.ts
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
    const existing = await prisma.mediaPartner.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

    const logoFile = formData.get("logo") as File | null;
    let logoUrl = existing.logoUrl;

    if (logoFile && logoFile.size > 0) {
      if (existing.logoUrl) await deleteImage(existing.logoUrl);
      logoUrl = await uploadImage(logoFile, "partners", logoFile.name);
    }

    const updated = await prisma.mediaPartner.update({
      where: { id },
      data: {
        name: formData.get("name") as string,
        logoUrl,
        row: parseInt(formData.get("row") as string, 10),
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: "Failed to update media partner" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const existing = await prisma.mediaPartner.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

    if (existing.logoUrl) await deleteImage(existing.logoUrl);
    await prisma.mediaPartner.delete({ where: { id } });

    return NextResponse.json({ success: true, data: null });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: "Failed to delete media partner" }, { status: 500 });
  }
}
