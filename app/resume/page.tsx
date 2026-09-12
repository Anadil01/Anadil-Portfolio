import Link from "next/link";
import Container from "@/components/ui/container";
import PrintResumeButton from "@/components/ui/print-resume-button";
import { portfolio } from "@/data/portfolio";
import SiteShell from "@/components/layout/site-shell";


export const metadata = {
  title: `Resume | ${portfolio.profile.name}`,
  description: `Resume of ${portfolio.profile.name}, ${portfolio.profile.role}.`,
};

export default function ResumePage() {
  return (
     <SiteShell>
    <main className="resume-page flex-1 pt-28 pb-16 sm:pt-32 sm:pb-24">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="print-controls mb-7 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="font-mono text-sm text-slate-400 transition hover:text-accent-strong"
            >
              ← Back to portfolio
            </Link>
            <div className="flex flex-wrap gap-3">
              <PrintResumeButton />
              <a
                href={`mailto:${portfolio.profile.email}`}
                className="rounded-full border border-accent/50 bg-accent px-5 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-accent-strong"
              >
                Contact me
              </a>
            </div>
          </div>

          <article className="section-card overflow-hidden rounded-[2rem]">
            <header className="border-b border-border px-6 py-10 sm:px-10 sm:py-12">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                Resume
              </p>
              <h1 className="mt-4 font-mono text-4xl font-semibold text-white sm:text-5xl">
                {portfolio.profile.name}
              </h1>
              <p className="mt-3 text-lg text-accent-strong">{portfolio.profile.role}</p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
                <span>{portfolio.profile.location}</span>
                <a className="transition hover:text-accent-strong" href={`mailto:${portfolio.profile.email}`}>
                  {portfolio.profile.email}
                </a>
                {portfolio.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-accent-strong"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </header>

            <div className="grid gap-10 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1.45fr_0.8fr]">
              <div className="space-y-10">
                <ResumeSection title="Profile">
                  <p className="leading-8 text-slate-300">{portfolio.profile.tagline} {portfolio.profile.bio}</p>
                </ResumeSection>

                <ResumeSection title="Experience">
                  <div className="space-y-8">
                    {portfolio.experience.map((item) => (
                      <div key={`${item.role}-${item.company}`}>
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <div>
                            <h2 className="text-lg font-semibold text-white">{item.role}</h2>
                            <p className="mt-1 text-sm text-accent-strong">{item.company}</p>
                          </div>
                          <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate-500">{item.period}</p>
                        </div>
                        <ul className="mt-4 space-y-2.5 text-sm leading-7 text-slate-300">
                          {item.points.map((point) => <li key={point} className="flex gap-3"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{point}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </ResumeSection>

                <ResumeSection title="Selected projects">
                  <div className="space-y-6">
                    {portfolio.projects.map((project) => (
                      <article key={project.title}>
                        <div className="flex flex-wrap items-baseline justify-between gap-3">
                          <h2 className="text-lg font-semibold text-white">{project.title}</h2>
                          <div className="flex gap-3 text-xs text-accent-strong">
                            {project.liveDemo ? <a href={project.liveDemo} target="_blank" rel="noreferrer">Live demo ↗</a> : null}
                            {project.github ? <a href={project.github} target="_blank" rel="noreferrer">GitHub ↗</a> : null}
                          </div>
                        </div>
                        <p className="mt-2 text-sm leading-7 text-slate-300">{project.description}</p>
                        <ul className="mt-3 space-y-1.5 text-sm leading-6 text-slate-400">
                          {project.highlights.map((highlight) => <li key={highlight}>— {highlight}</li>)}
                        </ul>
                      </article>
                    ))}
                  </div>
                </ResumeSection>
              </div>

              <aside className="space-y-8 lg:border-l lg:border-border lg:pl-10">
                <ResumeSection title="Skills">
                  <div className="space-y-5">
                    {Object.entries(portfolio.skills).map(([group, skills]) => (
                      <div key={group}>
                        <h2 className="text-sm font-medium text-white">{group}</h2>
                        <p className="mt-2 text-sm leading-7 text-slate-400">{skills.join(" · ")}</p>
                      </div>
                    ))}
                  </div>
                </ResumeSection>
                <ResumeSection title="Education">
                  <h2 className="text-lg font-semibold text-white">{portfolio.education.degree}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{portfolio.education.school}</p>
                  <p className="mt-1 text-sm leading-7 text-slate-400">{portfolio.education.specialization}</p>
                  <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-slate-500">{portfolio.education.period}</p>
                </ResumeSection>
                <ResumeSection title="Certifications">
                  <ul className="space-y-3 text-sm leading-7 text-slate-300">
                    {portfolio.certifications.map((certification) => <li key={certification}>{certification}</li>)}
                  </ul>
                </ResumeSection>
              </aside>
            </div>
          </article>
        </div>
      </Container>
    </main>
    </SiteShell>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">{title}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}
