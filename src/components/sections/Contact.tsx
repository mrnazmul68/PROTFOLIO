import {
  ArrowUpRight,
  MapPin,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";

import { siteConfig } from "@/config/site";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { ContactForm } from "@/components/ui/ContactForm";
import { Reveal } from "@/components/animations/Reveal";

const whatsappHref = siteConfig.whatsappNumber
  ? `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`
  : null;

interface ContactProps {
  headingLevel?: "h1" | "h2";
}

export function Contact({ headingLevel = "h2" }: ContactProps) {
  const Heading = headingLevel;

  return (
    <section
      id="contact"
      className="anchor-offset section-pad relative overflow-hidden border-t border-ink/10 bg-surface"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid opacity-[0.16] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -left-[24%] top-[12%] size-[48rem] rounded-full bg-[radial-gradient(circle,rgba(255,48,48,0.1),transparent_68%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-[18%] bottom-0 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(255,48,48,0.07),transparent_68%)] blur-3xl"
      />

      <div className="wrap relative z-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-subtle">
                <span className="h-px w-8 bg-accent" aria-hidden="true" />
                07 — Contact
              </div>

              <Heading className="mt-7 text-[clamp(3rem,6.2vw,6.2rem)] font-medium leading-[0.9] tracking-[-0.065em]">
                Have a project
                <br />
                <em className="font-serif font-normal italic">in mind</em>
                <span className="text-accent">?</span>
              </Heading>

              <p className="mt-7 max-w-sm text-pretty text-sm leading-7 text-muted">
                Let&apos;s connect and build something meaningful together. Tell
                me what you&apos;re working on, or just say hello.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10">
              <ul className="space-y-px">
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="group flex items-center justify-between gap-5 border-y border-ink/10 py-4 transition-colors hover:border-accent/30"
                  >
                    <span className="flex items-center gap-3">
                      <Mail className="size-4 text-ink/30 transition-colors group-hover:text-accent" strokeWidth={1.5} aria-hidden="true" />
                      <span>
                        <span className="block font-mono text-[7px] uppercase tracking-[0.18em] text-subtle">
                          Email
                        </span>
                        <span className="mt-1 block text-[13px] break-all text-ink/80 transition-colors group-hover:text-ink">
                          {siteConfig.email}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 text-ink/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.phoneHref}
                    className="group flex items-center justify-between gap-5 border-b border-ink/10 py-4 transition-colors hover:border-accent/30"
                  >
                    <span className="flex items-center gap-3">
                      <Phone className="size-4 text-ink/30 transition-colors group-hover:text-accent" strokeWidth={1.5} aria-hidden="true" />
                      <span>
                        <span className="block font-mono text-[7px] uppercase tracking-[0.18em] text-subtle">
                          Phone
                        </span>
                        <span className="mt-1 block text-[13px] text-ink/80 transition-colors group-hover:text-ink">
                          {siteConfig.phone}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 text-ink/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
                  </a>
                </li>
                {whatsappHref ? (
                  <li>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-5 border-b border-ink/10 py-4 transition-colors hover:border-accent/30"
                    >
                      <span className="flex items-center gap-3">
                        <MessageCircle className="size-4 text-ink/30 transition-colors group-hover:text-[#25D366]" strokeWidth={1.5} aria-hidden="true" />
                        <span>
                          <span className="block font-mono text-[7px] uppercase tracking-[0.18em] text-subtle">
                            WhatsApp
                          </span>
                          <span className="mt-1 block text-[13px] text-ink/80 transition-colors group-hover:text-ink">
                            Start a chat
                          </span>
                        </span>
                      </span>
                      <ArrowUpRight className="size-4 shrink-0 text-ink/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#25D366]" aria-hidden="true" />
                    </a>
                  </li>
                ) : null}
                <li className="flex items-center gap-3 border-b border-ink/10 py-4">
                  <MapPin className="size-4 text-ink/30" strokeWidth={1.5} aria-hidden="true" />
                  <span>
                    <span className="block font-mono text-[7px] uppercase tracking-[0.18em] text-subtle">
                      Based in
                    </span>
                    <span className="mt-1 block text-[13px] text-ink/80">
                      {siteConfig.location}
                    </span>
                  </span>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.16} className="mt-8">
              <div className="flex flex-wrap items-center justify-between gap-5">
                <div className="flex items-center gap-2.5 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/45">
                  <span className="size-1.5 animate-blink rounded-full bg-accent" aria-hidden="true" />
                  {siteConfig.availability}
                </div>
                <SocialLinks />
              </div>
            </Reveal>

            <Reveal delay={0.2} className="mt-10 hidden lg:block">
              <div className="relative border-l border-accent/50 pl-5">
                <p className="font-serif text-lg italic leading-6 text-ink/40">
                  &ldquo;Good work starts with a clear conversation.&rdquo;
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-14">
            <Reveal delay={0.08}>
              <ContactForm />
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 flex items-center justify-end gap-2 text-[9px] text-ink/25">
                <span className="size-1 rounded-full bg-ink/20" aria-hidden="true" />
                Prefer direct email?{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-ink/45 underline decoration-ink/15 underline-offset-2 transition-colors hover:text-accent"
                >
                  Write to me
                </a>
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1} className="mt-16">
          <div className="flex flex-col gap-4 border-t border-ink/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/25">
              Based in {siteConfig.location} · Working with people everywhere
            </p>
            <ScrambleText
              text="Available for the right conversation."
              className="font-serif text-sm italic text-ink/35"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
