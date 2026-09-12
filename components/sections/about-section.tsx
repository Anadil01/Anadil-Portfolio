import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import { portfolio } from "@/data/portfolio";

type AboutSectionProps = {
  standalone?: boolean;
};

export default function AboutSection({
  standalone = false,
}: AboutSectionProps) {
  const profile = portfolio.profile;

  return (
    <section
      id={standalone ? undefined : "about"}
      className="relative overflow-hidden bg-[#080808] py-24 sm:py-32 lg:py-40"
    >
      {/* =================================================
          BACKGROUND
         ================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-orange-500/[0.045] blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/4 h-px w-1/2 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"
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
                About me
              </p>
            </div>

            <h1 className="mt-6 max-w-6xl text-[clamp(3.5rem,9vw,9rem)] font-black leading-[0.8] tracking-[-0.075em] text-white">
              I BUILD
              <br />
              <span className="text-white/30">
                THINGS THAT
              </span>
              <br />
              <span className="text-orange-500">
                MATTER.
              </span>
            </h1>
          </Reveal>

          {/* =================================================
              MAIN PROFILE
             ================================================= */}

          <div className="mt-14 grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
            {/* PROFILE IMAGE */}

            <Reveal>
              <article className="group relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#101010]">
                <div className="relative aspect-[4/5]">
                  {profile.image?.src ? (
                    <Image
                      src={profile.image.src}
                      alt={
                        profile.image.alt ||
                        profile.name
                      }
                      fill
                      sizes="(max-width: 1024px) 100vw, 35vw"
                      className="object-cover object-center transition duration-700 group-hover:scale-[1.025]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/[0.03]">
                      <span className="text-5xl font-black text-white/10">
                        {profile.name.charAt(0)}
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                  {/* IMAGE LABEL */}

                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-orange-400">
                        {profile.location}
                      </p>

                      <p className="mt-1 text-sm text-white/60">
                        {profile.role}
                      </p>
                    </div>

                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] bg-black/50 text-orange-400 backdrop-blur-xl">
                      ↗
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>

            {/* PROFILE CONTENT */}

            <Reveal className="[transition-delay:100ms]">
              <article className="relative h-full overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#101010] p-7 sm:p-9 lg:p-10">
                {/* Decorative number */}

                <div
                  aria-hidden="true"
                  className="absolute right-6 top-4 select-none text-[8rem] font-black leading-none tracking-[-0.08em] text-white/[0.025] sm:right-10 sm:text-[10rem]"
                >
                  01
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-orange-400">
                      Developer profile
                    </p>

                    <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/25">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                      Available
                    </span>
                  </div>

                  <h2 className="mt-14 max-w-3xl text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                    {profile.tagline}
                  </h2>

                  <p className="mt-7 max-w-2xl text-base leading-8 text-white/45">
                    {profile.bio}
                  </p>

                  {/* ROLE / LOCATION */}

                  <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2">
                    <div className="bg-[#101010] p-5">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">
                        Role
                      </p>

                      <p className="mt-2 text-sm text-white/55">
                        {profile.role}
                      </p>
                    </div>

                    <div className="bg-[#101010] p-5">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">
                        Location
                      </p>

                      <p className="mt-2 text-sm text-white/55">
                        {profile.location}
                      </p>
                    </div>
                  </div>

                  {/* ACTIONS */}

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href="/#projects"
                      className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-black transition duration-300 hover:-translate-y-1 hover:bg-orange-400"
                    >
                      Explore my work

                      <span>↗</span>
                    </Link>

                    <Link
                      href="/resume"
                      className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.025] px-5 py-3 text-sm font-medium text-white/55 transition duration-300 hover:-translate-y-1 hover:border-orange-500/30 hover:text-orange-400"
                    >
                      View resume

                      <span>↗</span>
                    </Link>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-px w-0 bg-orange-500 transition-all duration-700 group-hover:w-full" />
              </article>
            </Reveal>
          </div>

          {/* =================================================
              APPROACH
             ================================================= */}

          <Reveal>
            <div className="mt-5 grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
              {/* LABEL */}

              <article className="rounded-[2rem] border border-white/[0.08] bg-[#101010] p-7 sm:p-9">
                <p className="text-[10px] uppercase tracking-[0.28em] text-orange-400">
                  My approach
                </p>

                <p className="mt-8 text-2xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-3xl">
                  Thoughtful interfaces.
                  <br />
                  Dependable systems.
                  <br />
                  <span className="text-white/30">
                    Work that earns trust.
                  </span>
                </p>
              </article>

              {/* PRINCIPLES */}

              <article className="rounded-[2rem] border border-white/[0.08] bg-[#101010] p-7 sm:p-9">
                <div className="grid gap-5 sm:grid-cols-3">
                  <Principle
                    number="01"
                    title="Build"
                    text="Turn ideas into reliable products with clean architecture and practical engineering."
                  />

                  <Principle
                    number="02"
                    title="Secure"
                    text="Think about authentication, APIs, data, and failure cases from the beginning."
                  />

                  <Principle
                    number="03"
                    title="Ship"
                    text="Move beyond local development and build software that can actually be deployed and used."
                  />
                </div>
              </article>
            </div>
          </Reveal>

          {/* =================================================
              CERTIFICATIONS
             ================================================= */}

          {standalone &&
            portfolio.certifications.length > 0 && (
              <Reveal>
                <article className="mt-5 rounded-[2rem] border border-white/[0.08] bg-[#101010] p-7 sm:p-9">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.28em] text-orange-400">
                        Certifications
                      </p>

                      <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">
                        Continuous learning
                      </h2>
                    </div>

                    <span className="font-mono text-xs text-white/20">
                      {String(
                        portfolio.certifications.length
                      ).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {portfolio.certifications.map(
                      (item, index) => (
                        <div
                          key={item}
                          className="group flex gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition duration-300 hover:border-orange-500/20 hover:bg-orange-500/[0.035]"
                        >
                          <span className="font-mono text-[10px] text-orange-500/60">
                            {String(
                              index + 1
                            ).padStart(2, "0")}
                          </span>

                          <p className="text-sm leading-6 text-white/45 transition group-hover:text-white/70">
                            {item}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </article>
              </Reveal>
            )}
        </div>
      </Container>
    </section>
  );
}

function Principle({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="group">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] text-orange-500/60">
          {number}
        </span>

        <span className="h-px flex-1 bg-white/[0.08] transition group-hover:bg-orange-500/30" />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-white/35">
        {text}
      </p>
    </div>
  );
}