"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";

import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({ children, className, strength = 0.22 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      const media = gsap.matchMedia();

      media.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const xTo = gsap.quickTo(element, "x", {
            duration: 0.65,
            ease: "power3.out",
          });
          const yTo = gsap.quickTo(element, "y", {
            duration: 0.65,
            ease: "power3.out",
          });

          const onPointerMove = (event: PointerEvent) => {
            const bounds = element.getBoundingClientRect();
            xTo((event.clientX - bounds.left - bounds.width / 2) * strength);
            yTo((event.clientY - bounds.top - bounds.height / 2) * strength);
          };

          const onPointerLeave = () => {
            xTo(0);
            yTo(0);
          };

          element.addEventListener("pointermove", onPointerMove);
          element.addEventListener("pointerleave", onPointerLeave);

          return () => {
            element.removeEventListener("pointermove", onPointerMove);
            element.removeEventListener("pointerleave", onPointerLeave);
          };
        },
      );

      return () => media.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("inline-block will-change-transform", className)}>
      {children}
    </div>
  );
}
