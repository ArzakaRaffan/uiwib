// src/app/api/training/[id]/route.ts
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
    const existing = await prisma.training.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

    const imageFile = formData.get("image") as File | null;
    let imageUrl = existing.imageUrl;

    if (imageFile && imageFile.size > 0) {
      if (existing.imageUrl) await deleteImage(existing.imageUrl);
      imageUrl = await uploadImage(imageFile, "training", imageFile.name);
    }

    const updated = await prisma.training.update({
      where: { id: id },
      data: {
        type: formData.get("type") as string,
        title: formData.get("title") as string,
        date: formData.get("date") as string,
        place: formData.get("place") as string,
        description: formData.get("description") as string,
        imageUrl,
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
    const existing = await prisma.training.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

    if (existing.imageUrl) await deleteImage(existing.imageUrl);
    await prisma.training.delete({ where: { id: id } });

    return NextResponse.json({ success: true, data: null });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: "Failed to delete" }, { status: 500 });
  }
}
