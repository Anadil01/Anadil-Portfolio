import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectToDatabase } from "@/lib/mongodb";
import Resume from "@/models/Resume";
import cloudinary from "@/lib/cloudinary";
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

    await connectToDatabase();

    const resume = await Resume.findOne()
      .sort({ uploadedAt: -1 })
      .lean();

    return NextResponse.json(resume);
  } catch (error) {
    console.error("GET resume error:", error);

    return NextResponse.json(
      { error: "Failed to fetch resume" },
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

    await connectToDatabase();

    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Please upload a resume PDF." },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed." },
        { status: 400 }
      );
    }

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      return NextResponse.json(
        {
          error: "Resume must be smaller than 10MB.",
        },
        { status: 400 }
      );
    }

    const existingResume = await Resume.findOne();

    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        {
          error:
            "Cloudinary environment variables are not configured.",
        },
        { status: 500 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "anadil-portfolio/resumes",
          public_id: `resume-${Date.now()}`,
          format: "pdf",
        },
        (error, result) => {
          if (error || !result) {
            reject(
              error || new Error("Cloudinary upload failed")
            );
            return;
          }

          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );

      uploadStream.end(buffer);
    });

    if (existingResume) {
      try {
        await cloudinary.uploader.destroy(
          existingResume.publicId,
          {
            resource_type: "raw",
          }
        );
      } catch (error) {
        console.error(
          "Failed to delete old Cloudinary resume:",
          error
        );
      }

      existingResume.name = file.name;
      existingResume.url = uploadResult.secure_url;
      existingResume.publicId = uploadResult.public_id;
      existingResume.size = file.size;
      existingResume.uploadedAt = new Date();

      await existingResume.save();

      return NextResponse.json({
        message: "Resume replaced successfully.",
        resume: existingResume,
      });
    }

    const resume = await Resume.create({
      name: file.name,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      size: file.size,
      uploadedAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "Resume uploaded successfully.",
        resume,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST resume error:", error);

    return NextResponse.json(
      { error: "Failed to upload resume." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const resume = await Resume.findOne();

    if (!resume) {
      return NextResponse.json(
        { error: "No resume found." },
        { status: 404 }
      );
    }

    if (resume.publicId) {
      try {
        await cloudinary.uploader.destroy(
          resume.publicId,
          {
            resource_type: "raw",
          }
        );
      } catch (error) {
        console.error(
          "Cloudinary delete error:",
          error
        );
      }
    }

    await Resume.deleteOne({
      _id: resume._id,
    });

    return NextResponse.json({
      message: "Resume deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE resume error:", error);

    return NextResponse.json(
      { error: "Failed to delete resume." },
      { status: 500 }
    );
  }
}