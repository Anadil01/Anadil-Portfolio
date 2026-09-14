import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectToDatabase } from "@/lib/mongodb";
import { verifySessionToken } from "@/lib/auth";
import Project, {
  type ProjectStatus,
} from "@/models/Project";

type ProjectStatusInput = "draft" | "published";

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

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// --------------------------------------------------
// GET SINGLE PROJECT
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

    const project = await Project.findById(id).lean();

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      project: {
        ...project,
        status: normalizeProjectStatus(
          project.status
        ),
      },
    });
  } catch (error) {
    console.error("GET project error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch project",
      },
      { status: 500 }
    );
  }
}

// --------------------------------------------------
// UPDATE PROJECT
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

    // --------------------------------------------------
    // VALIDATION
    // --------------------------------------------------

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

    const status: ProjectStatusInput =
      body.status === "published"
        ? "published"
        : "draft";

    const isFeatured = Boolean(body.featured);

    await connectToDatabase();

    // --------------------------------------------------
    // CHECK DUPLICATE SLUG
    // --------------------------------------------------

    const duplicate = await Project.findOne({
      slug: body.slug.trim(),
      _id: {
        $ne: id,
      },
    }).lean();

    if (duplicate) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Another project already uses this slug",
        },
        { status: 409 }
      );
    }

    // --------------------------------------------------
    // UPDATE PROJECT
    // --------------------------------------------------

    const project = await Project.findByIdAndUpdate(
      id,
      {
        title: body.title.trim(),

        slug: body.slug.trim(),

        description: body.description || "",

        impact: body.impact || "",

        highlights: Array.isArray(body.highlights)
          ? body.highlights
          : [],

        caseStudy: {
          challenge:
            body.caseStudy?.challenge || "",

          solution:
            body.caseStudy?.solution || "",

          result:
            body.caseStudy?.result || "",

          screenshots:
            Array.isArray(
              body.caseStudy?.screenshots
            )
              ? body.caseStudy.screenshots
              : [],
        },

        stack: Array.isArray(body.stack)
          ? body.stack
          : [],

        image: {
          src: body.image?.src || "",

          alt:
            body.image?.alt ||
            body.title.trim(),
        },

        liveDemo: body.liveDemo || "",

        github: body.github || "",

        featured: isFeatured,

        status,

        order:
          typeof body.order === "number"
            ? body.order
            : 0,
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    ).lean();

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        { status: 404 }
      );
    }

    // --------------------------------------------------
    // IMPORTANT:
    //
    // Only ONE project can be featured.
    //
    // If this project is featured,
    // automatically remove featured from
    // every other project.
    // --------------------------------------------------

    if (isFeatured) {
      await Project.updateMany(
        {
          _id: {
            $ne: id,
          },
          featured: true,
        },
        {
          $set: {
            featured: false,
          },
        }
      );
    }

    // --------------------------------------------------
    // RETURN UPDATED PROJECT
    // --------------------------------------------------

    const updatedProject =
      await Project.findById(id).lean();

    return NextResponse.json({
      success: true,

      message: isFeatured
        ? "Project updated and set as the featured project"
        : "Project updated successfully",

      project: updatedProject,
    });
  } catch (error) {
    console.error(
      "PUT project error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update project",
      },
      { status: 500 }
    );
  }
}

// --------------------------------------------------
// DELETE PROJECT
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

    const project =
      await Project.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE project error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete project",
      },
      { status: 500 }
    );
  }
}