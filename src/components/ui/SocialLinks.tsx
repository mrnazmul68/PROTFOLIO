import { ArrowUpRight, Mail } from "lucide-react";

import { socialLinks } from "@/config/site";
import type { SocialKey } from "@/types/profile";
import { cn } from "@/lib/utils";
import { BrandIcon } from "@/components/ui/BrandIcon";

function SocialIcon({
  social,
  className,
}: {
  social: SocialKey;
  className?: string;
}) {
  if (social === "email") {
    return <Mail className={className} strokeWidth={1.7} aria-hidden="true" />;
  }

  return <BrandIcon name={social} className={className} />;
}

interface SocialLinksProps {
  variant?: "icons" | "list";
  className?: string;
  iconClassName?: string;
}

export function SocialLinks({
  variant = "icons",
  className,
  iconClassName,
}: SocialLinksProps) {
  if (variant === "list") {
    return (
      <ul className={cn("grid grid-cols-2 gap-x-6 gap-y-3", className)}>
        {socialLinks.map((link) => {
          const external = link.href.startsWith("http");
          return (
            <li key={link.key}>
              <a
                href={link.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
              >
                {link.label}
                <ArrowUpRight
                  className="size-3.5 text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  aria-hidden="true"
                />
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {socialLinks.map((link) => {
        const external = link.href.startsWith("http");

        return (
          <li key={link.key}>
            <a
              href={link.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              aria-label={link.label}
              title={link.label}
              className={cn(
                "group flex size-10 items-center justify-center rounded-full border border-ink/10 text-muted transition-all duration-300 hover:border-accent/50 hover:bg-accent hover:text-[#080808]",
                iconClassName,
              )}
            >
              <SocialIcon social={link.key} className="size-[15px]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
