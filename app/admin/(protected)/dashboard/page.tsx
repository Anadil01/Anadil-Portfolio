import Link from "next/link";

import { connectToDatabase } from "@/lib/mongodb";

import Project from "@/models/Project";
import Skill from "@/models/Skill";
import Experience from "@/models/Experience";
import Education from "@/models/Education";
import Resume from "@/models/Resume";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let projectCount = 0;
  let publishedProjectCount = 0;
  let draftProjectCount = 0;

  let skillCount = 0;
  let experienceCount = 0;
  let educationCount = 0;
  let resumeExists = false;

  let recentProjects: {
    _id: string;
    title: string;
    status: "draft" | "published";
    featured: boolean;
    stack: string[];
  }[] = [];

  let databaseConnected = false;

  try {
    await connectToDatabase();

    databaseConnected = true;

    const [
      totalProjects,
      publishedProjects,
      draftProjects,
      totalSkills,
      totalExperience,
      totalEducation,
      latestResume,
      projects,
    ] = await Promise.all([
      Project.countDocuments(),

      Project.countDocuments({
        status: "published",
      }),

      Project.countDocuments({
        status: "draft",
      }),

      Skill.countDocuments(),

      Experience.countDocuments(),

      Education.countDocuments(),

      Resume.findOne()
        .sort({
          uploadedAt: -1,
        })
        .lean(),

      Project.find()
        .sort({
          order: 1,
          createdAt: -1,
        })
        .limit(5)
        .lean(),
    ]);

    projectCount = totalProjects;
    publishedProjectCount = publishedProjects;
    draftProjectCount = draftProjects;

    skillCount = totalSkills;
    experienceCount = totalExperience;
    educationCount = totalEducation;

    resumeExists = Boolean(latestResume);

    recentProjects = projects.map((project) => ({
      _id: project._id.toString(),
      title: project.title,
      status: project.status,
      featured: project.featured,
      stack: project.stack || [],
    }));
  } catch (error) {
    console.error(
      "Admin dashboard database error:",
      error
    );
  }

  const stats = [
    {
      label: "Projects",
      value: projectCount,
      description: `${publishedProjectCount} published · ${draftProjectCount} drafts`,
      href: "/admin/projects",
      icon: "projects" as const,
    },
    {
      label: "Skills",
      value: skillCount,
      description: "Technical skills in your portfolio",
      href: "/admin/skills",
      icon: "skills" as const,
    },
    {
      label: "Experience",
      value: experienceCount,
      description: "Professional experience entries",
      href: "/admin/experience",
      icon: "experience" as const,
    },
    {
      label: "Education",
      value: educationCount,
      description: "Education entries",
      href: "/admin/education",
      icon: "education" as const,
    },
  ];

  return (
    <div className="min-h-screen pb-16">
      {/* ==================================================
          HEADER
          ================================================== */}

      <header className="mb-10">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-orange-500 shadow-lg shadow-orange-500/40" />

              <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
                Portfolio CMS
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-[-0.05em] text-white sm:text-5xl">
              Dashboard
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-500">
              Manage your portfolio, projects, skills and
              professional information from one place.
            </p>
          </div>

          <Link
            href="/"
            target="_blank"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-zinc-400 transition hover:border-orange-500/30 hover:bg-orange-500/5 hover:text-white"
          >
            View live portfolio

            <span className="text-orange-500">
              ↗
            </span>
          </Link>
        </div>
      </header>

      {/* ==================================================
          DATABASE STATUS
          ================================================== */}

      <section className="mb-6">
        <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-[#111111] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                databaseConnected
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {databaseConnected ? (
                <CheckIcon />
              ) : (
                <WarningIcon />
              )}
            </div>

            <div>
              <p className="text-sm font-semibold text-zinc-200">
                Database
              </p>

              <p className="mt-0.5 text-xs text-zinc-600">
                {databaseConnected
                  ? "MongoDB Atlas connection is active."
                  : "Unable to connect to MongoDB."}
              </p>
            </div>
          </div>

          <div
            className={`flex items-center gap-2 text-xs font-semibold ${
              databaseConnected
                ? "text-emerald-400"
                : "text-red-400"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                databaseConnected
                  ? "bg-emerald-400"
                  : "bg-red-400"
              }`}
            />

            {databaseConnected
              ? "Connected"
              : "Connection error"}
          </div>
        </div>
      </section>

      {/* ==================================================
          STATS
          ================================================== */}

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-700">
              Overview
            </p>

            <h2 className="mt-1 text-lg font-semibold text-white">
              Portfolio content
            </h2>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111111] p-6 transition duration-300 hover:-translate-y-0.5 hover:border-orange-500/30 hover:bg-[#141414]"
            >
              {/* Background glow */}

              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-orange-500/[0.05] blur-2xl transition duration-300 group-hover:bg-orange-500/[0.1]" />

              <div className="relative">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-zinc-500 transition group-hover:border-orange-500/20 group-hover:bg-orange-500/10 group-hover:text-orange-500">
                    <DashboardIcon
                      name={stat.icon}
                    />
                  </div>

                  <span className="text-zinc-700 transition group-hover:text-orange-500">
                    ↗
                  </span>
                </div>

                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600">
                  {stat.label}
                </p>

                <p className="mt-2 text-4xl font-bold tracking-[-0.04em] text-white">
                  {stat.value}
                </p>

                <p className="mt-3 text-xs leading-5 text-zinc-600">
                  {stat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ==================================================
          MAIN GRID
          ================================================== */}

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        {/* ==================================================
            RECENT PROJECTS
            ================================================== */}

        <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111111]">
          <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-700">
                Content
              </p>

              <h2 className="mt-1 text-lg font-semibold text-white">
                Recent projects
              </h2>
            </div>

            <Link
              href="/admin/projects"
              className="text-xs font-medium text-zinc-600 transition hover:text-orange-500"
            >
              View all →
            </Link>
          </div>

          {recentProjects.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.03] text-zinc-700">
                <DashboardIcon name="projects" />
              </div>

              <p className="mt-4 text-sm font-medium text-zinc-400">
                No projects yet
              </p>

              <p className="mt-1 text-xs text-zinc-700">
                Add your first project to get started.
              </p>

              <Link
                href="/admin/projects/new"
                className="mt-5 inline-flex rounded-xl bg-orange-500 px-4 py-2.5 text-xs font-bold text-black transition hover:bg-orange-400"
              >
                Add project
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.06]">
              {recentProjects.map(
                (project, index) => (
                  <Link
                    key={project._id}
                    href={`/admin/projects/${project._id}/edit`}
                    className="group flex items-center gap-4 px-6 py-4 transition hover:bg-white/[0.025]"
                  >
                    {/* Number */}

                    <span className="w-6 shrink-0 font-mono text-xs text-zinc-700">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    {/* Project icon */}

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-black text-zinc-600 transition group-hover:border-orange-500/20 group-hover:text-orange-500">
                      <DashboardIcon name="projects" />
                    </div>

                    {/* Content */}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate text-sm font-medium text-zinc-200 transition group-hover:text-white">
                          {project.title}
                        </p>

                        {project.featured && (
                          <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-orange-500">
                            Featured
                          </span>
                        )}
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {project.stack
                          .slice(0, 4)
                          .map((technology) => (
                            <span
                              key={technology}
                              className="rounded-md bg-white/[0.035] px-2 py-1 text-[9px] text-zinc-600"
                            >
                              {technology}
                            </span>
                          ))}
                      </div>
                    </div>

                    {/* Status */}

                    <div className="hidden shrink-0 sm:block">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide ${
                          project.status ===
                          "published"
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                            : "border-amber-500/20 bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    {/* Arrow */}

                    <span className="text-zinc-700 transition group-hover:translate-x-0.5 group-hover:text-orange-500">
                      →
                    </span>
                  </Link>
                )
              )}
            </div>
          )}
        </section>

        {/* ==================================================
            QUICK ACTIONS
            ================================================== */}

        <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111111]">
          <div className="border-b border-white/[0.08] px-6 py-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-700">
              Shortcuts
            </p>

            <h2 className="mt-1 text-lg font-semibold text-white">
              Quick actions
            </h2>
          </div>

          <div className="space-y-1 p-3">
            <QuickAction
              href="/admin/projects/new"
              title="New project"
              description="Add a portfolio project"
              icon="plus"
            />

            <QuickAction
              href="/admin/profile"
              title="Edit profile"
              description="Update your identity and bio"
              icon="profile"
            />

            <QuickAction
              href="/admin/skills"
              title="Manage skills"
              description="Update your technology stack"
              icon="skills"
            />

            <QuickAction
              href="/admin/resume"
              title="Manage resume"
              description={
                resumeExists
                  ? "Resume is currently uploaded"
                  : "Upload your resume"
              }
              icon="resume"
            />
          </div>
        </section>
      </div>

      {/* ==================================================
          PUBLISHING SUMMARY
          ================================================== */}

      <section className="mt-6 rounded-2xl border border-white/[0.08] bg-[#111111]">
        <div className="flex flex-col gap-6 p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                >
                  <path
                    d="M5 12.5L9.2 16.5L19 7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Publishing overview
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  Keep your public portfolio content
                  up to date.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <SummaryItem
              label="Published"
              value={publishedProjectCount}
              type="published"
            />

            <SummaryItem
              label="Drafts"
              value={draftProjectCount}
              type="draft"
            />

            <SummaryItem
              label="Resume"
              value={resumeExists ? 1 : 0}
              type="resume"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// ==========================================================
// QUICK ACTION
// ==========================================================

function QuickAction({
  href,
  title,
  description,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: "plus" | "profile" | "skills" | "resume";
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl p-3 transition hover:bg-white/[0.04]"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.035] text-zinc-600 transition group-hover:bg-orange-500/10 group-hover:text-orange-500">
        {icon === "plus" ? (
          <PlusIcon />
        ) : (
          <DashboardIcon
            name={icon}
          />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-zinc-300 transition group-hover:text-white">
          {title}
        </p>

        <p className="mt-0.5 truncate text-[11px] text-zinc-700">
          {description}
        </p>
      </div>

      <span className="text-zinc-800 transition group-hover:translate-x-0.5 group-hover:text-orange-500">
        →
      </span>
    </Link>
  );
}

// ==========================================================
// SUMMARY ITEM
// ==========================================================

function SummaryItem({
  label,
  value,
  type,
}: {
  label: string;
  value: number;
  type: "published" | "draft" | "resume";
}) {
  return (
    <div className="min-w-[100px] rounded-xl border border-white/[0.07] bg-black/30 px-4 py-3">
      <div className="flex items-center gap-2">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            type === "published"
              ? "bg-emerald-400"
              : type === "draft"
                ? "bg-amber-400"
                : "bg-orange-500"
          }`}
        />

        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-600">
          {label}
        </p>
      </div>

      <p className="mt-2 text-xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}

// ==========================================================
// DASHBOARD ICON
// ==========================================================

function DashboardIcon({
  name,
}: {
  name:
    | "projects"
    | "skills"
    | "experience"
    | "education"
    | "resume"
    | "profile";
}) {
  if (name === "projects") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
      >
        <rect
          x="4"
          y="5"
          width="16"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <path
          d="M4 9H20"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <path
          d="M8 7H8.01M11 7H11.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "skills") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
      >
        <path
          d="M12 3L13.9 9.1L20 11L13.9 12.9L12 19L10.1 12.9L4 11L10.1 9.1L12 3Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        <path
          d="M18.5 4L19.1 5.9L21 6.5L19.1 7.1L18.5 9L17.9 7.1L16 6.5L17.9 5.9L18.5 4Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "experience") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
      >
        <rect
          x="4"
          y="7"
          width="16"
          height="12"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <path
          d="M9 7V5.5C9 4.67 9.67 4 10.5 4H13.5C14.33 4 15 4.67 15 5.5V7"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <path
          d="M4 11H20"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <path
          d="M10 13H14"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "education") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
      >
        <path
          d="M3.5 9.5L12 5L20.5 9.5L12 14L3.5 9.5Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />

        <path
          d="M7 12V16C8.4 17.5 10.1 18.25 12 18.25C13.9 18.25 15.6 17.5 17 16V12"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />

        <path
          d="M20.5 10V15"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "resume") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
      >
        <path
          d="M7 4H14L18 8V20H7C5.9 20 5 19.1 5 18V6C5 4.9 5.9 4 7 4Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />

        <path
          d="M14 4V8H18"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <path
          d="M8.5 12H15.5M8.5 15H15.5M8.5 18H12.5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
    >
      <circle
        cx="12"
        cy="8"
        r="3"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M5.5 19C6.2 15.8 8.4 14 12 14C15.6 14 17.8 15.8 18.5 19"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ==========================================================
// PLUS ICON
// ==========================================================

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
    >
      <path
        d="M12 5V19M5 12H19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ==========================================================
// CHECK ICON
// ==========================================================

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
    >
      <path
        d="M5 12.5L9.2 16.5L19 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ==========================================================
// WARNING ICON
// ==========================================================

function WarningIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
    >
      <path
        d="M12 4L21 19H3L12 4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M12 9V13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M12 16H12.01"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}