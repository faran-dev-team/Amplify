"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Social = {
  label: string;
  href: string;
  line: string;
  path: string;
  viewBox: string;
  /** Brand accent for icon, border, and glow */
  accent: string;
  accentSoft: string;
  iconBg: string;
  border: string;
  borderHover: string;
  glow: string;
  iconFill?: string;
  gradient?: string;
};

const SOCIALS: Social[] = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    line: "Company updates, thinking, and partnerships.",
    path: "M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.82-2.05 3.75-2.05 4.01 0 4.75 2.64 4.75 6.07V23h-4v-6.6c0-1.57-.03-3.59-2.19-3.59-2.19 0-2.53 1.71-2.53 3.48V23h-4V8.5z",
    viewBox: "0 0 24 24",
    accent: "#0A66C2",
    accentSoft: "#4DA3FF",
    iconBg: "rgba(10,102,194,0.22)",
    border: "rgba(10,102,194,0.45)",
    borderHover: "rgba(77,163,255,0.75)",
    glow: "rgba(10,102,194,0.28)",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    line: "Craft, culture, and moments from the studio.",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.69 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z",
    viewBox: "0 0 24 24",
    accent: "#E1306C",
    accentSoft: "#F77737",
    iconBg: "rgba(225,48,108,0.18)",
    border: "rgba(225,48,108,0.4)",
    borderHover: "rgba(247,119,55,0.7)",
    glow: "rgba(193,53,132,0.28)",
    gradient: "linear-gradient(135deg, #F58529 0%, #DD2A7B 45%, #8134AF 100%)",
  },
  {
    label: "X",
    href: "https://x.com",
    line: "Signals, launches, and concise updates.",
    path: "M18.244 2H21.5l-7.09 8.1L22.5 22h-6.59l-5.16-6.74L5.2 22H1.94l7.58-8.66L1.5 2h6.75l4.66 6.16L18.244 2zm-1.16 18h1.82L7.02 3.9H5.07L17.084 20z",
    viewBox: "0 0 24 24",
    accent: "#E7E9EA",
    accentSoft: "#FFFFFF",
    iconBg: "rgba(231,233,234,0.12)",
    border: "rgba(231,233,234,0.28)",
    borderHover: "rgba(231,233,234,0.55)",
    glow: "rgba(231,233,234,0.12)",
    iconFill: "#E7E9EA",
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    line: "Community and broader brand presence.",
    path: "M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.4V9.84c0-2.37 1.4-3.69 3.56-3.69 1.03 0 2.12.19 2.12.19v2.34h-1.2c-1.18 0-1.55.74-1.55 1.49v1.78h2.64l-.42 2.91h-2.22V22c4.78-.75 8.44-4.91 8.44-9.93z",
    viewBox: "0 0 24 24",
    accent: "#1877F2",
    accentSoft: "#4D9BFF",
    iconBg: "rgba(24,119,242,0.22)",
    border: "rgba(24,119,242,0.45)",
    borderHover: "rgba(77,155,255,0.75)",
    glow: "rgba(24,119,242,0.28)",
  },
];

export function ContactSocial() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });

  return (
    <section
      ref={ref}
      id="social"
      className="relative scroll-mt-28 px-5 py-16 md:px-8 md:py-24"
      aria-labelledby="contact-social-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-[560px] text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.65, ease: easeEditorial }}
            className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#7C5CFF]/80"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Connect With Scale 12x
          </motion.p>
          <motion.h2
            id="contact-social-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.75, delay: 0.06, ease: easeEditorial }}
            className="mt-4 text-[2.15rem] leading-[1.06] tracking-[-0.04em] text-[#F4F7FC] md:text-[2.65rem]"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            }}
          >
            Follow the work.
          </motion.h2>
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-4">
          {SOCIALS.map((s, i) => (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.5,
                delay: 0.08 + i * 0.06,
                ease: easeOutExpo,
              }}
            >
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border px-5 py-6 transition-[border-color,transform,box-shadow,background] duration-500 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55 md:px-6"
                style={{
                  borderColor: s.border,
                  background: `linear-gradient(165deg, ${s.iconBg} 0%, rgba(10,18,36,0.92) 55%)`,
                  boxShadow: `inset 0 1px 0 ${s.border}`,
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = s.borderHover;
                  e.currentTarget.style.boxShadow = `0 16px 40px ${s.glow}, inset 0 1px 0 ${s.borderHover}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = s.border;
                  e.currentTarget.style.boxShadow = `inset 0 1px 0 ${s.border}`;
                }}
              >
                {/* Brand wash */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
                  style={{
                    background: s.gradient ?? s.accent,
                  }}
                />

                <span
                  className="relative flex h-11 w-11 items-center justify-center rounded-full border transition-[box-shadow,transform] duration-400 group-hover:scale-[1.04]"
                  style={{
                    borderColor: s.borderHover,
                    background: s.gradient
                      ? s.gradient
                      : s.iconBg,
                    color: s.iconFill ?? "#FFFFFF",
                    boxShadow: `0 0 20px ${s.glow}`,
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox={s.viewBox}
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d={s.path} />
                  </svg>
                </span>

                <div className="relative mt-5 flex items-baseline justify-between gap-2">
                  <h3
                    className="text-[1.2rem] tracking-[-0.02em] text-[#F4F7FC]"
                    style={{
                      fontFamily:
                        "var(--font-playfair), 'Playfair Display', serif",
                    }}
                  >
                    {s.label}
                  </h3>
                  <span
                    aria-hidden
                    className="transition-[transform,color] duration-300 group-hover:translate-x-1"
                    style={{ color: s.accentSoft }}
                  >
                    →
                  </span>
                </div>
                <p
                  className="relative mt-2 text-[13px] leading-relaxed text-[#9AA8C0]"
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                  }}
                >
                  {s.line}
                </p>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
