"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Check, LoaderCircle, LockKeyhole } from "lucide-react";

import { siteConfig } from "@/config/site";
import { contactSchema, type ContactFormValues } from "@/lib/validations";
import { buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "success" | "error";

interface ApiResponse {
  ok?: boolean;
  error?: string;
  code?: string;
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  const message = useWatch({ control, name: "message" }) ?? "";

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("idle");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json().catch(() => ({}))) as ApiResponse;

      if (!response.ok) {
        setStatus("error");
        setFeedback(
          data.error ??
            "Something went wrong while sending the message. Please try again or email me directly.",
        );
        return;
      }

      setStatus("success");
      setFeedback(
        "Your message is on its way. Thank you for reaching out — I'll get back to you as soon as I can.",
      );
      reset();
    } catch {
      setStatus("error");
      setFeedback(
        "The message couldn't be sent. Please check your connection or email me directly.",
      );
    }
  };

  if (status === "success") {
    return (
      <div
        className="relative flex min-h-[28rem] flex-col items-center justify-center overflow-hidden border border-white/10 bg-[#0d0d0d] p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid opacity-20"
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,48,48,0.16),transparent_68%)] blur-2xl"
        />
        <span className="relative z-10 flex size-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
          <Check className="size-6" strokeWidth={1.8} aria-hidden="true" />
        </span>
        <p className="relative z-10 mt-6 font-mono text-[8px] uppercase tracking-[0.24em] text-accent/80">
          Message sent
        </p>
        <h3 className="relative z-10 mt-3 text-balance font-serif text-4xl italic text-white/90">
          Thank you.
        </h3>
        <p className="relative z-10 mt-4 max-w-sm text-[13px] leading-6 text-muted">
          {feedback}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={buttonStyles({
            variant: "outline",
            size: "md",
            className: "relative z-10 mt-8",
          })}
        >
          Send another message
          <ArrowUpRight className="size-4" strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden border border-white/10 bg-[#0d0d0d] p-5 sm:p-7 lg:p-8">
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-28 size-72 rounded-full bg-[radial-gradient(circle,rgba(255,48,48,0.12),transparent_68%)] blur-2xl"
      />

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.24em] text-subtle">
            Project brief / 01
          </p>
          <p className="mt-1.5 text-sm text-white/80">Tell me a little about it.</p>
        </div>
        <span className="flex items-center gap-2 font-mono text-[7px] uppercase tracking-[0.16em] text-white/35">
          <span className="size-1.5 animate-blink rounded-full bg-accent" aria-hidden="true" />
          {siteConfig.availability}
        </span>
      </div>

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-10 mt-6"
      >
        <input
          {...register("website")}
          type="text"
          name="website"
          id="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block font-mono text-[8px] uppercase tracking-[0.2em] text-white/50"
            >
              Name <span className="text-accent">*</span>
            </label>
            <input
              {...register("name")}
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              aria-required="true"
              className={cn(
                "w-full border border-white/10 bg-white/[0.02] px-3.5 py-3 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/20 focus:border-accent/60 focus:ring-1 focus:ring-accent/30",
                errors.name && "border-accent/60",
              )}
            />
            {errors.name ? (
              <p id="name-error" role="alert" className="mt-1.5 text-[10px] text-[#ff8181]">
                {errors.name.message}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-mono text-[8px] uppercase tracking-[0.2em] text-white/50"
            >
              Email <span className="text-accent">*</span>
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-required="true"
              className={cn(
                "w-full border border-white/10 bg-white/[0.02] px-3.5 py-3 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/20 focus:border-accent/60 focus:ring-1 focus:ring-accent/30",
                errors.email && "border-accent/60",
              )}
            />
            {errors.email ? (
              <p id="email-error" role="alert" className="mt-1.5 text-[10px] text-[#ff8181]">
                {errors.email.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-5">
          <label
            htmlFor="subject"
            className="mb-2 block font-mono text-[8px] uppercase tracking-[0.2em] text-white/50"
          >
            Subject <span className="text-accent">*</span>
          </label>
          <input
            {...register("subject")}
            id="subject"
            type="text"
            placeholder="A project, a question, or just hello"
            aria-invalid={errors.subject ? "true" : "false"}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            aria-required="true"
            className={cn(
              "w-full border border-white/10 bg-white/[0.02] px-3.5 py-3 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/20 focus:border-accent/60 focus:ring-1 focus:ring-accent/30",
              errors.subject && "border-accent/60",
            )}
          />
          {errors.subject ? (
            <p id="subject-error" role="alert" className="mt-1.5 text-[10px] text-[#ff8181]">
              {errors.subject.message}
            </p>
          ) : null}
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between gap-4">
            <label
              htmlFor="message"
              className="block font-mono text-[8px] uppercase tracking-[0.2em] text-white/50"
            >
              Message <span className="text-accent">*</span>
            </label>
            <span className="font-mono text-[8px] tabular-nums text-white/25">
              {message.length} / 3000
            </span>
          </div>
          <textarea
            {...register("message")}
            id="message"
            rows={5}
            placeholder="What are you thinking of building?"
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : undefined}
            aria-required="true"
            className={cn(
              "w-full resize-y border border-white/10 bg-white/[0.02] px-3.5 py-3 text-sm leading-6 text-white outline-none transition-colors duration-300 placeholder:text-white/20 focus:border-accent/60 focus:ring-1 focus:ring-accent/30",
              errors.message && "border-accent/60",
            )}
          />
          {errors.message ? (
            <p id="message-error" role="alert" className="mt-1.5 text-[10px] text-[#ff8181]">
              {errors.message.message}
            </p>
          ) : null}
        </div>

        <div aria-live="polite" className="min-h-0">
          {status === "error" && feedback ? (
            <div
              role="alert"
              className="mt-5 border border-[#ff6b6b]/25 bg-[#ff3030]/[0.06] px-4 py-3 text-[11px] leading-5 text-[#ffb3b3]"
            >
              {feedback}{" "}
              <a
                href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Portfolio enquiry")}`}
                className="underline decoration-[#ffb3b3]/40 underline-offset-2 transition-colors hover:text-white"
              >
                Email me directly
              </a>
              .
            </div>
          ) : null}
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2 text-[9px] leading-4 text-subtle">
            <LockKeyhole className="mt-0.5 size-3 shrink-0" strokeWidth={1.5} aria-hidden="true" />
            Your details are only used to reply. No lists, no sharing.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className={buttonStyles({ size: "lg", className: "shrink-0" })}
          >
            {isSubmitting ? (
              <>
                Sending
                <LoaderCircle className="size-4 animate-spin" strokeWidth={1.8} aria-hidden="true" />
              </>
            ) : (
              <>
                Send message
                <ArrowUpRight className="size-4" strokeWidth={1.8} aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
