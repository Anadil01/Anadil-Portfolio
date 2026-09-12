import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/container";
import TechLogo from "@/components/ui/tech-logo";
import { portfolio } from "@/data/portfolio";
import SiteShell from "@/components/layout/site-shell";


type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return portfolio.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolio.projects.find((item) => item.slug === slug);
  return project ? { title: `${project.title} | Case Study`, description: project.description } : {};
}

export default async function ProjectCaseStudyPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = portfolio.projects.find((item) => item.slug === slug);

  if (!project) notFound();

  const chapters = [
    { label: "Challenge", text: project.caseStudy.challenge },
    { label: "Solution", text: project.caseStudy.solution },
    { label: "Result", text: project.caseStudy.result },
  ];

  return (
    <SiteShell>
    <main className="flex-1 pt-28 pb-20 sm:pt-32 sm:pb-28">
      <Container>
        <div className="mx-auto max-w-5xl">
          <Link href="/#projects" className="font-mono text-sm text-slate-400 transition hover:text-accent-strong">← All projects</Link>
          <header className="mt-8 border-y border-border py-10 sm:py-14">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">Case study</p>
            <h1 className="mt-4 max-w-4xl font-mono text-4xl font-semibold leading-tight text-white sm:text-6xl">{project.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">{project.description}</p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm font-medium">
              {project.liveDemo ? <a href={project.liveDemo} target="_blank" rel="noreferrer" className="rounded-full border border-accent/50 bg-accent px-5 py-2.5 text-slate-950 transition hover:bg-accent-strong">Visit live site ↗</a> : null}
              {project.github ? <a href={project.github} target="_blank" rel="noreferrer" className="rounded-full border border-border px-5 py-2.5 text-slate-200 transition hover:border-accent hover:text-accent-strong">View code ↗</a> : null}
            </div>
          </header>

          <div className="mt-10 grid gap-px border border-border bg-border lg:grid-cols-3">
            {chapters.map((chapter, index) => (
              <section key={chapter.label} className="bg-surface p-6 sm:p-8">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">0{index + 1} / {chapter.label}</p>
                <p className="mt-5 leading-8 text-slate-300">{chapter.text}</p>
              </section>
            ))}
          </div>

          <section className="mt-14">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">Product views</p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {project.caseStudy.screenshots.map((screenshot) => (
                <figure key={screenshot.src} className="overflow-hidden border border-border bg-surface p-2">
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-100"><Image src={screenshot.src} alt={screenshot.alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover object-top" /></div>
                  <figcaption className="px-2 pb-1 pt-3 text-sm text-slate-400">{screenshot.alt}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="mt-14 border-t border-border pt-10">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">Technology</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((item) => <span key={item} className="tag inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm"><TechLogo name={item} compact />{item}</span>)}
            </div>
          </section>
        </div>
      </Container>
    </main>
    </SiteShell>
  );
}
