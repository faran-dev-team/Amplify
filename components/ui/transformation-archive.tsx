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

const PURPLE = "#7C5CFF";
const PURPLE_SOFT = "#B8A4FF";
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
    technology: "Generative AI · Strategy & Automation",
    timeline: "Scale tier",
    title: "From Agency Sprawl to One AI-Native Partner",
    subtitle:
      "A Series A/B SaaS team replaced five vendors with one growth studio across paid, SEO, content, and automation as one system.",
    beforeLabel: "Five Agencies",
    afterLabel: "One Partner",
    beforeImage: "/transformations/featured-before.jpg",
    afterImage: "/transformations/featured-after.jpg",
    coverImage: "/transformations/featured-after.jpg",
    beats: [
      {
        label: "Challenge",
        body: "Growth meant juggling specialists. Quality diluted. Nobody owned the whole system.",
      },
      {
        label: "Insight",
        body: "Growth in 2026 isn't a single channel. It needs AI-native execution across every practice.",
      },
      {
        label: "Strategy",
        body: "Move to Scale: multi-channel management, weekly strategy, landing pages, brand kit, and marketing automation.",
      },
      {
        label: "Execution",
        body: "Senior specialists on the account. Transparent pricing. Founder-led when the engagement demanded it.",
      },
      {
        label: "Transformation",
        body: "One partner. Every channel. Built on AI, with outcomes Scale 12x stands behind.",
      },
    ],
    metrics: [
      { value: "$10K", label: "Monthly retainer" },
      { value: "$5K", label: "Setup investment" },
      { value: "4hr", label: "Priority response" },
    ],
  },
  {
    id: "aether-care",
    industry: "Healthcare",
    technology: "Digital Transformation · Web Development",
    timeline: "Dominate tier",
    title: "Modernizing Care Without Adding Another Vendor",
    subtitle:
      "A telehealth operator needed end-to-end modernization across brand, web, AI workflows, and secure infrastructure.",
    beforeLabel: "Fragmented Stack",
    afterLabel: "Unified System",
    beforeImage: "/transformations/health-before.jpg",
    afterImage: "/transformations/archive-health.jpg",
    coverImage: "/transformations/archive-health.jpg",
    beats: [
      {
        label: "Challenge",
        body: "Patients and providers moved across disconnected tools. Trust eroded with every handoff.",
      },
      {
        label: "Insight",
        body: "Healthcare buyers don't need more agencies. They need one partner who can transform the stack.",
      },
      {
        label: "Strategy",
        body: "Dominate: full website rebuild, custom AI implementations, cloud & data setup, cybersecurity essentials.",
      },
      {
        label: "Execution",
        body: "Weekly founder call. White-glove account management. Slack for daily ops.",
      },
      {
        label: "Transformation",
        body: "Startup speed. Enterprise depth. One connected growth system.",
      },
    ],
    metrics: [
      { value: "$20K", label: "Monthly retainer" },
      { value: "$10K", label: "Setup investment" },
      { value: "90-day", label: "Setup fee guarantee" },
    ],
  },
  {
    id: "meridian-commerce",
    industry: "E-Commerce",
    technology: "Paid Media · Analytics · Search",
    timeline: "Scale tier",
    title: "Multi-Channel Growth Past $2M",
    subtitle:
      "A DTC brand ready to accelerate across paid, SEO, content, and LinkedIn under one AI-native operating rhythm.",
    beforeLabel: "Channel Guesswork",
    afterLabel: "Multi-Channel System",
    beforeImage: "/transformations/commerce-before.jpg",
    afterImage: "/transformations/archive-commerce.jpg",
    coverImage: "/transformations/archive-commerce.jpg",
    beats: [
      {
        label: "Challenge",
        body: "Spend rose across disconnected channels. Reporting conflicted. Learning slowed.",
      },
      {
        label: "Insight",
        body: "The fix wasn't another media buyer. It was one partner across every channel.",
      },
      {
        label: "Strategy",
        body: "Scale retainer: full multi-channel management, weekly reporting, creative production, CRM integration.",
      },
      {
        label: "Execution",
        body: "Honest analytics. Attribution that tells the truth. Creative that ships with the media plan.",
      },
      {
        label: "Transformation",
        body: "Growth isn't about doing more. It's about doing the right things, faster.",
      },
    ],
    metrics: [
      { value: "$10K", label: "Monthly retainer" },
      { value: "Weekly", label: "Strategy calls" },
      { value: "4hr", label: "Priority support" },
    ],
  },
  {
    id: "summit-infra",
    industry: "Home Services",
    technology: "Cloud & Data · MarTech",
    timeline: "Launch tier",
    title: "Serious Growth Investment, Without Enterprise Bloat",
    subtitle:
      "A home-services operator (via Foreman cross-sell) started with paid and content, then compounded.",
    beforeLabel: "Ad Hoc Marketing",
    afterLabel: "Launch System",
    beforeImage: "/capabilities/capability-cloud.png",
    afterImage: "/transformations/archive-build.jpg",
    coverImage: "/transformations/archive-build.jpg",
    beats: [
      {
        label: "Challenge",
        body: "Marketing lived in scraps: occasional ads, no reporting cadence, no brand system.",
      },
      {
        label: "Insight",
        body: "Early-stage teams need a serious growth investment, not a Fortune 500 sales motion.",
      },
      {
        label: "Strategy",
        body: "Launch: 1–2 channels, monthly strategy, basic brand kit refresh, dashboards, email support.",
      },
      {
        label: "Execution",
        body: "Global talent. US pricing. Boutique service. Clear KPI triggers on setup fees.",
      },
      {
        label: "Transformation",
        body: "A foundation ready to graduate into Scale when the pipeline demands it.",
      },
    ],
    metrics: [
      { value: "$5K", label: "Monthly retainer" },
      { value: "$2.5K", label: "Setup investment" },
      { value: "24hr", label: "Email response" },
    ],
  },
  {
    id: "lumen-brand",
    industry: "Professional Services",
    technology: "Brand Strategy · Creative Studio · Web",
    timeline: "One-off → retainer",
    title: "A Brand System That Matches the Counsel",
    subtitle:
      "A growing firm needed positioning, identity, and a site that converts sophisticated buyers.",
    beforeLabel: "Outdated Presence",
    afterLabel: "Brand System",
    beforeImage: "/capabilities/capability-brand.png",
    afterImage: "/transformations/archive-brand.jpg",
    coverImage: "/transformations/archive-brand.jpg",
    beats: [
      {
        label: "Challenge",
        body: "Expertise was undeniable. The digital presence undercut it.",
      },
      {
        label: "Insight",
        body: "Brand strategy isn't a visual refresh. It's positioning, naming, and a system that sells.",
      },
      {
        label: "Strategy",
        body: "Brand identity + kit, then website rebuild: one-off projects with a clear path into retainer.",
      },
      {
        label: "Execution",
        body: "Creative studio and web development shipped together. No handoff gaps between agencies.",
      },
      {
        label: "Transformation",
        body: "The firm finally looks like the room it already sits in.",
      },
    ],
    metrics: [
      { value: "$3.5K+", label: "Brand identity + kit" },
      { value: "$5K+", label: "Website rebuild" },
      { value: "90-day", label: "Setup fee guarantee" },
    ],
  },
];

/* ─────────────────────────────────────────────
   Vault entrance — network converges into core
───────────────────────────────────────────── */

function VaultEntrance({ active }: { active: boolean }) {
  return (
    <div className="pointer-events-none relative mx-auto mb-4 h-20 w-full max-w-lg md:mb-6 md:h-28">
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
      className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#0A1224] touch-none md:rounded-[28px]"
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
        loading="lazy"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050814]/35 via-transparent to-transparent"
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
            loading="lazy"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[#050814]/25"
          />
        </div>
      </div>

      <div
        className="absolute inset-y-0 z-10 w-px bg-white/70"
        style={{
          left: `${pos * 100}%`,
          boxShadow: "0 0 18px rgba(124,92,255,0.55)",
        }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#0A1224]/85 shadow-[0_0_28px_rgba(124,92,255,0.35)] backdrop-blur-sm">
          <span className="text-[11px] tracking-widest text-white/80">⟷</span>
        </div>
      </div>

      <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-[rgba(168,196,240,0.14)] bg-[#050814]/55 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-white/70 backdrop-blur-sm md:left-5 md:top-5">
        {beforeLabel}
      </div>
      <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-[#7C5CFF]/30 bg-[#050814]/55 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[#D4C8FF] backdrop-blur-sm md:right-5 md:top-5">
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
    <ol className="relative space-y-4 md:space-y-5">
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
            className="shrink-0 text-[11px] font-medium uppercase tracking-[0.18em] text-[#7C5CFF]/75"
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
    <div className="mt-10 border-t border-[rgba(168,196,240,0.11)] pt-8 md:mt-12 md:pt-10">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.5, delay: active ? 0.7 : 0 }}
        className="mb-6 text-[11px] font-medium uppercase tracking-[0.28em] text-[#6B7890]"
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        Engagement Profile
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
              className="mt-2 text-[13px] leading-snug text-[#9AA8C0]/95"
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
            className="mt-4 text-center text-[12px] text-[#6B7890]"
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
            className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#9AA8C0]/85"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            <span className="text-[#7C5CFF]/80">{item.industry}</span>
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
            className="mt-4 max-w-md text-[15px] leading-relaxed text-[#9AA8C0] md:mt-5 md:text-base"
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
            className="group/cta mt-9 inline-flex items-center gap-2.5 text-[14px] font-medium tracking-[0.02em] text-[#D4C8FF] transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/60"
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
        className={`relative overflow-hidden rounded-[22px] border border-[rgba(168,196,240,0.12)] bg-[#0A1224] transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[6px] group-hover:border-white/[0.14] group-hover:shadow-[0_28px_56px_rgba(0,0,0,0.5),0_0_40px_rgba(124,92,255,0.14)] ${
          flip ? "md:order-2" : "md:order-1"
        } ${selected ? "border-[#7C5CFF]/35" : ""}`}
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
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050814]/55 via-transparent to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-[22px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              boxShadow: "inset 0 0 0 1px rgba(124,92,255,0.35)",
            }}
          />
        </div>
      </div>

      <div className={`relative ${flip ? "md:order-1" : "md:order-2"}`}>
        <p
          className="mb-3 text-[11px] font-medium uppercase tracking-[0.26em] text-[#7C5CFF]/75"
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
          className="mt-3 max-w-sm text-[14px] leading-relaxed text-[#9AA8C0] md:mt-4 md:text-[15px]"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          {item.subtitle}
        </p>
        <div
          className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-[#6B7890]"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          <span>{item.technology}</span>
          <span>{item.timeline}</span>
          <span className="text-[#D4C8FF]/70">{item.metrics[0]?.value} impact</span>
        </div>
        <span
          className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-[#D4C8FF]/80 transition-colors group-hover:text-white"
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
      className="relative z-[8] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0A1224]/92"
      style={{
        boxShadow:
          "0 32px 80px rgba(0,0,0,0.55), 0 0 60px rgba(124,92,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7C5CFF]/40 to-transparent" />

      <div className="flex items-center justify-between gap-4 border-b border-[rgba(168,196,240,0.11)] px-5 py-4 md:px-8 md:py-5">
        <div>
          <p
            className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#7C5CFF]/80"
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
          className="rounded-full border border-[rgba(168,196,240,0.14)] px-4 py-2 text-[12px] font-medium uppercase tracking-[0.18em] text-white/60 transition-colors hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/60"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          Close
        </button>
      </div>

      <div className="grid gap-6 p-4 md:grid-cols-[1.2fr_1fr] md:gap-8 md:p-6 lg:p-8">
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
            className="mt-4 text-[15px] leading-relaxed text-[#9AA8C0]"
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
    <div className="pointer-events-none relative mx-auto mt-6 h-16 w-full max-w-md md:mt-8 md:h-20">
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
      aria-label="How growth actually happens"
      className="relative z-0 -mt-28 overflow-hidden pb-12 pt-2 md:-mt-36 md:pb-14 md:pt-4"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#050814]/15 via-transparent to-[#050814]/30"
      />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <VaultEntrance active={(inView || headlineInView) && !reduced} />

        <div ref={headlineRef} className="relative z-[6] mb-10 md:mb-14 lg:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={
              headlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
            }
            transition={{ duration: 0.7, ease: easeEditorial }}
            className="mb-4 text-[12px] font-medium uppercase tracking-[0.3em] text-[#7C5CFF]/75"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Strategic Moat
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
            How growth actually happens.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={
              headlineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
            }
            transition={{ duration: 0.8, delay: 0.18, ease: easeEditorial }}
            className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#9AA8C0] md:mt-5 md:text-base"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            AI-native execution. Founder-led premium. Transparent pricing.
            Outcomes we stand behind with our own money.
          </motion.p>
        </div>

        <FeaturedTransformation
          item={featured}
          onOpen={() => openFile(featured.id)}
        />

        <div
          ref={archiveRef}
          className="relative z-[6] mt-16 md:mt-20 lg:mt-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={
              archiveInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
            }
            transition={{ duration: 0.75, ease: easeEditorial }}
            className="mb-10 md:mb-14"
          >
            <p
              className="mb-3 text-[12px] font-medium uppercase tracking-[0.3em] text-[#7C5CFF]/70"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Engagement Models
            </p>
            <h3
              className="max-w-2xl text-[28px] font-medium tracking-[-0.03em] text-white md:text-[36px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Launch. Scale. Dominate.
            </h3>
          </motion.div>

          <div className="flex flex-col gap-12 md:gap-16 lg:gap-20">
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

        <div id="transformation-file" className="relative z-[8] mt-12 scroll-mt-28 md:mt-16">
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
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-20 bg-gradient-to-t from-[#050814]/45 via-[#050814]/15 to-transparent"
      />
    </section>
  );
}
