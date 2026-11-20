"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import { gsap, registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface ScrambleTextProps {
  text: string;
  className?: string;
}

const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}=+*^?#";

export function ScrambleText({ text, className }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const element = ref.current;
      if (!element) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const characters = Array.from(text);
        const proxy = { progress: 0 };

        gsap.to(proxy, {
          progress: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 96%",
            once: true,
          },
          onStart: () => {
            element.textContent = characters
              .map((character) => (character === " " ? " " : glyphs[0]))
              .join("");
          },
          onUpdate: () => {
            const revealed = Math.floor(proxy.progress * characters.length);

            element.textContent = characters
              .map((character, index) => {
                if (character === " ") return " ";
                if (index < revealed) return character;
                return glyphs[Math.floor(Math.random() * glyphs.length)];
              })
              .join("");
          },
          onComplete: () => {
            element.textContent = text;
          },
        });
      });

      return () => media.revert();
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={cn(className)} aria-label={text}>
      {text}
    </span>
  );
}
