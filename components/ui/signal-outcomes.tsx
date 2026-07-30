"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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

/** Accelerate mid-journey, settle with physical weight — no bounce */
function intelligenceEase(t: number): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  const accelerated = t * t * (3 - 2 * t);
  const settle = 1 - Math.pow(1 - t, 3.4);
  return accelerated * 0.28 + settle * 0.72;
}

/* ─────────────────────────────────────────────
   Metrics
───────────────────────────────────────────── */

type Metric = {
  id: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  title: string;
  description: string;
  /** Progress along the signal (0–1) when this node activates */
  pathProgress: number;
  /**
   * Mountain terrace offset (desktop) —
   * each step drops further down the ridge.
   */
  terrace: string;
  /** Horizontal seat along the ridge (desktop grid) */
  seat: string;
};

const METRICS: Metric[] = [
  {
    id: "revenue",
    value: 700,
    suffix: "K+",
    title: "Revenue Delivered",
    description:
      "Helping ambitious businesses accelerate measurable growth.",
    pathProgress: 0.26,
    terrace: "mt-0",
    seat: "md:justify-self-start md:ml-[2%]",
  },
  {
    id: "multiplier",
    value: 2.4,
    decimals: 1,
    suffix: "×",
    title: "Growth Multiplier",
    description:
      "Compounding systems that turn attention into durable pipeline.",
    pathProgress: 0.52,
    terrace: "mt-10 md:mt-28 lg:mt-36",
    seat: "md:justify-self-center",
  },
  {
    id: "retention",
    value: 98,
    suffix: "%",
    title: "Client Retention",
    description:
      "Partnerships built on precision, clarity, and outcomes that last.",
    pathProgress: 0.78,
    terrace: "mt-10 md:mt-56 lg:mt-72",
    seat: "md:justify-self-end md:mr-[2%]",
  },
];

/**
 * Descending mountain ridge — starts high-left from Hero,
 * cascades down through three terraces, exits lower-right.
 * Organic, slightly asymmetric. viewBox: 0 0 1200 820
 */
const DESKTOP_PATH =
  "M -60 -40 C 40 20, 100 90, 200 160 C 300 240, 340 280, 420 250 C 520 200, 560 280, 640 360 C 720 440, 760 420, 840 400 C 940 370, 1000 480, 1100 560 C 1160 610, 1220 680, 1300 760";

/** Vertical mountain descent for mobile — viewBox 0 0 320 1100 */
const MOBILE_PATH =
  "M 160 -30 C 70 80, 250 160, 160 280 C 60 420, 260 500, 160 620 C 50 760, 260 840, 160 980 C 120 1040, 180 1070, 160 1120";

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
   Count-up — engineered, rAF, single pass
───────────────────────────────────────────── */

function useEngineeredCount(
  target: number,
  active: boolean,
  durationMs = 2200,
  decimals = 0
) {
  const [display, setDisplay] = useState("0");
  const [settled, setSettled] = useState(false);
  const last = useRef("");
  const rafRef = useRef(0);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);

    if (!active) {
      last.current = "0";
      setDisplay("0");
      setSettled(false);
      return;
    }

    let start = 0;
    const format = (n: number) =>
      decimals > 0
        ? n.toFixed(decimals)
        : Math.round(n).toLocaleString("en-US");

    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / durationMs);
      const eased = intelligenceEase(t);
      const next = format(target * eased);
      if (next !== last.current) {
        last.current = next;
        setDisplay(next);
      }
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        const final = format(target);
        last.current = final;
        setDisplay(final);
        setSettled(true);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target, durationMs, decimals]);

  return { display, settled };
}

/* ─────────────────────────────────────────────
   Atmospheric micro-particles (Layer 2)
───────────────────────────────────────────── */

function AtmosphereDrift({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Dot = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      a: number;
    };
    let dots: Dot[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(48, Math.floor((w * h) / 28000));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.08 - 0.02,
        a: Math.random() * 0.25 + 0.08,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, w, h);
      if (!active) return;
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < -4) d.x = w + 4;
        if (d.x > w + 4) d.x = -4;
        if (d.y < -4) d.y = h + 4;
        if (d.y > h + 4) d.y = -4;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${d.a})`;
        ctx.fill();
      }
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
      aria-hidden
    />
  );
}

/* ─────────────────────────────────────────────
   Neural mesh — soft breathing lattice (Layer 3)
───────────────────────────────────────────── */

function NeuralMesh({ active }: { active: boolean }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[3] h-full w-full"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="meshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={PURPLE} stopOpacity="0" />
          <stop offset="45%" stopColor={PURPLE} stopOpacity="0.18" />
          <stop offset="100%" stopColor={PURPLE_SOFT} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.g
        initial={{ opacity: 0.15 }}
        animate={
          active
            ? { opacity: [0.28, 0.42, 0.32, 0.38] }
            : { opacity: 0.15 }
        }
        transition={
          active
            ? { duration: 14, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.6 }
        }
        stroke="url(#meshGrad)"
        strokeWidth="0.6"
        fill="none"
      >
        <path d="M 80 120 C 220 80, 360 200, 500 160 C 680 110, 820 240, 980 200" />
        <path d="M 40 320 C 200 280, 340 400, 520 360 C 700 320, 860 440, 1120 380" />
        <path d="M 120 520 C 280 480, 420 580, 600 540 C 780 500, 940 600, 1100 560" />
        <path d="M 300 40 C 320 180, 280 320, 340 460 C 380 560, 300 640, 360 700" />
        <path d="M 700 20 C 740 160, 680 300, 760 440 C 820 560, 700 640, 740 720" />
        <circle cx="420" cy="380" r="2.5" fill={PURPLE} fillOpacity="0.35" stroke="none" />
        <circle cx="600" cy="340" r="2" fill={PURPLE_SOFT} fillOpacity="0.3" stroke="none" />
        <circle cx="820" cy="400" r="2" fill={PURPLE} fillOpacity="0.25" stroke="none" />
      </motion.g>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Activation node + ripple
───────────────────────────────────────────── */

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
        r={6}
        fill="none"
        stroke={PURPLE}
        strokeWidth={1}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={
          active
            ? { opacity: [0.55, 0], scale: [0.4, 3.2] }
            : { opacity: 0, scale: 0.4 }
        }
        transition={{ duration: 1.1, ease: easeOutExpo }}
      />
      <motion.circle
        r={6}
        fill="none"
        stroke={PURPLE_SOFT}
        strokeWidth={0.8}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={
          active
            ? { opacity: [0.35, 0], scale: [0.4, 4.5] }
            : { opacity: 0, scale: 0.4 }
        }
        transition={{ duration: 1.4, ease: easeOutExpo, delay: 0.12 }}
      />
      <motion.circle
        r={4}
        fill={PURPLE}
        initial={{ opacity: 0.12, scale: 0.6 }}
        animate={
          active
            ? {
                opacity: intensify ? 0.95 : 0.75,
                scale: intensify ? 1.15 : 1,
              }
            : { opacity: 0.12, scale: 0.6 }
        }
        transition={{ duration: 0.55, ease: easeEditorial }}
        style={{
          filter: active
            ? "drop-shadow(0 0 8px rgba(168,85,247,0.7))"
            : undefined,
        }}
      />
      <motion.circle
        r={1.6}
        fill="#F5E9FF"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 0.9 : 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      />
    </g>
  );
}

/* ─────────────────────────────────────────────
   Travelling intelligence pulse along path
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
    const cycle = 3800;
    const pause = 2400;
    const start = performance.now();

    const tick = (now: number) => {
      const path = pathRef.current;
      if (path) {
        const elapsed = (now - start) % (cycle + pause);
        if (elapsed > cycle) {
          el.setAttribute("opacity", "0");
        } else {
          const t = elapsed / cycle;
          const pt = pointAtLength(path, t);
          const fade =
            t < 0.06 ? t / 0.06 : t > 0.92 ? (1 - t) / 0.08 : 1;
          el.setAttribute("cx", String(pt.x));
          el.setAttribute("cy", String(pt.y));
          el.setAttribute("opacity", String(fade * 0.85));
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, pathRef, reduced]);

  if (reduced || !active) return null;

  return (
    <circle
      ref={circleRef}
      cx={0}
      cy={0}
      r={3.2}
      fill="#E9D5FF"
      opacity={0}
      style={{ filter: "url(#signalBloom)" }}
    />
  );
}

/* ─────────────────────────────────────────────
   Metric card
───────────────────────────────────────────── */

function MetricCard({
  metric,
  active,
  index,
  onHoverChange,
}: {
  metric: Metric;
  active: boolean;
  index: number;
  onHoverChange: (hovered: boolean) => void;
}) {
  const reduced = useReducedMotion();
  const { display, settled } = useEngineeredCount(
    metric.value,
    active && !reduced,
    2100 + index * 180,
    metric.decimals ?? 0
  );

  const label = reduced
    ? `${metric.prefix ?? ""}${
        (metric.decimals ?? 0) > 0
          ? metric.value.toFixed(metric.decimals)
          : metric.value.toLocaleString("en-US")
      }${metric.suffix ?? ""}`
    : `${metric.prefix ?? ""}${display}${metric.suffix ?? ""}`;

  const cardCount = METRICS.length;
  // Enter from upslope — slightly above & left, settle onto terrace
  const enterX = index === 0 ? -18 : index === 1 ? -8 : 10;
  const enterY = 42 + index * 10;

  return (
    <motion.article
      className={`group relative z-[6] w-full max-w-[320px] lg:max-w-[340px] ${metric.terrace} ${metric.seat}`}
      initial={{ opacity: 0, x: enterX, y: enterY }}
      animate={
        active
          ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
          : {
              opacity: 0,
              x: enterX * 0.4,
              y: enterY * 0.55,
              filter: "blur(6px)",
            }
      }
      transition={{
        duration: active ? 0.95 : 0.65,
        delay: active
          ? 0.1 + index * 0.1
          : (cardCount - 1 - index) * 0.28,
        ease: easeEditorial,
      }}
      onMouseEnter={() => active && onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      onFocus={() => active && onHoverChange(true)}
      onBlur={() => onHoverChange(false)}
      style={{
        willChange: "transform, opacity, filter",
        pointerEvents: active ? "auto" : "none",
      }}
      aria-hidden={!active}
    >
      <div
        className="relative overflow-hidden rounded-[22px] border border-white/[0.06] bg-[#0A0B12]/78 px-8 py-9 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[6px] group-hover:border-white/[0.12] group-hover:shadow-[0_28px_56px_rgba(0,0,0,0.5),0_0_48px_rgba(168,85,247,0.14)] focus-within:border-white/[0.12]"
        style={{
          boxShadow:
            "0 18px 44px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
        tabIndex={0}
      >
        {/* Ridge accent — tiny purple tick hinting connection to the path */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-px left-8 h-px w-12 bg-gradient-to-r from-[#A855F7]/70 to-transparent opacity-70"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-8 -top-10 h-28 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:bg-[#A855F7]/25 group-hover:opacity-100"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-60"
        />

        <motion.p
          className="relative text-[52px] font-medium leading-none tracking-[-0.04em] text-white md:text-[56px]"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{
            duration: active ? 0.5 : 0.3,
            delay: active ? 0.18 : 0,
          }}
        >
          <motion.span
            initial={{ opacity: 1, scale: 1 }}
            animate={
              settled && !reduced
                ? { opacity: [1, 0.84, 1], scale: [1, 1.012, 1] }
                : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.42, ease: easeOutExpo }}
            className="inline-block origin-left"
            style={{ willChange: "transform, opacity" }}
          >
            {label}
          </motion.span>
        </motion.p>

        <h3
          className="relative mt-5 text-[15px] font-medium tracking-[0.04em] text-[#E9D5FF]"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          {metric.title}
        </h3>
        <p
          className="relative mt-2.5 max-w-[260px] text-[14px] leading-relaxed text-white/45"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          {metric.description}
        </p>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────
   Signal path system (Layer 4 + 5)
───────────────────────────────────────────── */

function SignalSystem({
  journeyActive,
  activated,
  hoveredIndex,
  mobile,
}: {
  journeyActive: boolean;
  activated: boolean[];
  hoveredIndex: number | null;
  mobile: boolean;
}) {
  const measureRef = useRef<SVGPathElement>(null);
  const [nodes, setNodes] = useState<{ x: number; y: number }[]>([]);
  const reduced = useReducedMotion();
  const d = mobile ? MOBILE_PATH : DESKTOP_PATH;
  const drawMs = reduced ? 0.01 : journeyActive ? 2.45 : 0.9;

  const layoutNodes = useCallback(() => {
    const path = measureRef.current;
    if (!path) return;
    setNodes(METRICS.map((m) => pointAtLength(path, m.pathProgress)));
  }, []);

  useEffect(() => {
    // Allow SVG to commit path before measuring
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
      viewBox={mobile ? "0 0 320 1120" : "0 0 1200 820"}
      preserveAspectRatio={mobile ? "xMidYMin meet" : "xMidYMid meet"}
      aria-hidden
    >
      <defs>
        <filter id="signalBloom" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient
          id="signalGrad"
          x1="0%"
          y1="0%"
          x2={mobile ? "0%" : "100%"}
          y2={mobile ? "100%" : "20%"}
        >
          <stop offset="0%" stopColor={PURPLE} stopOpacity="0.12" />
          <stop offset="35%" stopColor={PURPLE} stopOpacity="0.55" />
          <stop offset="70%" stopColor={PURPLE_SOFT} stopOpacity="0.42" />
          <stop offset="100%" stopColor={PURPLE} stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Measure path — full geometry, invisible */}
      <path ref={measureRef} d={d} fill="none" stroke="none" />

      {/* Soft ambient underglow */}
      <motion.path
        d={d}
        fill="none"
        stroke={PURPLE}
        strokeWidth={7}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: journeyActive ? 1 : 0,
          opacity: journeyActive ? 0.1 : 0,
        }}
        transition={{
          pathLength: { duration: drawMs, ease: easeEditorial },
          opacity: {
            duration: journeyActive ? drawMs : 0.45,
            ease: easeEditorial,
          },
        }}
        filter="url(#signalBloom)"
      />

      {/* Primary signal — ~2.5px intelligence line */}
      <motion.path
        d={d}
        fill="none"
        stroke="url(#signalGrad)"
        strokeWidth={2.5}
        strokeLinecap="round"
        filter="url(#signalBloom)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: journeyActive ? 1 : 0,
          opacity: journeyActive ? 0.5 : 0,
        }}
        transition={{
          pathLength: { duration: drawMs, ease: easeEditorial },
          opacity: {
            duration: journeyActive ? drawMs : 0.45,
            ease: easeEditorial,
          },
        }}
      />

      <SignalPulse pathRef={measureRef} active={journeyActive} />

      {hoveredIndex !== null && nodes[hoveredIndex] && (
        <motion.circle
          cx={nodes[hoveredIndex].x}
          cy={nodes[hoveredIndex].y}
          r={32}
          fill={PURPLE}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.16 }}
          transition={{ duration: 0.35 }}
          filter="url(#signalBloom)"
        />
      )}

      {nodes.map((n, i) => (
        <ActivationNode
          key={METRICS[i].id}
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
   Main section
───────────────────────────────────────────── */

export function SignalOutcomes() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, {
    once: false,
    amount: 0.32,
    margin: "-8% 0px -12% 0px",
  });
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  const [journeyActive, setJourneyActive] = useState(false);
  const [activated, setActivated] = useState<boolean[]>([false, false, false]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const timers: number[] = [];

    if (!inView) {
      // Exit step-by-step — reverse of appear (last terrace → first), then path retracts
      setHoveredIndex(null);

      if (reduced) {
        setActivated([false, false, false]);
        setJourneyActive(false);
        return;
      }

      const reverseOrder = [...METRICS]
        .map((m, i) => ({ i, progress: m.pathProgress }))
        .sort((a, b) => b.progress - a.progress);

      reverseOrder.forEach((item, step) => {
        timers.push(
          window.setTimeout(() => {
            setActivated((prev) => {
              const next = [...prev];
              next[item.i] = false;
              return next;
            });
          }, step * 280)
        );
      });

      timers.push(
        window.setTimeout(
          () => setJourneyActive(false),
          reverseOrder.length * 280 + 180
        )
      );

      return () => timers.forEach((t) => window.clearTimeout(t));
    }

    setJourneyActive(true);

    if (reduced) {
      setActivated([true, true, true]);
      return;
    }

    METRICS.forEach((m, i) => {
      // Signal draws ~2.45s; activate as the pulse "arrives"
      const delay = 380 + m.pathProgress * 2300;
      timers.push(
        window.setTimeout(() => {
          setActivated((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, delay)
      );
    });

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [inView, reduced]);

  return (
    <section
      ref={sectionRef}
      id="outcomes"
      aria-label="Measurable outcomes"
      className="relative z-0 -mt-[18vh] min-h-[110vh] overflow-hidden pb-32 pt-[18vh] md:-mt-[12vh] md:min-h-[130vh] md:pb-48 md:pt-[14vh]"
    >
      {/* Continuous midnight veil — no hard section break */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-[#030208]/15 to-[#030208]/25"
      />

      <AtmosphereDrift active={journeyActive} />
      <NeuralMesh active={journeyActive} />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <div
          className={`relative ${
            mobile ? "min-h-[1080px]" : "min-h-[640px] md:min-h-[780px] lg:min-h-[860px]"
          }`}
        >
          {/* Layers 4–5: descending ridge + nodes beneath terraces */}
          <div
            className={`pointer-events-none absolute inset-x-0 z-[4] ${
              mobile ? "-top-4 bottom-0" : "-top-[18%] bottom-[-6%]"
            }`}
          >
            <SignalSystem
              journeyActive={journeyActive}
              activated={activated}
              hoveredIndex={hoveredIndex}
              mobile={mobile}
            />
          </div>

          {/* Layer 6: mountain terraces — cascading top → down with the line */}
          <div
            className={`relative z-[6] ${
              mobile
                ? "mt-20 flex flex-col items-center gap-4 pt-6"
                : "mt-10 grid grid-cols-3 items-start gap-6 lg:mt-14 lg:gap-10"
            }`}
          >
            {METRICS.map((metric, i) => (
              <MetricCard
                key={metric.id}
                metric={metric}
                active={activated[i]}
                index={i}
                onHoverChange={(hovered) =>
                  setHoveredIndex(hovered ? i : null)
                }
              />
            ))}
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-36 bg-gradient-to-t from-[#030208]/30 to-transparent"
      />
    </section>
  );
}
