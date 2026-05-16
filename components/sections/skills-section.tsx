import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import SectionHeading from "@/components/ui/section-heading";
import { portfolio } from "@/data/portfolio";

export default function SkillsSection() {
  return (
    <section id="skills" className="section-shell scroll-mt-28 py-20 sm:py-24">
      <Container className="space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Skills"
            title="Modern stack, practical tooling"
            description="A focused toolkit for building responsive frontends, secure APIs, and production-ready full-stack systems."
          />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Object.entries(portfolio.skills).map(([category, items], index) => (
            <Reveal key={category} className={`[transition-delay:${index * 80}ms]`}>
              <article className="section-card rounded-[1.5rem] p-6">
                <h3 className="font-mono text-sm uppercase tracking-[0.24em] text-accent">
                  {category}
                </h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span key={item} className="tag rounded-full px-3 py-1 text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
