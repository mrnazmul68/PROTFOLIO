import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-[-0.01em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "btn-shine bg-accent text-[#080808] shadow-[0_12px_42px_-16px_rgba(255,48,48,0.65)] hover:bg-accent-hover hover:shadow-[0_18px_50px_-14px_rgba(255,48,48,0.55)]",
  outline:
    "border border-ink/15 bg-ink/[0.02] text-ink hover:border-accent/50 hover:bg-ink/[0.05]",
  ghost: "text-muted hover:text-ink",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-xs",
  md: "h-12 px-5 text-[13px]",
  lg: "h-14 px-7 text-sm",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleOptions = {}): string {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  showArrow?: boolean;
  type?: "button" | "submit";
  ariaLabel?: string;
}

function ButtonArrow() {
  return (
    <ArrowUpRight
      aria-hidden="true"
      className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      strokeWidth={1.8}
    />
  );
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  showArrow = true,
  type = "button",
  ariaLabel,
}: ButtonProps) {
  const classes = buttonStyles({ variant, size, className });
  const isExternal = href ? /^(https?:|mailto:|tel:)/.test(href) : false;

  if (href && isExternal) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
        {showArrow ? <ButtonArrow /> : null}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
        {showArrow ? <ButtonArrow /> : null}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} aria-label={ariaLabel}>
      {children}
      {showArrow ? <ButtonArrow /> : null}
    </button>
  );
}
