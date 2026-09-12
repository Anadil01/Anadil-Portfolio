import Link from "next/link";

import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import { portfolio } from "@/data/portfolio";

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-current"
    >
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.72.08-.72 1.2.08 1.84 1.22 1.84 1.22 1.08 1.82 2.82 1.29 3.5.99.11-.77.42-1.29.76-1.59-2.67-.3-5.48-1.31-5.48-5.86 0-1.29.47-2.35 1.23-3.18-.12-.3-.53-1.51.12-3.14 0 0 1-.32 3.3 1.21a11.6 11.6 0 0 1 6 0c2.3-1.53 3.29-1.21 3.29-1.21.66 1.63.25 2.84.13 3.14.77.83 1.23 1.89 1.23 3.18 0 4.56-2.82 5.56-5.5 5.85.44.37.81 1.1.81 2.23v3.3c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-current"
    >
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.48 1s2.5 1.12 2.5 2.5ZM.5 8h4V24h-4V8Zm7 0h3.83v2.19h.05c.53-1 1.84-2.19 3.79-2.19 4.05 0 4.8 2.67 4.8 6.14V24h-4v-7.86c0-1.88-.03-4.29-2.61-4.29-2.61 0-3.01 2.04-3.01 4.15V24h-4V8Z" />
    </svg>
  );
}

type ContactSectionProps = {
  standalone?: boolean;
};

export default function ContactSection({
  standalone = false,
}: ContactSectionProps) {
  return (
    <section
      id={standalone ? undefined : "contact"}
      className="relative overflow-hidden bg-[#080808] py-24 sm:py-32 lg:py-40"
    >
      {/* =================================================
          BACKGROUND
         ================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.055] blur-[180px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"
      />

      <Container>
        <div className="relative">
          {/* =================================================
              HEADER
             ================================================= */}

          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-orange-500" />

              <p className="text-xs font-medium uppercase tracking-[0.3em] text-orange-400">
                Get in touch
              </p>
            </div>

            <h2 className="mt-6 max-w-6xl text-[clamp(3.5rem,10vw,10rem)] font-black leading-[0.78] tracking-[-0.075em] text-white">
              LET&apos;S
              <br />
              <span className="text-white/30">
                BUILD
              </span>{" "}
              <span className="text-orange-500">
                TOGETHER.
              </span>
            </h2>
          </Reveal>

          {/* =================================================
              CTA AREA
             ================================================= */}

          <div className="mt-14 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            {/* MAIN CTA */}

            <Reveal>
              <article className="group relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#101010] p-7 sm:p-10 lg:p-12">
                {/* Decorative circle */}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full border border-orange-500/10 transition duration-700 group-hover:scale-110 group-hover:border-orange-500/20"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-orange-500/[0.045] blur-[80px]"
                />

                <div className="relative">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-orange-400">
                    Start a conversation
                  </p>

                  <p className="mt-6 max-w-2xl text-lg leading-8 text-white/45 sm:text-xl">
                    If you&apos;re hiring, shipping a product,
                    or need a full-stack developer who enjoys
                    secure systems and real-time experiences,
                    I&apos;d love to hear about it.
                  </p>

                  {/* EMAIL */}

                  <a
                    href={`mailto:${portfolio.profile.email}`}
                    className="group/email mt-8 inline-flex max-w-full items-center gap-3 break-all rounded-full bg-orange-500 px-5 py-3.5 text-sm font-semibold text-black transition duration-300 hover:-translate-y-1 hover:bg-orange-400 sm:px-6"
                  >
                    <span>
                      {portfolio.profile.email}
                    </span>

                    <span className="shrink-0 transition-transform duration-300 group-hover/email:translate-x-1">
                      ↗
                    </span>
                  </a>

                  {/* RESUME */}

                  <div className="mt-4">
                    <Link
                      href="/resume"
                      className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.025] px-5 py-3 text-sm font-medium text-white/60 transition duration-300 hover:-translate-y-1 hover:border-orange-500/30 hover:text-orange-400"
                    >
                      View resume

                      <span>↗</span>
                    </Link>
                  </div>

                  {/* STATUS */}

                  <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-white/[0.08] pt-6">
                    <span className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/30">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

                      Available
                    </span>

                    <span className="h-3 w-px bg-white/10" />

                    <span className="text-xs text-white/25">
                      {portfolio.profile.availability}
                    </span>
                  </div>
                </div>

                {/* Bottom accent */}

                <div className="absolute bottom-0 left-0 h-px w-0 bg-orange-500 transition-all duration-700 group-hover:w-full" />
              </article>
            </Reveal>

            {/* SOCIALS */}

            <Reveal className="[transition-delay:100ms]">
              <article className="h-full rounded-[2rem] border border-white/[0.09] bg-[#101010] p-7 sm:p-8">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-orange-400">
                    Connect
                  </p>

                  <span className="font-mono text-xs text-white/20">
                    02
                  </span>
                </div>

                <div className="mt-8 space-y-3">
                  {portfolio.socials.map(
                    (item, index) => {
                      const isGitHub =
                        item.label === "GitHub";

                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group/social flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition duration-300 hover:-translate-y-1 hover:border-orange-500/25 hover:bg-orange-500/[0.04]"
                        >
                          <span className="flex items-center gap-3 text-sm text-white/50 transition group-hover/social:text-white">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-black/30">
                              {isGitHub ? (
                                <GitHubIcon />
                              ) : (
                                <LinkedInIcon />
                              )}
                            </span>

                            {item.label}
                          </span>

                          <span className="flex items-center gap-3">
                            <span className="font-mono text-[9px] text-white/15">
                              {String(
                                index + 1
                              ).padStart(2, "0")}
                            </span>

                            <span className="text-white/20 transition group-hover/social:translate-x-1 group-hover/social:text-orange-400">
                              ↗
                            </span>
                          </span>
                        </a>
                      );
                    }
                  )}
                </div>

                {/* MINI NOTE */}

                <div className="mt-8 rounded-2xl border border-orange-500/10 bg-orange-500/[0.035] p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-orange-400/70">
                    Prefer email?
                  </p>

                  <p className="mt-2 text-sm leading-6 text-white/35">
                    Send me a message and tell me what
                    you&apos;re building.
                  </p>
                </div>

                {/* LOCATION */}

                <div className="mt-8 flex items-center justify-between border-t border-white/[0.07] pt-5">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/20">
                    Based in
                  </span>

                  <span className="text-xs text-white/40">
                    {portfolio.profile.location}
                  </span>
                </div>
              </article>
            </Reveal>
          </div>

          {/* =================================================
              FINAL LINE
             ================================================= */}

          <Reveal>
            <div className="mt-16 flex flex-col gap-5 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-white/20">
                Have an idea? Let&apos;s make it real.
              </p>

              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />

                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/20">
                  {portfolio.profile.name}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}