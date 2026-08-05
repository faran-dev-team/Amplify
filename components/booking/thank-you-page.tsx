"use client";

import React, { Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { AmplifyNav } from "@/components/ui/amplify-nav";

const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const NEXT_STEPS = [
  {
    title: "Check your inbox",
    body: "You'll receive a confirmation email with your calendar invite and Google Meet link.",
  },
  {
    title: "Add it to your calendar",
    body: "Accept the invite so the meeting lands on your schedule with the Meet link attached.",
  },
  {
    title: "Come ready to talk growth",
    body: "A short overview of your goals and current stack helps us make the thirty minutes count.",
  },
] as const;

function ThankYouContent() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.25, once: true });
  const params = useSearchParams();
  const booked = params.get("booked") === "1";

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-20 pt-28 md:px-8 md:pt-32"
      aria-labelledby="thank-you-heading"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[28%] h-[70vmin] w-[70vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.2),transparent_68%)]" />
        <div className="absolute right-[10%] top-[18%] h-[36vmin] w-[36vmin] rounded-full bg-[radial-gradient(circle,rgba(168,197,240,0.12),transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[720px] text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.65, ease: easeEditorial }}
          className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#A8C5F0]/90"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          {booked ? "Confirmed" : "Thank you"}
        </motion.p>

        <motion.h1
          id="thank-you-heading"
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.85, delay: 0.06, ease: easeEditorial }}
          className="mt-5 text-[2.65rem] leading-[1.05] tracking-[-0.04em] text-[#F4F7FC] sm:text-5xl md:text-6xl"
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
          }}
        >
          You&apos;re booked.
          <span className="mt-2 block text-[#B8A4FF]">
            We&apos;ll see you soon.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: 0.16, ease: easeEditorial }}
          className="mx-auto mt-6 max-w-[30rem] text-[15px] leading-[1.7] text-[#9AA8C0] md:text-[16px]"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          Your strategy call is confirmed. A calendar invite and Google Meet
          link have been sent to your email.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: 0.24, ease: easeOutExpo }}
          className="mx-auto mt-8 max-w-[28rem] rounded-[22px] border border-[rgba(168,196,240,0.14)] bg-[rgba(12,21,43,0.65)] px-6 py-5 text-left"
        >
          <ul className="space-y-3">
            {[
              "Calendar invite sent",
              "Google Meet link included in email",
              "Reminder before the call",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-[14px] text-[#F4F7FC]"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(124,92,255,0.25)] text-[11px] text-[#B8A4FF]"
                  aria-hidden
                >
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: 0.34, ease: easeEditorial }}
          className="mt-12 text-left"
        >
          <p
            className="text-center text-[11px] uppercase tracking-[0.28em] text-[#6B7890]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Next steps
          </p>
          <ol className="mt-5 space-y-4">
            {NEXT_STEPS.map((step, i) => (
              <li
                key={step.title}
                className="rounded-[18px] border border-[rgba(168,196,240,0.1)] px-5 py-4"
              >
                <p
                  className="text-[10px] uppercase tracking-[0.22em] text-[#A8C5F0]"
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                  }}
                >
                  0{i + 1}
                </p>
                <h2
                  className="mt-1.5 text-[1.15rem] tracking-[-0.02em] text-[#F4F7FC]"
                  style={{
                    fontFamily:
                      "var(--font-playfair), 'Playfair Display', serif",
                  }}
                >
                  {step.title}
                </h2>
                <p
                  className="mt-1.5 text-[13px] leading-relaxed text-[#9AA8C0]"
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                  }}
                >
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: 0.45, ease: easeEditorial }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="/"
            className="s12-btn-primary inline-flex h-12 w-full items-center justify-center rounded-full px-8 text-[14px] font-semibold text-[#F4F7FC] sm:w-auto"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Return Home
          </a>
          <a
            href="/services"
            className="s12-btn-ghost inline-flex h-12 w-full items-center justify-center rounded-full px-8 text-[14px] font-semibold text-[#F4F7FC] sm:w-auto"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            View Services
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-10 text-[13px] text-[#6B7890]"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          Need to reschedule? Reply to your confirmation email or write{" "}
          <a
            href="mailto:hello@scale12x.com"
            className="text-[#A8C5F0] transition-colors hover:text-[#F4F7FC]"
          >
            hello@scale12x.com
          </a>
        </motion.p>
      </div>
    </section>
  );
}

export function ThankYouPage() {
  return (
    <main className="s12-stage relative min-h-screen">
      <div className="s12-atm-finale relative z-10">
        <Suspense
          fallback={
            <div className="flex min-h-[100svh] items-center justify-center text-[#9AA8C0]">
              Confirming…
            </div>
          }
        >
          <ThankYouContent />
        </Suspense>
      </div>
      <AmplifyNav />
    </main>
  );
}
