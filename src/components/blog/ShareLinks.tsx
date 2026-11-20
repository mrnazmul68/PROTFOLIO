"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Link2 } from "lucide-react";

import { BrandIcon } from "@/components/ui/BrandIcon";

interface ShareLinksProps {
  title: string;
  url: string;
}

export function ShareLinks({ title, url }: ShareLinksProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);

      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-1.5">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share this article on X"
        className="flex size-9 items-center justify-center rounded-full border border-ink/10 text-ink/45 transition-colors hover:border-accent/40 hover:text-accent"
      >
        <span className="font-mono text-[11px]">X</span>
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share this article on LinkedIn"
        className="flex size-9 items-center justify-center rounded-full border border-ink/10 text-ink/45 transition-colors hover:border-accent/40 hover:text-accent"
      >
        <BrandIcon name="linkedin" className="size-3.5" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share this article on Facebook"
        className="flex size-9 items-center justify-center rounded-full border border-ink/10 text-ink/45 transition-colors hover:border-accent/40 hover:text-accent"
      >
        <BrandIcon name="facebook" className="size-3.5" />
      </a>
      <button
        type="button"
        onClick={copyLink}
        aria-label={copied ? "Article link copied" : "Copy article link"}
        className="flex size-9 items-center justify-center rounded-full border border-ink/10 text-ink/45 transition-colors hover:border-accent/40 hover:text-accent"
      >
        {copied ? (
          <Check className="size-3.5 text-accent" strokeWidth={1.8} aria-hidden="true" />
        ) : (
          <Link2 className="size-3.5" strokeWidth={1.7} aria-hidden="true" />
        )}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Article link copied to clipboard." : ""}
      </span>
    </div>
  );
}
