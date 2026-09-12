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

// GET ALL SKILLS
export async function GET() {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const skills = await Skill.find()
      .sort({ order: 1, category: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      skills,
    });
  } catch (error) {
    console.error("GET /api/admin/skills error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch skills",
      },
      { status: 500 }
    );
  }
}

// CREATE SKILL
export async function POST(request: Request) {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

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

    const existingSkill = await Skill.findOne({
      category,
      name,
    });

    if (existingSkill) {
      return NextResponse.json(
        {
          success: false,
          message: "This skill already exists in this category",
        },
        { status: 409 }
      );
    }

    const lastSkill = await Skill.findOne()
      .sort({ order: -1 })
      .select("order")
      .lean();

    const nextOrder =
      typeof lastSkill?.order === "number"
        ? lastSkill.order + 1
        : 0;

    const skill = await Skill.create({
      category,
      name,
      icon: body.icon?.trim() || "",
      order:
        typeof body.order === "number"
          ? body.order
          : nextOrder,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Skill created successfully",
        skill,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/admin/skills error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create skill",
      },
      { status: 500 }
    );
  }
}