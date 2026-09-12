import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import { portfolio } from "@/data/portfolio";

export default function EducationSection() {
  return (
    <section className="relative overflow-hidden bg-[#080808] py-24 sm:py-32">
      {/* Background glow */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-200px] left-1/3 h-[500px] w-[500px] rounded-full bg-orange-500/[0.035] blur-[140px]"
      />

      <Container>
        <div className="relative">
          {/* HEADER */}

          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-orange-500" />

              <p className="text-xs font-medium uppercase tracking-[0.3em] text-orange-400">
                Background
              </p>
            </div>

            <h2 className="mt-5 max-w-5xl text-[clamp(3rem,8vw,8rem)] font-black leading-[0.82] tracking-[-0.07em] text-white">
              LEARNING
              <br />
              <span className="text-white/30">
                NEVER STOPS
              </span>
              <span className="text-orange-500">
                .
              </span>
            </h2>
          </Reveal>

          {/* CONTENT */}

          <div className="mt-14 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            {/* EDUCATION */}

            <Reveal>
              <article className="group relative h-full overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#101010] p-6 sm:p-8 lg:p-10">
                {/* Decorative number */}

                <div
                  aria-hidden="true"
                  className="absolute right-6 top-4 select-none text-[8rem] font-black leading-none tracking-[-0.08em] text-white/[0.025] sm:right-10 sm:top-6 sm:text-[11rem]"
                >
                  01
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-orange-400">
                      Education
                    </p>

                    <span className="text-xs text-white/20">
                      {portfolio.education.period}
                    </span>
                  </div>

                  <div className="mt-16 max-w-2xl">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                      Academic foundation
                    </p>

                    <h3 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                      {portfolio.education.degree}
                    </h3>

                    <p className="mt-4 text-lg text-orange-400">
                      {portfolio.education.school}
                    </p>

                    <div className="mt-8 border-t border-white/[0.08] pt-6">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/25">
                        Specialization
                      </p>

                      <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">
                        {portfolio.education.specialization}
                      </p>
                    </div>
                  </div>

                  {/* BOTTOM */}

                  <div className="mt-12 flex items-center gap-3 border-t border-white/[0.08] pt-5">
                    <span className="h-2 w-2 rounded-full bg-orange-500" />

                    <span className="text-xs text-white/35">
                      {portfolio.education.period}
                    </span>
                  </div>
                </div>

                {/* Hover accent */}

                <div className="absolute bottom-0 left-0 h-px w-0 bg-orange-500 transition-all duration-500 group-hover:w-full" />
              </article>
            </Reveal>

            {/* CERTIFICATIONS */}

            <Reveal className="[transition-delay:100ms]">
              <article className="h-full rounded-[2rem] border border-white/[0.08] bg-[#101010] p-6 sm:p-8 lg:p-10">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-orange-400">
                    Certifications
                  </p>

                  <span className="font-mono text-xs text-white/20">
                    {String(
                      portfolio.certifications.length
                    ).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-8">
                  {portfolio.certifications.map(
                    (item, index) => (
                      <div
                        key={item}
                        className="group/cert flex gap-5 border-b border-white/[0.07] py-5 first:pt-0 last:border-b-0"
                      >
                        {/* NUMBER */}

                        <span className="pt-1 font-mono text-[10px] text-orange-500/50">
                          {String(
                            index + 1
                          ).padStart(2, "0")}
                        </span>

                        {/* CERTIFICATE */}

                        <div className="flex-1">
                          <p className="text-sm leading-6 text-white/55 transition duration-300 group-hover/cert:text-white">
                            {item}
                          </p>

                          <div className="mt-3 flex items-center gap-2">
                            <span className="h-px w-5 bg-orange-500/40 transition-all duration-300 group-hover/cert:w-8 group-hover/cert:bg-orange-500" />

                            <span className="text-[9px] uppercase tracking-[0.18em] text-white/15">
                              Verified learning
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* FOOTER */}

                <div className="mt-6 rounded-xl border border-orange-500/10 bg-orange-500/[0.035] px-4 py-3">
                  <p className="text-xs leading-5 text-white/35">
                    Continuous learning through
                    certifications, practical projects,
                    and hands-on engineering work.
                  </p>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}