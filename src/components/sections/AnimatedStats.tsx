"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import { gsap, registerGsap } from "@/lib/gsap";

interface Stat {
  value: number;
  display: string;
  suffix?: string;
  label: string;
  note: string;
}

const stats: Stat[] = [
  {
    value: 1,
    display: "01",
    label: "University",
    note: "Port City International University",
  },
  {
    value: 1,
    display: "1",
    suffix: "st",
    label: "Semester",
    note: "Currently studying CSE",
  },
  {
    value: 5,
    display: "05",
    label: "Interests",
    note: "Curiosity across the stack",
  },
  {
    value: 6,
    display: "06",
    label: "Chapters",
    note: "Milestones in the journey",
  },
];

export function AnimatedStats() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!root.current) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const counters =
          root.current?.querySelectorAll<HTMLElement>("[data-stat-number]") ?? [];

        counters.forEach((counter, index) => {
          const target = stats[index]?.value ?? 0;
          const pad = (value: number) =>
            stats[index]?.display.startsWith("0")
              ? String(Math.round(value)).padStart(2, "0")
              : String(Math.round(value));

          const proxy = { value: 0 };
          counter.textContent = pad(0);

          gsap.to(proxy, {
            value: target,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: root.current,
              start: "top 88%",
              once: true,
            },
            onUpdate: () => {
              counter.textContent = pad(proxy.value);
            },
            onComplete: () => {
              counter.textContent = stats[index]?.display ?? String(target);
            },
          });
        });
      });

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="mt-16 border-y border-ink/10 sm:mt-20">
      <dl className="grid grid-cols-2 divide-x divide-ink/10 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={
              index > 1
                ? "border-t border-ink/10 px-5 py-7 sm:px-7 lg:border-t-0"
                : "px-5 py-7 sm:px-7"
            }
          >
            <dt className="sr-only">
              {stat.display}
              {stat.suffix ?? ""} {stat.label}
            </dt>
            <dd aria-hidden="true">
              <p className="flex items-baseline font-medium leading-none tracking-[-0.06em] text-ink">
                <span
                  data-stat-number
                  className="text-[clamp(2.5rem,4.5vw,4rem)] tabular-nums"
                >
                  {stat.display}
                </span>
                {stat.suffix ? (
                  <span className="font-serif text-[0.55em] italic text-accent">
                    {stat.suffix}
                  </span>
                ) : null}
              </p>
              <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/60">
                {stat.label}
              </p>
              <p className="mt-1.5 text-[11px] leading-5 text-subtle">{stat.note}</p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
