import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectToDatabase } from "@/lib/mongodb";
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

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

   await connectToDatabase();

    const { id } = await context.params;

    const education = await Education.findById(id).lean();

    if (!education) {
      return NextResponse.json(
        { error: "Education not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(education);
  } catch (error) {
    console.error("GET education item error:", error);

    return NextResponse.json(
      { error: "Failed to fetch education" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const { id } = await context.params;
    const body = await request.json();

    const institution = body.institution?.trim();
    const degree = body.degree?.trim();
    const field = body.field?.trim() || "";
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

    const education = await Education.findByIdAndUpdate(
      id,
      {
        institution,
        degree,
        field,
        period,
        description,
        order:
          typeof body.order === "number"
            ? body.order
            : 1,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!education) {
      return NextResponse.json(
        { error: "Education not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(education);
  } catch (error) {
    console.error("PUT education error:", error);

    return NextResponse.json(
      { error: "Failed to update education" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const { id } = await context.params;

    const education = await Education.findByIdAndDelete(id);

    if (!education) {
      return NextResponse.json(
        { error: "Education not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Education deleted successfully",
    });
  } catch (error) {
    console.error("DELETE education error:", error);

    return NextResponse.json(
      { error: "Failed to delete education" },
      { status: 500 }
    );
  }
}