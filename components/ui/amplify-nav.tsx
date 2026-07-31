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

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Practices", href: "#practices" },
  { label: "About", href: "#about" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
] as const;

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
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
}: {
  label: string;
  href: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group relative inline-flex items-center py-2 text-[15px] font-medium tracking-[0.02em] text-white/90 transition-colors duration-[280ms] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      style={{
        fontFamily: "var(--font-space-grotesk), sans-serif",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {label}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-[1px] mx-auto h-[2px] w-0 origin-center rounded-full bg-[#A855F7] transition-[width] duration-[280ms] group-hover:w-full group-focus-visible:w-full"
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      />
    </a>
  );
}

function MagneticCTA({
  className = "",
  fullWidth = false,
}: {
  className?: string;
  fullWidth?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springMagnetic);
  const springY = useSpring(y, springMagnetic);
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
      href="#contact"
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
      className={`group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full border border-[#A855F7]/80 bg-[#0B0F1A] px-7 text-[13px] font-medium tracking-[0.01em] text-white transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#F0ABFC] hover:shadow-[0_8px_32px_rgba(168,85,247,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
        fullWidth ? "w-full" : "whitespace-nowrap"
      } ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-[#A855F7] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
      <span className="relative z-10">Start Your Growth Strategy</span>
    </motion.a>
  );
}

/** Path-morphing menu icon — lines morph into an X (no CSS rotate tricks). */
function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <motion.path
        fill="transparent"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        animate={{
          d: open ? "M 5.5 5.5 L 18.5 18.5" : "M 4 7.5 L 20 7.5",
        }}
        transition={{ duration: 0.35, ease: easeOutExpo }}
      />
      <motion.path
        fill="transparent"
        stroke="currentColor"
        strokeWidth="1.4"
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
        strokeWidth="1.4"
        strokeLinecap="round"
        animate={{
          d: open ? "M 5.5 18.5 L 18.5 5.5" : "M 4 16.5 L 20 16.5",
        }}
        transition={{ duration: 0.35, ease: easeOutExpo }}
      />
    </svg>
  );
}

export function AmplifyNav() {
  const scrolled = useScrolled(28);
  const floating = scrolled;
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);

  const openMenu = useCallback(() => {
    setMenuMounted(true);
    setMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    if (menuOpen) closeMenu();
    else openMenu();
  }, [menuOpen, openMenu, closeMenu]);

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
            paddingTop: floating || menuOpen ? 16 : 0,
            paddingLeft: floating || menuOpen ? 16 : 0,
            paddingRight: floating || menuOpen ? 16 : 0,
          }}
          transition={springSoft}
          className="mx-auto w-full max-w-[1400px]"
        >
          <motion.nav
            aria-label="Primary"
            animate={{
              backgroundColor:
                menuOpen
                  ? "rgba(18, 8, 31, 0.96)"
                  : floating
                    ? "rgba(11, 15, 26, 0.94)"
                    : "rgba(15, 23, 42, 0)",
              borderColor:
                menuOpen
                  ? "rgba(168, 85, 247, 0.28)"
                  : floating
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(255, 255, 255, 0)",
              boxShadow:
                menuOpen
                  ? "0 12px 40px rgba(88, 28, 135, 0.35)"
                  : floating
                    ? "0 12px 40px rgba(0, 0, 0, 0.28)"
                    : "0 0 0 rgba(0, 0, 0, 0)",
              borderRadius: floating || menuOpen ? 20 : 0,
            }}
            transition={springSoft}
            className={`relative grid h-[120px] grid-cols-[1fr_auto] items-center border px-5 md:grid-cols-[1fr_auto_1fr] md:px-8 lg:px-12 xl:px-16 ${
              floating || menuOpen ? "" : ""
            }`}
          >
            {/* Logo — left grid cell */}
            <div className="relative z-10 flex items-center justify-self-start">
              <motion.a
                href="/"
                aria-label="Amplify home"
                className="flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                whileHover={{ y: -1, opacity: 0.88 }}
                transition={{ duration: 0.28, ease: easeOutExpo }}
              >
                <Image
                  src="/logo-mark.webp"
                  alt="Amplify"
                  width={144}
                  height={144}
                  sizes="144px"
                  quality={82}
                  className="h-[144px] w-[144px] object-contain"
                  priority
                />
              </motion.a>
            </div>

            {/* Links — true center on desktop */}
            <div className="relative z-10 hidden items-center justify-center gap-8 md:flex lg:gap-10">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.href} label={link.label} href={link.href} />
              ))}
            </div>

            {/* CTA — right grid cell, mirrored weight to logo */}
            <div className="relative z-10 hidden items-center justify-self-end md:flex">
              <MagneticCTA />
            </div>

            {/* Mobile toggle */}
            <motion.button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="amplify-mobile-menu"
              onClick={toggleMenu}
              className={`relative z-10 flex h-12 w-12 items-center justify-center justify-self-end rounded-full transition-all duration-[280ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]/70 md:hidden ${
                menuOpen
                  ? "bg-[#A855F7] text-white shadow-[0_0_28px_rgba(168,85,247,0.55)]"
                  : "border border-white/15 bg-white/[0.06] text-white hover:border-[#A855F7]/60 hover:bg-[#A855F7]/15 hover:text-[#E9D5FF]"
              }`}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.25, ease: easeOutExpo }}
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
              transition={{ duration: 0.35, ease: easeOutExpo }}
            >
              <motion.button
                type="button"
                aria-label="Close menu overlay"
                className="absolute inset-0 bg-black/70"
                onClick={closeMenu}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              <motion.div
                className="absolute inset-0 flex min-h-[100dvh] flex-col overflow-hidden"
                style={{
                  background:
                    "radial-gradient(120% 80% at 10% -10%, rgba(168,85,247,0.45) 0%, transparent 45%), radial-gradient(90% 70% at 100% 20%, rgba(236,72,153,0.28) 0%, transparent 40%), radial-gradient(80% 60% at 50% 100%, rgba(99,102,241,0.35) 0%, transparent 50%), linear-gradient(165deg, #12081F 0%, #0A0614 42%, #160B28 100%)",
                }}
                initial={{ y: "-6%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-3%", opacity: 0 }}
                transition={springSoft}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -left-16 top-28 h-56 w-56 rounded-full bg-[#A855F7]/20"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 bottom-40 h-64 w-64 rounded-full bg-[#7C3AED]/15"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C084FC]/70 to-transparent"
                />

                <nav
                  className="relative z-10 flex flex-1 flex-col justify-center px-6 pt-[140px]"
                  aria-label="Mobile"
                >
                  <p
                    className="mb-8 text-[11px] font-medium uppercase tracking-[0.28em] text-[#C4B5FD]/80"
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    Navigate
                  </p>
                  <ul className="flex flex-col gap-1">
                    {NAV_LINKS.map((link, i) => (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: -18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{
                          ...springSoft,
                          delay: 0.05 + i * 0.07,
                        }}
                      >
                        <a
                          href={link.href}
                          onClick={closeMenu}
                          className="group flex items-center gap-4 rounded-2xl px-3 py-3.5 transition-colors duration-300 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]/70"
                          style={{
                            fontFamily: "var(--font-space-grotesk), sans-serif",
                          }}
                        >
                          <span className="w-8 text-[12px] font-medium tracking-[0.08em] text-[#A855F7]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="bg-gradient-to-r from-white via-white to-[#E9D5FF] bg-clip-text text-[30px] font-medium tracking-[-0.03em] text-transparent transition-all duration-300 group-hover:from-[#F5D0FE] group-hover:via-[#E9D5FF] group-hover:to-[#C4B5FD]">
                            {link.label}
                          </span>
                          <span
                            aria-hidden
                            className="ml-auto h-px w-0 bg-gradient-to-r from-[#A855F7] to-[#EC4899] transition-all duration-300 group-hover:w-10"
                          />
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <motion.div
                  className="relative z-10 px-6 pb-10 pt-6"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    ...springSoft,
                    delay: 0.05 + NAV_LINKS.length * 0.07 + 0.12,
                  }}
                >
                  <div className="mb-5 h-px w-full bg-gradient-to-r from-transparent via-[#A855F7]/40 to-transparent" />
                  <a
                    href="#contact"
                    onClick={closeMenu}
                    className="group relative flex h-[56px] w-full items-center justify-center overflow-hidden rounded-full border border-[#C084FC]/70 bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#DB2777] text-[14px] font-semibold tracking-[0.02em] text-white shadow-[0_12px_40px_rgba(168,85,247,0.45)] transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0ABFC] active:scale-[0.985]"
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    <span className="relative z-10">
                      Start Your Growth Strategy
                    </span>
                  </a>
                  <p
                    className="mt-4 text-center text-[12px] tracking-[0.04em] text-[#C4B5FD]/65"
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                    }}
                  >
                    AI Native Growth Studio
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
