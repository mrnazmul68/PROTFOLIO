"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";

import { siteConfig } from "@/config/site";
import { buttonStyles } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface MobileMenuProps {
  open: boolean;
  activeSection: string;
  onClose: () => void;
}

const focusableSelector =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const emptySubscribe = () => () => {};

function useIsHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function MobileMenu({ open, activeSection, onClose }: MobileMenuProps) {
  const mounted = useIsHydrated();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 80);

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusableElements = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => element.offsetParent !== null);

      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-[90] flex flex-col overflow-y-auto bg-background"
          initial={{
            opacity: 0,
            clipPath: reduceMotion ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
          }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
          exit={{
            opacity: 0,
            clipPath: reduceMotion ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
          }}
          transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />
          <div
            aria-hidden="true"
            className="absolute -right-32 top-1/4 size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(255,48,48,0.16),transparent_66%)] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-20 left-0 select-none font-serif text-[16rem] italic leading-none text-ink/[0.025]"
          >
            N
          </div>

          <div className="relative z-10 flex h-20 shrink-0 items-center justify-between border-b border-ink/10 px-5 sm:px-8">
            <Link
              href="/"
              onClick={onClose}
              className="text-xl font-semibold tracking-[-0.05em] text-ink"
            >
              {siteConfig.logo}
              <span className="text-accent">.</span>
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="group flex size-11 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-accent/60 hover:bg-accent hover:text-black"
              >
                <X className="size-5" strokeWidth={1.6} aria-hidden="true" />
              </button>
            </div>
          </div>

          <motion.div
            className="relative z-10 flex flex-1 flex-col px-5 pb-8 pt-8 sm:px-8 sm:pt-12"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: reduceMotion ? 0 : 0.055,
                  delayChildren: reduceMotion ? 0 : 0.15,
                },
              },
            }}
          >
            <nav aria-label="Mobile primary">
              <ul className="border-t border-ink/10">
                {siteConfig.nav.map((item, index) => {
                  const active = activeSection === item.section;

                  return (
                    <motion.li
                      key={item.section}
                      variants={{
                        hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: reduceMotion ? 0 : 0.5,
                            ease: [0.16, 1, 0.3, 1],
                          },
                        },
                      }}
                      className="border-b border-ink/10"
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? "location" : undefined}
                        className="group flex items-center justify-between gap-5 py-4 sm:py-5"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="w-5 font-mono text-[9px] tracking-[0.18em] text-ink/25">
                            0{index + 1}
                          </span>
                          <span
                            className={
                              active
                                ? "font-serif text-[2rem] italic leading-none tracking-[-0.02em] text-accent sm:text-4xl"
                                : "font-serif text-[2rem] italic leading-none tracking-[-0.02em] text-ink/90 transition-colors group-hover:text-accent sm:text-4xl"
                            }
                          >
                            {item.label}
                          </span>
                        </span>
                        <ArrowUpRight
                          className="size-4 text-ink/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                          aria-hidden="true"
                        />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: reduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="mt-8"
            >
              <Link
                href="/contact"
                onClick={onClose}
                className={buttonStyles({ size: "lg", className: "w-full" })}
              >
                Let&apos;s Talk
                <ArrowUpRight className="size-4" strokeWidth={1.8} aria-hidden="true" />
              </Link>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.2 },
                },
              }}
              className="mt-auto grid gap-6 pt-12 sm:grid-cols-2 sm:items-end"
            >
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.24em] text-subtle">
                  Get in touch
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-2 inline-block break-all text-sm text-ink/80 transition-colors hover:text-accent"
                >
                  {siteConfig.email}
                </a>
                <div className="mt-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/40">
                  <span className="size-1.5 animate-blink rounded-full bg-accent" aria-hidden="true" />
                  {siteConfig.availability}
                </div>
              </div>
              <div className="sm:justify-self-end">
                <p className="mb-3 font-mono text-[8px] uppercase tracking-[0.24em] text-subtle">
                  Elsewhere
                </p>
                <SocialLinks />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
