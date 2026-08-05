"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BookCTA } from "@/components/booking/book-cta";

const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ContactHero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.35, once: false });
  const reduced = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative flex min-h-[88svh] w-full items-center overflow-hidden pt-28 pb-16 md:min-h-[92svh] md:pt-32 md:pb-20"
      aria-labelledby="contact-hero-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          className="absolute left-1/2 top-[28%] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,92,255,0.2) 0%, rgba(168,197,240,0.08) 42%, transparent 70%)",
          }}
          animate={
            inView && !reduced
              ? { opacity: [0.55, 0.9, 0.55], scale: [1, 1.05, 1] }
              : { opacity: 0.65 }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute -right-[6%] bottom-[12%] h-[38vmin] w-[38vmin] rounded-full bg-[radial-gradient(circle,rgba(168,197,240,0.12),transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[920px] px-5 text-center md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: easeEditorial }}
          className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.34em] text-[#B8A4FF]/90"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7C5CFF] opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7C5CFF]" />
          </span>
          Contact
        </motion.p>

        <motion.h1
          id="contact-hero-heading"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.06, ease: easeEditorial }}
          className="mt-5 text-[2.85rem] leading-[1.02] tracking-[-0.04em] text-[#F4F7FC] sm:text-5xl md:text-6xl lg:text-[4.5rem]"
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
          }}
        >
          We&apos;re ready
          <span className="mt-1 block text-[#B8A4FF]">when you are.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: easeEditorial }}
          className="mx-auto mt-6 max-w-[28rem] text-[15px] leading-[1.7] text-[#9AA8C0] md:text-[16px]"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          Begin a conversation with Scale 12x — strategy call, project brief, or
          a simple introduction. One partner. Clear next steps.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: easeOutExpo }}
          className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4"
        >
          <BookCTA
            source="contact-hero-book"
            className="s12-btn-primary inline-flex h-12 items-center justify-center rounded-full px-8 text-[14px] font-semibold text-[#F4F7FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Book a Strategy Call
          </BookCTA>
          <a
            href="#project"
            className="s12-btn-ghost inline-flex h-12 items-center justify-center rounded-full px-8 text-[14px] font-semibold text-[#F4F7FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Start Your Project
          </a>
        </motion.div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#050814]/85"
      />
    </section>
  );
}
