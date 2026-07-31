# PERFORMANCE_AUDIT.md

**Project:** Amplify IT & Media — Next.js 16.2.12 frontend  
**Date:** 2026-07-31  
**Scope:** Full homepage client graph (`AmplifyHome` + all sections)  
**Method:** Static code inspection of sources, asset inventory, production chunk sizes under `.next/static/chunks`, listener/rAF enumeration. No speculative Lighthouse guessing — findings map to concrete files/lines.

**Baseline (Mobile Lighthouse, as provided):**

| Metric | Value |
|--------|-------|
| Performance | 67 |
| FCP | 1.4s |
| LCP | 4.5s |
| Speed Index | 2.9s |
| CLS | 0.011 |
| TBT | 0ms |

---

## Executive Summary

Scroll hitching and the 4.5s LCP are **not** caused by one bug. They are the product of three stacked systems:

1. **Critical continuous CPU/GPU load** — 50,000-particle Three.js physics loop running forever on a full-viewport fixed canvas, then blurred via CSS `filter` while scrolling.
2. **Critical LCP path** — ~1.9MB `logo.png` (1536×1024) marked `priority`, plus delayed hero typography and a runtime Google Fonts stylesheet that duplicates `next/font`.
3. **High scroll-main-thread contention** — three window `scroll` listeners; nav `useSyncExternalStore` snapshots raw `scrollY` and re-renders the entire nav on every pixel; multiple section `requestAnimationFrame` loops; Framer Motion `filter: blur()` animations that force expensive paints.

**Primary scroll-lag culprit:** `WovenCanvas` (50k JS physics + WebGL) **×** `AmplifyHome` CSS blur wrapper (`will-change-[filter]` + `blur(2.5–4.5px)` on the entire fullscreen layer).

**Primary LCP culprit:** `public/logo.png` via `AmplifyNav` `next/image` with `priority`.

---

## Issue Catalog

Severity: **Critical** · **High** · **Medium** · **Low**

---

### ISSUE-01 — 50,000-particle CPU physics every frame

| Field | Detail |
|-------|--------|
| **Exact Issue** | Every `requestAnimationFrame`, a JS loop iterates **50,000** particles, runs `distanceTo` (sqrt), force integration, writes positions, then uploads the full position buffer to the GPU (`needsUpdate = true`) and calls `renderer.render`. |
| **Why it happens** | Designed as interactive silk; physics is CPU-side, not a GPU shader. Cost ≈ O(50k) math + ~600KB buffer upload + fullscreen WebGL draw **every frame for the entire session**. |
| **Severity** | **Critical** |
| **Affected Components** | `WovenCanvas` |
| **Code Location** | `components/ui/woven-canvas.tsx` L37 (`particleCount = 50000`), L113–168 (`animate`), L120–154 (per-particle loop), L154 (`needsUpdate`), L167 (`render`) |
| **Pipeline** | **CPU** (JS loop) + **GPU Composite/Draw** (WebGL). Does **not** cause CSS Layout, but saturates main thread + GPU fill-rate → scroll jank, INP risk, battery drain. |
| **Recommended Fix** | Reduce to 6k–12k mobile / 15k–25k desktop; move forces to a vertex shader or sample-subset; skip physics when mouse idle; pause when `document.hidden` or canvas not contributing. |
| **Expected Improvement** | Largest FPS/scroll gain. Estimate: −60–85% main-thread animation time; mobile scroll from “stuck” → near 60fps if paired with ISSUE-02. |

**Estimated cost:** ~8–20ms+ main-thread per frame on mid Android (device-dependent); permanent until unmount.

---

### ISSUE-02 — CSS `filter: blur()` on the entire fixed WebGL layer while scrolling

| Field | Detail |
|-------|--------|
| **Exact Issue** | After leaving the hero (and again near finale), the full-viewport WebGL wrapper gets `filter: blur(2.5px)` / `blur(4.5px)` with `will-change-[filter]`. |
| **Why it happens** | Atmosphere softener in `AmplifyHome`. CSS filters on large layers force the browser to rasterize a **fullscreen offscreen surface** every frame the WebGL content changes — combining ISSUE-01’s continuous redraw with an expensive paint/filter pass. |
| **Severity** | **Critical** |
| **Affected Components** | `AmplifyHome` wrapper around `WovenCanvas` |
| **Code Location** | `components/ui/amplify-home.tsx` L15–17, L47–61 (`blurPx`, `will-change-[filter]`, inline `filter`) |
| **Pipeline** | **Paint + Composite** (HIGH PRIORITY). Not Layout. Extremely expensive when source is a live, changing canvas. |
| **Recommended Fix** | Never blur a live WebGL canvas. Soften via shader opacity/size/fog, or a static low-res pre-blurred plate, or reduce particle opacity without CSS filter. |
| **Expected Improvement** | Major reduction in scroll hitch past hero. Often recovers 1–2+ frames of budget on mobile when removed. |

---

### ISSUE-03 — WebGL loop never pauses (offscreen / hidden tab / below fold)

| Field | Detail |
|-------|--------|
| **Exact Issue** | Canvas is `fixed inset-0` and `animate()` never checks `IntersectionObserver`, `document.visibilityState`, or page focus. Particles keep simulating while user reads lower sections or switches tabs. |
| **Why it happens** | Intentional “continuous atmosphere” across scroll (`woven-canvas.tsx` comment L6–7; comment L156). |
| **Severity** | **Critical** |
| **Affected Components** | `WovenCanvas`, `AmplifyHome` |
| **Code Location** | `woven-canvas.tsx` L113–169; `amplify-home.tsx` L56–64 |
| **Recommended Fix** | Pause rAF when `document.hidden`; throttle to 30fps when past hero; freeze physics when mouse idle >N ms; optional static frame when fully occluded. |
| **Expected Improvement** | CPU/GPU idle while reading lower page; better thermal/FPS headroom. |

---

### ISSUE-04 — LCP: oversized priority logo (`logo.png` ~1.9MB)

| Field | Detail |
|-------|--------|
| **Exact Issue** | LCP element is almost certainly the nav logo: `next/image` with **`priority`**, displayed at **144×144**, sourced from **1536×1024 PNG ≈ 1.91MB**. |
| **Why it happens** | Priority fetches early; decoder + network transfer of a huge asset delays Largest Contentful Paint. Hero headline is intentionally delayed (900ms + 0.75s motion), so it often **cannot** be LCP. Canvas is rarely LCP. |
| **Severity** | **Critical** (primary LCP = 4.5s driver) |
| **Affected Components** | `AmplifyNav` |
| **Code Location** | `public/logo.png` (1536×1024, ~1.9MB); `components/ui/amplify-nav.tsx` ~L268–275 (`priority`, width/height 144) |
| **Render path** | HTML → priority image request → decode → paint logo in fixed header. Competes with JS/CSS/fonts on critical path. |
| **Recommended Fix** | Export true 144–288px WebP/AVIF (~5–20KB); set `sizes="144px"`; keep `priority` only on the optimized asset. Optionally inline SVG mark. |
| **Expected Improvement** | LCP toward **&lt;2.2s** on mobile if this is the LCP node (largest single LCP lever). |

---

### ISSUE-05 — Hero typography intentionally delayed + duplicate Google Fonts

| Field | Detail |
|-------|--------|
| **Exact Issue** | (1) Runtime `<link>` injects Google Fonts CSS for Playfair + Inter. (2) Playfair already loaded via `next/font` as `--font-playfair` but hero uses string `'Playfair Display'`. (3) Headline waits `setTimeout(900)` before appearing; parent motion delays another **0.75s**. |
| **Why it happens** | Editorial entrance choreography + leftover CDN font pattern. |
| **Severity** | **High** (LCP/FCP/network dependency tree / render-blocking) |
| **Affected Components** | `WovenLightHero`, `RootLayout` |
| **Code Location** | `woven-light-hero.tsx` L123–130, L39, L149–153; `app/layout.tsx` L21–25, L41 |
| **Recommended Fix** | Remove runtime Google Fonts link; use `var(--font-playfair)` / Space Grotesk; show headline without 900ms gate (or ≤200ms). |
| **Expected Improvement** | Faster text paint; fewer critical requests; better FCP/LCP alignment with brand type. |

---

### ISSUE-06 — Nav re-renders on every scroll pixel

| Field | Detail |
|-------|--------|
| **Exact Issue** | `useScrolled` uses `useSyncExternalStore` with snapshot = **numeric `window.scrollY`**. Any scroll delta changes the snapshot → **`AmplifyNav` re-renders every scroll event**, even when `scrollY > 28` boolean is unchanged. |
| **Why it happens** | Store returns raw scrollY; derived boolean is computed after subscription notifies. |
| **Severity** | **High** |
| **Affected Components** | `AmplifyNav` (header, links, CTA, MenuIcon, Framer trees) |
| **Code Location** | `amplify-nav.tsx` L41–53 |
| **Pipeline** | React reconcile during scroll → style recalc risk when floating springs also fire. |
| **Recommended Fix** | Snapshot a boolean (`scrollY > 28`) or use `useMotionValue`/`useScroll` without React state; only `setState` on threshold crossings. |
| **Expected Improvement** | Removes per-frame React work in nav during scroll; smoother INP/scroll. |

---

### ISSUE-07 — Three concurrent window scroll listeners + home state updates

| Field | Detail |
|-------|--------|
| **Exact Issue** | At least **three** `window` scroll listeners: nav store, `AmplifyHome` atmosphere thresholds, `WovenCanvas` scrollProgress. |
| **Why it happens** | Each feature added its own listener instead of one shared scroll bus. |
| **Severity** | **High** |
| **Affected Components** | `amplify-nav.tsx`, `amplify-home.tsx`, `woven-canvas.tsx` |
| **Code Location** | nav L41–43; home L39; canvas L95–102 |
| **Recommended Fix** | Single passive scroll ticker (rAF-coalesced) publishing progress; consumers read refs/motion values. |
| **Expected Improvement** | Less event fan-out; fewer redundant layout reads. |

---

### ISSUE-08 — Full homepage is one client island (no code splitting)

| Field | Detail |
|-------|--------|
| **Exact Issue** | `AmplifyHome` **statically imports** Nav, Canvas, Hero, and **7 heavy sections**. All Framer Motion + Three + section JS hydrate/execute for first paint path. |
| **Why it happens** | Single composition shell; no `next/dynamic`. |
| **Severity** | **High** (Unused JS / execution time / legacy polyfill surface / network dependency) |
| **Affected Components** | `amplify-home.tsx` L3–13; `app/page.tsx` |
| **Bundle evidence** | Largest production chunk ≈ **789KB** (`.next/static/chunks/1ys4tzo2gbvy_.js`); others 222KB, 192KB, 110KB. |
| **Recommended Fix** | `dynamic(() => import(...), { ssr: false/true })` for below-fold sections; lazy Three only after idle/`requestIdleCallback`. |
| **Expected Improvement** | Lower parse/compile; faster interaction readiness; better Lighthouse “Reduce unused JavaScript”. |

---

### ISSUE-09 — Framer Motion `filter: blur()` on text/section reveals

| Field | Detail |
|-------|--------|
| **Exact Issue** | Multiple `motion.*` animations tween `filter: blur(8px) → blur(0)`. |
| **Why it happens** | Soft editorial reveal aesthetic. |
| **Severity** | **High** (non-composited / paint-heavy — matches Lighthouse “Avoid Non-Composited Animations”) |
| **Affected Components** | Hero rotating headline; Signal Outcomes; Trust Ecosystem; others |
| **Code Location** | `woven-light-hero.tsx` L50–52; `signal-outcomes.tsx` ~L486–491; `trust-ecosystem.tsx` ~L787–791 |
| **Pipeline** | **Paint** every frame of the tween (HIGH PRIORITY). Not GPU-only composite. |
| **Recommended Fix** | Animate only `opacity` + `transform`. Softness via static text-shadow or short opacity crossfade. |
| **Expected Improvement** | Removes paint storms on section enter / headline cycle. |

---

### ISSUE-10 — Per-character motion nodes on rotating headlines

| Field | Detail |
|-------|--------|
| **Exact Issue** | Each headline character is a `motion.span` with staggered delay; full tree remounts every **3.8s** via `AnimatePresence mode="wait"`. |
| **Why it happens** | Letter-by-letter premium reveal. |
| **Severity** | **High** |
| **Affected Components** | `RotatingHeadline` in `woven-light-hero.tsx` |
| **Code Location** | L45–88, HOLD_MS L17 |
| **Pipeline** | Many composite layers; with ISSUE-09 blur on parent → paint. Continues while hero remains mounted (always, as page scrolls). |
| **Recommended Fix** | Animate whole lines (2 nodes) not characters; pause rotation when hero out of view; avoid filter blur. |
| **Expected Improvement** | Lower ongoing main-thread cost after load. |

---

### ISSUE-11 — Multiple additional rAF loops in sections

| Field | Detail |
|-------|--------|
| **Exact Issue** | Beyond Three.js, sections run their own rAF (canvas 2D / SVG pulse / layout). |
| **Severity** | **High** (cumulative with ISSUE-01) |
| **Affected Components** | `signal-outcomes.tsx`, `trust-ecosystem.tsx`, `growth-capabilities.tsx`, `transformation-archive.tsx` |
| **Code Location** | Multiple `requestAnimationFrame` call sites (6 in signal-outcomes, 5 in trust-ecosystem, 3 in growth-capabilities, etc.) |
| **Recommended Fix** | Pause when `useInView` false; share one clock; prefer CSS/SVG SMIL or scrubbed progress over permanent rAF. |
| **Expected Improvement** | Prevents multi-rAF contention while scrolling mid-page. |

---

### ISSUE-12 — `backdrop-blur` over live WebGL + mobile menu blurs

| Field | Detail |
|-------|--------|
| **Exact Issue** | Floating nav uses `backdrop-blur-[18px]` over the particle canvas. Mobile menu adds `blur-[90px]` / `blur-[100px]` orbs + gradients. |
| **Severity** | **High** (nav) / **Medium** (menu open-only) |
| **Affected Components** | `AmplifyNav` |
| **Code Location** | `amplify-nav.tsx` ~L255–256; mobile panel glow orbs ~L353–357 |
| **Pipeline** | **Paint/Composite** — samples behind-the-scenes framebuffer each frame while WebGL updates. |
| **Recommended Fix** | Solid/translucent midnight panel without backdrop-filter when canvas is active; or blur only a static screenshot plate. |
| **Expected Improvement** | Smoother scroll once nav is floating. |

---

### ISSUE-13 — Capability / archive images: multi-megabyte PNG/JPG sources

| Field | Detail |
|-------|--------|
| **Exact Issue** | `public/capabilities/*.png` alone ≈ **7.6MB** (five 1536×1024 PNGs, 1.3–1.8MB each). Transformations + voices + ecosystem add ~3MB+. Total public media ≈ **13MB**. |
| **Severity** | **High** (LCP-adjacent network; Speed Index; mobile data) |
| **Affected Components** | `GrowthCapabilities`, `TransformationArchive`, `VoicesBehindGrowth`, `TrustEcosystem` |
| **Code Location** | `public/capabilities/*`, `public/transformations/*`, etc. Archive also marks some images `priority` (transformation-archive ~L464, L485) — dangerous if those enter early viewport incorrectly. |
| **Recommended Fix** | AVIF/WebP, correct `sizes`, no `priority` below fold; blur placeholders; CDN. |
| **Expected Improvement** | Faster section loads; less decoder main-thread work while scrolling into view. |

---

### ISSUE-14 — Three.js init: 50k `new THREE.Color()` + antialias + DPR≤2 fullscreen

| Field | Detail |
|-------|--------|
| **Exact Issue** | Init allocates 50k Color objects; renderer uses `antialias: true` and up to 2× pixel ratio on full window. |
| **Severity** | **High** (startup GC + GPU fill-rate) |
| **Code Location** | `woven-canvas.tsx` L24–27, L59–60 |
| **Recommended Fix** | Precompute colors into Float32Array without Color class; disable antialias on mobile; DPR cap 1–1.5 on low-end. |
| **Expected Improvement** | Faster first WebGL frame; less GC after mount. |

---

### ISSUE-15 — Four `next/font` families on every page

| Field | Detail |
|-------|--------|
| **Exact Issue** | Geist, Geist Mono, Space Grotesk (3 weights), Playfair — all on `<html>`. |
| **Severity** | **Medium** |
| **Code Location** | `app/layout.tsx` L5–25, L41 |
| **Recommended Fix** | Drop unused Geist Mono if unused; subset aggressively; ensure hero uses CSS variables only. |
| **Expected Improvement** | Smaller font transfer; fewer contested critical bytes. |

---

### ISSUE-16 — `lucide-react` installed but unused

| Field | Detail |
|-------|--------|
| **Exact Issue** | Dependency present; **zero** source imports. Dead install. |
| **Severity** | **Low** (not in runtime graph if unused — confirms tree not pulled) |
| **Recommended Fix** | Remove from `package.json` or use it and drop inline SVG duplicates. |
| **Expected Improvement** | Cleaner dependency graph; no runtime win if already unused. |

---

### ISSUE-17 — Undebounced WebGL resize

| Field | Detail |
|-------|--------|
| **Exact Issue** | `resize` handler immediately `setSize` full canvas; not rAF-coalesced. |
| **Severity** | **Medium** |
| **Code Location** | `woven-canvas.tsx` L171–177 |
| **Recommended Fix** | Debounce / rAF coalesce; ignore orientation flicker. |
| **Expected Improvement** | Avoids resize jank storms. |

---

### ISSUE-18 — Magnetic CTA / springs (localized)

| Field | Detail |
|-------|--------|
| **Exact Issue** | CTA uses `useMotionValue` + `useSpring` on mousemove — **does not React-re-render** (good). Cost is local compositor work. |
| **Severity** | **Low** |
| **Code Location** | `amplify-nav.tsx` MagneticCTA |
| **Recommended Fix** | Disable magnetic on `pointer: coarse` / reduced motion. |
| **Expected Improvement** | Minor mobile savings. |

---

### ISSUE-19 — SVG `feGaussianBlur` bloom filters in section graphics

| Field | Detail |
|-------|--------|
| **Exact Issue** | Signal/capability/trust graphics apply SVG filter bloom. |
| **Severity** | **Medium** |
| **Code Location** | e.g. `signal-outcomes.tsx` `#signalBloom`; `growth-capabilities.tsx` `#capSignalBloom`; `trust-ecosystem.tsx` `#trustSignalBloom` |
| **Pipeline** | **Paint** for filtered SVG subtrees. |
| **Recommended Fix** | Static glow sprites or CSS shadow; disable bloom on mobile. |
| **Expected Improvement** | Cheaper section animations on mid devices. |

---

### ISSUE-20 — Empty `next.config.ts` (no image/bundle policy)

| Field | Detail |
|-------|--------|
| **Exact Issue** | No `images` formats, deviceSizes, or experimental optimizePackageImports for heavy libs. |
| **Severity** | **Medium** |
| **Code Location** | `next.config.ts` |
| **Recommended Fix** | Enable AVIF/WebP; `optimizePackageImports` for `framer-motion` / lucide if used; headers for cache. |
| **Expected Improvement** | Better image delivery (matches Lighthouse warning). |

---

## Animation Matrix (GPU vs CPU)

| Animation | Location | GPU (transform/opacity)? | Triggers Layout? | Paint? | Composite? | Priority |
|-----------|----------|--------------------------|------------------|--------|------------|----------|
| Particle physics + WebGL render | `woven-canvas.tsx` | GPU draw; **CPU physics** | No | No (WebGL) | WebGL layer | **Critical** |
| CSS blur on canvas wrapper | `amplify-home.tsx` | No | No | **Yes** | Yes | **Critical** |
| Headline filter blur | `woven-light-hero.tsx` | No | No | **Yes** | Yes | **High** |
| Per-char y/opacity | hero | Yes | No* | No | Yes | Medium (*many layers) |
| SweepButton scaleX | hero | Yes | No | No | Yes | Low |
| Nav floating bg/shadow springs | nav | Partial | Possible | **Yes** | Yes | High |
| Nav backdrop-blur | nav | No | No | **Yes** | Yes | High |
| Magnetic CTA x/y | nav | Yes | No | No | Yes | Low |
| Menu path `d` morph | nav | No | No | **Yes** (SVG) | — | Medium |
| Section Framer blur reveals | outcomes/trust | No | No | **Yes** | Yes | **High** |
| Section rAF pulses | outcomes/trust/capabilities | Mixed | No | Often | — | High |
| CSS transitions on filters (voices/trust images) | various | No | No | **Yes** | Yes | Medium |

\*Large numbers of `inline-block` motion spans can still stress style/layout on swap.

---

## LCP Breakdown (exact)

```
User navigates /
  → layout fonts (4 families via next/font)
  → AmplifyHome client JS (eager: three + framer + all sections)
  → AmplifyNav mounts
      → <Image priority src="/logo.png" />   ← PRIMARY LCP CANDIDATE
         public/logo.png = 1536×1024 ≈ 1.91MB PNG
         displayed 144×144
  → WovenCanvas starts 50k init (main-thread competition)
  → Hero headline delayed 900ms + opacity anim delay 0.75s
      → NOT early LCP
  → WebGL canvas rarely selected as LCP
```

**Why LCP = 4.5s:** Network + decode of oversized priority logo **plus** main-thread contention from Three init / large JS. Hero text cannot rescue LCP because it is deliberately invisible early.

---

## Scroll Lag Causal Chain (exact)

```
Finger scroll
  → Browser tries to composite scroll
  → Simultaneously EVERY FRAME:
       (A) 50k-particle JS loop + WebGL render          [ISSUE-01]
       (B) If past hero: CSS filter blur on that layer [ISSUE-02]
       (C) Nav useSyncExternalStore → React re-render  [ISSUE-06]
       (D) Extra scroll handlers update home/canvas    [ISSUE-07]
       (E) Mid-page: other rAF loops may still run     [ISSUE-11]
       (F) Floating nav backdrop-blur samples WebGL    [ISSUE-12]
  → Main thread / GPU miss vsync → scroll feels stuck
```

---

## Background Animation Architecture (current → proposed)

### Current
- Fullscreen fixed WebGL
- 50k CPU particles always
- Additive/transparent points
- CSS blur layered on top while scrolling
- No pause

### Proposed (premium preserved)
1. **Adaptive particle budget** by device memory / DPR / `saveData`.
2. **Shader-based motion** (or noise offset) instead of per-particle JS forces; mouse influence via uniform.
3. **Simulation LOD:** full physics only in hero; past hero → slow rotation + opacity only (no buffer upload).
4. **Frame governor:** pause on `visibilitychange`; 30fps cap when not interacting.
5. **No CSS blur** on canvas — use material opacity / DOF in-shader.
6. **Static fallback plate** for `prefers-reduced-motion` / low-end.

---

## Framer Motion Inventory (homepage)

| File | Patterns of note |
|------|------------------|
| `amplify-nav.tsx` | springs, AnimatePresence menu, path morph, magnetic springs |
| `woven-light-hero.tsx` | AnimatePresence, per-char motion, filter blur |
| `signal-outcomes.tsx` | useInView-driven, blur reveals, rAF helpers |
| `growth-capabilities.tsx` | useInView once:false, pathLength, rAF |
| `trust-ecosystem.tsx` | blur reveals, multiple rAF, SVG bloom |
| `transformation-archive.tsx` | motion + priority images |
| `voices-behind-growth.tsx` | motion |
| `conversation-before-begin.tsx` | motion |
| `closing-chapter.tsx` | motion |

**Unnecessary / high-cost patterns:** animating `filter`; `once: false` in-view thrashing where reverse animation isn’t essential; per-character spans; layout-affecting width springs on nav chrome every float toggle.

---

## React Inventory

| Problem | Where |
|---------|-------|
| Scroll-pixel re-renders | `useScrolled` snapshot = scrollY |
| No memo on heavy sections | `AmplifyHome` re-render can cascade when `pastHero`/`inFinale` flips |
| Large client parent | All sections children of one client component |
| State on scroll thresholds | `AmplifyHome` (acceptable if boolean-bailed; still remounts tree work when flipping) |

---

## Bundle Inventory

| Asset | Approx size |
|-------|-------------|
| Largest JS chunk | ~789KB |
| Next largest | ~222KB, ~192KB, ~110KB |
| `three` | namespace import in canvas |
| `framer-motion` | statically imported by 9 modules |
| `lucide-react` | unused |
| Public images | ~13MB total |

---

## Images Inventory

| Asset | Disk | Display risk |
|-------|------|--------------|
| `logo.png` | ~1.9MB / 1536×1024 | **priority** @ 144px — Critical LCP |
| `capabilities/*.png` | ~7.6MB | lazy but huge sources |
| `transformations/*` | ~1.2MB | some `priority` flags |
| `ecosystem/*` | ~1.4MB | mostly OK sizes |
| `voices/*` | ~0.5MB | OK |

---

## CSS / Paint Hotspots

- `will-change-[filter]` + live blur (`amplify-home`)
- `backdrop-blur-[18px]` (nav floating)
- Multi-layer `textShadow` / `drop-shadow` on logo & headlines
- Large radial gradients in mobile menu
- Image CSS `filter: grayscale/saturate` transitions

---

## Ranking (implement after audit approval)

| Rank | ID | Severity | Theme |
|------|-----|----------|-------|
| 1 | ISSUE-01 | Critical | Three.js physics |
| 2 | ISSUE-02 | Critical | CSS blur on WebGL |
| 3 | ISSUE-04 | Critical | Logo LCP |
| 4 | ISSUE-03 | Critical | Never-pause rAF |
| 5 | ISSUE-06 | High | Nav scroll re-renders |
| 6 | ISSUE-08 | High | No code splitting |
| 7 | ISSUE-09 | High | Framer blur paints |
| 8 | ISSUE-05 | High | Fonts / delayed headline |
| 9 | ISSUE-12 | High | backdrop-blur |
| 10 | ISSUE-13 | High | Image weight |
| 11 | ISSUE-11 | High | Extra rAF loops |
| 12 | ISSUE-10 | High | Per-char motion |
| 13 | ISSUE-14 | High | Init/antialias/DPR |
| 14 | ISSUE-07 | High | Scroll listener fan-out |
| 15 | ISSUE-19 | Medium | SVG bloom |
| 16 | ISSUE-15 | Medium | Font count |
| 17 | ISSUE-17 | Medium | Resize |
| 18 | ISSUE-20 | Medium | next.config |
| 19 | ISSUE-18 | Low | Magnetic CTA |
| 20 | ISSUE-16 | Low | Unused lucide |

---

## Out of Scope / Notes

- No GSAP usage found.
- Accessibility 97 / Best Practices 100 / SEO 100 are healthy; do not trade a11y for micro-gains.
- TBT 0ms in the provided run can coexist with **runtime** scroll jank (Lighthouse lab interaction ≠ continuous rAF load while scrolling).

---

*End of audit. Do not implement until roadmap phases are approved.*
