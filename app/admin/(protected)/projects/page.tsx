"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Project = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  stack: string[];
  featured: boolean;
  status: "draft" | "published" | "archived";
  order: number;

  image?: {
    src: string;
    alt: string;
  };

  liveDemo?: string;
  github?: string;
};

type Filter = "all" | "published" | "draft" | "featured";

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

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
          data.message ||
            data.error ||
            "Failed to load projects."
        );
      }

      setProjects(data.projects || []);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load projects."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function deleteProject(id: string) {
    const project = projects.find(
      (item) => item._id === id
    );

    const confirmed = window.confirm(
      `Delete "${project?.title || "this project"}"?\n\nThis action cannot be undone.`
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
          data.message ||
            data.error ||
            "Failed to delete project."
        );
      }

      setProjects((current) =>
        current.filter(
          (item) => item._id !== id
        )
      );
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete project."
      );
    }
  }

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects
      .filter((project) => {
        if (!query) {
          return true;
        }

        return (
          project.title
            .toLowerCase()
            .includes(query) ||
          project.description
            .toLowerCase()
            .includes(query) ||
          project.slug
            .toLowerCase()
            .includes(query) ||
          project.stack.some((tech) =>
            tech.toLowerCase().includes(query)
          )
        );
      })
      .filter((project) => {
        if (filter === "all") {
          return true;
        }

        if (filter === "featured") {
          return project.featured;
        }

        return project.status === filter;
      });
  }, [projects, search, filter]);

  const publishedCount = projects.filter(
    (project) =>
      project.status === "published"
  ).length;

  const draftCount = projects.filter(
    (project) =>
      project.status === "draft"
  ).length;

  const featuredCount = projects.filter(
    (project) => project.featured
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="border-b border-white/[0.08] px-6 py-6 md:px-10">
          <div className="h-3 w-16 animate-pulse rounded bg-white/10" />

          <div className="mt-4 h-10 w-48 animate-pulse rounded bg-white/10" />

          <div className="mt-3 h-4 w-72 animate-pulse rounded bg-white/5" />
        </div>

        <div className="space-y-4 px-6 py-8 md:px-10">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-40 animate-pulse rounded-2xl border border-white/[0.06] bg-white/[0.02]"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-10">
      {/* HEADER */}

      <header className="border-b border-white/[0.08] px-6 py-6 md:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-orange-500">
              Portfolio CMS
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Projects
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">
              Create, edit and manage the projects displayed
              on your portfolio.
            </p>
          </div>

          <Link
            href="/admin/projects/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-orange-400"
          >
            <span className="text-lg leading-none">
              +
            </span>

            New project
          </Link>
        </div>
      </header>

      <main className="px-6 py-8 md:px-10">
        {/* ERROR */}

        {error && (
          <div className="mb-6 flex flex-col gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-red-400">
              {error}
            </p>

            <button
              type="button"
              onClick={loadProjects}
              className="self-start rounded-lg border border-red-500/20 px-3 py-2 text-xs text-red-300 transition hover:bg-red-500/10 sm:self-auto"
            >
              Try again
            </button>
          </div>
        )}

        {/* STATS */}

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total projects"
            value={projects.length}
            active={filter === "all"}
            onClick={() => setFilter("all")}
          />

          <StatCard
            label="Published"
            value={publishedCount}
            active={filter === "published"}
            onClick={() => setFilter("published")}
          />

          <StatCard
            label="Drafts"
            value={draftCount}
            active={filter === "draft"}
            onClick={() => setFilter("draft")}
          />

          <StatCard
            label="Featured"
            value={featuredCount}
            active={filter === "featured"}
            onClick={() => setFilter("featured")}
          />
        </div>

        {/* SEARCH / FILTER */}

        <div className="mt-8 flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
              />

              <path d="m20 20-4-4" />
            </svg>

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search projects, technologies..."
              className="w-full rounded-xl border border-white/[0.08] bg-[#111111] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-orange-500/50"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto">
            <FilterButton
              label="All"
              active={filter === "all"}
              onClick={() => setFilter("all")}
            />

            <FilterButton
              label="Published"
              active={filter === "published"}
              onClick={() =>
                setFilter("published")
              }
            />

            <FilterButton
              label="Drafts"
              active={filter === "draft"}
              onClick={() =>
                setFilter("draft")
              }
            />

            <FilterButton
              label="Featured"
              active={filter === "featured"}
              onClick={() =>
                setFilter("featured")
              }
            />
          </div>
        </div>

        {/* RESULT COUNT */}

        <div className="mt-6 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-white/25">
            {filteredProjects.length}{" "}
            {filteredProjects.length === 1
              ? "project"
              : "projects"}
          </p>

          {(search || filter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFilter("all");
              }}
              className="text-xs text-orange-400 transition hover:text-orange-300"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* PROJECTS */}

        {filteredProjects.length === 0 ? (
          <EmptyState
            hasFilters={
              Boolean(search) ||
              filter !== "all"
            }
            onClear={() => {
              setSearch("");
              setFilter("all");
            }}
          />
        ) : (
          <div className="mt-4 space-y-4">
            {filteredProjects.map(
              (project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  onDelete={deleteProject}
                />
              )
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  active,
  onClick,
}: {
  label: string;
  value: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border p-5 text-left transition ${
        active
          ? "border-orange-500/25 bg-orange-500/[0.06]"
          : "border-white/[0.08] bg-[#111111] hover:border-white/[0.14]"
      }`}
    >
      <p className="text-xs uppercase tracking-[0.18em] text-white/30">
        {label}
      </p>

      <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
        {value}
      </p>
    </button>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap rounded-xl border px-4 py-3 text-sm transition ${
        active
          ? "border-orange-500/30 bg-orange-500/10 text-orange-300"
          : "border-white/[0.08] bg-[#111111] text-white/50 hover:border-white/[0.15] hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

function ProjectCard({
  project,
  onDelete,
}: {
  project: Project;
  onDelete: (id: string) => void;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111111] transition hover:border-white/[0.14]">
      <div className="flex flex-col lg:flex-row">
        {/* IMAGE */}

        <div className="relative h-52 w-full shrink-0 overflow-hidden bg-black sm:h-64 lg:h-auto lg:min-h-[190px] lg:w-72">
          {project.image?.src ? (
            <img
              src={project.image.src}
              alt={
                project.image.alt ||
                project.title
              }
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full min-h-[190px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/20">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                    />

                    <circle
                      cx="8.5"
                      cy="8.5"
                      r="1.5"
                    />

                    <path d="m21 15-5-5L5 21" />
                  </svg>
                </div>

                <p className="mt-3 text-xs text-white/20">
                  No image
                </p>
              </div>
            </div>
          )}

          {project.featured && (
            <div className="absolute left-4 top-4 rounded-full border border-orange-400/20 bg-black/70 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-orange-300 backdrop-blur-md">
              Featured
            </div>
          )}
        </div>

        {/* CONTENT */}

        <div className="min-w-0 flex-1 p-5 lg:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0 flex-1">
              {/* TITLE */}

              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-semibold tracking-tight text-white">
                  {project.title}
                </h2>

                <StatusBadge
                  status={project.status}
                />
              </div>

              <p className="mt-1 text-xs text-white/20">
                /{project.slug}
              </p>

              {/* DESCRIPTION */}

              <p className="mt-4 line-clamp-3 max-w-3xl text-sm leading-6 text-white/45">
                {project.description ||
                  "No project description yet."}
              </p>

              {/* STACK */}

              {project.stack.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack
                    .slice(0, 8)
                    .map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5 text-xs text-white/45"
                      >
                        {tech}
                      </span>
                    ))}

                  {project.stack.length > 8 && (
                    <span className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5 text-xs text-white/25">
                      +{project.stack.length - 8}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* ORDER */}

            <div className="shrink-0 text-left xl:text-right">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">
                Display order
              </p>

              <p className="mt-1 text-sm font-medium text-white/50">
                #{project.order}
              </p>
            </div>
          </div>

          {/* FOOTER */}

          <div className="mt-6 flex flex-col gap-4 border-t border-white/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between">
            {/* LINKS */}

            <div className="flex flex-wrap gap-2">
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-xs text-white/50 transition hover:border-white/15 hover:text-white"
                >
                  Live demo

                  <ArrowUpRight />
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-xs text-white/50 transition hover:border-white/15 hover:text-white"
                >
                  GitHub

                  <ArrowUpRight />
                </a>
              )}
            </div>

            {/* ACTIONS */}

            <div className="flex gap-2">
              <Link
                href={`/admin/projects/${project._id}/edit`}
                className="rounded-lg border border-white/[0.08] px-4 py-2 text-xs font-medium text-white/60 transition hover:border-white/15 hover:bg-white/[0.03] hover:text-white"
              >
                Edit project
              </Link>

              <button
                type="button"
                onClick={() =>
                  onDelete(project._id)
                }
                className="rounded-lg border border-red-500/15 px-4 py-2 text-xs font-medium text-red-400 transition hover:border-red-500/30 hover:bg-red-500/[0.06]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function StatusBadge({
  status,
}: {
  status: Project["status"];
}) {
  if (status === "published") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-emerald-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Published
      </span>
    );
  }

  if (status === "archived") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-white/35">
        <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
        Archived
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-amber-400">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
      Draft
    </span>
  );
}

function EmptyState({
  hasFilters,
  onClear,
}: {
  hasFilters: boolean;
  onClear: () => void;
}) {
  return (
    <div className="mt-4 rounded-2xl border border-dashed border-white/[0.08] bg-[#111111] px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-white/25">
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
          />

          <path d="M7 8h10M7 12h10M7 16h6" />
        </svg>
      </div>

      <h2 className="mt-5 text-lg font-semibold text-white">
        {hasFilters
          ? "No matching projects"
          : "No projects yet"}
      </h2>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/35">
        {hasFilters
          ? "Try a different search term or clear the current filters."
          : "Create your first project and it will appear here."}
      </p>

      {hasFilters ? (
        <button
          type="button"
          onClick={onClear}
          className="mt-6 rounded-xl border border-white/10 px-5 py-3 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
        >
          Clear filters
        </button>
      ) : (
        <Link
          href="/admin/projects/new"
          className="mt-6 inline-flex rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-orange-400"
        >
          Create project
        </Link>
      )}
    </div>
  );
}

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}