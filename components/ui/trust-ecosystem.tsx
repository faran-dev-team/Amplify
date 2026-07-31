"use client";

import React, {
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

type NodeKind = "platform" | "industry" | "hub";

type EcosystemNode = {
  id: string;
  label: string;
  kind: NodeKind;
  /** Progress along trunk when this relationship activates */
  pathProgress: number;
  /** Desktop node center in SVG space (viewBox 1200×1680) */
  dx: number;
  dy: number;
  /** Mobile node center in SVG space (viewBox 360×2600) */
  mx: number;
  my: number;
  /** Cinematic card imagery */
  image: string;
};

const HUB_D = { x: 600, y: 260 };
const HUB_M = { x: 180, y: 200 };

/**
 * Platforms + industries — curated positions for optical balance.
 * Imagery is atmospheric / category photography (not trademarked marks).
 */
const NODES: EcosystemNode[] = [
  {
    id: "hub",
    label: "Amplify",
    kind: "hub",
    pathProgress: 0.12,
    dx: 600,
    dy: 260,
    mx: 180,
    my: 200,
    image: "/ecosystem/hub.jpg",
  },
  {
    id: "fiverr",
    label: "Fiverr",
    kind: "platform",
    pathProgress: 0.22,
    dx: 150,
    dy: 150,
    mx: 110,
    my: 400,
    image: "/ecosystem/fiverr.jpg",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    kind: "platform",
    pathProgress: 0.28,
    dx: 1040,
    dy: 140,
    mx: 250,
    my: 560,
    image: "/ecosystem/linkedin.jpg",
  },
  {
    id: "upwork",
    label: "Upwork",
    kind: "platform",
    pathProgress: 0.36,
    dx: 1050,
    dy: 420,
    mx: 100,
    my: 720,
    image: "/ecosystem/upwork.jpg",
  },
  {
    id: "clutch",
    label: "Clutch",
    kind: "platform",
    pathProgress: 0.42,
    dx: 150,
    dy: 440,
    mx: 255,
    my: 880,
    image: "/ecosystem/clutch.jpg",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    kind: "industry",
    pathProgress: 0.5,
    dx: 360,
    dy: 620,
    mx: 105,
    my: 1060,
    image: "/ecosystem/healthcare.jpg",
  },
  {
    id: "technology",
    label: "Technology",
    kind: "industry",
    pathProgress: 0.54,
    dx: 840,
    dy: 600,
    mx: 250,
    my: 1220,
    image: "/ecosystem/technology.jpg",
  },
  {
    id: "saas",
    label: "SaaS",
    kind: "industry",
    pathProgress: 0.58,
    dx: 180,
    dy: 760,
    mx: 110,
    my: 1380,
    image: "/ecosystem/saas.jpg",
  },
  {
    id: "finance",
    label: "Finance",
    kind: "industry",
    pathProgress: 0.62,
    dx: 1040,
    dy: 740,
    mx: 255,
    my: 1540,
    image: "/ecosystem/finance.jpg",
  },
  {
    id: "construction",
    label: "Construction",
    kind: "industry",
    pathProgress: 0.68,
    dx: 440,
    dy: 900,
    mx: 100,
    my: 1700,
    image: "/ecosystem/construction.jpg",
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    kind: "industry",
    pathProgress: 0.72,
    dx: 780,
    dy: 920,
    mx: 250,
    my: 1860,
    image: "/ecosystem/ecommerce.jpg",
  },
  {
    id: "proservices",
    label: "Professional Services",
    kind: "industry",
    pathProgress: 0.76,
    dx: 140,
    dy: 1040,
    mx: 110,
    my: 2020,
    image: "/ecosystem/proservices.jpg",
  },
  {
    id: "homeservices",
    label: "Home Services",
    kind: "industry",
    pathProgress: 0.8,
    dx: 560,
    dy: 1100,
    mx: 250,
    my: 2180,
    image: "/ecosystem/homeservices.jpg",
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    kind: "industry",
    pathProgress: 0.84,
    dx: 980,
    dy: 1080,
    mx: 180,
    my: 2340,
    image: "/ecosystem/manufacturing.jpg",
  },
];

function branchPath(
  from: { x: number; y: number },
  to: { x: number; y: number },
  sway = 0.35
) {
  const mx = (from.x + to.x) / 2 + (to.y - from.y) * sway * 0.15;
  const my = (from.y + to.y) / 2 - (to.x - from.x) * sway * 0.12;
  return `M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`;
}

/**
 * Trunk — enters from Capabilities (top-right), reaches hub,
 * then converges all relationships into a single exit signal.
 * viewBox: 0 0 1200 1680
 */
const DESKTOP_TRUNK =
  "M 1280 -20 C 1220 60, 1100 140, 980 180 C 860 220, 720 240, 600 260 C 520 275, 490 320, 510 400 C 555 580, 575 760, 585 940 C 592 1100, 575 1240, 560 1360 C 545 1460, 555 1560, 590 1640 C 605 1670, 610 1690, 600 1720";

/** Vertical trunk — viewBox 0 0 360 2600 */
const MOBILE_TRUNK =
  "M 180 -20 C 220 50, 240 120, 180 200 C 140 260, 155 340, 180 420 C 220 560, 210 700, 180 840 C 145 1020, 155 1200, 180 1360 C 215 1540, 205 1720, 180 1880 C 145 2060, 160 2240, 180 2400 C 190 2480, 185 2540, 180 2600";

const DESKTOP_W = 1200;
const DESKTOP_H = 1680;
const MOBILE_W = 360;
const MOBILE_H = 2600;

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
  if (!len || !Number.isFinite(len)) return { x: 0, y: 0 };
  const p = path.getPointAtLength(Math.max(0, Math.min(1, progress)) * len);
  return { x: p.x, y: p.y };
}

/* ─────────────────────────────────────────────
   Atmosphere + neural mesh
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
      const count = Math.min(42, Math.floor((w * h) / 32000));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.35,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.07 - 0.015,
        a: Math.random() * 0.22 + 0.06,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!active || document.visibilityState !== "visible") {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, w, h);
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
    if (active) draw();

    const onVis = () => {
      if (document.visibilityState === "visible" && active && !raf) draw();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
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

function NeuralMesh({ active }: { active: boolean }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[3] h-full w-full"
      viewBox="0 0 1200 1400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="trustMeshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={PURPLE} stopOpacity="0" />
          <stop offset="45%" stopColor={PURPLE} stopOpacity="0.14" />
          <stop offset="100%" stopColor={PURPLE_SOFT} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.g
        initial={{ opacity: 0.12 }}
        animate={
          active
            ? { opacity: [0.22, 0.36, 0.26, 0.32] }
            : { opacity: 0.12 }
        }
        transition={
          active
            ? { duration: 16, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.6 }
        }
        stroke="url(#trustMeshGrad)"
        strokeWidth="0.55"
        fill="none"
      >
        <path d="M 100 180 C 280 120, 460 240, 640 180 C 820 120, 980 260, 1140 200" />
        <path d="M 60 480 C 240 420, 420 560, 620 500 C 820 440, 1000 580, 1160 520" />
        <path d="M 80 820 C 260 760, 440 900, 640 840 C 840 780, 1020 920, 1180 860" />
        <path d="M 140 1120 C 320 1060, 500 1200, 700 1140 C 880 1080, 1040 1220, 1160 1160" />
        <path d="M 400 60 C 430 280, 380 520, 450 760 C 500 960, 420 1180, 480 1380" />
        <path d="M 780 40 C 820 280, 760 540, 840 800 C 900 1020, 780 1220, 820 1400" />
        <circle cx="600" cy="200" r="2.4" fill={PURPLE} fillOpacity="0.35" stroke="none" />
        <circle cx="360" cy="520" r="1.8" fill={PURPLE_SOFT} fillOpacity="0.28" stroke="none" />
        <circle cx="820" cy="500" r="1.8" fill={PURPLE} fillOpacity="0.24" stroke="none" />
      </motion.g>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Signal pulse + activation node
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
    const cycle = 5600;
    const pause = 2000;
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
            t < 0.05 ? t / 0.05 : t > 0.93 ? (1 - t) / 0.07 : 1;
          el.setAttribute("cx", String(pt.x));
          el.setAttribute("cy", String(pt.y));
          el.setAttribute("opacity", String(fade * 0.75));
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
      r={2.8}
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
  hub,
}: {
  x: number;
  y: number;
  active: boolean;
  intensify: boolean;
  hub?: boolean;
}) {
  const r = hub ? 5.5 : 3.8;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <motion.circle
        r={hub ? 9 : 6}
        fill="none"
        stroke={PURPLE}
        strokeWidth={1}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={
          active
            ? { opacity: [0.5, 0], scale: [0.4, hub ? 3.8 : 3.2] }
            : { opacity: 0, scale: 0.4 }
        }
        transition={{ duration: 1.2, ease: easeOutExpo }}
      />
      <motion.circle
        r={r}
        fill={PURPLE}
        initial={{ opacity: 0.1, scale: 0.6 }}
        animate={
          active
            ? {
                opacity: intensify ? 0.95 : hub ? 0.85 : 0.7,
                scale: intensify ? 1.2 : 1,
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
        r={hub ? 2 : 1.4}
        fill="#F5E9FF"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 0.9 : 0 }}
        transition={{ duration: 0.35, delay: 0.12 }}
      />
    </g>
  );
}

function BranchPulse({
  branchRefs,
  index,
  active,
}: {
  branchRefs: React.MutableRefObject<(SVGPathElement | null)[]>;
  index: number;
  active: boolean;
}) {
  const circleRef = useRef<SVGCircleElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!active || reduced) return;
    const el = circleRef.current;
    if (!el) return;

    let raf = 0;
    const cycle = 4200;
    const pause = 3200;
    const start = performance.now() + (index * 613) % 2000;

    const tick = (now: number) => {
      const path = branchRefs.current[index];
      if (path) {
        const elapsed = (now - start) % (cycle + pause);
        if (elapsed < 0 || elapsed > cycle) {
          el.setAttribute("opacity", "0");
        } else {
          const t = elapsed / cycle;
          const pt = pointAtLength(path, t);
          const fade =
            t < 0.08 ? t / 0.08 : t > 0.9 ? (1 - t) / 0.1 : 1;
          el.setAttribute("cx", String(pt.x));
          el.setAttribute("cy", String(pt.y));
          el.setAttribute("opacity", String(fade * 0.55));
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, branchRefs, index, reduced]);

  if (reduced || !active) return null;

  return (
    <circle
      ref={circleRef}
      cx={0}
      cy={0}
      r={2}
      fill="#E9D5FF"
      opacity={0}
    />
  );
}

/* ─────────────────────────────────────────────
   Network signal system
───────────────────────────────────────────── */

function EcosystemSignal({
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
  pathProgress: number;
}) {
  const trunkRef = useRef<SVGPathElement>(null);
  const branchRefs = useRef<(SVGPathElement | null)[]>([]);
  const reduced = useReducedMotion();
  const trunk = mobile ? MOBILE_TRUNK : DESKTOP_TRUNK;
  const targetLength = journeyActive ? Math.max(0.1, pathProgress) : 0;
  const drawMs = reduced ? 0.01 : 1.35;
  const branchEnds = NODES.map((n) =>
    mobile ? { x: n.mx, y: n.my } : { x: n.dx, y: n.dy }
  );

  return (
    <svg
      key={mobile ? "m" : "d"}
      className="pointer-events-none absolute inset-0 z-[4] h-full w-full"
      viewBox={mobile ? `0 0 ${MOBILE_W} ${MOBILE_H}` : `0 0 ${DESKTOP_W} ${DESKTOP_H}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <filter id="trustSignalBloom" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient
          id="trustSignalGrad"
          x1="0%"
          y1="0%"
          x2={mobile ? "0%" : "30%"}
          y2="100%"
        >
          <stop offset="0%" stopColor={PURPLE} stopOpacity="0.1" />
          <stop offset="25%" stopColor={PURPLE} stopOpacity="0.55" />
          <stop offset="55%" stopColor={PURPLE_SOFT} stopOpacity="0.42" />
          <stop offset="85%" stopColor={PURPLE} stopOpacity="0.35" />
          <stop offset="100%" stopColor={PURPLE} stopOpacity="0.12" />
        </linearGradient>
      </defs>

      <path ref={trunkRef} d={trunk} fill="none" stroke="none" />

      {/* Trunk glow */}
      <motion.path
        d={trunk}
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
        filter="url(#trustSignalBloom)"
      />

      <motion.path
        d={trunk}
        fill="none"
        stroke="url(#trustSignalGrad)"
        strokeWidth={2.5}
        strokeLinecap="round"
        filter="url(#trustSignalBloom)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: targetLength,
          opacity: targetLength > 0 ? 0.5 : 0,
        }}
        transition={{
          pathLength: { duration: drawMs, ease: easeEditorial },
          opacity: { duration: 0.45, ease: easeEditorial },
        }}
      />

      <SignalPulse
        pathRef={trunkRef}
        active={journeyActive && targetLength > 0.12}
      />

      {/* Relationship branches */}
      {NODES.map((node, i) => {
        if (node.kind === "hub") return null;
        const hub = mobile ? HUB_M : HUB_D;
        const to = mobile
          ? { x: node.mx, y: node.my }
          : { x: node.dx, y: node.dy };
        const d = branchPath(hub, to, 0.28 + (i % 3) * 0.08);
        const on = activated[i];
        return (
          <g key={`branch-${node.id}`}>
            <path
              ref={(el) => {
                branchRefs.current[i] = el;
              }}
              d={d}
              fill="none"
              stroke="none"
            />
            <motion.path
              d={d}
              fill="none"
              stroke={PURPLE}
              strokeWidth={hoveredIndex === i ? 2.2 : 1.4}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: on ? 1 : 0,
                opacity: on ? (hoveredIndex === i ? 0.55 : 0.28) : 0,
              }}
              transition={{
                pathLength: { duration: reduced ? 0.01 : 0.9, ease: easeEditorial },
                opacity: { duration: 0.4, ease: easeEditorial },
              }}
              filter="url(#trustSignalBloom)"
            />
            <BranchPulse
              branchRefs={branchRefs}
              index={i}
              active={on && journeyActive && hoveredIndex !== i}
            />
          </g>
        );
      })}

      {hoveredIndex !== null && branchEnds[hoveredIndex] && (
        <motion.circle
          cx={branchEnds[hoveredIndex].x}
          cy={branchEnds[hoveredIndex].y}
          r={NODES[hoveredIndex].kind === "hub" ? 42 : 30}
          fill={PURPLE}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ duration: 0.35 }}
          filter="url(#trustSignalBloom)"
        />
      )}

      {branchEnds.map((n, i) => (
        <ActivationNode
          key={NODES[i].id}
          x={n.x}
          y={n.y}
          active={activated[i]}
          intensify={hoveredIndex === i}
          hub={NODES[i].kind === "hub"}
        />
      ))}

      {/* Soft convergence glow near exit */}
      <motion.circle
        cx={mobile ? 180 : 600}
        cy={mobile ? 2520 : 1660}
        r={48}
        fill={PURPLE}
        initial={{ opacity: 0 }}
        animate={{ opacity: targetLength > 0.88 ? 0.08 : 0 }}
        transition={{ duration: 1.2, ease: easeEditorial }}
        filter="url(#trustSignalBloom)"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Logo / industry surfaces
───────────────────────────────────────────── */

function EcosystemCard({
  node,
  active,
  index,
  onHoverChange,
  mobile,
}: {
  node: EcosystemNode;
  active: boolean;
  index: number;
  onHoverChange: (hovered: boolean) => void;
  mobile: boolean;
}) {
  const isHub = node.kind === "hub";
  const isPlatform = node.kind === "platform";
  const leftPct = mobile
    ? (node.mx / MOBILE_W) * 100
    : (node.dx / DESKTOP_W) * 100;
  const topPct = mobile
    ? (node.my / MOBILE_H) * 100
    : (node.dy / DESKTOP_H) * 100;

  return (
    <div
      className={`absolute z-[6] ${
        isHub
          ? "w-[158px] md:w-[176px]"
          : isPlatform
            ? "w-[148px] md:w-[168px]"
            : "w-[136px] md:w-[156px]"
      }`}
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
        transform: "translate(-50%, -50%)",
        pointerEvents: active ? "auto" : "none",
      }}
    >
      <motion.article
        className="group relative w-full"
        initial={{ opacity: 0, y: 32 }}
        animate={
          active
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 24 }
        }
        transition={{
          duration: active ? 0.95 : 0.55,
          delay: active ? 0.08 + index * 0.02 : 0,
          ease: easeEditorial,
        }}
        onMouseEnter={() => active && onHoverChange(true)}
        onMouseLeave={() => onHoverChange(false)}
        onFocus={() => active && onHoverChange(true)}
        onBlur={() => onHoverChange(false)}
        style={{ willChange: "transform, opacity" }}
        aria-hidden={!active}
      >
        <div
          className={`relative overflow-hidden border border-white/[0.07] bg-[#0A0B12] transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[6px] group-hover:border-white/[0.16] group-hover:shadow-[0_28px_56px_rgba(0,0,0,0.55),0_0_48px_rgba(168,85,247,0.18)] ${
            isHub ? "rounded-[22px]" : "rounded-[18px]"
          }`}
          style={{
            boxShadow:
              "0 18px 44px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
          tabIndex={active ? 0 : -1}
        >
          <div
            className={`relative w-full overflow-hidden ${
              isHub || isPlatform ? "aspect-[4/5]" : "aspect-[3/4]"
            }`}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.08 }}
              animate={{ scale: active ? 1 : 1.08 }}
              transition={{ duration: 1.2, ease: easeEditorial }}
            >
              <Image
                src={node.image}
                alt=""
                fill
                sizes="180px"
                loading="lazy"
                className="object-cover transition-[filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [filter:saturate(0.78)_brightness(0.88)] group-hover:[filter:saturate(1)_brightness(1)] group-hover:scale-[1.04]"
              />
            </motion.div>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030208] via-[#030208]/35 to-[#030208]/10"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#A855F7]/12 via-transparent to-transparent opacity-60 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-90"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
            />

            {isHub && (
              <div className="absolute inset-x-0 top-[18%] flex justify-center">
                <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/15 bg-[#0A0B12]/55 shadow-[0_0_32px_rgba(168,85,247,0.35)] backdrop-blur-sm md:h-14 md:w-14">
                  <Image
                    src="/logo.png"
                    alt=""
                    fill
                    sizes="56px"
                    className="object-contain p-2"
                  />
                </div>
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 z-[2] px-3.5 pb-3.5 pt-10 md:px-4 md:pb-4">
              <p
                className="text-[9px] font-medium uppercase tracking-[0.26em] text-[#C4B5FD]/80"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                {isHub ? "Intelligence" : isPlatform ? "Platform" : "Industry"}
              </p>
              <p
                className={`mt-1.5 font-medium leading-tight tracking-[-0.02em] text-white ${
                  isHub
                    ? "text-[18px] md:text-[20px]"
                    : isPlatform
                      ? "text-[15px] md:text-[17px]"
                      : "text-[13px] md:text-[14px]"
                }`}
                style={{
                  fontFamily: isHub
                    ? "var(--font-playfair), Georgia, serif"
                    : "var(--font-space-grotesk), sans-serif",
                  textShadow: "0 2px 16px rgba(0,0,0,0.65)",
                }}
              >
                {node.label}
              </p>
            </div>
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute -left-10 top-0 h-full w-14 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-6 -top-8 h-28 w-36 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:bg-[#A855F7]/28 group-hover:opacity-100"
          />

          <motion.div
            aria-hidden
            className="pointer-events-none absolute bottom-3 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#E9D5FF]"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={
              active
                ? { opacity: [0, 0.9, 0], scale: [0.4, 1.6, 2.2] }
                : { opacity: 0, scale: 0.4 }
            }
            transition={{ duration: 1.1, delay: 0.55, ease: easeOutExpo }}
          />
        </div>
      </motion.article>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main section
───────────────────────────────────────────── */

export function TrustEcosystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, {
    once: false,
    amount: 0.08,
    margin: "-6% 0px -8% 0px",
  });
  const headlineInView = useInView(headlineRef, { once: false, amount: 0.55 });
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  const [journeyActive, setJourneyActive] = useState(false);
  const [activated, setActivated] = useState<boolean[]>(() =>
    NODES.map(() => false)
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const timers: number[] = [];

    if (!inView) {
      setHoveredIndex(null);
      if (reduced) {
        setActivated(NODES.map(() => false));
        setJourneyActive(false);
        return;
      }

      const reverse = [...NODES]
        .map((n, i) => ({ i, progress: n.pathProgress }))
        .sort((a, b) => b.progress - a.progress);

      reverse.forEach((item, step) => {
        timers.push(
          window.setTimeout(() => {
            setActivated((prev) => {
              const next = [...prev];
              next[item.i] = false;
              return next;
            });
          }, step * 140)
        );
      });

      timers.push(
        window.setTimeout(
          () => setJourneyActive(false),
          reverse.length * 140 + 220
        )
      );

      return () => timers.forEach((t) => window.clearTimeout(t));
    }

    setJourneyActive(true);

    if (reduced) {
      setActivated(NODES.map(() => true));
      return;
    }

    NODES.forEach((n, i) => {
      const delay = 420 + n.pathProgress * 2800;
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

  const signalProgress = (() => {
    if (!journeyActive) return 0;
    let max = 0.14;
    activated.forEach((on, i) => {
      if (on) max = Math.max(max, NODES[i].pathProgress + 0.08);
    });
    if (!activated.some(Boolean)) return 0.12;
    // When network is mature, draw through convergence
    if (activated.filter(Boolean).length >= NODES.length - 2) {
      return 1;
    }
    return Math.min(0.92, max);
  })();

  return (
    <section
      ref={sectionRef}
      id="network"
      aria-label="Ecosystem of trusted partnerships"
      className="relative z-0 -mt-24 overflow-hidden pb-40 pt-10 md:-mt-32 md:pb-52 md:pt-14"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#030208]/10 via-transparent to-[#030208]/25"
      />

      <AtmosphereDrift active={journeyActive} />
      <NeuralMesh active={journeyActive} />

      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8">
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
            The Network
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
            Growing With Industry Leaders
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
            Every partnership strengthens the network. From global platforms to
            ambitious businesses, the companies connected here represent
            relationships built through measurable outcomes, long-term
            collaboration, and technology-driven growth.
          </motion.p>
        </div>

        {/* Group labels — editorial, not grid headers */}
        <div className="relative z-[5] mb-8 flex flex-wrap items-center gap-x-8 gap-y-3 md:mb-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={headlineInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/30"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Global Platforms
          </motion.p>
          <span
            aria-hidden
            className="hidden h-px w-8 bg-white/10 sm:block"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={headlineInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.36 }}
            className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/30"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Industries Served
          </motion.p>
        </div>

        <div
          className={`relative ${
            mobile ? "min-h-[2480px]" : "min-h-[1120px] md:min-h-[1240px] lg:min-h-[1340px]"
          }`}
        >
          <div className="pointer-events-none absolute inset-0 z-[4]">
            <EcosystemSignal
              journeyActive={journeyActive && !reduced}
              activated={activated}
              hoveredIndex={hoveredIndex}
              mobile={mobile}
              pathProgress={signalProgress}
            />
          </div>

          <div className="relative z-[6] h-full min-h-[inherit]">
            {NODES.map((node, i) => (
              <EcosystemCard
                key={node.id}
                node={node}
                active={activated[i]}
                index={i}
                mobile={mobile}
                onHoverChange={(hovered) =>
                  setHoveredIndex(hovered ? i : null)
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Convergence veil — signal unifies toward next chapter */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-48 bg-gradient-to-t from-[#030208]/45 via-[#030208]/15 to-transparent"
      />
    </section>
  );
}
