// src/app/api/media-partners/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/supabase";

export async function GET() {
  try {
    const partners = await prisma.mediaPartner.findMany({
      where: { isActive: true },
      orderBy: [{ row: "asc" }, { createdAt: "asc" }],
    });
    return NextResponse.json({ success: true, data: partners });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch media partners" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const logoFile = formData.get("logo") as File | null;

    let logoUrl = "";
    if (logoFile && logoFile.size > 0) {
      logoUrl = await uploadImage(logoFile, "partners", logoFile.name);
    }

    const partner = await prisma.mediaPartner.create({
      data: {
        name: formData.get("name") as string,
        logoUrl,
        row: parseInt(formData.get("row") as string, 10),
      },
    });

    return NextResponse.json({ success: true, data: partner }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: "Failed to create media partner" }, { status: 500 });
  }
}
