import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectToDatabase } from "@/lib/mongodb";
import { verifySessionToken } from "@/lib/auth";
import Experience from "@/models/Experience";

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

// --------------------------------------------------
// GET ALL EXPERIENCE
// --------------------------------------------------

export async function GET() {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const experiences = await Experience.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      experiences,
    });
  } catch (error) {
    console.error(
      "GET /api/admin/experience error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch experience",
      },
      { status: 500 }
    );
  }
}

// --------------------------------------------------
// CREATE EXPERIENCE
// --------------------------------------------------

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const role = body.role?.trim();
    const company = body.company?.trim();
    const period = body.period?.trim();

    if (!role || !company || !period) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Role, company and period are required",
        },
        { status: 400 }
      );
    }

    const points = Array.isArray(body.points)
      ? body.points
          .map((point: unknown) =>
            typeof point === "string"
              ? point.trim()
              : ""
          )
          .filter(Boolean)
      : [];

    await connectToDatabase();

    const lastExperience = await Experience.findOne()
      .sort({ order: -1 })
      .select("order")
      .lean();

    const nextOrder =
      typeof lastExperience?.order === "number"
        ? lastExperience.order + 1
        : 0;

    const experience = await Experience.create({
      role,
      company,
      period,
      points,
      order:
        typeof body.order === "number"
          ? body.order
          : nextOrder,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Experience created successfully",
        experience,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "POST /api/admin/experience error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create experience",
      },
      { status: 500 }
    );
  }
}