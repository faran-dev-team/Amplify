"use client";

import { useEffect, useRef, useState } from "react";
import {
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Drives problem-list progress from normal page scroll — no sticky pin.
 * As the section moves through the viewport the bar fills and steps advance.
 * Users can scroll past instantly; nothing traps the page.
 */
export function useProblemScroll(itemCount: number) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { amount: 0.12, once: true });

  const { scrollYProgress } = useScroll({
    target: ref,
    // Start filling when section enters; finish before it fully leaves.
    // No tall sticky track — natural document flow only.
    offset: ["start 0.8", "end 0.45"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 32,
    mass: 0.28,
  });
  const progressValue = useTransform(smooth, (v) => v);

  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(1 / Math.max(itemCount, 1));
  const manualUntil = useRef(0);

  useEffect(() => {
    if (reduced) {
      setActive(Math.max(0, itemCount - 1));
      setProgress(1);
      return;
    }

    const unsub = progressValue.on("change", (v) => {
      if (Date.now() < manualUntil.current) return;
      const clamped = Math.min(1, Math.max(0, v));
      const idx = Math.min(
        itemCount - 1,
        Math.max(0, Math.floor(clamped * itemCount + 0.001))
      );
      setActive(idx);
      setProgress(Math.min(1, Math.max(1 / itemCount, clamped)));
    });

    return () => unsub();
  }, [progressValue, reduced, itemCount]);

  const select = (i: number) => {
    const next = Math.min(itemCount - 1, Math.max(0, i));
    manualUntil.current = Date.now() + 700;
    setActive(next);
    setProgress((next + 1) / itemCount);
  };

  return { ref, inView, active, progress, select, reduced };
}
