import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import SectionHeading from "@/components/ui/section-heading";
import { portfolio } from "@/data/portfolio";

export default function EducationSection() {
  return (
    <section className="section-shell py-20 sm:py-24">
      <Container className="space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Education"
            title="Education and certifications"
            description="Academic foundation in web technologies backed by focused certification work in full-stack development."
          />
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <article className="section-card rounded-[1.5rem] p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                Education
              </p>
              <h3 className="mt-4 font-mono text-2xl font-semibold text-white">
                {portfolio.education.degree}
              </h3>
              <p className="mt-2 text-slate-300">{portfolio.education.school}</p>
              <p className="mt-2 text-sm leading-7 text-slate-400">
                Specialization: {portfolio.education.specialization}
              </p>
              <p className="mt-4 text-sm text-slate-500">
                {portfolio.education.period}
              </p>
            </article>
          </Reveal>
          <Reveal className="[transition-delay:100ms]">
            <article className="section-card rounded-[1.5rem] p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                Certifications
              </p>
              <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
                {portfolio.certifications.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
