"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowDown, MapPin } from "lucide-react";
import { useGSAP } from "@gsap/react";

import { siteConfig } from "@/config/site";
import { gsap, registerGsap } from "@/lib/gsap";
import { buttonStyles } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Portrait } from "@/components/ui/Portrait";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          defaults: { ease: "power4.out" },
          delay: 0.08,
        });

        timeline
          .from("[data-hero-eyebrow]", {
            autoAlpha: 0,
            y: 14,
            duration: 0.8,
          })
          .from(
            "[data-hero-line]",
            {
              yPercent: 118,
              duration: 1.15,
              stagger: 0.1,
              ease: "expo.out",
            },
            "-=0.45",
          )
          .from(
            "[data-hero-meta]",
            { autoAlpha: 0, y: 16, duration: 0.8, stagger: 0.07 },
            "-=0.65",
          )
          .from(
            "[data-hero-portrait]",
            {
              autoAlpha: 0,
              y: 34,
              scale: 1.025,
              duration: 1.25,
            },
            "-=1.1",
          )
          .from(
            "[data-hero-copy]",
            { autoAlpha: 0, y: 18, duration: 0.85, stagger: 0.08 },
            "-=0.85",
          )
          .from(
            "[data-hero-footer]",
            { autoAlpha: 0, y: 14, duration: 0.8 },
            "-=0.55",
          );
      });

      media.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const section = root.current;
          const glow = section?.querySelector<HTMLElement>("[data-hero-glow]");
          const portrait = section?.querySelector<HTMLElement>("[data-portrait-tilt]");

          if (!section || !glow) return;

          gsap.set(glow, { xPercent: -50, yPercent: -50 });
          const glowX = gsap.quickTo(glow, "x", {
            duration: 1.1,
            ease: "power3.out",
          });
          const glowY = gsap.quickTo(glow, "y", {
            duration: 1.1,
            ease: "power3.out",
          });
          const portraitX = portrait
            ? gsap.quickTo(portrait, "x", { duration: 1.2, ease: "power3.out" })
            : null;
          const portraitY = portrait
            ? gsap.quickTo(portrait, "y", { duration: 1.2, ease: "power3.out" })
            : null;

          const onPointerMove = (event: PointerEvent) => {
            const bounds = section.getBoundingClientRect();
            const x = event.clientX - bounds.left;
            const y = event.clientY - bounds.top;

            glowX(x);
            glowY(y);

            if (portraitX && portraitY) {
              portraitX((x / bounds.width - 0.5) * 12);
              portraitY((y / bounds.height - 0.5) * 10);
            }
          };

          section.addEventListener("pointermove", onPointerMove, {
            passive: true,
          });

          return () => {
            section.removeEventListener("pointermove", onPointerMove);
          };
        },
      );

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="home"
      className="anchor-offset relative min-h-[100svh] overflow-hidden pb-8 pt-28 sm:pt-32 lg:pb-6 lg:pt-36"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid opacity-[0.22] [mask-image:linear-gradient(to_bottom,black_0%,rgba(0,0,0,0.5)_60%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-[16%] -top-[22%] size-[42rem] rounded-full bg-[radial-gradient(circle,rgba(255,48,48,0.16)_0%,rgba(153,27,27,0.06)_40%,transparent_70%)] blur-3xl sm:size-[54rem]"
      />
      <div
        aria-hidden="true"
        className="absolute -left-[30%] bottom-[-30%] size-[40rem] rounded-full bg-[radial-gradient(circle,rgba(255,48,48,0.055),transparent_66%)] blur-3xl"
      />
      <div
        data-hero-glow
        aria-hidden="true"
        className="pointer-events-none absolute left-[30%] top-[22%] hidden size-[38rem] rounded-full bg-[radial-gradient(circle,rgba(255,48,48,0.11)_0%,rgba(255,48,48,0.04)_35%,transparent_68%)] lg:block"
      />

      <div className="wrap relative z-10">
        <div className="grid lg:grid-cols-12 lg:items-start lg:gap-x-10">
          <div className="order-1 lg:col-span-7 lg:row-start-1">
            <div
              data-hero-eyebrow
              className="flex flex-wrap items-center gap-3"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/12 bg-ink/[0.03] px-3 py-1.5 backdrop-blur-sm">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/70">
                  {siteConfig.availability}
                </span>
              </span>
              <span className="hidden items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-ink/25 sm:flex">
                <MapPin className="size-2.5" strokeWidth={1.6} aria-hidden="true" />
                {siteConfig.location}
              </span>
            </div>

            <div className="mt-8 flex items-center gap-3 sm:mt-10">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
                Hello, I&apos;m
              </p>
              <span className="font-mono text-[9px] tracking-[0.18em] text-ink/20">
                / 001
              </span>
            </div>

            <h1 className="mt-4 sm:mt-5">
              <span className="sr-only">Nazmul Islam</span>
              <span
                aria-hidden="true"
                className="block overflow-hidden pb-[0.08em]"
              >
                <span
                  data-hero-line
                  className="block text-[clamp(4.2rem,11.2vw,10.2rem)] font-semibold leading-[0.8] tracking-[-0.075em] text-ink"
                >
                  NAZMUL
                </span>
              </span>
              <span aria-hidden="true" className="block overflow-hidden pb-[0.1em]">
                <span
                  data-hero-line
                  className="flex items-end gap-[0.06em] text-[clamp(4.2rem,11.2vw,10.2rem)] leading-[0.8] tracking-[-0.06em]"
                >
                  <em className="font-serif font-normal italic tracking-[-0.045em] text-ink">
                    Islam
                  </em>
                  <span className="mb-[0.16em] size-[0.1em] shrink-0 rounded-full bg-accent shadow-[0_0_30px_rgba(255,48,48,0.7)]" />
                </span>
              </span>
            </h1>

            <div
              data-hero-meta
              className="mt-5 flex flex-wrap items-center gap-3 sm:mt-6"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-ink/80">
                Full Stack Developer
              </span>
              <span className="h-px w-10 bg-ink/15" aria-hidden="true" />
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-subtle">
                {siteConfig.department}
              </span>
            </div>
          </div>

          <div
            data-hero-portrait
            className="order-2 mt-10 w-full max-w-[28rem] justify-self-center sm:mt-12 lg:order-none lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:mt-2 lg:h-full lg:max-w-none lg:justify-self-end"
          >
            <div data-portrait-tilt className="h-full">
              <Portrait
                priority
                className="aspect-[4/5] h-full min-h-[26rem] w-full lg:min-h-[35rem]"
              />
            </div>
          </div>

          <div className="order-3 mt-10 lg:col-span-7 lg:row-start-2 lg:mt-10">
            <p
              data-hero-copy
              className="max-w-[34rem] text-pretty text-[15px] leading-7 text-muted sm:text-base sm:leading-8"
            >
              I build modern, scalable, and user-focused web applications with
              clean architecture and thoughtful design.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link
                  data-hero-copy
                  href="/#projects"
                  className={buttonStyles({ size: "lg", className: "w-full sm:w-auto" })}
                >
                  Explore My Work
                  <span
                    aria-hidden="true"
                    className="flex size-6 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    <ArrowDown className="size-3.5" strokeWidth={2} />
                  </span>
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  data-hero-copy
                  href="/contact"
                  className={buttonStyles({
                    variant: "route",
                    size: "lg",
                    className: "w-full sm:w-auto",
                  })}
                >
                  Let&apos;s Talk
                </Link>
              </Magnetic>
            </div>

            <div data-hero-copy className="mt-8 flex items-center gap-4">
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-subtle">
                Find me
              </span>
              <span className="h-px w-8 bg-ink/10" aria-hidden="true" />
              <SocialLinks />
            </div>
          </div>
        </div>

        <div
          data-hero-footer
          className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-ink/10 pt-5 sm:mt-14"
        >
          <a
            href="#about"
            className="group inline-flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.22em] text-ink/45 transition-colors hover:text-ink"
          >
            <span className="relative flex h-8 w-5 items-start justify-center rounded-full border border-ink/15 pt-1.5">
              <span className="size-1 animate-[scroll-dot_2s_ease-in-out_infinite] rounded-full bg-accent" />
            </span>
            Scroll to explore
            <ArrowDown
              className="size-3 transition-transform duration-300 group-hover:translate-y-0.5"
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </a>

          <div className="hidden items-center gap-8 font-mono text-[8px] uppercase tracking-[0.18em] text-ink/30 md:flex">
            <span>{siteConfig.university}</span>
            <span>{siteConfig.semester}</span>
          </div>

          <p className="hidden font-serif text-sm italic text-ink/35 sm:block">
            Building, learning, iterating.
          </p>
        </div>
      </div>
    </section>
  );
}
