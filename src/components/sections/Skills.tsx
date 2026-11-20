import { skillGroups, marqueeSkills } from "@/data/skills";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechIcon } from "@/components/ui/TechIcon";

export function Skills() {
  return (
    <section id="skills" className="anchor-offset relative overflow-hidden py-24 sm:py-28 lg:py-36">
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/3 size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(255,48,48,0.08),transparent_68%)] blur-3xl"
      />

      <div className="wrap relative z-10">
        <SectionHeading
          eyebrow="02 — Toolkit"
          title={
            <>
              Tools I build{" "}
              <em className="font-serif font-normal italic">with</em>
              <span className="text-accent">.</span>
            </>
          }
          description="An honest map of the technologies I use to build, and the ones I'm actively learning next. Skills are practices, not percentages."
        />

        <Reveal className="mt-9">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[8px] uppercase tracking-[0.18em] text-subtle">
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
              Working knowledge
            </span>
            <span className="flex items-center gap-2">
              <span
                className="size-1.5 rounded-full border border-white/35"
                aria-hidden="true"
              />
              Currently exploring
            </span>
            <span className="hidden h-px flex-1 bg-white/10 sm:block" aria-hidden="true" />
            <span className="text-white/25">No proficiency scores. Just clarity.</span>
          </div>
        </Reveal>
      </div>

      <div className="relative z-10 mt-12 sm:mt-16">
        <Marquee items={marqueeSkills} />
      </div>

      <div className="wrap relative z-10 mt-10 sm:mt-12">
        <div className="grid gap-4 lg:grid-cols-2">
          {skillGroups.map((group, groupIndex) => {
            const isExploringGroup = group.id === "exploring";

            return (
              <Reveal
                key={group.id}
                className={cn("h-full", isExploringGroup && "lg:col-span-2")}
                delay={groupIndex * 0.06}
              >
                <div
                  className={cn(
                    "group/category relative h-full overflow-hidden border border-white/10 bg-[#0d0d0d] p-5 transition-colors duration-500 hover:border-accent/25 sm:p-7",
                    isExploringGroup &&
                      "bg-[linear-gradient(110deg,#111010_0%,#0b0b0b_62%)]",
                  )}
                >
                  {isExploringGroup ? (
                    <div
                      aria-hidden="true"
                      className="absolute -right-24 -top-24 size-72 rounded-full bg-[radial-gradient(circle,rgba(255,48,48,0.14),transparent_68%)] blur-2xl"
                    />
                  ) : null}

                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent/80">
                          {String(groupIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="h-px w-5 bg-white/15" aria-hidden="true" />
                        <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/25">
                          {group.skills.length} tools
                        </span>
                      </div>
                      <h3 className="mt-3 text-[1.25rem] font-medium tracking-[-0.03em] text-white/90">
                        {group.title}
                      </h3>
                    </div>
                    <span className="font-serif text-3xl italic leading-none text-white/[0.08]">
                      {String(groupIndex + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="relative z-10 mt-2 max-w-sm text-[11px] leading-5 text-subtle">
                    {group.description}
                  </p>

                  <ul
                    className={cn(
                      "relative z-10 mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3",
                      isExploringGroup && "sm:grid-cols-2 lg:grid-cols-4",
                    )}
                  >
                    {group.skills.map((skill) => (
                      <li key={skill.name}>
                        <div className="group/skill relative flex h-full items-center gap-2.5 border border-white/[0.07] bg-white/[0.015] px-3 py-3 transition-all duration-300 hover:border-accent/30 hover:bg-accent/[0.035]">
                          <TechIcon
                            name={skill.icon}
                            className="size-4 shrink-0 text-white/40 transition-colors duration-300 group-hover/skill:text-accent"
                          />
                          <span className="min-w-0 flex-1 truncate text-[11px] text-white/65 transition-colors duration-300 group-hover/skill:text-white">
                            {skill.name}
                          </span>
                          <span
                            className={cn(
                              "size-1.5 shrink-0 rounded-full transition-transform duration-300 group-hover/skill:scale-125",
                              skill.status === "working"
                                ? "bg-accent/80"
                                : "border border-white/30 bg-transparent",
                            )}
                            title={
                              skill.status === "working"
                                ? "Working knowledge"
                                : "Currently exploring"
                            }
                          >
                            <span className="sr-only">
                              {skill.status === "working"
                                ? "Working knowledge"
                                : "Currently exploring"}
                            </span>
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {isExploringGroup ? (
                    <p className="relative z-10 mt-5 max-w-xl border-l border-white/10 pl-4 text-[11px] leading-5 text-subtle">
                      These are active learning areas, not claims of expertise.
                      They&apos;ll move into the toolkit as I build with them.
                    </p>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.08} className="mt-8">
          <p className="text-[11px] leading-6 text-subtle">
            <span className="text-white/45">A note on honesty:</span> every label
            above reflects current practice. I&apos;d rather show what I&apos;m
            still learning than overstate a level.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
