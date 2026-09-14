import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import TechLogo from "@/components/ui/tech-logo";

import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/models/Project";

type ProjectsSectionProps = {
  standalone?: boolean;
};

type PublicProject = {
  _id?: string;

  slug: string;
  title: string;
  description: string;

  impact?: string;

  highlights: string[];

  stack: string[];

  image?: {
    src?: string;
    alt?: string;
  };

  liveDemo?: string;
  github?: string;

  featured?: boolean;
  status?: "draft" | "published";
  order?: number;
};

async function getPublicProjects(): Promise<PublicProject[]> {
  try {
    await connectToDatabase();

    const projects = await Project.find({
      status: "published",
    })
      .sort({
        featured: -1,
        order: 1,
        createdAt: -1,
      })
      .lean();

    return projects.map((project) => ({
      _id: project._id?.toString(),

      slug: project.slug,

      title: project.title,

      description: project.description || "",

      impact: project.impact || "",

      highlights: Array.isArray(project.highlights)
        ? project.highlights
        : [],

      stack: Array.isArray(project.stack)
        ? project.stack
        : [],

      image: {
        src: project.image?.src || "",
        alt: project.image?.alt || project.title,
      },

      liveDemo: project.liveDemo || "",

      github: project.github || "",

      featured: Boolean(project.featured),

      status:
        project.status === "published"
          ? "published"
          : "draft",

      order:
        typeof project.order === "number"
          ? project.order
          : 0,
    }));
  } catch (error) {
    console.error(
      "Failed to load public projects:",
      error
    );

    return [];
  }
}

export default async function ProjectsSection({
  standalone = false,
}: ProjectsSectionProps) {
  const projects = await getPublicProjects();

  /*
   * IMPORTANT
   *
   * Featured project comes from MongoDB.
   *
   * The admin panel controls `featured`.
   *
   * We NEVER use projects[0] here.
   */

  const featuredProject =
    projects.find(
      (project) => project.featured
    ) || projects[0];

  const remainingProjects = featuredProject
    ? projects.filter(
        (project) =>
          project.slug !== featuredProject.slug
      )
    : [];

  return (
    <section
      id={standalone ? undefined : "projects"}
      className="relative overflow-hidden bg-[#080808] py-20 sm:py-28 lg:py-32"
    >
      {/* Background glow */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-40 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.045] blur-[120px] sm:h-[500px] sm:w-[500px] sm:blur-[140px]"
      />

      <Container>
        <div className="relative">
          {/* SECTION HEADER */}

          <Reveal>
            <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-orange-500 sm:w-10" />

                  <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-orange-400 sm:text-xs sm:tracking-[0.3em]">
                    Selected work
                  </p>
                </div>

                <h2 className="mt-5 text-[clamp(3.25rem,14vw,7rem)] font-black leading-[0.82] tracking-[-0.07em] text-white">
                  PROJECTS
                  <span className="text-orange-500">
                    .
                  </span>
                </h2>
              </div>

              <p className="max-w-md text-sm leading-7 text-white/40 lg:pb-2">
                A selection of products and systems
                I&apos;ve designed, built, deployed,
                and iterated in the real world.
              </p>
            </div>
          </Reveal>

          {/* FEATURED PROJECT */}

          {featuredProject && (
            <Reveal className="mt-10 sm:mt-12">
              <FeaturedProject
                project={featuredProject}
              />
            </Reveal>
          )}

          {/* OTHER PROJECTS */}

          {remainingProjects.length > 0 && (
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {remainingProjects.map(
                (project, index) => (
                  <Reveal
                    key={project.slug}
                    className={`[transition-delay:${index * 100}ms]`}
                  >
                    <ProjectCard
                      project={project}
                      index={index + 2}
                    />
                  </Reveal>
                )
              )}
            </div>
          )}

          {/* VIEW ALL */}

          {standalone && (
            <Reveal>
              <div className="mt-10 flex justify-center">
                <Link
                  href="/#projects"
                  className="group inline-flex items-center gap-3 rounded-full border border-white/[0.1] bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/70 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-400"
                >
                  Back to portfolio

                  <span className="transition-transform duration-300 group-hover:-translate-x-1">
                    ←
                  </span>
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}

/* ==================================================
   FEATURED PROJECT
   ================================================== */

function FeaturedProject({
  project,
}: {
  project: PublicProject;
}) {
  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-white/[0.09] bg-[#101010] sm:rounded-[2rem]">
      {/* ==================================================
          IMAGE
          ================================================== */}

      <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:aspect-[2.15/1]">
        {project.image?.src ? (
          <Image
            src={project.image.src}
            alt={
              project.image.alt ||
              project.title
            }
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
            className="object-cover object-top transition duration-700 ease-out group-hover:scale-[1.035]"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-white/[0.03]" />
        )}

        {/* IMAGE OVERLAYS */}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        {/* PROJECT LABEL */}

        <div className="absolute left-4 top-4 rounded-full border border-white/[0.12] bg-black/55 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-orange-300 backdrop-blur-xl sm:left-7 sm:top-7 sm:px-3.5 sm:py-2 sm:text-[10px] sm:tracking-[0.2em]">
          Featured project
        </div>

        {/* PROJECT NUMBER */}

        <div className="absolute right-4 top-4 font-mono text-[10px] text-white/30 sm:right-7 sm:top-7 sm:text-xs">
          01
        </div>

        {/* ==================================================
            DESKTOP OVERLAY CONTENT
            ================================================== */}

        <div className="absolute inset-x-6 bottom-6 hidden max-w-2xl lg:block xl:inset-x-8 xl:bottom-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-orange-400">
            Live build
          </p>

          <h3 className="mt-2 text-4xl font-bold tracking-[-0.035em] text-white xl:text-5xl">
            {project.title}
          </h3>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
            {project.description}
          </p>

          {/* TECH */}

          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack
              .slice(0, 5)
              .map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-black/40 px-3 py-1.5 text-[11px] text-white/65 backdrop-blur-md"
                >
                  <TechLogo
                    name={item}
                    compact
                  />

                  {item}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* ==================================================
          MOBILE CONTENT
          ================================================== */}

      <div className="block p-5 sm:p-6 lg:hidden">
        <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-orange-400">
          Live build
        </p>

        <h3 className="mt-2 text-2xl font-bold leading-tight tracking-[-0.035em] text-white sm:text-3xl">
          {project.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-white/50 sm:text-[15px]">
          {project.description}
        </p>

        {/* MOBILE TECH */}

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack
            .slice(0, 5)
            .map((item) => (
              <span
                key={item}
                className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.025] px-3 py-1.5 text-[11px] text-white/55"
              >
                <TechLogo
                  name={item}
                  compact
                />

                <span className="truncate">
                  {item}
                </span>
              </span>
            ))}
        </div>
      </div>

      {/* ==================================================
          FEATURED FOOTER
          ================================================== */}

      <div className="flex flex-col gap-5 border-t border-white/[0.07] p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        {/* HIGHLIGHTS */}

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          {project.highlights
            .slice(0, 2)
            .map((highlight) => (
              <span
                key={highlight}
                className="rounded-lg bg-white/[0.035] px-3 py-2 text-xs leading-5 text-white/40"
              >
                {highlight}
              </span>
            ))}
        </div>

        {/* ACTIONS */}

        <div className="flex w-full flex-wrap gap-2 sm:w-auto">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-white/[0.1] px-4 py-2.5 text-xs font-medium text-white/70 transition hover:border-orange-500/30 hover:text-orange-400 sm:flex-none"
          >
            Case study

            <span>↗</span>
          </Link>

          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-orange-500 px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-orange-400 sm:flex-none"
            >
              Live demo

              <span>↗</span>
            </a>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-white/[0.1] px-4 py-2.5 text-xs font-medium text-white/60 transition hover:border-white/[0.2] hover:text-white sm:flex-none"
            >
              GitHub

              <span>↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/* ==================================================
   NORMAL PROJECT CARD
   ================================================== */

function ProjectCard({
  project,
  index,
}: {
  project: PublicProject;
  index: number;
}) {
  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[#101010] transition duration-500 hover:-translate-y-1 hover:border-white/[0.14] hover:shadow-2xl hover:shadow-black/30 sm:rounded-[1.75rem]">
      {/* IMAGE */}

      <div className="relative aspect-[16/10] overflow-hidden bg-[#151515] sm:aspect-[16/9]">
        {project.image?.src ? (
          <Image
            src={project.image.src}
            alt={
              project.image.alt ||
              project.title
            }
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/20">
            No preview
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

        <span className="absolute left-4 top-4 rounded-full border border-white/[0.1] bg-black/55 px-3 py-1.5 font-mono text-[10px] text-white/45 backdrop-blur-xl sm:left-5 sm:top-5">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      {/* CONTENT */}

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.22em] text-orange-400">
              Project
            </p>

            <h3 className="mt-2 text-xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-2xl">
              {project.title}
            </h3>
          </div>

          <span className="shrink-0 text-orange-400">
            ↗
          </span>
        </div>

        <p className="mt-4 line-clamp-3 text-sm leading-6 text-white/40">
          {project.description}
        </p>

        {/* STACK */}

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack
            .slice(0, 4)
            .map((item) => (
              <span
                key={item}
                className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.025] px-2.5 py-1.5 text-[11px] text-white/45"
              >
                <TechLogo
                  name={item}
                  compact
                />

                <span className="truncate">
                  {item}
                </span>
              </span>
            ))}
        </div>

        {/* ACTIONS */}

        <div className="mt-6 flex flex-col gap-3 border-t border-white/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex min-h-10 items-center text-xs font-medium text-white/55 transition hover:text-orange-400"
          >
            View case study →
          </Link>

          <div className="flex flex-wrap gap-2">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 items-center justify-center rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-xs font-medium text-orange-400 transition hover:border-orange-500/40 hover:bg-orange-500/15"
              >
                Live demo ↗
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/[0.08] px-4 py-2 text-xs text-white/40 transition hover:border-white/[0.16] hover:text-white"
              >
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}