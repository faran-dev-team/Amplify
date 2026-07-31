"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
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

type Capability = {
  id: string;
  title: string;
  description: string;
  cta: string;
  image: string;
  /** Progress along signal (0–1) when this module activates */
  pathProgress: number;
  /** Alternating editorial layout */
  flip: boolean;
};

const CAPABILITIES: Capability[] = [
  {
    id: "ai",
    title: "Generative AI",
    description:
      "Custom AI apps, chatbots, and production workflows — AI-native across every practice, not bolted on.",
    cta: "Explore Generative AI",
    image: "/capabilities/capability-ai.png",
    pathProgress: 0.22,
    flip: false,
  },
  {
    id: "software",
    title: "Digital Transformation",
    description:
      "End-to-end modernization — strategy, automation, and growth systems that replace agency sprawl.",
    cta: "Explore Transformation",
    image: "/capabilities/capability-software.png",
    pathProgress: 0.38,
    flip: true,
  },
  {
    id: "cloud",
    title: "Cloud & Data",
    description:
      "Infrastructure, data pipelines, and warehousing — with cybersecurity essentials for growing businesses.",
    cta: "Explore Cloud & Data",
    image: "/capabilities/capability-cloud.png",
    pathProgress: 0.54,
    flip: false,
  },
  {
    id: "growth",
    title: "Paid Media",
    description:
      "Google, Meta, LinkedIn, and GPT-native ads — unified with content, search, analytics, and MarTech.",
    cta: "Explore Paid Media",
    image: "/capabilities/capability-growth.png",
    pathProgress: 0.7,
    flip: true,
  },
  {
    id: "brand",
    title: "Brand Strategy",
    description:
      "Positioning, naming, and brand systems — shipped with creative studio work and web development.",
    cta: "Explore Brand Strategy",
    image: "/capabilities/capability-brand.png",
    pathProgress: 0.86,
    flip: false,
  },
];

/**
 * Continuous signal — enters from Metrics (top-right),
 * cinematic U-turn, then weaves RTL → LTR through modules.
 * viewBox: 0 0 1200 3200
 */
const DESKTOP_PATH =
  "M 1260 -20 C 1320 60, 1340 140, 1280 220 C 1220 300, 1140 280, 1040 240 C 880 180, 700 160, 520 200 C 360 240, 220 300, 160 380 C 90 480, 120 560, 240 620 C 420 710, 680 740, 900 780 C 1060 810, 1180 860, 1220 960 C 1260 1060, 1180 1140, 1020 1180 C 820 1230, 560 1240, 360 1300 C 200 1340, 100 1420, 140 1520 C 190 1640, 360 1680, 560 1720 C 780 1770, 1000 1820, 1120 1920 C 1220 2000, 1240 2100, 1140 2180 C 1000 2290, 740 2320, 500 2380 C 320 2420, 160 2500, 180 2620 C 200 2740, 360 2800, 560 2860 C 760 2920, 980 2980, 1140 3080 C 1200 3120, 1240 3160, 1280 3220";

/** Vertical journey — viewBox 0 0 360 3400 */
const MOBILE_PATH =
  "M 180 -20 C 260 80, 300 160, 240 260 C 170 380, 80 460, 140 580 C 210 720, 300 800, 220 940 C 130 1100, 60 1200, 140 1360 C 230 1540, 300 1640, 220 1800 C 120 2000, 70 2140, 150 2320 C 240 2520, 300 2660, 200 2860 C 120 3000, 160 3120, 180 3280";

function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);
  return mobile;
}

function pointAtLength(path: SVGPathElement, progress: number) {
  const len = path.getTotalLength();
  const p = path.getPointAtLength(Math.max(0, Math.min(1, progress)) * len);
  return { x: p.x, y: p.y };
}

/* ─────────────────────────────────────────────
   Signal pulse (DOM, no React re-renders)
───────────────────────────────────────────── */

function SignalPulse({
  pathRef,
  active,
}: {
  pathRef: React.RefObject<SVGPathElement | null>;
  active: boolean;
}) {
  const circleRef = useRef<SVGCircleElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!active || reduced) return;
    const el = circleRef.current;
    if (!el) return;

    let raf = 0;
    const cycle = 5200;
    const pause = 1800;
    const start = performance.now();

    const tick = (now: number) => {
      if (!active || document.visibilityState !== "visible") {
        raf = 0;
        return;
      }
      const path = pathRef.current;
      if (path) {
        const elapsed = (now - start) % (cycle + pause);
        if (elapsed > cycle) {
          el.setAttribute("opacity", "0");
        } else {
          const t = elapsed / cycle;
          const pt = pointAtLength(path, t);
          const fade =
            t < 0.05 ? t / 0.05 : t > 0.93 ? (1 - t) / 0.07 : 1;
          el.setAttribute("cx", String(pt.x));
          el.setAttribute("cy", String(pt.y));
          el.setAttribute("opacity", String(fade * 0.8));
        }
      }
      raf = requestAnimationFrame(tick);
    };
    if (active) raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, pathRef, reduced]);

  if (reduced || !active) return null;

  return (
    <circle
      ref={circleRef}
      cx={0}
      cy={0}
      r={3}
      fill="#E9D5FF"
      opacity={0}
    />
  );
}

function ActivationNode({
  x,
  y,
  active,
  intensify,
}: {
  x: number;
  y: number;
  active: boolean;
  intensify: boolean;
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <motion.circle
        r={7}
        fill="none"
        stroke={PURPLE}
        strokeWidth={1}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={
          active
            ? { opacity: [0.5, 0], scale: [0.4, 3.4] }
            : { opacity: 0, scale: 0.4 }
        }
        transition={{ duration: 1.15, ease: easeOutExpo }}
      />
      <motion.circle
        r={4.5}
        fill={PURPLE}
        initial={{ opacity: 0.1, scale: 0.6 }}
        animate={
          active
            ? {
                opacity: intensify ? 0.95 : 0.72,
                scale: intensify ? 1.18 : 1,
              }
            : { opacity: 0.1, scale: 0.6 }
        }
        transition={{ duration: 0.55, ease: easeEditorial }}
        style={{
          filter: active
            ? "drop-shadow(0 0 10px rgba(168,85,247,0.65))"
            : undefined,
        }}
      />
      <motion.circle
        r={1.7}
        fill="#F5E9FF"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 0.9 : 0 }}
        transition={{ duration: 0.35, delay: 0.12 }}
      />
    </g>
  );
}

function CapabilitiesSignal({
  journeyActive,
  activated,
  hoveredIndex,
  mobile,
  pathProgress,
}: {
  journeyActive: boolean;
  activated: boolean[];
  hoveredIndex: number | null;
  mobile: boolean;
  /** 0–1 drawn length — follows furthest active module on the way down/up */
  pathProgress: number;
}) {
  const measureRef = useRef<SVGPathElement>(null);
  const [nodes, setNodes] = useState<{ x: number; y: number }[]>([]);
  const reduced = useReducedMotion();
  const d = mobile ? MOBILE_PATH : DESKTOP_PATH;
  const targetLength = journeyActive ? Math.max(0.08, pathProgress) : 0;
  const drawMs = reduced ? 0.01 : 1.15;

  const layoutNodes = useCallback(() => {
    const path = measureRef.current;
    if (!path) return;
    setNodes(CAPABILITIES.map((c) => pointAtLength(path, c.pathProgress)));
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(layoutNodes);
    window.addEventListener("resize", layoutNodes);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", layoutNodes);
    };
  }, [layoutNodes, d]);

  return (
    <svg
      key={mobile ? "m" : "d"}
      className={`pointer-events-none absolute z-[4] ${
        mobile
          ? "left-1/2 top-0 h-full w-[min(100%,380px)] -translate-x-1/2"
          : "inset-0 h-full w-full"
      }`}
      viewBox={mobile ? "0 0 360 3400" : "0 0 1200 3240"}
      preserveAspectRatio={mobile ? "xMidYMin meet" : "xMidYMin meet"}
      aria-hidden
    >
      <defs>
        <filter id="capSignalBloom" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient
          id="capSignalGrad"
          x1="0%"
          y1="0%"
          x2={mobile ? "0%" : "40%"}
          y2="100%"
        >
          <stop offset="0%" stopColor={PURPLE} stopOpacity="0.12" />
          <stop offset="30%" stopColor={PURPLE} stopOpacity="0.5" />
          <stop offset="60%" stopColor={PURPLE_SOFT} stopOpacity="0.4" />
          <stop offset="100%" stopColor={PURPLE} stopOpacity="0.1" />
        </linearGradient>
      </defs>

      <path ref={measureRef} d={d} fill="none" stroke="none" />

      <motion.path
        d={d}
        fill="none"
        stroke={PURPLE}
        strokeWidth={7}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: targetLength,
          opacity: targetLength > 0 ? 0.09 : 0,
        }}
        transition={{
          pathLength: { duration: drawMs, ease: easeEditorial },
          opacity: { duration: 0.45, ease: easeEditorial },
        }}
        filter="url(#capSignalBloom)"
      />

      <motion.path
        d={d}
        fill="none"
        stroke="url(#capSignalGrad)"
        strokeWidth={2.5}
        strokeLinecap="round"
        filter="url(#capSignalBloom)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: targetLength,
          opacity: targetLength > 0 ? 0.48 : 0,
        }}
        transition={{
          pathLength: { duration: drawMs, ease: easeEditorial },
          opacity: { duration: 0.45, ease: easeEditorial },
        }}
      />

      <SignalPulse pathRef={measureRef} active={journeyActive && targetLength > 0.1} />

      {hoveredIndex !== null && nodes[hoveredIndex] && (
        <motion.circle
          cx={nodes[hoveredIndex].x}
          cy={nodes[hoveredIndex].y}
          r={36}
          fill={PURPLE}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.14 }}
          transition={{ duration: 0.35 }}
          filter="url(#capSignalBloom)"
        />
      )}

      {nodes.map((n, i) => (
        <ActivationNode
          key={CAPABILITIES[i].id}
          x={n.x}
          y={n.y}
          active={activated[i]}
          intensify={hoveredIndex === i}
        />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Capability module
───────────────────────────────────────────── */

function CapabilityModule({
  capability,
  index,
  onHoverChange,
  onActiveChange,
}: {
  capability: Capability;
  index: number;
  onHoverChange: (hovered: boolean) => void;
  onActiveChange: (active: boolean) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.32 });
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = window.setTimeout(
        () => setActive(true),
        reduced ? 0 : 100
      );
      return () => window.clearTimeout(t);
    }
    // Leave a beat so reverse exit choreography can play before unmounting interactivity
    const t = window.setTimeout(
      () => setActive(false),
      reduced ? 0 : 40
    );
    return () => window.clearTimeout(t);
  }, [inView, reduced]);

  useEffect(() => {
    onActiveChange(active);
  }, [active, onActiveChange]);

  const imageFirst = !capability.flip;
  // Appear: image → label → title → copy → CTA
  // Disappear: CTA → copy → title → label → image (mirrored)
  const enter = {
    image: 0.06,
    label: 0.18,
    title: 0.26,
    copy: 0.38,
    cta: 0.5,
  };
  const exit = {
    cta: 0,
    copy: 0.1,
    title: 0.2,
    label: 0.3,
    image: 0.42,
  };

  return (
    <article
      ref={ref}
      id={capability.id}
      className={`group relative z-[6] grid items-center gap-8 md:gap-12 lg:gap-16 ${
        capability.flip
          ? "md:grid-cols-[1fr_1.15fr]"
          : "md:grid-cols-[1.15fr_1fr]"
      }`}
      onMouseEnter={() => active && onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      style={{ pointerEvents: active ? "auto" : "none" }}
    >
      <motion.div
        className={`relative overflow-hidden rounded-[24px] border border-white/[0.06] bg-[#0A0B12]/8 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[6px] group-hover:border-white/[0.12] group-hover:shadow-[0_28px_64px_rgba(0,0,0,0.5),0_0_48px_rgba(168,85,247,0.12)] ${
          imageFirst ? "md:order-1" : "md:order-2"
        }`}
        initial={{ opacity: 0, y: 40 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
        transition={{
          duration: active ? 0.9 : 0.7,
          ease: easeEditorial,
          delay: active ? enter.image : exit.image,
        }}
        style={{
          boxShadow:
            "0 24px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
          willChange: "transform, opacity",
        }}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <motion.div
            className="absolute inset-0 origin-center"
            initial={{ scale: 1.06, opacity: 0.7 }}
            animate={{
              scale: active ? 1 : 1.06,
              opacity: active ? 1 : 0,
            }}
            whileHover={active ? { scale: 1.02 } : undefined}
            transition={{
              duration: active ? 1.15 : 0.65,
              ease: easeEditorial,
              delay: active ? enter.image : exit.image,
            }}
            style={{ willChange: "transform, opacity" }}
          >
            <Image
              src={capability.image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover"
              loading="lazy"
            />
          </motion.div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030208]/50 via-transparent to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:bg-[#A855F7]/28 group-hover:opacity-100"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-70"
          />
        </div>
      </motion.div>

      <div
        className={`relative ${imageFirst ? "md:order-2" : "md:order-1"} ${
          capability.flip ? "md:pr-2 lg:pr-6" : "md:pl-2 lg:pl-6"
        }`}
      >
        <motion.p
          className="mb-4 text-[12px] font-medium uppercase tracking-[0.28em] text-[#A855F7]/80"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{
            duration: active ? 0.45 : 0.35,
            delay: active ? enter.label : exit.label,
          }}
        >
          Module {String(index + 1).padStart(2, "0")}
        </motion.p>

        <motion.h3
          className="text-[28px] font-medium leading-[1.15] tracking-[-0.03em] text-white md:text-[34px] lg:text-[40px]"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          initial={{ opacity: 0, y: 18 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{
            duration: active ? 0.75 : 0.55,
            delay: active ? enter.title : exit.title,
            ease: easeEditorial,
          }}
        >
          {capability.title}
        </motion.h3>

        <motion.p
          className="mt-4 max-w-md text-[15px] leading-relaxed text-white/50 md:mt-5 md:text-[16px]"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          initial={{ opacity: 0, y: 14 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{
            duration: active ? 0.7 : 0.5,
            delay: active ? enter.copy : exit.copy,
            ease: easeEditorial,
          }}
        >
          {capability.description}
        </motion.p>

        <motion.a
          href="#contact"
          className="group/cta mt-7 inline-flex items-center gap-2.5 text-[14px] font-medium tracking-[0.02em] text-[#E9D5FF] transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]/60"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          initial={{ opacity: 0, y: 10 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{
            duration: active ? 0.6 : 0.4,
            delay: active ? enter.cta : exit.cta,
            ease: easeEditorial,
          }}
          tabIndex={active ? 0 : -1}
        >
          {capability.cta}
          <span
            aria-hidden
            className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-x-2"
          >
            →
          </span>
        </motion.a>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────
   Main section
───────────────────────────────────────────── */

export function GrowthCapabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, {
    once: false,
    amount: 0.08,
    margin: "-6% 0px -8% 0px",
  });
  const headlineInView = useInView(headlineRef, { once: false, amount: 0.6 });
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  const [journeyActive, setJourneyActive] = useState(false);
  const [activated, setActivated] = useState<boolean[]>(() =>
    CAPABILITIES.map(() => false)
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const timers: number[] = [];

    if (!inView) {
      // Leave section: deactivate modules last → first, then fold the signal
      setHoveredIndex(null);
      if (reduced) {
        setActivated(CAPABILITIES.map(() => false));
        setJourneyActive(false);
        return;
      }

      const reverse = [...CAPABILITIES]
        .map((c, i) => ({ i, progress: c.pathProgress }))
        .sort((a, b) => b.progress - a.progress);

      reverse.forEach((item, step) => {
        timers.push(
          window.setTimeout(() => {
            setActivated((prev) => {
              const next = [...prev];
              next[item.i] = false;
              return next;
            });
          }, step * 320)
        );
      });

      timers.push(
        window.setTimeout(
          () => setJourneyActive(false),
          reverse.length * 320 + 200
        )
      );

      return () => timers.forEach((t) => window.clearTimeout(t));
    }

    setJourneyActive(true);
  }, [inView, reduced]);

  const setModuleActive = useCallback((index: number, active: boolean) => {
    // While section is in view, each module drives its own step; ignore when section exit choreography owns state
    setActivated((prev) => {
      if (prev[index] === active) return prev;
      const next = [...prev];
      next[index] = active;
      return next;
    });
  }, []);

  const signalProgress = (() => {
    let max = 0.12;
    activated.forEach((on, i) => {
      if (on) max = Math.max(max, CAPABILITIES[i].pathProgress + 0.06);
    });
    if (!journeyActive) return 0;
    if (!activated.some(Boolean)) return 0.14;
    return Math.min(1, max);
  })();

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Thirteen practices. One partner."
      className="relative z-0 -mt-24 overflow-hidden pb-36 pt-8 md:-mt-32 md:pb-48 md:pt-12"
    >
      {/* Continuous midnight — no section break */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#030208]/10 via-transparent to-[#030208]/20"
      />

      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8">
        {/* Editorial headline */}
        <div ref={headlineRef} className="relative z-[6] mb-20 md:mb-28 lg:mb-36">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={
              headlineInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 12 }
            }
            transition={{ duration: 0.7, ease: easeEditorial }}
            className="mb-4 text-[12px] font-medium uppercase tracking-[0.3em] text-[#A855F7]/75"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Thirteen Practices
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={
              headlineInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.95, delay: 0.08, ease: easeEditorial }}
            className="max-w-3xl text-[2.75rem] font-medium leading-[1.05] tracking-[-0.035em] text-white md:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            One partner. Every channel.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={
              headlineInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 14 }
            }
            transition={{ duration: 0.8, delay: 0.18, ease: easeEditorial }}
            className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/45 md:mt-6 md:text-base"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            We sell sharp positioning. We deliver broad capability — AI-native across every practice.
          </motion.p>
        </div>

        {/* Signal + modules */}
        <div className="relative min-h-[2800px] md:min-h-[3000px]">
          <div className="pointer-events-none absolute inset-0 z-[4]">
            <CapabilitiesSignal
              journeyActive={journeyActive && !reduced}
              activated={activated}
              hoveredIndex={hoveredIndex}
              mobile={mobile}
              pathProgress={signalProgress}
            />
          </div>

          <div className="relative z-[6] flex flex-col gap-24 md:gap-32 lg:gap-40">
            {CAPABILITIES.map((cap, i) => (
              <CapabilityModule
                key={cap.id}
                capability={cap}
                index={i}
                onHoverChange={(hovered) =>
                  setHoveredIndex(hovered ? i : null)
                }
                onActiveChange={(active) => setModuleActive(i, active)}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-[#030208]/35 to-transparent"
      />
    </section>
  );
}
