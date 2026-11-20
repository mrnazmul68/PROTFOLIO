"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";

import { cn } from "@/lib/utils";
import { gsap, registerGsap } from "@/lib/gsap";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  start?: string;
}

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 30,
  start = "top 88%",
}: RevealProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!scope.current) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          scope.current,
          { autoAlpha: 0, y: distance },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            delay,
            scrollTrigger: {
              trigger: scope.current,
              start,
              once: true,
            },
          },
        );
      });

      return () => media.revert();
    },
    { scope },
  );

  return (
    <div ref={scope} className={cn(className)}>
      {children}
    </div>
  );
}
