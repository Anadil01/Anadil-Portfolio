"use client";

import { ChangeEvent, useEffect, useState } from "react";

type Resume = {
  _id: string;
  name: string;
  url: string;
  size: number;
  uploadedAt: string;
};

export default function ResumePage() {
  const [resume, setResume] = useState<Resume | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  async function loadResume() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/admin/resume"
      );

      if (!response.ok) {
        throw new Error("Failed to load resume");
      }

      const data = await response.json();

      setResume(data);
    } catch (error) {
      console.error(error);

      setMessage("Failed to load resume.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadResume();
  }, []);

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile =
      event.target.files?.[0] || null;

    setFile(selectedFile);
    setMessage("");

    if (!selectedFile) {
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      setMessage("Only PDF files are allowed.");
      setFile(null);
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setMessage(
        "Resume must be smaller than 10MB."
      );
      setFile(null);
    }
  }

  async function uploadResume() {
    if (!file) {
      setMessage("Please select a PDF first.");
      return;
    }

    try {
      setUploading(true);
      setMessage("");

      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch(
        "/api/admin/resume",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Upload failed."
        );
      }

      setMessage(
        data.message ||
          "Resume uploaded successfully."
      );

      setFile(null);

      const input =
        document.getElementById(
          "resume-upload"
        ) as HTMLInputElement | null;

      if (input) {
        input.value = "";
      }

      await loadResume();
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to upload resume."
      );
    } finally {
      setUploading(false);
    }
  }

  async function deleteResume() {
    const confirmed = window.confirm(
      "Are you sure you want to delete your resume?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setMessage("");

      const response = await fetch(
        "/api/admin/resume",
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to delete resume."
        );
      }

      setResume(null);

      setMessage(
        "Resume deleted successfully."
      );
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to delete resume."
      );
    }
  }

  function formatFileSize(bytes: number) {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-zinc-400">
          Loading resume...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Resume
        </h1>

        <p className="mt-2 text-zinc-400">
          Upload and manage the resume displayed on
          your portfolio.
        </p>
      </div>

      {message && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-300">
          {message}
        </div>
      )}

      {/* Current Resume */}
      <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="text-xl font-semibold text-white">
          Current Resume
        </h2>

        {resume ? (
          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-white">
                  {resume.name}
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                  {formatFileSize(resume.size)}
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  Uploaded{" "}
                  {new Date(
                    resume.uploadedAt
                  ).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-2">
                <a
                  href={resume.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-zinc-500 hover:text-white"
                >
                  View PDF
                </a>

                <button
                  type="button"
                  onClick={deleteResume}
                  className="rounded-lg border border-red-900/60 px-4 py-2 text-sm text-red-400 transition hover:border-red-700 hover:bg-red-950/30"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed border-zinc-800 p-8 text-center">
            <p className="text-zinc-500">
              No resume uploaded yet.
            </p>
          </div>
        )}
      </section>

      {/* Upload */}
      <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="text-xl font-semibold text-white">
          {resume
            ? "Replace Resume"
            : "Upload Resume"}
        </h2>

        <p className="mt-2 text-sm text-zinc-500">
          PDF only · Maximum file size: 10MB
        </p>

        <div className="mt-6">
          <label
            htmlFor="resume-upload"
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-zinc-900 px-6 py-12 text-center transition hover:border-orange-500"
          >
            <div className="text-4xl">
              📄
            </div>

            <p className="mt-4 font-medium text-white">
              Choose resume PDF
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Click here to select a file
            </p>

            {file && (
              <p className="mt-4 text-sm text-orange-400">
                Selected: {file.name}
              </p>
            )}
          </label>

          <input
            id="resume-upload"
            type="file"
            accept="application/pdf,.pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <button
          type="button"
          onClick={uploadResume}
          disabled={!file || uploading}
          className="mt-5 w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {uploading
            ? "Uploading..."
            : resume
              ? "Replace Resume"
              : "Upload Resume"}
        </button>
      </section>

      {/* Info */}
      <section className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6">
        <h2 className="font-semibold text-orange-400">
          How this works
        </h2>

        <ul className="mt-4 space-y-2 text-sm leading-6 text-zinc-400">
          <li>
            • Your PDF is uploaded to Cloudinary.
          </li>

          <li>
            • Only the resume URL and metadata are
            stored in MongoDB.
          </li>

          <li>
            • Uploading a replacement removes the
            previous Cloudinary file.
          </li>

          <li>
            • The public portfolio can use the latest
            resume automatically.
          </li>
        </ul>
      </section>
    </div>
  );
}