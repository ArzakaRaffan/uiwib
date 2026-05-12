// src/app/api/company-partners/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/supabase";

export async function GET() {
  try {
    const partners = await prisma.companyPartner.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ success: true, data: partners });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch company partners" }, { status: 500 });
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

    const partner = await prisma.companyPartner.create({
      data: {
        name: formData.get("name") as string,
        logoUrl,
      },
    });

    return NextResponse.json({ success: true, data: partner }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: "Failed to create company partner" }, { status: 500 });
  }
}
