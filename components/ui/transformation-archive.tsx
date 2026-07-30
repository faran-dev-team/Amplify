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
const PURPLE_SOFT = "#C084FC";
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];

type StoryBeat = {
  label: string;
  body: string;
};

type Metric = {
  value: string;
  label: string;
};

type Transformation = {
  id: string;
  industry: string;
  technology: string;
  timeline: string;
  title: string;
  subtitle: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
  coverImage: string;
  beats: StoryBeat[];
  metrics: Metric[];
  featured?: boolean;
};

const TRANSFORMATIONS: Transformation[] = [
  {
    id: "nova-ops",
    featured: true,
    industry: "SaaS",
    technology: "AI Automation · Growth Systems",
    timeline: "14 weeks",
    title: "From Manual Chaos to an Intelligent Growth Engine",
    subtitle:
      "A high-velocity SaaS team replaced fragmented operations with one AI-native system — and watched pipeline compound.",
    beforeLabel: "Manual Workflow",
    afterLabel: "AI Automation",
    beforeImage: "/transformations/featured-before.jpg",
    afterImage: "/transformations/featured-after.jpg",
    coverImage: "/transformations/featured-after.jpg",
    beats: [
      {
        label: "Challenge",
        body: "Revenue depended on heroic effort. Leads stalled in spreadsheets. Handoffs broke. The team scaled headcount instead of systems.",
      },
      {
        label: "Insight",
        body: "The bottleneck wasn't talent — it was intelligence. Signals existed everywhere, but nothing connected them into decisive action.",
      },
      {
        label: "Strategy",
        body: "Architect a single growth OS: ingest demand, qualify with AI, route automatically, and compound learning into every campaign.",
      },
      {
        label: "Execution",
        body: "We unified CRM, ads, and product telemetry, then layered agents that scored, nurtured, and surfaced only high-intent opportunities.",
      },
      {
        label: "Transformation",
        body: "Operators stopped chasing noise. The system surfaced clarity — and growth became a measured, repeatable machine.",
      },
    ],
    metrics: [
      { value: "312%", label: "Qualified Leads Generated" },
      { value: "68%", label: "Reduction in Manual Operations" },
      { value: "4.7×", label: "Increase in Conversion Rate" },
    ],
  },
  {
    id: "aether-care",
    industry: "Healthcare",
    technology: "Platform · Experience",
    timeline: "18 weeks",
    title: "A Clinical Experience Rebuilt for Clarity",
    subtitle:
      "Patients and providers moved from fragmented portals to one calm, intelligent care platform.",
    beforeLabel: "Disconnected Portals",
    afterLabel: "Unified Care Platform",
    beforeImage: "/transformations/health-before.jpg",
    afterImage: "/transformations/archive-health.jpg",
    coverImage: "/transformations/archive-health.jpg",
    beats: [
      {
        label: "Challenge",
        body: "Critical journeys lived across four tools. Drop-off was invisible. Trust eroded with every extra login.",
      },
      {
        label: "Insight",
        body: "Care is emotional. The interface had to feel as precise as the medicine — not as complex as the bureaucracy.",
      },
      {
        label: "Strategy",
        body: "Collapse every touchpoint into one secure experience with AI-assisted triage and human escalation paths.",
      },
      {
        label: "Execution",
        body: "We redesigned intake, scheduling, and results into a continuous narrative — then instrumented every step for outcomes.",
      },
      {
        label: "Transformation",
        body: "Completion rates rose. Support volume fell. Patients finally felt guided, not processed.",
      },
    ],
    metrics: [
      { value: "2.8×", label: "Operational Efficiency" },
      { value: "97%", label: "Patient Satisfaction" },
      { value: "41%", label: "Fewer Support Tickets" },
    ],
  },
  {
    id: "meridian-commerce",
    industry: "E-Commerce",
    technology: "Growth · Data",
    timeline: "12 weeks",
    title: "Turning Traffic Into a Compounding Revenue System",
    subtitle:
      "A DTC brand replaced campaign guesswork with a measurement-native growth architecture.",
    beforeLabel: "Campaign Guesswork",
    afterLabel: "Intelligent Growth Engine",
    beforeImage: "/transformations/commerce-before.jpg",
    afterImage: "/transformations/archive-commerce.jpg",
    coverImage: "/transformations/archive-commerce.jpg",
    beats: [
      {
        label: "Challenge",
        body: "Spend rose. Attribution lied. Creative winners vanished before the team could scale them.",
      },
      {
        label: "Insight",
        body: "Growth wasn't a media problem — it was a feedback-loop problem. Learning had to move faster than the market.",
      },
      {
        label: "Strategy",
        body: "Build a closed-loop engine: creative testing, audience intelligence, and conversion systems as one operating rhythm.",
      },
      {
        label: "Execution",
        body: "We instrumented the full funnel, automated winner detection, and rebuilt the site for decision-speed.",
      },
      {
        label: "Transformation",
        body: "Every dollar now teaches. Efficiency compounded. Revenue stopped depending on lucky weeks.",
      },
    ],
    metrics: [
      { value: "3.1×", label: "Return on Ad Spend" },
      { value: "54%", label: "Faster Creative Cycles" },
      { value: "2.2×", label: "Revenue Growth" },
    ],
  },
  {
    id: "summit-infra",
    industry: "Construction",
    technology: "Cloud · Data Infrastructure",
    timeline: "20 weeks",
    title: "Operations Unified Across Every Jobsite",
    subtitle:
      "Field teams and headquarters finally shared one source of truth — in real time.",
    beforeLabel: "Fragmented Systems",
    afterLabel: "Unified Command Platform",
    beforeImage: "/capabilities/capability-cloud.png",
    afterImage: "/transformations/archive-build.jpg",
    coverImage: "/transformations/archive-build.jpg",
    beats: [
      {
        label: "Challenge",
        body: "Schedules lived in email. Costs lived in spreadsheets. Delays were discovered too late to prevent.",
      },
      {
        label: "Insight",
        body: "Construction velocity is information velocity. Visibility had to arrive before risk compounded.",
      },
      {
        label: "Strategy",
        body: "Centralize project intelligence in a secure cloud platform with live field signals and executive clarity.",
      },
      {
        label: "Execution",
        body: "We migrated critical workflows, designed role-specific views, and wired alerts to the moments that matter.",
      },
      {
        label: "Transformation",
        body: "Leaders stopped reacting. Teams coordinated. Projects finished with fewer surprises.",
      },
    ],
    metrics: [
      { value: "36%", label: "Fewer Schedule Overruns" },
      { value: "5.2×", label: "Faster Decision Cycles" },
      { value: "29%", label: "Lower Coordination Cost" },
    ],
  },
  {
    id: "lumen-brand",
    industry: "Professional Services",
    technology: "Brand · Digital Experience",
    timeline: "10 weeks",
    title: "A Premium Presence That Converts Ambition",
    subtitle:
      "A growing firm needed a digital identity as precise as their counsel.",
    beforeLabel: "Outdated Website",
    afterLabel: "Premium Digital Experience",
    beforeImage: "/capabilities/capability-brand.png",
    afterImage: "/transformations/archive-brand.jpg",
    coverImage: "/transformations/archive-brand.jpg",
    beats: [
      {
        label: "Challenge",
        body: "The firm won through relationships — then lost momentum online. The digital presence undercut the expertise.",
      },
      {
        label: "Insight",
        body: "Trust is visual before it is verbal. The experience had to feel as composed as a partner briefing.",
      },
      {
        label: "Strategy",
        body: "Rebuild brand and site as one editorial system — clarity, proof, and conversion in a single narrative.",
      },
      {
        label: "Execution",
        body: "We crafted identity, motion language, and a site architecture that guides sophisticated buyers to action.",
      },
      {
        label: "Transformation",
        body: "Inbound quality rose. Sales conversations started further along. The brand finally matched the work.",
      },
    ],
    metrics: [
      { value: "2.4×", label: "Qualified Inbound" },
      { value: "63%", label: "Longer Session Depth" },
      { value: "1.9×", label: "Proposal Conversion" },
    ],
  },
];

/* ─────────────────────────────────────────────
   Vault entrance — network converges into core
───────────────────────────────────────────── */

function VaultEntrance({ active }: { active: boolean }) {
  return (
    <div className="pointer-events-none relative mx-auto mb-16 h-40 w-full max-w-lg md:mb-24 md:h-48">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 480 180"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <filter id="vaultBloom" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="vaultCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5E9FF" stopOpacity="0.95" />
            <stop offset="45%" stopColor={PURPLE} stopOpacity="0.7" />
            <stop offset="100%" stopColor={PURPLE} stopOpacity="0" />
          </radialGradient>
        </defs>

        {[
          "M 40 20 C 120 60, 180 90, 240 110",
          "M 80 160 C 140 130, 190 115, 240 110",
          "M 440 24 C 360 70, 300 95, 240 110",
          "M 400 155 C 340 130, 290 115, 240 110",
          "M 20 90 C 100 100, 170 108, 240 110",
          "M 460 95 C 380 105, 310 110, 240 110",
        ].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke={PURPLE}
            strokeWidth={1.4}
            strokeLinecap="round"
            filter="url(#vaultBloom)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              active
                ? { pathLength: 1, opacity: 0.35 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{
              duration: 1.4,
              delay: 0.08 * i,
              ease: easeEditorial,
            }}
          />
        ))}

        <motion.circle
          cx={240}
          cy={110}
          r={28}
          fill="url(#vaultCore)"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={
            active
              ? { opacity: 0.85, scale: 1 }
              : { opacity: 0, scale: 0.4 }
          }
          transition={{ duration: 1.1, delay: 0.55, ease: easeOutExpo }}
          filter="url(#vaultBloom)"
        />
        <motion.circle
          cx={240}
          cy={110}
          r={6}
          fill="#F5E9FF"
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 0.95 : 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
        />
        <motion.circle
          cx={240}
          cy={110}
          r={42}
          fill="none"
          stroke={PURPLE_SOFT}
          strokeWidth={0.8}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={
            active
              ? { opacity: [0.35, 0.12, 0.28], scale: [0.85, 1.05, 0.95] }
              : { opacity: 0, scale: 0.6 }
          }
          transition={
            active
              ? { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.4 }
          }
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Before → After reveal
───────────────────────────────────────────── */

function TransformationReveal({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  active,
}: {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  active: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(0.52);
  const [trackW, setTrackW] = useState(0);
  const dragging = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => setTrackW(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!active || reduced) {
      setPos(0.52);
      return;
    }
    setPos(0.14);
    const t = window.setTimeout(() => setPos(0.58), 750);
    return () => window.clearTimeout(t);
  }, [active, reduced]);

  const setFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = (clientX - rect.left) / rect.width;
    setPos(Math.max(0.06, Math.min(0.94, next)));
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      setFromClientX(e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [setFromClientX]);

  return (
    <div
      ref={trackRef}
      className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#0A0B12] touch-none md:rounded-[28px]"
      style={{
        boxShadow:
          "0 28px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
        setFromClientX(e.clientX);
      }}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos * 100)}
      aria-label="Reveal transformation from before to after"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(0.06, p - 0.04));
        if (e.key === "ArrowRight") setPos((p) => Math.min(0.94, p + 0.04));
      }}
    >
      <Image
        src={afterImage}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 70vw"
        className="object-cover"
        priority
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030208]/35 via-transparent to-transparent"
      />

      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${pos * 100}%` }}
      >
        <div
          className="absolute inset-y-0 left-0"
          style={{ width: trackW || "100%" }}
        >
          <Image
            src={beforeImage}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 70vw"
            className="object-cover [filter:saturate(0.7)_brightness(0.82)]"
            priority
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[#030208]/25"
          />
        </div>
      </div>

      <div
        className="absolute inset-y-0 z-10 w-px bg-white/70"
        style={{
          left: `${pos * 100}%`,
          boxShadow: "0 0 18px rgba(168,85,247,0.55)",
        }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#0A0B12]/85 shadow-[0_0_28px_rgba(168,85,247,0.35)] backdrop-blur-sm">
          <span className="text-[11px] tracking-widest text-white/80">⟷</span>
        </div>
      </div>

      <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/10 bg-[#030208]/55 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-white/70 backdrop-blur-sm md:left-5 md:top-5">
        {beforeLabel}
      </div>
      <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-[#A855F7]/30 bg-[#030208]/55 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[#E9D5FF] backdrop-blur-sm md:right-5 md:top-5">
        {afterLabel}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Story beats + metrics
───────────────────────────────────────────── */

function StoryBeats({
  beats,
  active,
}: {
  beats: StoryBeat[];
  active: boolean;
}) {
  return (
    <ol className="relative space-y-6 md:space-y-7">
      {beats.map((beat, i) => (
        <motion.li
          key={beat.label}
          initial={{ opacity: 0, y: 18 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{
            duration: 0.7,
            delay: active ? 0.2 + i * 0.1 : 0,
            ease: easeEditorial,
          }}
          className="flex flex-col gap-2 sm:grid sm:grid-cols-[148px_minmax(0,1fr)] sm:gap-5 md:grid-cols-[168px_minmax(0,1fr)] md:gap-6"
        >
          <p
            className="shrink-0 text-[11px] font-medium uppercase tracking-[0.18em] text-[#A855F7]/75"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            {beat.label}
          </p>
          <p
            className="min-w-0 text-[14px] leading-relaxed text-white/50 md:text-[15px]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            {beat.body}
          </p>
        </motion.li>
      ))}
    </ol>
  );
}

function MeasuredImpact({
  metrics,
  active,
}: {
  metrics: Metric[];
  active: boolean;
}) {
  return (
    <div className="mt-10 border-t border-white/[0.06] pt-8 md:mt-12 md:pt-10">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.5, delay: active ? 0.7 : 0 }}
        className="mb-6 text-[11px] font-medium uppercase tracking-[0.28em] text-white/30"
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        Measured Impact
      </motion.p>
      <div className="grid gap-8 sm:grid-cols-3">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{
              duration: 0.75,
              delay: active ? 0.8 + i * 0.12 : 0,
              ease: easeEditorial,
            }}
          >
            <p
              className="text-[36px] font-medium tracking-[-0.04em] text-white md:text-[42px]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              {m.value}
            </p>
            <p
              className="mt-2 text-[13px] leading-snug text-white/40"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              {m.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Featured transformation
───────────────────────────────────────────── */

function FeaturedTransformation({
  item,
  onOpen,
}: {
  item: Transformation;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.22 });
  const reduced = useReducedMotion();
  const active = inView || !!reduced;

  return (
    <article ref={ref} className="relative z-[6]">
      <div className="grid items-start gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14 xl:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 1, ease: easeEditorial }}
        >
          <TransformationReveal
            beforeImage={item.beforeImage}
            afterImage={item.afterImage}
            beforeLabel={item.beforeLabel}
            afterLabel={item.afterLabel}
            active={active}
          />
          <p
            className="mt-4 text-center text-[12px] text-white/30"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Drag to witness the transformation
          </p>
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.8, delay: 0.1, ease: easeEditorial }}
            className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/35"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            <span className="text-[#A855F7]/80">{item.industry}</span>
            <span className="h-px w-6 bg-white/15" aria-hidden />
            <span>{item.technology}</span>
            <span className="h-px w-6 bg-white/15" aria-hidden />
            <span>{item.timeline}</span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 24 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.9, delay: 0.16, ease: easeEditorial }}
            className="text-[28px] font-medium leading-[1.12] tracking-[-0.03em] text-white md:text-[34px] lg:text-[40px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {item.title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.8, delay: 0.24, ease: easeEditorial }}
            className="mt-4 max-w-md text-[15px] leading-relaxed text-white/45 md:mt-5 md:text-base"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            {item.subtitle}
          </motion.p>

          <div className="mt-8 md:mt-10">
            <StoryBeats beats={item.beats} active={active} />
          </div>

          <MeasuredImpact metrics={item.metrics} active={active} />

          <motion.button
            type="button"
            onClick={onOpen}
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.5, delay: active ? 1.1 : 0 }}
            className="group/cta mt-9 inline-flex items-center gap-2.5 text-[14px] font-medium tracking-[0.02em] text-[#E9D5FF] transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]/60"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Open full transformation file
            <span
              aria-hidden
              className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-x-2"
            >
              →
            </span>
          </motion.button>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────
   Archive chapter cards
───────────────────────────────────────────── */

function ArchiveChapter({
  item,
  index,
  onOpen,
  selected,
}: {
  item: Transformation;
  index: number;
  onOpen: () => void;
  selected: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.35 });
  const reduced = useReducedMotion();
  const active = inView || !!reduced;
  const flip = index % 2 === 1;

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 40 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.9, ease: easeEditorial }}
      className={`group relative grid w-full items-center gap-6 text-left md:gap-10 lg:gap-14 ${
        flip
          ? "md:grid-cols-[1fr_1.2fr]"
          : "md:grid-cols-[1.2fr_1fr]"
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#0A0B12] transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[6px] group-hover:border-white/[0.14] group-hover:shadow-[0_28px_56px_rgba(0,0,0,0.5),0_0_40px_rgba(168,85,247,0.14)] ${
          flip ? "md:order-2" : "md:order-1"
        } ${selected ? "border-[#A855F7]/35" : ""}`}
        style={{
          boxShadow:
            "0 20px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={item.coverImage}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            loading="lazy"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030208]/55 via-transparent to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-[22px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              boxShadow: "inset 0 0 0 1px rgba(168,85,247,0.35)",
            }}
          />
        </div>
      </div>

      <div className={`relative ${flip ? "md:order-1" : "md:order-2"}`}>
        <p
          className="mb-3 text-[11px] font-medium uppercase tracking-[0.26em] text-[#A855F7]/75"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          Chapter {String(index + 1).padStart(2, "0")} · {item.industry}
        </p>
        <h3
          className="max-w-md text-[24px] font-medium leading-[1.15] tracking-[-0.03em] text-white md:text-[30px] lg:text-[34px]"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          {item.title}
        </h3>
        <p
          className="mt-3 max-w-sm text-[14px] leading-relaxed text-white/45 md:mt-4 md:text-[15px]"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          {item.subtitle}
        </p>
        <div
          className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-white/30"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          <span>{item.technology}</span>
          <span>{item.timeline}</span>
          <span className="text-[#E9D5FF]/70">{item.metrics[0]?.value} impact</span>
        </div>
        <span
          className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-[#E9D5FF]/80 transition-colors group-hover:text-white"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          Open file
          <span
            aria-hidden
            className="transition-transform duration-500 group-hover:translate-x-1.5"
          >
            →
          </span>
        </span>
      </div>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────
   Expanded transformation file (inline, native)
───────────────────────────────────────────── */

function ExpandedFile({
  item,
  onClose,
}: {
  item: Transformation;
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
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: reduced ? 0.01 : 0.7, ease: easeEditorial }}
      className="relative z-[8] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0A0B12]/92"
      style={{
        boxShadow:
          "0 32px 80px rgba(0,0,0,0.55), 0 0 60px rgba(168,85,247,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#A855F7]/40 to-transparent" />

      <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] px-5 py-4 md:px-8 md:py-5">
        <div>
          <p
            className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#A855F7]/80"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Transformation File · {item.industry}
          </p>
          <p
            className="mt-1 text-[15px] text-white/70 md:text-base"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            {item.technology} · {item.timeline}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/10 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.18em] text-white/60 transition-colors hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]/60"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          Close
        </button>
      </div>

      <div className="grid gap-8 p-5 md:grid-cols-[1.2fr_1fr] md:gap-10 md:p-8 lg:p-10">
        <TransformationReveal
          beforeImage={item.beforeImage}
          afterImage={item.afterImage}
          beforeLabel={item.beforeLabel}
          afterLabel={item.afterLabel}
          active
        />
        <div>
          <h3
            className="text-[26px] font-medium leading-[1.12] tracking-[-0.03em] text-white md:text-[32px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {item.title}
          </h3>
          <p
            className="mt-4 text-[15px] leading-relaxed text-white/45"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            {item.subtitle}
          </p>
          <div className="mt-8">
            <StoryBeats beats={item.beats} active />
          </div>
          <MeasuredImpact metrics={item.metrics} active />
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Exit signal
───────────────────────────────────────────── */

function ExitSignal({ active }: { active: boolean }) {
  return (
    <div className="pointer-events-none relative mx-auto mt-20 h-28 w-full max-w-md md:mt-28 md:h-32">
      <svg
        className="h-full w-full"
        viewBox="0 0 400 120"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <filter id="exitBloom" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {[
          "M 40 30 C 100 50, 150 70, 200 85",
          "M 80 100 C 120 90, 160 85, 200 85",
          "M 360 35 C 300 55, 250 75, 200 85",
          "M 320 105 C 280 95, 240 88, 200 85",
        ].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke={PURPLE}
            strokeWidth={1.2}
            strokeLinecap="round"
            filter="url(#exitBloom)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              active
                ? { pathLength: 1, opacity: 0.28 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{
              duration: 1.2,
              delay: 0.1 * i,
              ease: easeEditorial,
            }}
          />
        ))}
        <motion.path
          d="M 200 85 C 200 95, 200 105, 200 130"
          fill="none"
          stroke={PURPLE}
          strokeWidth={2.2}
          strokeLinecap="round"
          filter="url(#exitBloom)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            active
              ? { pathLength: 1, opacity: 0.45 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 1.1, delay: 0.55, ease: easeEditorial }}
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main section
───────────────────────────────────────────── */

export function TransformationArchive() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const archiveRef = useRef<HTMLDivElement>(null);
  const exitRef = useRef<HTMLDivElement>(null);

  const inView = useInView(sectionRef, {
    once: false,
    amount: 0.06,
    margin: "-6% 0px -8% 0px",
  });
  const headlineInView = useInView(headlineRef, { once: false, amount: 0.5 });
  const archiveInView = useInView(archiveRef, { once: false, amount: 0.12 });
  const exitInView = useInView(exitRef, { once: false, amount: 0.4 });
  const reduced = useReducedMotion();

  const featured = TRANSFORMATIONS.find((t) => t.featured)!;
  const archive = TRANSFORMATIONS.filter((t) => !t.featured);

  const [openId, setOpenId] = useState<string | null>(null);
  const openItem = TRANSFORMATIONS.find((t) => t.id === openId) ?? null;

  const openFile = useCallback((id: string) => {
    setOpenId(id);
    window.requestAnimationFrame(() => {
      document
        .getElementById("transformation-file")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-label="Transformation archive"
      className="relative z-0 -mt-24 overflow-hidden pb-40 pt-12 md:-mt-32 md:pb-52 md:pt-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#030208]/15 via-transparent to-[#030208]/30"
      />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <VaultEntrance active={(inView || headlineInView) && !reduced} />

        <div ref={headlineRef} className="relative z-[6] mb-16 md:mb-24 lg:mb-28">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={
              headlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
            }
            transition={{ duration: 0.7, ease: easeEditorial }}
            className="mb-4 text-[12px] font-medium uppercase tracking-[0.3em] text-[#A855F7]/75"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Classified Growth Record
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={
              headlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.95, delay: 0.08, ease: easeEditorial }}
            className="max-w-3xl text-[2.75rem] font-medium leading-[1.05] tracking-[-0.035em] text-white md:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Transformation Archive
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={
              headlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
            }
            transition={{ duration: 0.8, delay: 0.18, ease: easeEditorial }}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/45 md:mt-6 md:text-base"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Evidence of engineered growth. Each file documents a business
            transformed — from constraint to measurable advantage.
          </motion.p>
        </div>

        <FeaturedTransformation
          item={featured}
          onOpen={() => openFile(featured.id)}
        />

        <div
          ref={archiveRef}
          className="relative z-[6] mt-28 md:mt-36 lg:mt-44"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={
              archiveInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
            }
            transition={{ duration: 0.75, ease: easeEditorial }}
            className="mb-14 md:mb-20"
          >
            <p
              className="mb-3 text-[12px] font-medium uppercase tracking-[0.3em] text-[#A855F7]/70"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              The Archive
            </p>
            <h3
              className="max-w-2xl text-[28px] font-medium tracking-[-0.03em] text-white md:text-[36px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Further chapters of measurable change
            </h3>
          </motion.div>

          <div className="flex flex-col gap-20 md:gap-28 lg:gap-32">
            {archive.map((item, i) => (
              <ArchiveChapter
                key={item.id}
                item={item}
                index={i}
                selected={openId === item.id}
                onOpen={() => openFile(item.id)}
              />
            ))}
          </div>
        </div>

        <div id="transformation-file" className="relative z-[8] mt-16 scroll-mt-28 md:mt-24">
          <AnimatePresence mode="wait">
            {openItem && (
              <ExpandedFile
                key={openItem.id}
                item={openItem}
                onClose={() => setOpenId(null)}
              />
            )}
          </AnimatePresence>
        </div>

        <div ref={exitRef}>
          <ExitSignal active={exitInView && !reduced} />
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-44 bg-gradient-to-t from-[#030208]/45 via-[#030208]/15 to-transparent"
      />
    </section>
  );
}
