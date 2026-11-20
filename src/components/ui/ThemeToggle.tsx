"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

type Theme = "dark" | "light";

const STORAGE_KEY = "nazmul-theme";
const THEME_EVENT = "portfolio-theme-change";

function getTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

function applyTheme(theme: Theme, persist: boolean) {
  const root = document.documentElement;
  const light = theme === "light";

  root.classList.toggle("light", light);
  root.style.colorScheme = theme;

  if (persist) {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage can be unavailable in private or restricted contexts.
    }
  }

  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", light ? "#f3f0e8" : "#080808");
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    const next: Theme = event.newValue === "light" ? "light" : "dark";
    applyTheme(next, false);
    onChange();
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(THEME_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(THEME_EVENT, onChange);
  };
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "dark" as const);
  const isLight = theme === "light";
  const nextTheme = isLight ? "dark" : "light";

  useEffect(() => {
    applyTheme(getTheme(), false);
  }, [theme]);

  const toggleTheme = () => {
    applyTheme(nextTheme, true);
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      data-theme-toggle
      className={cn(
        "cursor-pointer group relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-ink/10 text-muted transition-colors duration-300 hover:border-accent/45 hover:text-accent",
        className,
      )}
    >
      <Sun
        aria-hidden="true"
        strokeWidth={1.6}
        className={cn(
          "absolute size-[16px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isLight ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0",
        )}
      />
      <Moon
        aria-hidden="true"
        strokeWidth={1.6}
        className={cn(
          "absolute size-[15px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isLight ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100",
        )}
      />
      <span className="sr-only">
        {isLight ? "Light theme active." : "Dark theme active."}
      </span>
    </button>
  );
}

export function ThemeScript() {
  const script = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");var l=t==="light";var r=document.documentElement;r.classList.toggle("light",l);r.style.colorScheme=l?"light":"dark";var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",l?"#f3f0e8":"#080808");}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
