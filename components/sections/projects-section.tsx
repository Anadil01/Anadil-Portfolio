import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import SectionHeading from "@/components/ui/section-heading";
import TechLogo from "@/components/ui/tech-logo";
import { portfolio } from "@/data/portfolio";

type ProjectsSectionProps = {
  standalone?: boolean;
};

export default function ProjectsSection({
  standalone = false,
}: ProjectsSectionProps) {
  return (
    <section
      id={standalone ? undefined : "projects"}
      className={`section-shell scroll-mt-28 ${standalone ? "py-20 sm:py-24" : "py-20 sm:py-24"}`}
    >
      <Container className="space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Projects"
            title="Selected builds"
            description="Production-focused work spanning AI features, collaboration tooling, aggregation workflows, and platform engineering."
          />
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-2">
          {portfolio.projects.map((project, index) => (
            <Reveal key={project.title} className={`[transition-delay:${index * 90}ms]`}>
              <article className="group section-card overflow-hidden rounded-[1.5rem] transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_12px_28px_rgba(55,42,28,0.10)]">
                <div className="relative aspect-[16/9] w-full border-b border-border bg-stone-100">
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="scale-[1.01] object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(35,29,23,0.54)] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 rounded-full border border-white/60 bg-[rgba(255,253,248,0.88)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-strong backdrop-blur">
                    Live Build
                  </div>
                </div>
                <div className="space-y-5 p-6">
                  <div className="space-y-2">
                    <p className="font-mono text-xs uppercase tracking-[0.28em] text-slate-500">
                      Project 0{index + 1}
                    </p>
                    <h3 className="font-mono text-2xl font-semibold text-white">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-7 text-slate-300">
                    {project.description}
                  </p>
                  <div className="border-y border-accent/15 py-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
                      What it delivers
                    </p>
                    <ul className="mt-3 space-y-2.5 text-sm leading-6 text-slate-300">
                      {project.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-2.5">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="tag inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs">
                        <TechLogo name={item} compact />
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 pt-2 text-sm font-medium">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="rounded-full border border-border px-4 py-2 text-slate-200 transition hover:border-accent hover:text-accent-strong"
                    >
                      Case Study
                    </Link>
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-accent/50 bg-accent px-4 py-2 text-slate-950 transition hover:bg-accent-strong"
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-border px-4 py-2 text-slate-200 transition hover:border-accent hover:text-accent-strong"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
