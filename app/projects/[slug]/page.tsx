import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Container from "@/components/ui/container";
import SiteShell from "@/components/layout/site-shell";
import TechLogo from "@/components/ui/tech-logo";

import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/models/Project";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type PublicProject = {
  title: string;
  slug: string;
  description: string;
  impact: string;
  highlights: string[];
  caseStudy: {
    challenge: string;
    solution: string;
    result: string;
    screenshots: {
      src: string;
      alt: string;
    }[];
  };
  stack: string[];
  image: {
    src: string;
    alt: string;
  };
  liveDemo?: string;
  github?: string;
  featured: boolean;
  status: "draft" | "published";
  order: number;
};

async function getProject(slug: string): Promise<PublicProject | null> {
  try {
    await connectToDatabase();

    const project = await Project.findOne({
      slug: slug.toLowerCase(),
      status: "published",
    }).lean();

    if (!project) {
      return null;
    }

    return {
      title: project.title,
      slug: project.slug,
      description: project.description,
      impact: project.impact || "",
      highlights: project.highlights || [],
      caseStudy: {
        challenge: project.caseStudy?.challenge || "",
        solution: project.caseStudy?.solution || "",
        result: project.caseStudy?.result || "",
        screenshots: project.caseStudy?.screenshots || [],
      },
      stack: project.stack || [],
      image: {
        src: project.image?.src || "",
        alt: project.image?.alt || project.title,
      },
      liveDemo: project.liveDemo || "",
      github: project.github || "",
      featured: Boolean(project.featured),
      status: project.status,
      order: project.order ?? 0,
    };
  } catch (error) {
    console.error("Failed to load project:", error);
    return null;
  }
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Project | Anadil",
    };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.description,
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const chapters = [
    {
      label: "Challenge",
      text: project.caseStudy.challenge,
    },
    {
      label: "Solution",
      text: project.caseStudy.solution,
    },
    {
      label: "Result",
      text: project.caseStudy.result,
    },
  ];

  return (
    <SiteShell>
      <main className="flex-1 pb-20 pt-28 sm:pb-28 sm:pt-32">
        <Container>
          <div className="mx-auto max-w-5xl">
            <Link
              href="/#projects"
              className="font-mono text-sm text-white/40 transition hover:text-orange-400"
            >
              ← All projects
            </Link>

            <header className="mt-8 border-y border-white/[0.08] py-10 sm:py-14">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-orange-400">
                Case study
              </p>

              <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-6xl">
                {project.title}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/45">
                {project.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-3 text-sm font-medium">
                {project.liveDemo ? (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-orange-500 px-5 py-2.5 text-black transition hover:bg-orange-400"
                  >
                    Visit live site ↗
                  </a>
                ) : null}

                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/[0.1] px-5 py-2.5 text-white/70 transition hover:border-orange-500/40 hover:text-orange-400"
                  >
                    View code ↗
                  </a>
                ) : null}
              </div>
            </header>

            <div className="mt-10 grid gap-px border border-white/[0.08] bg-white/[0.08] lg:grid-cols-3">
              {chapters.map((chapter, index) => (
                <section
                  key={chapter.label}
                  className="bg-[#101010] p-6 sm:p-8"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-orange-400">
                    0{index + 1} / {chapter.label}
                  </p>

                  <p className="mt-5 leading-8 text-white/55">
                    {chapter.text}
                  </p>
                </section>
              ))}
            </div>

            {project.caseStudy.screenshots.length > 0 && (
              <section className="mt-14">
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-orange-400">
                  Product views
                </p>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  {project.caseStudy.screenshots.map((screenshot) => (
                    <figure
                      key={screenshot.src}
                      className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101010] p-2"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#151515]">
                        <Image
                          src={screenshot.src}
                          alt={screenshot.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover object-top"
                        />
                      </div>

                      <figcaption className="px-2 pb-1 pt-3 text-sm text-white/40">
                        {screenshot.alt}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-14 border-t border-white/[0.08] pt-10">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-orange-400">
                Technology
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-sm text-white/50"
                  >
                    <TechLogo name={item} compact />
                    {item}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </Container>
      </main>
    </SiteShell>
  );
}