"use client";

import { useEffect, type ReactNode } from "react";

import { registerGsap, ScrollTrigger } from "@/lib/gsap";

export function GSAPProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    registerGsap();

    const refresh = () => ScrollTrigger.refresh();
    const timer = window.setTimeout(refresh, 250);

    if (document.fonts) {
      document.fonts.ready.then(refresh).catch(() => undefined);
    }

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return <>{children}</>;
}
