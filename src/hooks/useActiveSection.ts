"use client";

import { useEffect, useState } from "react";

export function useActiveSection(
  sectionIds: readonly string[],
  enabled = true,
): string {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");
  const key = sectionIds.join("|");

  useEffect(() => {
    if (!enabled) return;

    const elements = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-22% 0px -62% 0px",
        threshold: [0, 0.1, 0.5],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [enabled, key]);

  return activeSection;
}
