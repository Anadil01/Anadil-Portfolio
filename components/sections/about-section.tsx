import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import { portfolio } from "@/data/portfolio";

type AboutSectionProps = {
  standalone?: boolean;
};

export default function AboutSection({
  standalone = false,
}: AboutSectionProps) {
  return (
    <section
      id={standalone ? undefined : "about"}
      className={`scroll-mt-28 ${standalone ? "py-20 sm:py-24" : "py-20 sm:py-28"}`}
    >
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="About"
          title={`Meet ${portfolio.profile.name}`}
          description={portfolio.profile.about}
        />
        <section className="grid gap-6 md:grid-cols-2">
          <article className="portfolio-card rounded-[1.75rem] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-950">Experience</h2>
            <div className="mt-4 space-y-6">
              {portfolio.experience.map((item) => (
                <div key={`${item.role}-${item.company}`} className="space-y-2">
                  <div>
                    <h3 className="font-semibold text-slate-950">
                      {item.role} <span className="text-slate-400">/</span>{" "}
                      {item.company}
                    </h3>
                    <p className="text-sm text-slate-500">{item.period}</p>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {item.points.map((point) => (
                      <li key={point} className="leading-7">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
          <article className="portfolio-card rounded-[1.75rem] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-950">Education</h2>
            <div className="mt-4 space-y-6">
              {portfolio.education.map((item) => (
                <div key={item.degree} className="space-y-2">
                  <h3 className="font-semibold text-slate-950">{item.degree}</h3>
                  <p className="text-sm text-slate-600">{item.school}</p>
                  <p className="text-sm text-slate-600">
                    {item.specialization}
                  </p>
                  <p className="text-sm text-slate-500">{item.period}</p>
                </div>
              ))}
            </div>
          </article>
        </section>
        <section className="grid gap-6 md:grid-cols-2">
          <article className="portfolio-card rounded-[1.75rem] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-950">Skills</h2>
            <div className="mt-4 space-y-5">
              {Object.entries(portfolio.skills).map(([category, items]) => (
                <div key={category} className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-sm text-slate-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>
          <article className="portfolio-card rounded-[1.75rem] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-950">
              Certifications
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {portfolio.certifications.map((item) => (
                <li key={item} className="leading-7">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </section>
      </Container>
    </section>
  );
}
