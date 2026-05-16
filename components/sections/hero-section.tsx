import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import { portfolio } from "@/data/portfolio";

export default function HeroSection() {
  return (
    <section id="about" className="scroll-mt-28 pt-32 sm:pt-36">
      <Container>
        <Reveal>
          <div className="code-grid section-card overflow-hidden rounded-[2rem] px-6 py-12 sm:px-10 sm:py-16">
            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
              <div className="space-y-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                    {portfolio.profile.location}
                  </span>
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    {portfolio.profile.availability}
                  </span>
                </div>
                <div className="space-y-5">
                  <h1 className="font-mono text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                    {portfolio.profile.name}
                  </h1>
                  <p className="font-mono text-lg text-accent-strong sm:text-xl">
                    {portfolio.profile.role}
                  </p>
                  <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                    {portfolio.profile.tagline}
                  </p>
                  <p className="max-w-3xl text-base leading-8 text-slate-400">
                    {portfolio.profile.bio}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/#projects"
                    className="rounded-full border border-accent/50 bg-accent px-6 py-3 text-sm font-medium text-slate-950 transition hover:-translate-y-0.5 hover:bg-accent-strong"
                  >
                    View Projects
                  </Link>
                  <a
                    href={portfolio.profile.resumeHref}
                    download
                    className="rounded-full border border-border bg-white/[0.03] px-6 py-3 text-sm font-medium text-slate-100 transition hover:-translate-y-0.5 hover:border-accent hover:text-accent-strong"
                  >
                    Download Resume
                  </a>
                  <Link
                    href="/#contact"
                    className="rounded-full border border-border px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:border-accent hover:text-accent-strong"
                  >
                    Contact
                  </Link>
                </div>
              </div>
              <div className="space-y-5">
                <div className="section-card overflow-hidden rounded-[1.5rem]">
                  <div className="relative aspect-[4/5] w-full bg-black/20">
                    <Image
                      src={portfolio.profile.image.src}
                      alt={portfolio.profile.image.alt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 32vw"
                      className="scale-[1.01] object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08101d] via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-strong backdrop-blur">
                      Available for Work
                    </div>
                  </div>
                </div>
                <div className="section-card rounded-[1.5rem] p-6">
                  <div className="space-y-6">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.28em] text-slate-500">
                        profile.ts
                      </p>
                      <div className="mt-4 space-y-3 text-sm text-slate-300">
                        <p>
                          <span className="text-accent">focus:</span> scalable web
                          apps
                        </p>
                        <p>
                          <span className="text-accent">specialty:</span> MERN,
                          secure APIs, real-time systems
                        </p>
                        <p>
                          <span className="text-accent">tooling:</span> Socket.io,
                          React Query, Zustand
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {Object.entries(portfolio.skills)
                        .slice(0, 3)
                        .map(([label, values]) => (
                          <div
                            key={label}
                            className="rounded-2xl border border-border bg-white/[0.03] p-4"
                          >
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
                              {label}
                            </p>
                            <p className="mt-2 text-sm leading-7 text-slate-300">
                              {values.slice(0, 3).join(" · ")}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
