import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/mongodb";
import Resume from "@/models/Resume";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const resume = await Resume.findOne()
      .sort({ uploadedAt: -1 })
      .lean();

    if (!resume) {
      return NextResponse.json(
        {
          error: "No resume has been uploaded yet.",
        },
        { status: 404 }
      );
    }

    const requestUrl = new URL(request.url);
    const shouldDownload =
      requestUrl.searchParams.get("download") === "true";

    const response = await fetch(resume.url);

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Unable to fetch the uploaded resume.",
        },
        { status: 502 }
      );
    }

    const pdf = await response.arrayBuffer();

    const safeFileName = resume.name.replace(/"/g, "");

    const disposition = shouldDownload
      ? `attachment; filename="${safeFileName}"`
      : `inline; filename="${safeFileName}"`;

    return new NextResponse(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": String(pdf.byteLength),
        "Cache-Control": "no-store",
        "Content-Disposition": disposition,
      },
    });
  } catch (error) {
    console.error("Public resume API error:", error);

    return NextResponse.json(
      {
        error: "Failed to load resume.",
      },
      { status: 500 }
    );
  }
}