// src/app/api/training/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/supabase";

export async function GET() {
  try {
    const trainings = await prisma.training.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: trainings });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch trainings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const type = formData.get("type") as string;
    const title = formData.get("title") as string;
    const date = formData.get("date") as string;
    const place = formData.get("place") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File | null;

    let imageUrl: string | undefined;
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile, "training", imageFile.name);
    }

    const training = await prisma.training.create({
      data: { type, title, date, place, description, imageUrl },
    });

    return NextResponse.json({ success: true, data: training }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: "Failed to create training" }, { status: 500 });
  }
}
