import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/lib/mongodb";
import Education from "@/models/Education";
import { verifySessionToken } from "@/lib/auth";

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (!token) {
    return null;
  }

  const session = await verifySessionToken(token);

  if (!session || session.role !== "admin") {
    return null;
  }

  return session;
}

export async function GET() {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const education = await Education.find()
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return NextResponse.json(education);
  } catch (error) {
    console.error("GET education error:", error);

    return NextResponse.json(
      { error: "Failed to fetch education" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();

    const institution = body.institution?.trim();
    const degree = body.degree?.trim();
    const field = body.field?.trim();
    const period = body.period?.trim();
    const description = body.description?.trim() || "";

    if (!institution || !degree || !period) {
      return NextResponse.json(
        {
          error: "Institution, degree and period are required",
        },
        { status: 400 }
      );
    }

    const existingCount = await Education.countDocuments();

    const education = await Education.create({
      institution,
      degree,
      field: field || "",
      period,
      description,
      order:
        typeof body.order === "number"
          ? body.order
          : existingCount + 1,
    });

    return NextResponse.json(education, { status: 201 });
  } catch (error) {
    console.error("POST education error:", error);

    return NextResponse.json(
      { error: "Failed to create education" },
      { status: 500 }
    );
  }
}