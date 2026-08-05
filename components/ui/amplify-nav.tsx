"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useBooking } from "@/components/booking/booking-provider";
import { BOOKING_PATH } from "@/lib/booking";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/contact" },
] as const;

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
const easeEditorial: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];
const springSoft = {
  type: "spring" as const,
  stiffness: 260,
  damping: 34,
  mass: 0.85,
};
const springMagnetic = {
  type: "spring" as const,
  stiffness: 300,
  damping: 24,
  mass: 0.4,
};

function getScrolled(threshold: number) {
  if (typeof window === "undefined") return false;
  return window.scrollY > threshold;
}

function subscribeScrolled(threshold: number, onStoreChange: () => void) {
  let prev = getScrolled(threshold);
  const onScroll = () => {
    const next = getScrolled(threshold);
    if (next !== prev) {
      prev = next;
      onStoreChange();
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}

function useScrolled(threshold = 28) {
  return useSyncExternalStore(
    (onStoreChange) => subscribeScrolled(threshold, onStoreChange),
    () => getScrolled(threshold),
    () => false
  );
}

function NavLink({
  label,
  href,
  onClick,
  book,
}: {
  label: string;
  href: string;
  onClick?: () => void;
  book?: boolean;
}) {
  const booking = useBooking();

  return (
    <a
      href={href}
      onClick={(e) => {
        if (book) {
          e.preventDefault();
          booking.openBooking(`nav-${label.toLowerCase()}`);
        }
        onClick?.();
      }}
      className="group relative inline-flex items-center py-2 text-[15px] font-medium tracking-[0.02em] text-white/90 transition-colors duration-[280ms] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      style={{
        fontFamily: "var(--font-space-grotesk), sans-serif",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {label}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-[1px] mx-auto h-[2px] w-0 origin-center rounded-full bg-[#7C5CFF] transition-[width] duration-[280ms] group-hover:w-full group-focus-visible:w-full"
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      />
    </a>
  );
}

function MagneticCTA({
  className = "",
  fullWidth = false,
  onNavigate,
}: {
  className?: string;
  fullWidth?: boolean;
  onNavigate?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springMagnetic);
  const springY = useSpring(y, springMagnetic);
  const { openBooking } = useBooking();
  const finePointer =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches;

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!finePointer) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.14);
    y.set(dy * 0.16);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={BOOKING_PATH}
      onClick={(e) => {
        e.preventDefault();
        onNavigate?.();
        openBooking("nav-lets-scale");
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        x: springX,
        y: springY,
        fontFamily: "var(--font-space-grotesk), sans-serif",
      }}
      whileHover={finePointer ? { scale: 1.02 } : undefined}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.25, ease: easeOutExpo }}
      className={`group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full s12-btn-primary px-7 text-[13px] font-medium tracking-[0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
        fullWidth ? "w-full" : "whitespace-nowrap"
      } ${className}`}
    >
      <span className="relative z-10">Let&apos;s Scale</span>
    </motion.a>
  );
}

/** Path-morphing menu icon — lines morph into an X (no CSS rotate tricks). */
function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <motion.path
        fill="transparent"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        animate={{
          d: open ? "M 5.5 5.5 L 18.5 18.5" : "M 4 7.5 L 20 7.5",
        }}
        transition={{ duration: 0.35, ease: easeOutExpo }}
      />
      <motion.path
        fill="transparent"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        animate={{
          d: open ? "M 12 12 L 12 12" : "M 4 12 L 20 12",
          opacity: open ? 0 : 1,
        }}
        transition={{ duration: 0.28, ease: easeOutExpo }}
      />
      <motion.path
        fill="transparent"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        animate={{
          d: open ? "M 5.5 18.5 L 18.5 5.5" : "M 4 16.5 L 20 16.5",
        }}
        transition={{ duration: 0.35, ease: easeOutExpo }}
      />
    </svg>
  );
}

/**
 * Amplification geometry — concentric arcs + faint signal nodes.
 * Transform/opacity only. No blobs, no continuous layout work.
 */
function MobileMenuAtmosphere({ active }: { active: boolean }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Deep stage — quiet, no decorative orbs */}
      <div className="absolute inset-0 bg-[#050814]" />
      <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_-10%,rgba(109,40,217,0.14)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_100%_100%,rgba(124,92,255,0.06)_0%,transparent_50%)]" />

      {/* Precision hairline grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%)",
        }}
      />

      {/* Amplification arcs — logo language */}
      <svg
        className="absolute -right-[18%] top-[8%] h-[72%] w-[90%] opacity-100"
        viewBox="0 0 480 640"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {[
          { r: 90, o: 0.22 },
          { r: 140, o: 0.16 },
          { r: 190, o: 0.11 },
          { r: 245, o: 0.07 },
          { r: 305, o: 0.045 },
        ].map((arc, i) => (
          <motion.path
            key={arc.r}
            d={`M ${120 - arc.r * 0.15} ${320 + arc.r * 0.55} A ${arc.r} ${arc.r} 0 0 1 ${120 + arc.r * 0.95} ${320 - arc.r * 0.35}`}
            stroke="rgba(124,92,255,1)"
            strokeWidth={1}
            strokeLinecap="round"
            initial={{ opacity: 0, pathLength: 0.4 }}
            animate={
              active
                ? { opacity: arc.o, pathLength: 1 }
                : { opacity: 0, pathLength: 0.4 }
            }
            transition={{
              duration: 1.4,
              delay: 0.15 + i * 0.08,
              ease: easeEditorial,
            }}
          />
        ))}

        {/* Soft signal nodes along the rail */}
        {[
          [210, 220],
          [280, 280],
          [320, 360],
          [300, 440],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={2.2}
            fill="rgba(232,213,255,0.9)"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={
              active
                ? { opacity: [0.25, 0.55, 0.25], scale: 1 }
                : { opacity: 0, scale: 0.6 }
            }
            transition={{
              opacity: {
                duration: 3.6,
                delay: 0.8 + i * 0.35,
                repeat: Infinity,
                ease: "easeInOut",
              },
              scale: { duration: 0.6, delay: 0.5 + i * 0.1 },
            }}
          />
        ))}
      </svg>

      {/* Left vertical signal rail accent */}
      <div className="absolute bottom-[22%] left-8 top-[22%] w-px overflow-hidden opacity-30">
        <motion.div
          className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-[#7C5CFF]/80 to-transparent"
          animate={
            active
              ? { y: ["-100%", "220%"] }
              : { y: "-100%" }
          }
          transition={
            active
              ? {
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1.2,
                }
              : { duration: 0.3 }
          }
        />
      </div>
    </div>
  );
}

function MobileNavItem({
  label,
  href,
  index,
  active,
  onSelect,
  onClose,
  book,
}: {
  label: string;
  href: string;
  index: number;
  active: boolean;
  onSelect: () => void;
  onClose: () => void;
  book?: boolean;
}) {
  const { openBooking } = useBooking();

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{
        duration: 0.55,
        delay: 0.12 + index * 0.055,
        ease: easeEditorial,
      }}
      className="relative"
    >
      <a
        href={href}
        onClick={(e) => {
          if (book) {
            e.preventDefault();
            openBooking(`nav-mobile-${label.toLowerCase()}`);
          }
          onClose();
        }}
        onFocus={onSelect}
        onMouseEnter={onSelect}
        className="group relative flex items-center gap-5 py-3.5 pl-1 pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/50 focus-visible:ring-offset-4 focus-visible:ring-offset-[#050814]"
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        aria-current={active ? "true" : undefined}
      >
        {/* Index + node on the signal rail */}
        <span className="relative z-[1] flex w-10 shrink-0 flex-col items-center">
          <span
            className={`mb-1 flex h-2 w-2 rounded-full border transition-[border-color,background-color,box-shadow,transform] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              active
                ? "scale-110 border-[#B8A4FF] bg-[#7C5CFF] shadow-[0_0_12px_rgba(124,92,255,0.55)]"
                : "border-white/25 bg-transparent group-hover:border-[#7C5CFF]/70"
            }`}
          />
          <span
            className={`text-[10px] font-medium tracking-[0.14em] transition-colors duration-400 ${
              active
                ? "text-[#B8A4FF]"
                : "text-[#6B7890]/90 group-hover:text-[#9AA8C0]"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </span>

        <span className="relative min-w-0 flex-1">
          <span
            className={`block tracking-[-0.035em] transition-[color,transform,font-size,opacity] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:translate-x-1 ${
              active
                ? "text-[34px] font-medium leading-[1.05] text-white"
                : "text-[28px] font-medium leading-[1.08] text-white/42 group-hover:text-white/88"
            }`}
          >
            {label}
          </span>

          {/* Signal-wave underline */}
          <span
            aria-hidden
            className={`mt-2 block h-px origin-left bg-gradient-to-r from-[#7C5CFF] via-[#B8A4FF]/80 to-transparent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              active
                ? "scale-x-100"
                : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"
            }`}
          />
        </span>

        {/* Soft destination chevron */}
        <span
          aria-hidden
          className={`shrink-0 text-[13px] transition-[opacity,transform,color] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            active
              ? "translate-x-0 text-[#B8A4FF] opacity-80"
              : "translate-x-[-4px] text-white/0 opacity-0 group-hover:translate-x-0 group-hover:text-[#9AA8C0]/95 group-hover:opacity-100"
          }`}
        >
          →
        </span>
      </a>
    </motion.li>
  );
}

export function AmplifyNav() {
  const scrolled = useScrolled(28);
  const floating = scrolled;
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { openBooking } = useBooking();

  const openMenu = useCallback(() => {
    setMenuMounted(true);
    setMenuOpen(true);
    setActiveIndex(0);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    if (menuOpen) closeMenu();
    else openMenu();
  }, [menuOpen, openMenu, closeMenu]);

  const openMobileBooking = useCallback(() => {
    closeMenu();
    window.setTimeout(() => openBooking("nav-mobile-start-scaling"), 280);
  }, [closeMenu, openBooking]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen, closeMenu]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springSoft, delay: 0.8 }}
        className="fixed inset-x-0 top-0 z-[9999]"
      >
        <motion.div
          animate={{
            paddingTop: floating || menuOpen ? 12 : 0,
            paddingLeft: floating || menuOpen ? 14 : 0,
            paddingRight: floating || menuOpen ? 14 : 0,
          }}
          transition={springSoft}
          className="mx-auto w-full max-w-[1400px]"
        >
          <motion.nav
            aria-label="Primary"
            animate={{
              backgroundColor:
                menuOpen
                  ? "rgba(8, 7, 14, 0.72)"
                  : floating
                    ? "rgba(11, 15, 26, 0.94)"
                    : "rgba(15, 23, 42, 0)",
              borderColor:
                menuOpen
                  ? "rgba(255, 255, 255, 0.08)"
                  : floating
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(255, 255, 255, 0)",
              boxShadow:
                menuOpen
                  ? "0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.06)"
                  : floating
                    ? "0 12px 40px rgba(0, 0, 0, 0.28)"
                    : "0 0 0 rgba(0, 0, 0, 0)",
              borderRadius: floating || menuOpen ? 18 : 0,
            }}
            transition={springSoft}
            className="relative grid h-[120px] grid-cols-[1fr_auto] items-center border px-5 md:grid-cols-[1fr_auto_1fr] md:px-8 lg:px-12 xl:px-16"
          >
            {/* Logo — left grid cell */}
            <div className="relative z-10 flex items-center justify-self-start">
              <motion.a
                href="/"
                aria-label="Scale 12x home"
                className="flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                whileHover={{ y: -1, opacity: 0.88 }}
                transition={{ duration: 0.28, ease: easeOutExpo }}
              >
                <Image
                  src="/brand/scale-12x-mark.webp"
                  alt="Scale 12x"
                  width={482}
                  height={320}
                  sizes="(max-width: 768px) 140px, 180px"
                  quality={100}
                  className="h-[56px] w-auto max-w-[180px] object-contain object-left sm:h-[64px] sm:max-w-[200px] md:h-[72px] md:max-w-[220px]"
                  priority
                />
              </motion.a>
            </div>

            {/* Links — true center on desktop */}
            <div className="relative z-10 hidden items-center justify-center gap-8 md:flex lg:gap-10">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  label={link.label}
                  href={link.href}
                  book={"book" in link && Boolean(link.book)}
                />
              ))}
            </div>

            {/* CTA — right grid cell, mirrored weight to logo */}
            <div className="relative z-10 hidden items-center justify-self-end md:flex">
              <MagneticCTA />
            </div>

            {/* Mobile toggle — frosted, never dominates */}
            <motion.button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="amplify-mobile-menu"
              onClick={toggleMenu}
              className={`relative z-10 flex h-11 w-11 items-center justify-center justify-self-end rounded-full transition-[border-color,background-color,color,box-shadow] duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55 md:hidden ${
                menuOpen
                  ? "border border-[rgba(168,196,240,0.16)] bg-white/[0.04] text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                  : "border border-[rgba(168,196,240,0.18)] bg-white/[0.06] text-white hover:border-[#7C5CFF]/55 hover:bg-[#7C5CFF]/12 hover:text-[#D4C8FF]"
              }`}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.3, ease: easeOutExpo }}
            >
              <MenuIcon open={menuOpen} />
            </motion.button>
          </motion.nav>
        </motion.div>
      </motion.header>

      {menuMounted && (
        <AnimatePresence
          onExitComplete={() => {
            if (!menuOpen) setMenuMounted(false);
          }}
        >
          {menuOpen && (
            <motion.div
              id="amplify-mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="fixed inset-0 z-[9998] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: easeEditorial }}
            >
              <motion.button
                type="button"
                aria-label="Close menu overlay"
                className="absolute inset-0 bg-[#050814]/50"
                onClick={closeMenu}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              <motion.div
                className="absolute inset-0 flex min-h-[100dvh] flex-col overflow-hidden"
                initial={{ opacity: 0, y: "-4%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "-2%" }}
                transition={springSoft}
              >
                <MobileMenuAtmosphere active={menuOpen} />

                {/* Top hairline */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
                />

                {/* Destinations */}
                <nav
                  className="relative z-10 flex flex-1 flex-col justify-center px-7 pt-[128px] sm:px-10"
                  aria-label="Mobile"
                >
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.06, ease: easeEditorial }}
                    className="mb-10 text-[10px] font-medium uppercase tracking-[0.32em] text-[#6B7890]"
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    Destinations
                  </motion.p>

                  <div className="relative">
                    {/* Continuous signal path behind indices */}
                    <div
                      aria-hidden
                      className="absolute bottom-4 left-[22px] top-4 w-px bg-gradient-to-b from-white/0 via-white/12 to-white/0"
                    />

                    <ul className="relative flex flex-col gap-1">
                      {NAV_LINKS.map((link, i) => (
                        <MobileNavItem
                          key={link.href}
                          label={link.label}
                          href={link.href}
                          index={i}
                          active={activeIndex === i}
                          onSelect={() => setActiveIndex(i)}
                          onClose={closeMenu}
                          book={"book" in link && Boolean(link.book)}
                        />
                      ))}
                    </ul>
                  </div>
                </nav>

                {/* CTA + signature close */}
                <motion.div
                  className="relative z-10 px-7 pb-[max(2rem,env(safe-area-inset-bottom))] pt-4 sm:px-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.65,
                    delay: 0.12 + NAV_LINKS.length * 0.055,
                    ease: easeEditorial,
                  }}
                >
                  <div className="mb-7 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  <p
                    className="mb-3 text-[12px] tracking-[0.06em] text-[#9AA8C0]/85"
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    Ready to Scale?
                  </p>

                  <a
                    href={BOOKING_PATH}
                    onClick={(e) => {
                      e.preventDefault();
                      openMobileBooking();
                    }}
                    className="group relative flex h-[52px] w-full items-center justify-between overflow-hidden rounded-full s12-btn-primary px-6 text-[14px] font-medium tracking-[0.02em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF]/55 active:scale-[0.985]"
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    <span className="relative z-10">Start Scaling</span>
                    <span
                      aria-hidden
                      className="relative z-10 text-[#D4C8FF] transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>

                  {/* Closing frame — film end card */}
                  <div className="mt-10 flex flex-col items-center text-center">
                    <Image
                      src="/brand/scale-12x-mark.webp"
                      alt="Scale 12x"
                      width={482}
                      height={320}
                      sizes="140px"
                      quality={100}
                      className="mb-4 h-16 w-auto object-contain opacity-95"
                    />
                    <p
                      className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#6B7890]"
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      AI-Native Growth Studio
                    </p>
                    <p
                      className="mt-3 text-[12px] tracking-[0.02em] text-[#7C5CFF]/55"
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                      }}
                    >
                      Scale Faster. Scale Smarter.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
