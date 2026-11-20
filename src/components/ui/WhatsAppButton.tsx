import { siWhatsapp } from "simple-icons";

import { siteConfig } from "@/config/site";

export function WhatsAppButton() {
  const number = siteConfig.whatsappNumber.trim();

  if (!number) return null;

  const href = `https://wa.me/${number}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Nazmul on WhatsApp (opens in a new tab)"
      className="group fixed bottom-4 right-4 z-50 flex size-12 items-center justify-center rounded-full bg-[#25D366] text-[#062b11] shadow-[0_14px_40px_-8px_rgba(37,211,102,0.5)] transition-transform duration-300 hover:scale-105 sm:bottom-6 sm:right-6 sm:size-14"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 animate-pulse-ring rounded-full bg-[#25D366]/50"
      />
      <svg
        viewBox="0 0 24 24"
        className="size-6 sm:size-7"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d={siWhatsapp.path} />
      </svg>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#111111]/95 px-3.5 py-2 text-[10px] font-medium text-white/80 opacity-0 shadow-xl backdrop-blur transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100 sm:-translate-x-1 sm:block"
      >
        Let&apos;s Chat on WhatsApp
      </span>
    </a>
  );
}
