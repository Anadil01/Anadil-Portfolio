import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import TechLogo from "@/components/ui/tech-logo";
import { portfolio } from "@/data/portfolio";

type ProjectsSectionProps = {
  standalone?: boolean;
};

export default function ProjectsSection({
  standalone = false,
}: ProjectsSectionProps) {
  const projects = portfolio.projects;

  const featuredProject = projects[0];

  const remainingProjects = projects.slice(1);

  return (
    <section
      id={standalone ? undefined : "projects"}
      className="relative overflow-hidden bg-[#080808] py-24 sm:py-32"
    >
      {/* Background glow */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange-500/[0.045] blur-[140px]"
      />

      <Container>
        <div className="relative">
          {/* SECTION HEADER */}

          <Reveal>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-orange-500" />

                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-orange-400">
                    Selected work
                  </p>
                </div>

                <h2 className="mt-5 max-w-4xl text-[clamp(3rem,7vw,7rem)] font-black leading-[0.85] tracking-[-0.06em] text-white">
                  PROJECTS
                  <span className="text-orange-500">.</span>
                </h2>
              </div>

              <p className="max-w-md text-sm leading-7 text-white/40 lg:pb-2">
                A selection of products and systems I&apos;ve
                designed, built, deployed, and iterated in the
                real world.
              </p>
            </div>
          </Reveal>

          {/* FEATURED PROJECT */}

          {featuredProject && (
            <Reveal className="mt-12">
              <FeaturedProject project={featuredProject} />
            </Reveal>
          )}

          {/* OTHER PROJECTS */}

          {remainingProjects.length > 0 && (
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {remainingProjects.map((project, index) => (
                <Reveal
                  key={project.slug}
                  className={`[transition-delay:${index * 100}ms]`}
                >
                  <ProjectCard
                    project={project}
                    index={index + 2}
                  />
                </Reveal>
              ))}
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

function FeaturedProject({
  project,
}: {
  project: (typeof portfolio.projects)[number];
}) {
  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#101010]">
      {/* IMAGE */}

      <div className="relative aspect-[16/9] overflow-hidden sm:aspect-[2/1] lg:aspect-[2.15/1]">
        {project.image?.src ? (
          <Image
            src={project.image.src}
            alt={project.image.alt || project.title}
            fill
            sizes="(max-width: 640px) 100vw, 90vw"
            className="object-cover object-top transition duration-700 ease-out group-hover:scale-[1.035]"
          />
        ) : (
          <div className="absolute inset-0 bg-white/[0.03]" />
        )}

        {/* Image overlays */}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />

        {/* PROJECT LABEL */}

        <div className="absolute left-5 top-5 rounded-full border border-white/[0.12] bg-black/55 px-3.5 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-orange-300 backdrop-blur-xl sm:left-7 sm:top-7">
          Featured project
        </div>

        {/* PROJECT NUMBER */}

        <div className="absolute right-5 top-5 font-mono text-xs text-white/30 sm:right-7 sm:top-7">
          01
        </div>

        {/* CONTENT OVER IMAGE */}

        <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7 lg:max-w-2xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-orange-400">
            Live build
          </p>

          <h3 className="mt-2 text-3xl font-bold tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
            {project.title}
          </h3>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/55">
            {project.description}
          </p>

          {/* TECH */}

          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.slice(0, 5).map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-black/40 px-3 py-1.5 text-[11px] text-white/60 backdrop-blur-md"
              >
                <TechLogo name={item} compact />

                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURED FOOTER */}

      <div className="flex flex-col gap-4 border-t border-white/[0.07] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex flex-wrap gap-2">
          {project.highlights.slice(0, 2).map((highlight) => (
            <span
              key={highlight}
              className="rounded-lg bg-white/[0.035] px-3 py-2 text-xs text-white/40"
            >
              {highlight}
            </span>
          ))}
        </div>

        <div className="flex shrink-0 gap-2">
          <Link
            href={`/projects/${project.slug}`}
            className="group/link inline-flex items-center gap-2 rounded-full border border-white/[0.1] px-4 py-2.5 text-xs font-medium text-white/65 transition hover:border-orange-500/30 hover:text-orange-400"
          >
            Case study

            <span className="transition-transform group-hover/link:translate-x-0.5">
              ↗
            </span>
          </Link>

          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-orange-400"
            >
              Live demo

              <span>↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof portfolio.projects)[number];
  index: number;
}) {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#101010] transition duration-500 hover:-translate-y-1 hover:border-white/[0.14] hover:shadow-2xl hover:shadow-black/30">
      {/* IMAGE */}

      <div className="relative aspect-[16/9] overflow-hidden bg-[#151515]">
        {project.image?.src ? (
          <Image
            src={project.image.src}
            alt={project.image.alt || project.title}
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

        <span className="absolute left-5 top-5 rounded-full border border-white/[0.1] bg-black/55 px-3 py-1.5 font-mono text-[10px] text-white/45 backdrop-blur-xl">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      {/* CONTENT */}

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-orange-400">
              Project
            </p>

            <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-white">
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
          {project.stack.slice(0, 4).map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.025] px-2.5 py-1.5 text-[11px] text-white/45"
            >
              <TechLogo name={item} compact />

              {item}
            </span>
          ))}
        </div>

        {/* ACTIONS */}

        <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-5">
          <Link
            href={`/projects/${project.slug}`}
            className="text-xs font-medium text-white/50 transition hover:text-orange-400"
          >
            View case study →
          </Link>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-white/30 transition hover:text-white"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}