"use client";

import React, {
  useId,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

/* ─────────────────────────────────────────────
   Design tokens
───────────────────────────────────────────── */

const PURPLE = "#A855F7";
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];

const springMagnetic = {
  type: "spring" as const,
  stiffness: 280,
  damping: 26,
  mass: 0.45,
};

const DESTINATIONS = [
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#services" },
  { label: "Transformation Archive", href: "#work" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
] as const;

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    path: "M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.82-2.05 3.75-2.05 4.01 0 4.75 2.64 4.75 6.07V23h-4v-6.6c0-1.57-.03-3.59-2.19-3.59-2.19 0-2.53 1.71-2.53 3.48V23h-4V8.5z",
  },
  {
    label: "X",
    href: "https://x.com",
    path: "M18.244 2H21.5l-7.09 8.1L22.5 22h-6.59l-5.16-6.74L5.2 22H1.94l7.58-8.66L1.5 2h6.75l4.66 6.16L18.244 2zm-1.16 18h1.82L7.02 3.9H5.07L17.084 20z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.69 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z",
  },
] as const;

/* ─────────────────────────────────────────────
   Signal completes into a circle — full journey
───────────────────────────────────────────── */

function SignalCompletion({ active }: { active: boolean }) {
  const uid = useId().replace(/:/g, "");

  return (
    <div className="pointer-events-none relative mx-auto mb-10 h-44 w-full max-w-md md:mb-14 md:h-52">
      <svg
        className="h-full w-full"
        viewBox="0 0 360 200"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <filter id={`closeBloom-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id={`closeCore-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5E9FF" stopOpacity="0.55" />
            <stop offset="40%" stopColor={PURPLE} stopOpacity="0.28" />
            <stop offset="100%" stopColor={PURPLE} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Descent from conversation */}
        <motion.path
          d="M 180 0 C 180 28, 180 48, 180 68"
          fill="none"
          stroke={PURPLE}
          strokeWidth={1.5}
          strokeLinecap="round"
          filter={`url(#closeBloom-${uid})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            active
              ? { pathLength: 1, opacity: 0.35 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 1.2, ease: easeEditorial }}
        />

        {/* Circle completion — the journey becomes whole */}
        <motion.circle
          cx={180}
          cy={118}
          r={42}
          fill="none"
          stroke={PURPLE}
          strokeWidth={1.4}
          strokeLinecap="round"
          filter={`url(#closeBloom-${uid})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            active
              ? { pathLength: 1, opacity: 0.38 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 2.2, delay: 0.45, ease: easeEditorial }}
        />

        <motion.circle
          cx={180}
          cy={118}
          r={28}
          fill={`url(#closeCore-${uid})`}
          filter={`url(#closeBloom-${uid})`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            active
              ? { opacity: 0.5, scale: 1 }
              : { opacity: 0, scale: 0.5 }
          }
          transition={{ duration: 1.4, delay: 0.9, ease: easeOutExpo }}
        />

        <motion.circle
          cx={180}
          cy={118}
          r={3.5}
          fill="#E9D5FF"
          initial={{ opacity: 0 }}
          animate={
            active
              ? { opacity: [0.45, 0.85, 0.45], scale: [1, 1.15, 1] }
              : { opacity: 0 }
          }
          transition={
            active
              ? {
                  duration: 4.2,
                  delay: 1.4,
                  ease: "easeInOut",
                  repeat: Infinity,
                }
              : { duration: 0.4 }
          }
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Signal flowing into the CTA
───────────────────────────────────────────── */

function CtaSignal({ active, hovering }: { active: boolean; hovering: boolean }) {
  const uid = useId().replace(/:/g, "");

  return (
    <div className="pointer-events-none relative mx-auto mb-[-6px] h-16 w-full max-w-[220px] md:h-20">
      <svg
        className="h-full w-full"
        viewBox="0 0 220 80"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <filter id={`ctaInBloom-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={`ctaInGrad-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={PURPLE} stopOpacity="0" />
            <stop offset="50%" stopColor={PURPLE} stopOpacity="0.7" />
            <stop offset="100%" stopColor="#E9D5FF" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        <motion.path
          d="M 110 4 C 110 28, 110 48, 110 76"
          fill="none"
          stroke={`url(#ctaInGrad-${uid})`}
          strokeWidth={1.8}
          strokeLinecap="round"
          filter={`url(#ctaInBloom-${uid})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            active
              ? { pathLength: 1, opacity: hovering ? 0.75 : 0.4 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 1.3, delay: 0.2, ease: easeEditorial }}
        />

        {/* Traveling point on hover */}
        <motion.circle
          cx={110}
          r={3}
          fill="#F5E9FF"
          filter={`url(#ctaInBloom-${uid})`}
          initial={{ cy: 4, opacity: 0 }}
          animate={
            hovering
              ? { cy: [4, 76], opacity: [0, 1, 1, 0] }
              : { cy: 4, opacity: 0 }
          }
          transition={{ duration: 1.05, ease: easeOutExpo }}
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Hero CTA — magnetic destination
───────────────────────────────────────────── */

function ClosingCTA({
  active,
  onHoverChange,
}: {
  active: boolean;
  onHoverChange: (v: boolean) => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springMagnetic);
  const springY = useSpring(y, springMagnetic);
  const reduced = useReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.12);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.14);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    onHoverChange(false);
  };

  return (
    <motion.a
      ref={ref}
      href="mailto:hello@amplifyitmedia.com"
      onMouseMove={handleMove}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={handleLeave}
      style={{
        x: springX,
        y: springY,
        fontFamily: "var(--font-space-grotesk), sans-serif",
      }}
      initial={{ opacity: 0, y: 22 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.95, delay: 0.35, ease: easeEditorial }}
      whileHover={reduced ? undefined : { scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
      className="group relative mx-auto flex h-[58px] w-full max-w-[320px] items-center justify-center overflow-hidden rounded-full border border-[#A855F7]/45 bg-[#0A0B12]/90 px-10 text-[14px] font-medium tracking-[0.02em] text-white shadow-[0_0_40px_rgba(168,85,247,0.12)] transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#C084FC]/70 hover:shadow-[0_0_56px_rgba(168,85,247,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]/55 md:h-[64px] md:max-w-[360px] md:text-[15px]"
    >
      {/* Soft breathing glow */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full bg-[#A855F7]/10"
        animate={
          reduced
            ? { opacity: 0.35 }
            : { opacity: [0.2, 0.4, 0.2] }
        }
        transition={
          reduced
            ? { duration: 0.3 }
            : { duration: 4.5, ease: "easeInOut", repeat: Infinity }
        }
      />

      {/* Hover fill */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-[#A855F7] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />

      {/* Signal sweep across CTA on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[280%] group-hover:opacity-100"
      />

      <span className="relative z-10">Ready when you are.</span>
    </motion.a>
  );
}

/* ─────────────────────────────────────────────
   Destinations — secondary, quiet
───────────────────────────────────────────── */

function DestinationLink({
  label,
  href,
  delay,
  active,
}: {
  label: string;
  href: string;
  delay: number;
  active: boolean;
}) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 10 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.65, delay, ease: easeEditorial }}
      className="group relative inline-flex py-1.5 text-[13px] font-medium tracking-[0.04em] text-white/40 transition-colors duration-400 hover:text-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]/45"
      style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
    >
      {label}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-px mx-auto h-px w-0 bg-[#A855F7]/80 transition-[width] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full group-focus-visible:w-full"
      />
    </motion.a>
  );
}

/* ─────────────────────────────────────────────
   Social — monochrome, quiet signal on hover
───────────────────────────────────────────── */

function SocialIcon({
  label,
  href,
  path,
  delay,
  active,
}: {
  label: string;
  href: string;
  path: string;
  delay: number;
  active: boolean;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      initial={{ opacity: 0, y: 8 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
      transition={{ duration: 0.55, delay, ease: easeEditorial }}
      className="group relative flex h-10 w-10 items-center justify-center rounded-full text-white/30 transition-colors duration-400 hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]/45"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d={path} />
      </svg>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 shadow-[0_0_18px_rgba(168,85,247,0.35)] transition-opacity duration-400 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-[#A855F7]/70 transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-4"
      />
    </motion.a>
  );
}

/* ─────────────────────────────────────────────
   Journey complete — quiet 100%
───────────────────────────────────────────── */

function JourneyComplete({ active }: { active: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={active ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.2, delay: 0.6, ease: easeEditorial }}
      className="mx-auto flex w-full max-w-[120px] flex-col items-center gap-2"
      aria-hidden
    >
      <div className="relative h-px w-full overflow-hidden bg-white/[0.06]">
        <motion.div
          className="absolute inset-y-0 left-0 bg-[#A855F7]/55"
          initial={{ width: "0%" }}
          animate={active ? { width: "100%" } : { width: "0%" }}
          transition={{ duration: 1.6, delay: 0.8, ease: easeEditorial }}
        />
      </div>
      <p
        className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/20"
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        Complete
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Origin point — where the story began
───────────────────────────────────────────── */

function OriginPoint({ active }: { active: boolean }) {
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto mt-14 flex h-16 w-16 items-center justify-center md:mt-16">
      <motion.span
        aria-hidden
        className="absolute h-10 w-10 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.22) 0%, transparent 70%)",
        }}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={
          active
            ? reduced
              ? { opacity: 0.5, scale: 1 }
              : { opacity: [0.25, 0.55, 0.25], scale: [0.92, 1.08, 0.92] }
            : { opacity: 0, scale: 0.4 }
        }
        transition={
          active && !reduced
            ? { duration: 5.5, ease: "easeInOut", repeat: Infinity, delay: 1.2 }
            : { duration: 1.2, delay: 1, ease: easeOutExpo }
        }
      />
      <motion.span
        aria-hidden
        className="relative z-[1] block h-[5px] w-[5px] rounded-full bg-[#E9D5FF]"
        style={{
          boxShadow: "0 0 12px rgba(168,85,247,0.7), 0 0 28px rgba(168,85,247,0.3)",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={
          active
            ? reduced
              ? { opacity: 0.75, scale: 1 }
              : { opacity: [0.45, 0.9, 0.45], scale: [1, 1.2, 1] }
            : { opacity: 0, scale: 0 }
        }
        transition={
          active && !reduced
            ? { duration: 4, ease: "easeInOut", repeat: Infinity, delay: 1.4 }
            : { duration: 0.8, delay: 1.2, ease: easeOutExpo }
        }
      />
      <span className="sr-only">Growth, amplified. One partner. Every channel. Built on AI.</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main closing chapter
───────────────────────────────────────────── */

export function ClosingChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  const inView = useInView(sectionRef, {
    once: false,
    amount: 0.08,
    margin: "-4% 0px -6% 0px",
  });
  const headlineInView = useInView(headlineRef, { once: false, amount: 0.4 });
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.45 });
  const metaInView = useInView(metaRef, { once: false, amount: 0.3 });
  const reduced = useReducedMotion();

  const [ctaHover, setCtaHover] = useState(false);
  const sceneActive = (inView || headlineInView) && !reduced;

  return (
    <footer
      ref={sectionRef}
      id="contact"
      aria-label="Contact Amplify IT & Media"
      className="relative z-0 -mt-24 overflow-hidden pb-16 pt-8 md:-mt-32 md:pb-20 md:pt-12"
    >
      {/* Absolute black descent — calmest atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#030208]/40 via-[#020106]/85 to-[#000000]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[20%] z-[1] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#A855F7]/[0.03] blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-40 bg-gradient-to-b from-[#030208]/50 to-transparent"
      />

      <div className="relative z-[6] mx-auto flex max-w-[920px] flex-col items-center px-5 text-center md:px-8">
        <SignalCompletion active={sceneActive} />

        {/* Editorial centerpiece */}
        <div ref={headlineRef} className="mb-8 md:mb-10">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={
              headlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
            }
            transition={{ duration: 0.75, ease: easeEditorial }}
            className="mb-5 text-[11px] font-medium uppercase tracking-[0.34em] text-[#A855F7]/60 md:mb-6"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Growth, amplified.
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={
              headlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 1.05, delay: 0.08, ease: easeEditorial }}
            className="mx-auto max-w-4xl text-[2.75rem] font-medium leading-[1.05] tracking-[-0.04em] text-white md:text-6xl lg:text-[5rem] xl:text-[5.5rem]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Let&apos;s grow.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={
              headlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
            }
            transition={{ duration: 0.9, delay: 0.22, ease: easeEditorial }}
            className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-white/35 md:mt-7 md:text-base"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            One partner. Every channel. Built on AI. The next move is yours.
          </motion.p>
        </div>

        {/* CTA destination */}
        <div ref={ctaRef} className="relative mb-20 w-full md:mb-28">
          <CtaSignal active={ctaInView && !reduced} hovering={ctaHover} />
          <ClosingCTA
            active={ctaInView || !!reduced}
            onHoverChange={setCtaHover}
          />
        </div>

        {/* Destinations */}
        <nav
          aria-label="Essential destinations"
          className="mb-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:mb-20 md:gap-x-10"
        >
          {DESTINATIONS.map((d, i) => (
            <DestinationLink
              key={d.href}
              label={d.label}
              href={d.href}
              delay={0.08 + i * 0.05}
              active={metaInView || headlineInView}
            />
          ))}
        </nav>

        {/* Manifesto */}
        <div ref={metaRef} className="mb-16 max-w-xl md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={
              metaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
            }
            transition={{ duration: 0.9, ease: easeEditorial }}
            className="text-[17px] leading-[1.65] tracking-[-0.015em] text-white/45 md:text-[19px] md:leading-[1.7]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            For US businesses tired of juggling five agencies to grow — Amplify
            delivers everything with the speed of a startup and the depth of an
            enterprise team.
          </motion.p>
        </div>

        {/* Contact signature */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={metaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.75, delay: 0.12, ease: easeEditorial }}
          className="mb-12 flex flex-col items-center gap-3 md:mb-14"
        >
          <a
            href="mailto:hello@amplifyitmedia.com"
            className="text-[14px] tracking-[0.02em] text-white/50 transition-colors duration-400 hover:text-[#E9D5FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]/45"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            hello@amplifyitmedia.com
          </a>
          <p
            className="text-[13px] tracking-[0.06em] text-white/25"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Global talent · US pricing
          </p>
        </motion.div>

        {/* Social */}
        <div className="mb-14 flex items-center justify-center gap-5 md:mb-16 md:gap-6">
          {SOCIALS.map((s, i) => (
            <SocialIcon
              key={s.label}
              label={s.label}
              href={s.href}
              path={s.path}
              delay={0.15 + i * 0.06}
              active={metaInView}
            />
          ))}
        </div>

        {/* Brand mark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={metaInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: easeEditorial }}
          className="mb-10"
        >
          <Image
            src="/logo.png"
            alt="Amplify"
            width={72}
            height={72}
            className="mx-auto h-[72px] w-[72px] object-contain opacity-70 drop-shadow-[0_0_20px_rgba(168,85,247,0.35)]"
          />
        </motion.div>

        <JourneyComplete active={metaInView && !reduced} />

        {/* Origin point — full circle */}
        <OriginPoint active={metaInView || ctaInView} />

        <motion.p
          initial={{ opacity: 0 }}
          animate={metaInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: easeEditorial }}
          className="mt-8 text-[11px] tracking-[0.08em] text-white/18"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          © {new Date().getFullYear()} Amplify IT & Media. Growth, amplified.
        </motion.p>
      </div>
    </footer>
  );
}
