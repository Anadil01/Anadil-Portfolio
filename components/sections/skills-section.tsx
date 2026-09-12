import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import TechLogo from "@/components/ui/tech-logo";
import { portfolio } from "@/data/portfolio";

export default function SkillsSection() {
  const skillGroups = Object.entries(
    portfolio.skills
  );

  const totalSkills = skillGroups.reduce(
    (total, [, items]) => total + items.length,
    0
  );

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[#080808] py-24 sm:py-32"
    >
      {/* Background glow */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-orange-500/[0.04] blur-[130px]"
      />

      <Container>
        <div className="relative">
          {/* HEADER */}

          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1fr_0.45fr] lg:items-end">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-orange-500" />

                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-orange-400">
                    Technology
                  </p>
                </div>

                <h2 className="mt-5 text-[clamp(3rem,8vw,8rem)] font-black leading-[0.82] tracking-[-0.07em] text-white">
                  MY
                  <br />
                  <span className="text-white/35">
                    STACK
                  </span>
                  <span className="text-orange-500">
                    .
                  </span>
                </h2>
              </div>

              <div className="lg:pb-2">
                <p className="text-sm leading-7 text-white/40">
                  Tools I use to turn ideas into fast,
                  maintainable, production-ready software.
                </p>

                <div className="mt-5 flex items-center gap-3">
                  <span className="text-3xl font-semibold tracking-tight text-white">
                    {totalSkills}
                  </span>

                  <span className="text-xs uppercase tracking-[0.18em] text-white/25">
                    technologies
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* =================================================
              SKILL GRID
             ================================================= */}

          <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {skillGroups.map(
              ([category, items], index) => {
                const isTools =
                  category.toLowerCase() ===
                  "tools";

                return (
                  <Reveal
                    key={category}
                    className={`[transition-delay:${index * 90}ms] ${
                      isTools
                        ? "xl:col-span-2"
                        : ""
                    }`}
                  >
                    <SkillGroup
                      category={category}
                      items={items}
                      index={index}
                      wide={isTools}
                    />
                  </Reveal>
                );
              }
            )}
          </div>

          {/* =================================================
              TECHNOLOGY STRIP
             ================================================= */}

          <Reveal>
            <div className="mt-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
              <div className="flex min-w-max items-center gap-8 px-6 py-5">
                {skillGroups
                  .flatMap(([, items]) => items)
                  .slice(0, 14)
                  .map((item) => (
                    <span
                      key={item}
                      className="flex items-center gap-2 text-xs text-white/25"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500/60" />

                      {item}
                    </span>
                  ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   SKILL GROUP
   ========================================================= */

function SkillGroup({
  category,
  items,
  index,
  wide = false,
}: {
  category: string;
  items: string[];
  index: number;
  wide?: boolean;
}) {
  return (
    <article
      className={`group relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#101010] p-6 transition duration-500 hover:-translate-y-1 hover:border-orange-500/20 hover:bg-[#121212] ${
        wide
          ? "xl:h-full"
          : ""
      }`}
    >
      {/* Hover glow */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-orange-500/[0.07] opacity-0 blur-[60px] transition duration-500 group-hover:opacity-100"
      />

      {/* HEADER */}

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-orange-400">
            {String(index + 1).padStart(2, "0")}
          </p>

          <h3 className="mt-2 text-lg font-semibold tracking-tight text-white">
            {category}
          </h3>
        </div>

        <span className="text-2xl font-light text-white/[0.08] transition duration-300 group-hover:text-orange-500/30">
          +
        </span>
      </div>

      {/* ITEMS */}

      <div
        className={`relative mt-6 ${
          wide
            ? "grid gap-2 sm:grid-cols-2"
            : "space-y-2"
        }`}
      >
        {items.map((item) => (
          <div
            key={item}
            className="group/item flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.025] px-3.5 py-3 transition duration-300 hover:border-orange-500/20 hover:bg-orange-500/[0.05]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-black/30">
                <TechLogo
                  name={item}
                  compact
                />
              </span>

              <span className="truncate text-sm text-white/55 transition group-hover/item:text-white">
                {item}
              </span>
            </div>

            <span className="ml-3 text-xs text-white/10 transition group-hover/item:text-orange-400/60">
              ↗
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}