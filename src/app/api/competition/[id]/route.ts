// src/app/api/competition/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadImage, deleteImage } from "@/lib/supabase";

// PUT /api/competition/[id] — admin only
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const timeline = formData.get("timeline") as string;
    const applyUrl = formData.get("applyUrl") as string;
    const imageFile = formData.get("image") as File | null;

    const { id } = await params;
    const existing = await prisma.competition.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

    let imageUrl = existing.imageUrl;
    if (imageFile && imageFile.size > 0) {
      // Delete old image first
      if (existing.imageUrl) await deleteImage(existing.imageUrl);
      imageUrl = await uploadImage(imageFile, "competition", imageFile.name);
    }

    const updated = await prisma.competition.update({
      where: { id: id },
      data: { title, description, timeline, applyUrl, imageUrl },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: "Failed to update" }, { status: 500 });
  }
}

// DELETE /api/competition/[id] — admin only
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const existing = await prisma.competition.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

    if (existing.imageUrl) await deleteImage(existing.imageUrl);
    await prisma.competition.delete({ where: { id: id } });

    return NextResponse.json({ success: true, data: null });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: "Failed to delete" }, { status: 500 });
  }
}
