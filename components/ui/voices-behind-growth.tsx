"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

/* ─────────────────────────────────────────────
   Design tokens
───────────────────────────────────────────── */

const PURPLE = "#A855F7";
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];

type VoiceChapter = {
  label: string;
  body: string;
};

type Voice = {
  id: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  portrait: string;
  opening: string;
  chapters: VoiceChapter[];
  reflection: string;
  featured?: boolean;
};

const VOICES: Voice[] = [
  {
    id: "elena",
    featured: true,
    name: "Elena Vasquez",
    role: "Founder & CEO",
    company: "NovaOps",
    industry: "SaaS",
    portrait: "/voices/founder-02.jpg",
    opening:
      "Before partnering with Amplify we spent more time managing disconnected systems than growing the business.",
    chapters: [
      {
        label: "Challenge",
        body: "We were winning customers and losing clarity. Every department ran its own tools. Growth felt loud, expensive, and strangely fragile.",
      },
      {
        label: "Why Amplify",
        body: "They didn't pitch a stack of features. They asked sharper questions about how decisions actually moved through our company.",
      },
      {
        label: "Working Together",
        body: "The partnership felt calm and precise. Weekly conversations stayed focused on outcomes. Nothing was theatrical. Everything was intentional.",
      },
      {
        label: "Transformation",
        body: "They helped us rethink the way our company operates — not just the technology behind it. Intelligence stopped being a slide and became our operating rhythm.",
      },
      {
        label: "Life After",
        body: "Today our growth feels predictable instead of reactive. The team moves with shared context. I finally trust the numbers in the room.",
      },
    ],
    reflection:
      "What I value most is how little drama there was. Amplify treated our business like something worth understanding — not something to decorate.",
  },
  {
    id: "marcus",
    name: "Marcus Chen",
    role: "COO",
    company: "Meridian Commerce",
    industry: "E-Commerce",
    portrait: "/voices/founder-01.jpg",
    opening:
      "We didn't need another agency. We needed a partner who could make growth measurable again.",
    chapters: [
      {
        label: "Challenge",
        body: "Spend climbed while learning slowed. Campaigns lived in isolation from product and conversion.",
      },
      {
        label: "Why Amplify",
        body: "They spoke in systems, not deliverables. That language matched how we actually run the company.",
      },
      {
        label: "Working Together",
        body: "They embedded into our rhythm without becoming noise. Clear ownership. Quiet accountability.",
      },
      {
        label: "Transformation",
        body: "Creative, media, and conversion finally moved as one loop. Decisions got faster because the feedback got honest.",
      },
      {
        label: "Life After",
        body: "Revenue is no longer a weekly surprise. It is a compound outcome we can steer.",
      },
    ],
    reflection:
      "The relationship feels like infrastructure — steady, invisible when it works, indispensable when pressure rises.",
  },
  {
    id: "amira",
    name: "Amira Okonkwo",
    role: "Chief Product Officer",
    company: "Aether Care",
    industry: "Healthcare",
    portrait: "/voices/founder-04.jpg",
    opening:
      "In healthcare, trust is the product. Our digital experience had to feel as careful as our clinical work.",
    chapters: [
      {
        label: "Challenge",
        body: "Patients navigated four portals to complete one journey. Friction wasn't just inconvenient — it eroded confidence.",
      },
      {
        label: "Why Amplify",
        body: "They understood that elegance and compliance aren't opposites. Precision was the brief.",
      },
      {
        label: "Working Together",
        body: "Workshops were rigorous. Prototypes were honest. They protected the user without ignoring operations.",
      },
      {
        label: "Transformation",
        body: "We collapsed complexity into one calm path. Support volume fell because confusion finally had somewhere to go.",
      },
      {
        label: "Life After",
        body: "Providers spend less time explaining the tools. Patients feel guided. That changes everything.",
      },
    ],
    reflection:
      "Amplify didn't make us louder. They made us clearer — and clarity is how we earn trust.",
  },
  {
    id: "jordan",
    name: "Jordan Hale",
    role: "Managing Partner",
    company: "Lumen Advisory",
    industry: "Professional Services",
    portrait: "/voices/founder-03.jpg",
    opening:
      "Our counsel was sophisticated. Our digital presence was not. That gap was costing us the right conversations.",
    chapters: [
      {
        label: "Challenge",
        body: "Inbound arrived, but rarely at the altitude we wanted. The brand undercut the work.",
      },
      {
        label: "Why Amplify",
        body: "They treated brand and conversion as one narrative system — not a visual refresh.",
      },
      {
        label: "Working Together",
        body: "Editorial discipline. Restraint. Every page earned its place. No decorative excess.",
      },
      {
        label: "Transformation",
        body: "Prospects arrive further along. Meetings start with substance instead of education.",
      },
      {
        label: "Life After",
        body: "The firm finally looks like the room we already sit in.",
      },
    ],
    reflection:
      "I never felt sold to. I felt edited — and that is rarer than people admit.",
  },
  {
    id: "priya",
    name: "Priya Nair",
    role: "VP of Operations",
    company: "Summit Infra",
    industry: "Construction",
    portrait: "/voices/founder-05.jpg",
    opening:
      "Field reality and office reports lived in different worlds. We needed one source of truth before the next delay found us.",
    chapters: [
      {
        label: "Challenge",
        body: "Schedules, costs, and risk signals arrived too late to prevent anything.",
      },
      {
        label: "Why Amplify",
        body: "They mapped the operational truth first — then designed the system around it.",
      },
      {
        label: "Working Together",
        body: "Practical. Patient with complexity. Unwilling to ship theater.",
      },
      {
        label: "Transformation",
        body: "Leaders stopped reacting to surprises. Teams coordinated against a shared picture.",
      },
      {
        label: "Life After",
        body: "Projects finish with fewer unexplained days. That is the quiet win operations people care about.",
      },
    ],
    reflection:
      "Amplify gave us visibility with dignity — no dashboards for show, only signals we act on.",
  },
];

/* ─────────────────────────────────────────────
   Soft dissolve from archive → people
───────────────────────────────────────────── */

function HumanTransition({ active }: { active: boolean }) {
  return (
    <div className="pointer-events-none relative mx-auto mb-14 h-36 w-full max-w-md md:mb-20 md:h-40">
      <svg
        className="h-full w-full"
        viewBox="0 0 400 140"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <filter id="voiceBloom" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="warmCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5E9FF" stopOpacity="0.7" />
            <stop offset="50%" stopColor={PURPLE} stopOpacity="0.35" />
            <stop offset="100%" stopColor="#C4A484" stopOpacity="0" />
          </radialGradient>
        </defs>

        {[
          "M 200 0 C 200 30, 200 55, 200 78",
          "M 120 20 C 150 50, 175 70, 200 78",
          "M 280 18 C 250 48, 225 68, 200 78",
        ].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke={PURPLE}
            strokeWidth={1.3}
            strokeLinecap="round"
            filter="url(#voiceBloom)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              active
                ? { pathLength: 1, opacity: 0.22 - i * 0.03 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{
              duration: 1.5,
              delay: 0.12 * i,
              ease: easeEditorial,
            }}
          />
        ))}

        <motion.circle
          cx={200}
          cy={88}
          r={22}
          fill="url(#warmCore)"
          filter="url(#voiceBloom)"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            active
              ? { opacity: 0.55, scale: 1 }
              : { opacity: 0, scale: 0.5 }
          }
          transition={{ duration: 1.2, delay: 0.55, ease: easeOutExpo }}
        />
        <motion.circle
          cx={200}
          cy={88}
          r={4}
          fill="#F8F1E7"
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 0.75 : 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Portrait
───────────────────────────────────────────── */

function EditorialPortrait({
  src,
  alt,
  size = "lg",
  active,
}: {
  src: string;
  alt: string;
  size?: "lg" | "md" | "sm";
  active: boolean;
}) {
  const dims =
    size === "lg"
      ? "aspect-[3/4] w-full max-w-[420px]"
      : size === "md"
        ? "aspect-[3/4] w-full"
        : "aspect-[3/4] w-full";

  return (
    <div
      className={`group/portrait relative overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#0A0B12] transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-white/[0.14] group-hover:shadow-[0_24px_48px_rgba(0,0,0,0.45),0_0_32px_rgba(196,164,132,0.08)] ${dims}`}
      style={{
        boxShadow:
          "0 20px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={
          active
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 1.04 }
        }
        transition={{ duration: 1.15, ease: easeEditorial }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 90vw, 420px"
          loading="lazy"
          className="object-cover [filter:grayscale(1)_contrast(1.05)_brightness(0.92)] transition-[filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/portrait:[filter:grayscale(0.85)_contrast(1.06)_brightness(1)]"
        />
      </motion.div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030208]/50 via-transparent to-[#C4A484]/05"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-8 top-0 h-full w-12 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent opacity-0 transition-opacity duration-700 group-hover/portrait:opacity-100"
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Expanded conversation
───────────────────────────────────────────── */

function ExpandedConversation({
  voice,
  onClose,
}: {
  voice: Voice;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: reduced ? 0.01 : 0.75, ease: easeEditorial }}
      className="overflow-hidden"
    >
      <div
        className="mt-8 rounded-[24px] border border-white/[0.07] bg-[#0A0B12]/75 px-5 py-7 md:mt-10 md:px-8 md:py-9"
        style={{
          boxShadow:
            "0 24px 56px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.26em] text-[#C4A484]/80"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Conversation · {voice.industry}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/55 transition-colors hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]/50"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Close
          </button>
        </div>

        <ol className="space-y-6 md:space-y-7">
          {voice.chapters.map((ch, i) => (
            <motion.li
              key={ch.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.08 + i * 0.08,
                ease: easeEditorial,
              }}
              className="flex flex-col gap-2 sm:grid sm:grid-cols-[148px_minmax(0,1fr)] sm:gap-5 md:grid-cols-[160px_minmax(0,1fr)]"
            >
              <p
                className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#A855F7]/70"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                {ch.label}
              </p>
              <p
                className="min-w-0 text-[15px] leading-relaxed text-white/50 md:text-[16px]"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                {ch.body}
              </p>
            </motion.li>
          ))}
        </ol>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: easeEditorial }}
          className="mt-8 border-t border-white/[0.06] pt-7 text-[16px] leading-relaxed text-white/65 md:text-[17px]"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          {voice.reflection}
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Hero voice
───────────────────────────────────────────── */

function HeroVoice({
  voice,
  expanded,
  onToggle,
}: {
  voice: Voice;
  expanded: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.28 });
  const reduced = useReducedMotion();
  const active = inView || !!reduced;

  return (
    <article ref={ref} className="group relative z-[6]">
      <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.15fr] lg:gap-16 xl:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1.05, ease: easeEditorial }}
          className="mx-auto w-full max-w-[380px] lg:mx-0 lg:max-w-none"
        >
          <EditorialPortrait
            src={voice.portrait}
            alt={`${voice.name}, ${voice.role}`}
            size="lg"
            active={active}
          />
        </motion.div>

        <div className="pt-1 lg:pt-6">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.7, delay: 0.12, ease: easeEditorial }}
            className="mb-5 text-[11px] font-medium uppercase tracking-[0.26em] text-white/35"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            {voice.role} · {voice.company} · {voice.industry}
          </motion.p>

          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 1, delay: 0.2, ease: easeEditorial }}
            className="max-w-xl text-[26px] font-medium leading-[1.28] tracking-[-0.025em] text-white md:text-[32px] lg:text-[36px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {voice.opening.split(" ").map((word, i, arr) => (
              <motion.span
                key={`${word}-${i}`}
                className="inline"
                initial={{ opacity: 0, y: 10 }}
                animate={
                  active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
                }
                transition={{
                  duration: 0.45,
                  delay: active ? 0.28 + i * 0.028 : 0,
                  ease: easeEditorial,
                }}
              >
                {word}
                {i < arr.length - 1 ? " " : ""}
              </motion.span>
            ))}
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.6, delay: active ? 0.85 : 0 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <p
              className="text-[15px] font-medium tracking-[-0.01em] text-white/80"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              {voice.name}
            </p>
            <span className="h-px w-8 bg-white/15" aria-hidden />
            <button
              type="button"
              onClick={onToggle}
              className="text-[13px] font-medium tracking-[0.02em] text-[#E9D5FF]/85 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]/50"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              aria-expanded={expanded}
            >
              {expanded ? "Close conversation" : "Continue reading"}
              <span aria-hidden className="ml-2 inline-block">
                {expanded ? "↑" : "→"}
              </span>
            </button>
          </motion.div>

          <AnimatePresence>
            {expanded && (
              <ExpandedConversation
                voice={voice}
                onClose={onToggle}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────
   Supporting voice
───────────────────────────────────────────── */

function SupportingVoice({
  voice,
  index,
  expanded,
  onToggle,
}: {
  voice: Voice;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const reduced = useReducedMotion();
  const active = inView || !!reduced;
  const flip = index % 2 === 1;

  return (
    <article
      ref={ref}
      className={`group relative z-[6] grid items-start gap-7 md:gap-10 lg:gap-12 ${
        flip
          ? "md:grid-cols-[1.1fr_0.85fr]"
          : "md:grid-cols-[0.85fr_1.1fr]"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.95, ease: easeEditorial }}
        className={`mx-auto w-full max-w-[280px] md:max-w-none ${
          flip ? "md:order-2" : "md:order-1"
        }`}
      >
        <EditorialPortrait
          src={voice.portrait}
          alt={`${voice.name}, ${voice.role}`}
          size="md"
          active={active}
        />
      </motion.div>

      <div className={`pt-2 ${flip ? "md:order-1" : "md:order-2"}`}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.55, delay: active ? 0.1 : 0 }}
          className="mb-4 text-[11px] font-medium uppercase tracking-[0.24em] text-white/30"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          {voice.role} · {voice.company}
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 18 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.85, delay: 0.14, ease: easeEditorial }}
          className="max-w-md text-[20px] font-medium leading-[1.35] tracking-[-0.02em] text-white/90 md:text-[24px] lg:text-[26px]"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          {voice.opening}
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.5, delay: active ? 0.35 : 0 }}
          className="mt-6 flex flex-wrap items-center gap-3"
        >
          <p
            className="text-[14px] font-medium text-white/70"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            {voice.name}
          </p>
          <button
            type="button"
            onClick={onToggle}
            className="text-[13px] text-[#E9D5FF]/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]/50"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            aria-expanded={expanded}
          >
            {expanded ? "Close" : "Read conversation"}
            <span aria-hidden className="ml-1.5">
              {expanded ? "↑" : "→"}
            </span>
          </button>
        </motion.div>

        <AnimatePresence>
          {expanded && (
            <ExpandedConversation voice={voice} onClose={onToggle} />
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────
   Closing → CTA path
───────────────────────────────────────────── */

function ClosingStatement({ active }: { active: boolean }) {
  return (
    <div className="relative z-[6] mx-auto max-w-2xl text-center">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 1, ease: easeEditorial }}
        className="text-[26px] font-medium leading-[1.3] tracking-[-0.03em] text-white md:text-[34px] lg:text-[38px]"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        Every transformation begins with a conversation.
      </motion.p>

      <div className="pointer-events-none relative mx-auto mt-12 h-28 w-full max-w-xs md:mt-14 md:h-32">
        <svg
          className="h-full w-full"
          viewBox="0 0 240 120"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <defs>
            <filter id="ctaPathBloom" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <motion.path
            d="M 120 8 C 120 40, 120 70, 120 118"
            fill="none"
            stroke={PURPLE}
            strokeWidth={2.2}
            strokeLinecap="round"
            filter="url(#ctaPathBloom)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              active
                ? { pathLength: 1, opacity: 0.5 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{ duration: 1.35, delay: 0.35, ease: easeEditorial }}
          />
          <motion.circle
            cx={120}
            cy={14}
            r={3.5}
            fill="#E9D5FF"
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 0.85 : 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </svg>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main section
───────────────────────────────────────────── */

export function VoicesBehindGrowth() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);

  const inView = useInView(sectionRef, {
    once: false,
    amount: 0.06,
    margin: "-6% 0px -8% 0px",
  });
  const headlineInView = useInView(headlineRef, { once: false, amount: 0.5 });
  const closeInView = useInView(closeRef, { once: false, amount: 0.45 });
  const reduced = useReducedMotion();

  const featured = VOICES.find((v) => v.featured)!;
  const supporting = VOICES.filter((v) => !v.featured);

  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="Founder perspectives"
      className="relative z-0 -mt-24 overflow-hidden pb-40 pt-12 md:-mt-32 md:pb-52 md:pt-16"
    >
      {/* Warmer, calmer veil — human chapter */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#030208]/20 via-[#0A0806]/15 to-[#030208]/35"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[18%] z-[1] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#C4A484]/[0.04] blur-[100px]"
      />

      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8">
        <HumanTransition active={(inView || headlineInView) && !reduced} />

        <div ref={headlineRef} className="relative z-[6] mb-16 md:mb-24 lg:mb-28">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={
              headlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
            }
            transition={{ duration: 0.75, ease: easeEditorial }}
            className="mb-4 text-[12px] font-medium uppercase tracking-[0.3em] text-[#C4A484]/75"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Executive Journal
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={
              headlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 1, delay: 0.08, ease: easeEditorial }}
            className="max-w-3xl text-[2.75rem] font-medium leading-[1.05] tracking-[-0.035em] text-white md:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Voices Behind the Growth
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={
              headlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
            }
            transition={{ duration: 0.85, delay: 0.18, ease: easeEditorial }}
            className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/40 md:mt-6 md:text-base"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Excerpts from conversations with founders and operators who trusted
            Amplify with meaningful business decisions.
          </motion.p>
        </div>

        <HeroVoice
          voice={featured}
          expanded={openId === featured.id}
          onToggle={() => toggle(featured.id)}
        />

        <div className="relative z-[6] mt-28 flex flex-col gap-24 md:mt-36 md:gap-32 lg:mt-44 lg:gap-40">
          {supporting.map((voice, i) => (
            <SupportingVoice
              key={voice.id}
              voice={voice}
              index={i}
              expanded={openId === voice.id}
              onToggle={() => toggle(voice.id)}
            />
          ))}
        </div>

        <div ref={closeRef} className="relative mt-28 md:mt-40 lg:mt-48">
          <ClosingStatement active={closeInView && !reduced} />
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-44 bg-gradient-to-t from-[#030208]/50 via-[#030208]/18 to-transparent"
      />
    </section>
  );
}
