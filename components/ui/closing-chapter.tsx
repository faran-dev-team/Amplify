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
import { useBooking } from "@/components/booking/booking-provider";
import { BOOKING_PATH } from "@/lib/booking";

/* ─────────────────────────────────────────────
   Design tokens
───────────────────────────────────────────── */

const PURPLE = "#7C5CFF";
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];

const springMagnetic = {
  type: "spring" as const,
  stiffness: 280,
  damping: 26,
  mass: 0.45,
};

/**
 * Vertical rhythm scale (optical, not just mathematical)
 * s  = 16–20px   within a block
 * m  = 28–32px   related blocks
 * l  = 40–48px   section breaks
 * xl = 56–64px   major chapter beats (CTA → meta, social → logo)
 */
const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/contact" },
] as const;

const LOCATIONS = [
  "London",
  "New York",
  "Dubai",
  "San Francisco",
  "Riyadh",
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
    <div className="pointer-events-none relative mx-auto mb-2 h-[72px] w-full max-w-sm md:mb-3 md:h-20">
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
          fill="#D4C8FF"
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
    <div className="pointer-events-none relative mx-auto -mb-1 h-12 w-full max-w-[200px] md:h-14">
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
            <stop offset="100%" stopColor="#D4C8FF" stopOpacity="0.9" />
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
              ? { pathLength: 1, opacity: hovering ? 0.8 : 0.45 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 1.3, delay: 0.2, ease: easeEditorial }}
        />

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
   Hero CTA — magnetic destination / grand finale
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
  const { openBooking } = useBooking();

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
    <div className="relative mx-auto flex w-full max-w-[360px] justify-center">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C5CFF]/[0.07] blur-[40px]"
        animate={
          reduced
            ? { opacity: 0.5 }
            : { opacity: [0.35, 0.58, 0.35] }
        }
        transition={
          reduced
            ? { duration: 0.3 }
            : { duration: 5, ease: "easeInOut", repeat: Infinity }
        }
      />

      <motion.a
        ref={ref}
        href={BOOKING_PATH}
        onClick={(e) => {
          e.preventDefault();
          openBooking("footer-start-scaling");
        }}
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
        whileHover={reduced ? undefined : { scale: 1.02 }}
        whileTap={{ scale: 0.985 }}
        className="group relative flex h-[58px] w-full max-w-[320px] items-center justify-center overflow-hidden rounded-full s12-btn-primary px-12 text-[14px] font-medium tracking-[0.04em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55 md:h-[64px] md:max-w-[360px] md:text-[15px]"
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full bg-[#7C5CFF]/12"
          animate={
            reduced
              ? { opacity: 0.4 }
              : { opacity: [0.22, 0.48, 0.22] }
          }
          transition={
            reduced
              ? { duration: 0.3 }
              : { duration: 4.5, ease: "easeInOut", repeat: Infinity }
          }
        />

        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/28 to-transparent opacity-0 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[280%] group-hover:opacity-100"
        />

        {/* Label optically centered; arrow sits outside the visual weight */}
        <span className="relative z-10">
          Start Scaling
          <span
            aria-hidden
            className="absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 text-[13px] opacity-65 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </motion.a>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Grouped destinations — equal visual weight
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
      initial={{ opacity: 0, y: 8 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
      transition={{ duration: 0.6, delay, ease: easeEditorial }}
      className="group relative inline-flex py-1 text-[13px] font-medium tracking-[0.02em] text-[#9AA8C0]/90 transition-colors duration-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/45"
      style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
    >
      {label}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-px mx-auto h-px w-0 bg-[#7C5CFF]/80 transition-[width] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full group-focus-visible:w-full"
      />
    </motion.a>
  );
}

function FooterNav({ active }: { active: boolean }) {
  return (
    <nav
      aria-label="Footer"
      className="mx-auto flex w-full max-w-[480px] flex-wrap items-center justify-center gap-x-8 gap-y-2"
    >
      {FOOTER_LINKS.map((link, i) => (
        <DestinationLink
          key={link.href}
          label={link.label}
          href={link.href}
          delay={0.08 + i * 0.05}
          active={active}
        />
      ))}
    </nav>
  );
}

/* ─────────────────────────────────────────────
   Social — one cohesive group
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
      initial={{ opacity: 0, y: 8, scale: 0.92 }}
      animate={
        active
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 6, scale: 0.94 }
      }
      transition={{ duration: 0.55, delay, ease: easeEditorial }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      className="group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(168,196,240,0.12)] bg-[rgba(16,26,50,0.5)] text-[#6B7890] shadow-[inset_0_1px_0_rgba(232,240,255,0.04)] backdrop-blur-[8px] transition-[border-color,color,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[rgba(184,164,255,0.32)] hover:bg-[rgba(124,92,255,0.1)] hover:text-[#D4C8FF] hover:shadow-[inset_0_1px_0_rgba(232,240,255,0.06),0_0_20px_rgba(124,92,255,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/45"
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
      >
        <path d={path} />
      </svg>
    </motion.a>
  );
}

function SocialRow({ active }: { active: boolean }) {
  return (
    <div
      role="list"
      aria-label="Social links"
      className="mx-auto flex items-center justify-center gap-3"
    >
      {SOCIALS.map((s, i) => (
        <div key={s.label} role="listitem">
          <SocialIcon
            label={s.label}
            href={s.href}
            path={s.path}
            delay={0.12 + i * 0.06}
            active={active}
          />
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Locations — editorial
───────────────────────────────────────────── */

function GlobalLocations({ active }: { active: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.75, delay: 0.14, ease: easeEditorial }}
      className="mx-auto flex w-full max-w-lg flex-col items-center"
    >
      <p
        className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.28em] text-[#6B7890]/75"
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        Global Presence
      </p>
      <ul className="flex flex-wrap items-center justify-center gap-y-1.5 px-2">
        {LOCATIONS.map((city, i) => (
          <li key={city} className="flex items-center">
            {i > 0 && (
              <span
                aria-hidden
                className="mx-2.5 inline-block h-px w-2.5 bg-[#7C5CFF]/35 md:mx-3 md:w-3"
              />
            )}
            <span
              className="text-[12px] font-medium tracking-[0.06em] text-[#9AA8C0]/80 md:text-[12.5px]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              {city}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Brand mark — visual signature
───────────────────────────────────────────── */

function BrandMark({ active }: { active: boolean }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 1, delay: 0.2, ease: easeEditorial }}
      className="relative mx-auto flex w-full max-w-sm flex-col items-center"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[38%] h-32 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C5CFF]/[0.11] blur-[44px] md:h-40 md:w-64"
        animate={
          reduced
            ? { opacity: 0.55 }
            : { opacity: [0.4, 0.68, 0.4] }
        }
        transition={
          reduced
            ? { duration: 0.3 }
            : { duration: 6, ease: "easeInOut", repeat: Infinity }
        }
      />

      <Image
        src="/brand/scale-12x.png"
        alt="Scale 12x"
        width={674}
        height={448}
        sizes="(max-width: 768px) 188px, 228px"
        quality={100}
        className="relative z-[1] mx-auto h-[88px] w-auto object-contain opacity-95 drop-shadow-[0_0_32px_rgba(124,92,255,0.3)] md:h-[108px]"
      />

      <p
        className="relative z-[1] mt-3.5 text-[10px] font-medium uppercase tracking-[0.3em] text-[#B8A4FF]/70 md:mt-4"
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        AI-Native Growth Studio
      </p>
      <p
        className="relative z-[1] mt-2 max-w-[260px] text-center text-[12px] leading-[1.65] tracking-[0.05em] text-[#6B7890]"
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        Growth. Strategy. Technology. Execution.
        <br />
        One Partner. Every Channel.
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Closing signal — divider + pulse before ©
───────────────────────────────────────────── */

function ClosingSignal({ active }: { active: boolean }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={active ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1, delay: 0.35, ease: easeEditorial }}
      className="mx-auto flex w-full max-w-[160px] items-center justify-center"
      aria-hidden
    >
      <div className="flex w-full items-center gap-2.5">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.1]" />
        <motion.span
          className="relative block h-[4px] w-[4px] shrink-0 rounded-full bg-[#D4C8FF]"
          style={{
            boxShadow:
              "0 0 8px rgba(124,92,255,0.6), 0 0 18px rgba(124,92,255,0.25)",
          }}
          animate={
            active && !reduced
              ? { opacity: [0.45, 0.95, 0.45], scale: [1, 1.2, 1] }
              : { opacity: active ? 0.7 : 0, scale: 1 }
          }
          transition={
            active && !reduced
              ? { duration: 3.8, ease: "easeInOut", repeat: Infinity }
              : { duration: 0.6 }
          }
        />
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.1]" />
      </div>
    </motion.div>
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
  const metaInView = useInView(metaRef, { once: false, amount: 0.25 });
  const reduced = useReducedMotion();

  const [ctaHover, setCtaHover] = useState(false);
  const sceneActive = (inView || headlineInView) && !reduced;
  const navActive = metaInView || headlineInView;

  return (
    <footer
      ref={sectionRef}
      id="contact"
      aria-label="Contact Scale 12x"
      className="relative z-0 -mt-28 overflow-hidden pb-6 pt-2 md:-mt-36 md:pb-7 md:pt-3"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#050814]/40 via-[#02040A]/85 to-[#02040A]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[18%] z-[1] h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#7C5CFF]/[0.04] blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-16 bg-gradient-to-b from-[#050814]/50 to-transparent"
      />

      {/* Single centered column — one optical vertical axis */}
      <div className="relative z-[6] mx-auto flex w-full max-w-[720px] flex-col items-center px-5 text-center md:px-8">
        <SignalCompletion active={sceneActive} />

        {/* ── CTA chapter ── */}
        <div ref={headlineRef} className="flex w-full flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={
              headlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
            }
            transition={{ duration: 0.75, ease: easeEditorial }}
            className="mb-3 text-[11px] font-medium uppercase tracking-[0.36em] text-[#7C5CFF]/70"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Ready to Scale?
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={
              headlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 1.05, delay: 0.08, ease: easeEditorial }}
            className="max-w-4xl text-[2.75rem] font-medium leading-[1.02] tracking-[-0.045em] text-white md:text-[3.75rem] lg:text-[4.75rem] xl:text-[5.25rem]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Let&apos;s Scale.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={
              headlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
            }
            transition={{ duration: 0.9, delay: 0.22, ease: easeEditorial }}
            className="mt-3 max-w-[340px] text-[15px] leading-[1.55] text-[#9AA8C0]/90 md:mt-3.5 md:max-w-[380px] md:text-[15.5px]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            One partner. Every channel. Built on AI.
            <span className="mt-1 block text-[#6B7890]">
              The next move is yours.
            </span>
          </motion.p>
        </div>

        <div
          ref={ctaRef}
          className="relative mt-6 flex w-full flex-col items-center md:mt-7"
        >
          <CtaSignal active={ctaInView && !reduced} hovering={ctaHover} />
          <ClosingCTA
            active={ctaInView || !!reduced}
            onHoverChange={setCtaHover}
          />
        </div>

        {/* ── Meta chapter ── */}
        <div
          ref={metaRef}
          className="mt-11 flex w-full flex-col items-center md:mt-12"
        >
          <FooterNav active={navActive} />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={
              metaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
            }
            transition={{ duration: 0.9, ease: easeEditorial }}
            className="mt-9 max-w-[480px] text-[15.5px] leading-[1.68] tracking-[-0.012em] text-[#9AA8C0] md:mt-10 md:text-[17px] md:leading-[1.7]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            For ambitious companies ready to scale exponentially, Scale 12x
            delivers AI-native growth with the speed of a startup and the depth
            of an enterprise team — across every channel, as one partner.
          </motion.p>

          <motion.a
            href="mailto:hello@scale12x.com"
            initial={{ opacity: 0, y: 10 }}
            animate={metaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeEditorial }}
            className="mt-6 text-[13.5px] tracking-[0.04em] text-white/45 transition-colors duration-400 hover:text-[#D4C8FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/45 md:mt-7"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            hello@scale12x.com
          </motion.a>

          <div className="mt-5 w-full md:mt-6">
            <GlobalLocations active={metaInView} />
          </div>

          <div className="mt-7 md:mt-8">
            <SocialRow active={metaInView} />
          </div>

          {/* Brand signature — more air above, tighter internal stack */}
          <div className="mt-10 w-full md:mt-11">
            <BrandMark active={metaInView} />
          </div>

          <div className="mt-7 w-full md:mt-8">
            <ClosingSignal active={metaInView && !reduced} />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={metaInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: easeEditorial }}
            className="mt-4 text-[11px] tracking-[0.1em] text-[#4A5568]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            © {new Date().getFullYear()} Scale 12x. Scale Faster. Scale Smarter.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
