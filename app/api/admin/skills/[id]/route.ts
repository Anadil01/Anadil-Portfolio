import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectToDatabase } from "@/lib/mongodb";
import { verifySessionToken } from "@/lib/auth";
import Skill from "@/models/Skill";

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (!token) return null;

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

// GET SINGLE SKILL

export async function GET(
  _request: Request,
  context: RouteContext
) {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    await connectToDatabase();

    const skill = await Skill.findById(id).lean();

    if (!skill) {
      return NextResponse.json(
        {
          success: false,
          message: "Skill not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      skill,
    });
  } catch (error) {
    console.error("GET skill error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch skill",
      },
      { status: 500 }
    );
  }
}

// UPDATE SKILL

export async function PUT(
  request: Request,
  context: RouteContext
) {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    const body = await request.json();

    const category = body.category?.trim();
    const name = body.name?.trim();

    if (!category || !name) {
      return NextResponse.json(
        {
          success: false,
          message: "Category and skill name are required",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const duplicate = await Skill.findOne({
      category,
      name,
      _id: {
        $ne: id,
      },
    });

    if (duplicate) {
      return NextResponse.json(
        {
          success: false,
          message: "Another skill already uses this name in this category",
        },
        { status: 409 }
      );
    }

    const skill = await Skill.findByIdAndUpdate(
      id,
      {
        category,
        name,
        icon: body.icon?.trim() || "",
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

    if (!skill) {
      return NextResponse.json(
        {
          success: false,
          message: "Skill not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Skill updated successfully",
      skill,
    });
  } catch (error) {
    console.error("PUT skill error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update skill",
      },
      { status: 500 }
    );
  }
}

// DELETE SKILL

export async function DELETE(
  _request: Request,
  context: RouteContext
) {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    await connectToDatabase();

    const skill = await Skill.findByIdAndDelete(id);

    if (!skill) {
      return NextResponse.json(
        {
          success: false,
          message: "Skill not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    console.error("DELETE skill error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete skill",
      },
      { status: 500 }
    );
  }
}