// src/app/api/competition/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/supabase";

// GET /api/competition — public
export async function GET() {
  try {
    const competitions = await prisma.competition.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: competitions });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch competitions" }, { status: 500 });
  }
}

// POST /api/competition — admin only
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const timeline = formData.get("timeline") as string;
    const applyUrl = formData.get("applyUrl") as string;
    const imageFile = formData.get("image") as File | null;

    if (!title || !description || !timeline || !applyUrl) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    let imageUrl = "";
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile, "competition", imageFile.name);
    }

    const competition = await prisma.competition.create({
      data: { title, description, timeline, applyUrl, imageUrl },
    });

    return NextResponse.json({ success: true, data: competition }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: "Failed to create competition" }, { status: 500 });
  }
}
