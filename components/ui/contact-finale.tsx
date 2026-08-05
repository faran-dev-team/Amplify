"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BookCTA } from "@/components/booking/book-cta";

const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];

export function ContactFinale() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.35, once: true });
  const reduced = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative scroll-mt-28 overflow-hidden px-5 py-24 md:px-8 md:py-36"
      aria-labelledby="contact-finale-heading"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,92,255,0.2) 0%, rgba(168,197,240,0.1) 45%, transparent 70%)",
          }}
          animate={
            inView && !reduced
              ? { opacity: [0.55, 0.9, 0.55], scale: [1, 1.06, 1] }
              : { opacity: 0.6 }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[820px] text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: easeEditorial }}
          className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#A8C5F0]/90"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          Begin
        </motion.p>

        <motion.h2
          id="contact-finale-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.85, delay: 0.08, ease: easeEditorial }}
          className="mt-5 text-[2.65rem] leading-[1.05] tracking-[-0.04em] text-[#F4F7FC] sm:text-5xl md:text-6xl lg:text-[4.25rem]"
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
          }}
        >
          The next chapter
          <span className="mt-2 block text-[#B8A4FF]">starts with a call.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: 0.2, ease: easeEditorial }}
          className="mx-auto mt-6 max-w-[28rem] text-[15px] leading-[1.7] text-[#9AA8C0] md:text-[16px]"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          Thirty minutes. Clear next steps. A partner ready to scale with you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: 0.32, ease: easeEditorial }}
          className="mt-10"
        >
          <BookCTA
            source="contact-finale"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full s12-btn-primary px-9 py-4 text-[15px] font-semibold tracking-[0.02em] text-[#F4F7FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/60"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            <span className="relative z-10">Book a Strategy Call</span>
            <span
              aria-hidden
              className="relative z-10 text-[#D4C8FF] transition-transform duration-400 group-hover:translate-x-1"
            >
              →
            </span>
          </BookCTA>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-[#6B7890]"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          <a href="/services" className="transition-colors hover:text-[#B8A4FF]">
            Services
          </a>
          <span aria-hidden className="text-[#4A5568]">
            ·
          </span>
          <a href="/" className="transition-colors hover:text-[#B8A4FF]">
            Home
          </a>
          <span aria-hidden className="text-[#4A5568]">
            ·
          </span>
          <a
            href="mailto:hello@scale12x.com"
            className="transition-colors hover:text-[#B8A4FF]"
          >
            hello@scale12x.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
