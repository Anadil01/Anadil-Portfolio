"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Project = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  stack: string[];
  featured: boolean;
  status: "draft" | "published";
  order: number;

  image?: {
    src: string;
    alt: string;
  };
};

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProjects() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/admin/projects"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load projects"
        );
      }

      setProjects(data.projects);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load projects"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function deleteProject(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/admin/projects/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete project"
        );
      }

      setProjects((current) =>
        current.filter(
          (project) => project._id !== id
        )
      );
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete project"
      );
    }
  }

  if (loading) {
    return (
      <div className="p-6 md:p-10">
        <p className="text-sm text-white/40">
          Loading projects...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}

      <header className="border-b border-white/10 px-6 py-6 md:px-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-orange-500">
              Admin
            </p>

            <h1 className="mt-2 text-3xl font-bold md:text-4xl">
              Projects
            </h1>

            <p className="mt-2 text-sm text-white/40">
              Manage your portfolio projects.
            </p>
          </div>

          <Link
            href="/admin/projects/new"
            className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-orange-400"
          >
            + New project
          </Link>
        </div>
      </header>

      <div className="px-6 py-8 md:px-10">
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {projects.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <h2 className="text-lg font-semibold">
              No projects yet
            </h2>

            <p className="mt-2 text-sm text-white/40">
              Create your first portfolio project.
            </p>

            <Link
              href="/admin/projects/new"
              className="mt-6 inline-flex rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-black"
            >
              Create project
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <article
                key={project._id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <div className="flex flex-col gap-5 p-5 md:flex-row md:items-center md:p-6">
                  {/* Image */}

                  <div className="h-32 w-full shrink-0 overflow-hidden rounded-xl bg-white/5 md:h-24 md:w-40">
                    {project.image?.src ? (
                      <img
                        src={project.image.src}
                        alt={
                          project.image.alt ||
                          project.title
                        }
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-white/20">
                        No image
                      </div>
                    )}
                  </div>

                  {/* Info */}

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold">
                        {project.title}
                      </h2>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs ${
                          project.status === "published"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-yellow-500/10 text-yellow-400"
                        }`}
                      >
                        {project.status}
                      </span>

                      {project.featured && (
                        <span className="rounded-full bg-orange-500/10 px-2.5 py-1 text-xs text-orange-400">
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm text-white/40">
                      {project.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.stack
                        .slice(0, 5)
                        .map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md bg-white/5 px-2 py-1 text-xs text-white/50"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                  </div>

                  {/* Actions */}

                  <div className="flex shrink-0 gap-2">
                    <Link
                      href={`/admin/projects/${project._id}/edit`}
                      className="rounded-xl border border-white/10 px-4 py-2 text-sm transition hover:bg-white/5"
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        deleteProject(project._id)
                      }
                      className="rounded-xl border border-red-500/20 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}