import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import SectionHeading from "@/components/ui/section-heading";
import { portfolio } from "@/data/portfolio";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="section-shell scroll-mt-28 py-20 sm:py-24"
    >
      <Container className="space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="Freelance and independent product work"
            description="Hands-on experience across backend architecture, API security, deployment workflows, and real-time collaboration systems."
          />
        </Reveal>
        <Reveal>
          <div className="section-card rounded-[1.5rem] p-6 sm:p-8">
            {portfolio.experience.map((item) => (
              <article key={`${item.role}-${item.company}`} className="grid gap-6 md:grid-cols-[180px_1fr]">
                <div className="relative pl-6 md:pl-0">
                  <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-accent shadow-[0_0_0_6px_rgba(56,189,248,0.12)] md:left-auto md:right-0" />
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                    {item.period}
                  </p>
                </div>
                <div className="border-l border-border pl-6">
                  <h3 className="font-mono text-2xl font-semibold text-white">
                    {item.role}
                  </h3>
                  <p className="mt-2 text-slate-400">{item.company}</p>
                  <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
