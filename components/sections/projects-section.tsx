import Image from "next/image";
import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import SectionHeading from "@/components/ui/section-heading";
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
              <article className="group section-card overflow-hidden rounded-[1.5rem] transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_0_0_1px_rgba(56,189,248,0.15),0_20px_40px_rgba(0,0,0,0.36)]">
                <div className="relative aspect-[16/9] w-full border-b border-border bg-black/20">
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="scale-[1.01] object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07101d] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-strong backdrop-blur">
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
                  <div className="rounded-2xl border border-accent/15 bg-accent/[0.06] px-4 py-3">
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
                      Outcome
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      {project.impact}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="tag rounded-full px-3 py-1 text-xs">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 pt-2 text-sm font-medium">
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
