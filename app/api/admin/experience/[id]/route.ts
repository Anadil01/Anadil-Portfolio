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

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// --------------------------------------------------
// GET SINGLE EXPERIENCE
// --------------------------------------------------

export async function GET(
  _request: Request,
  context: RouteContext
) {
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

    const { id } = await context.params;

    await connectToDatabase();

    const experience = await Experience.findById(id).lean();

    if (!experience) {
      return NextResponse.json(
        {
          success: false,
          message: "Experience not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      experience,
    });
  } catch (error) {
    console.error("GET experience error:", error);

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
// UPDATE EXPERIENCE
// --------------------------------------------------

export async function PUT(
  request: Request,
  context: RouteContext
) {
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

    const { id } = await context.params;

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

    const experience =
      await Experience.findByIdAndUpdate(
        id,
        {
          role,
          company,
          period,
          points,
          order:
            typeof body.order === "number"
              ? body.order
              : 0,
        },
        {
          new: true,
          runValidators: true,
        }
      ).lean();

    if (!experience) {
      return NextResponse.json(
        {
          success: false,
          message: "Experience not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Experience updated successfully",
      experience,
    });
  } catch (error) {
    console.error("PUT experience error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update experience",
      },
      { status: 500 }
    );
  }
}

// --------------------------------------------------
// DELETE EXPERIENCE
// --------------------------------------------------

export async function DELETE(
  _request: Request,
  context: RouteContext
) {
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

    const { id } = await context.params;

    await connectToDatabase();

    const experience =
      await Experience.findByIdAndDelete(id);

    if (!experience) {
      return NextResponse.json(
        {
          success: false,
          message: "Experience not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE experience error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete experience",
      },
      { status: 500 }
    );
  }
}