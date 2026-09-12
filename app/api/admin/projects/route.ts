import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectToDatabase } from "@/lib/mongodb";
import { verifySessionToken } from "@/lib/auth";
import Project, {
  type ProjectStatus,
} from "@/models/Project";

type ProjectStatusInput = "draft" | "published";

function isProjectStatus(
  value: unknown
): value is ProjectStatusInput {
  return (
    value === "draft" || value === "published"
  );
}

function normalizeProjectStatus(
  value: unknown
): ProjectStatus {
  return value === "published"
    ? "published"
    : "draft";
}

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
// GET ALL PROJECTS
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

    const projects = await Project.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();

    const normalizedProjects = projects.map(
      (project) => ({
        ...project,
        status: normalizeProjectStatus(
          project.status
        ),
      })
    );

    return NextResponse.json({
      success: true,
      projects: normalizedProjects,
    });
  } catch (error) {
    console.error("GET /api/admin/projects error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch projects",
      },
      { status: 500 }
    );
  }
}

// --------------------------------------------------
// CREATE PROJECT
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

    if (!body.title?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Project title is required",
        },
        { status: 400 }
      );
    }

    if (!body.slug?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Project slug is required",
        },
        { status: 400 }
      );
    }

    if (
      body.status !== undefined &&
      !isProjectStatus(body.status)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Project status must be draft or published",
        },
        { status: 400 }
      );
    }

    const status: ProjectStatusInput = isProjectStatus(
      body.status
    )
      ? body.status
      : "draft";

    await connectToDatabase();

    const existingProject = await Project.findOne({
      slug: body.slug.trim(),
    });

    if (existingProject) {
      return NextResponse.json(
        {
          success: false,
          message: "A project with this slug already exists",
        },
        { status: 409 }
      );
    }

    const lastProject = await Project.findOne()
      .sort({ order: -1 })
      .select("order")
      .lean();

    const nextOrder =
      typeof lastProject?.order === "number"
        ? lastProject.order + 1
        : 0;

    const project = await Project.create({
      title: body.title.trim(),
      slug: body.slug.trim(),
      description: body.description || "",
      impact: body.impact || "",
      highlights: body.highlights || [],

      caseStudy: {
        challenge: body.caseStudy?.challenge || "",
        solution: body.caseStudy?.solution || "",
        result: body.caseStudy?.result || "",
        screenshots: body.caseStudy?.screenshots || [],
      },

      stack: body.stack || [],

      image: {
        src: body.image?.src || "",
        alt: body.image?.alt || body.title.trim(),
      },

      liveDemo: body.liveDemo || undefined,
      github: body.github || undefined,

      featured: Boolean(body.featured),
      status,
      order: nextOrder,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully",
        project,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/admin/projects error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create project",
      },
      { status: 500 }
    );
  }
}