"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AmplifyNav } from "@/components/ui/amplify-nav";
import { CalendlyEmbed } from "@/components/booking/calendly-embed";
import { ServicesSignalVein } from "@/components/ui/services-bridge";

const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const TRUST = [
  { label: "Duration", value: "30 minutes" },
  { label: "Format", value: "Google Meet" },
  { label: "Invite", value: "Sent instantly" },
] as const;

const STEPS = [
  "Pick a time that works for you",
  "Share a few details about your business",
  "Receive calendar invite + Meet link by email",
] as const;

export function BookACallPage() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });

  return (
    <main className="s12-stage relative min-h-screen">
      <div className="relative z-10">
        <div className="s12-atm-hero relative">
          <section
            ref={ref}
            className="relative overflow-hidden px-5 pb-10 pt-28 md:px-8 md:pb-12 md:pt-32"
            aria-labelledby="book-hero-heading"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div className="absolute -right-[10%] top-[8%] h-[50vmin] w-[50vmin] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.18),transparent_68%)]" />
              <div className="absolute -left-[8%] bottom-[5%] h-[40vmin] w-[40vmin] rounded-full bg-[radial-gradient(circle,rgba(168,197,240,0.12),transparent_70%)]" />
            </div>

            <div className="relative z-10 mx-auto max-w-[920px] text-center">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.65, ease: easeEditorial }}
                className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.34em] text-[#B8A4FF]/90"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7C5CFF] opacity-40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7C5CFF]" />
                </span>
                Strategy Call
              </motion.p>

              <motion.h1
                id="book-hero-heading"
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.85, delay: 0.06, ease: easeEditorial }}
                className="mt-5 text-[2.65rem] leading-[1.04] tracking-[-0.04em] text-[#F4F7FC] sm:text-5xl md:text-6xl"
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                }}
              >
                Book a strategy call
                <span className="mt-1 block text-[#B8A4FF]">
                  with Scale 12x.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.7, delay: 0.16, ease: easeEditorial }}
                className="mx-auto mt-5 max-w-[32rem] text-[15px] leading-[1.7] text-[#9AA8C0] md:text-[16px]"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                Thirty focused minutes on where you are, where you want to go,
                and how Scale 12x can become the growth partner behind it.
              </motion.p>

              <motion.ul
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.7, delay: 0.28, ease: easeOutExpo }}
                className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
              >
                {TRUST.map((t) => (
                  <li key={t.label} className="text-center">
                    <p
                      className="text-[10px] uppercase tracking-[0.22em] text-[#6B7890]"
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      {t.label}
                    </p>
                    <p
                      className="mt-1 text-[14px] text-[#F4F7FC]"
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      {t.value}
                    </p>
                  </li>
                ))}
              </motion.ul>
            </div>
          </section>
        </div>

        <ServicesSignalVein />

        <div className="s12-atm-calm relative">
          <section
            className="relative scroll-mt-28 px-5 py-10 md:px-8 md:py-14"
            aria-labelledby="scheduler-heading"
          >
            <div className="mx-auto max-w-[920px]">
              <div className="mb-8 grid gap-6 md:mb-10 md:grid-cols-[1fr_1.2fr] md:items-end md:gap-10">
                <div>
                  <h2
                    id="scheduler-heading"
                    className="text-[1.75rem] tracking-[-0.03em] text-[#F4F7FC] md:text-[2rem]"
                    style={{
                      fontFamily:
                        "var(--font-playfair), 'Playfair Display', serif",
                    }}
                  >
                    Choose your time.
                  </h2>
                  <p
                    className="mt-3 text-[14px] leading-relaxed text-[#9AA8C0]"
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    Select a slot below. Confirmation, calendar invite, and
                    Google Meet arrive by email the moment you book.
                  </p>
                </div>
                <ol className="space-y-2.5">
                  {STEPS.map((step, i) => (
                    <li
                      key={step}
                      className="flex items-start gap-3 text-[13px] text-[#9AA8C0]"
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[rgba(168,197,240,0.28)] text-[10px] text-[#A8C5F0]">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="overflow-hidden rounded-[28px] border border-[rgba(168,196,240,0.14)] bg-[#07101f] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
                <CalendlyEmbed source="book-a-call-page" minHeight={720} />
              </div>

              <p
                className="mt-8 text-center text-[13px] text-[#6B7890]"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                Questions before we meet?{" "}
                <a
                  href="mailto:hello@scale12x.com"
                  className="text-[#A8C5F0] transition-colors hover:text-[#F4F7FC]"
                >
                  hello@scale12x.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
      <AmplifyNav />
    </main>
  );
}
