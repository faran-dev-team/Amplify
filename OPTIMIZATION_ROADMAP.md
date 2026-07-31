# OPTIMIZATION_ROADMAP.md

**Depends on:** `PERFORMANCE_AUDIT.md`  
**Rule:** Implement phase-by-phase. Re-measure Mobile Lighthouse + real-device scroll FPS after each phase. Do not batch all phases blindly.

---

## Guiding Principles

1. Preserve the premium visual language (particles, capsules, motion, purple signal).
2. Prefer **architecture changes** over deleting the experience.
3. Fix **Critical** scroll + LCP first — they dominate the user’s perception.
4. Every change must state: affected issue ID, risk to design, rollback plan.

---

## Phase 1 — Critical Fixes (Week 0–1)

**Goal:** Stop the site from feeling broken on mobile scroll; cut LCP drastically.

| Order | Issue | Action | Design risk | Verify |
|-------|-------|--------|-------------|--------|
| 1.1 | ISSUE-04 | Replace `logo.png` with 144–288px WebP/AVIF (~&lt;20KB); keep `priority` + add `sizes="144px"` | None if asset matches mark | LCP element size in DevTools |
| 1.2 | ISSUE-02 | **Remove CSS `filter: blur()`** from WebGL wrapper; soften via `opacity` / particle size / material only | Atmosphere slightly sharper — tune opacity | Scroll FPS past hero |
| 1.3 | ISSUE-03 | Pause Three rAF when `document.hidden`; throttle to 30fps when `pastHero` | Subtle | Chrome Performance panel |
| 1.4 | ISSUE-01 (part A) | Adaptive `particleCount`: mobile ≤8k, desktop ≤20k; disable mouse force when idle | Density change — keep look via size/opacity | FPS + visual QA |
| 1.5 | ISSUE-06 | Fix `useScrolled` to subscribe to boolean threshold only | None | React Profiler while scrolling |

**Exit criteria**
- Mobile LCP **&lt; 2.5s** (interim)
- Scroll past hero no longer “sticks” on a mid Android reference device
- Performance score trending **≥ 80**

---

## Phase 2 — Rendering Optimization (Week 1–2)

**Goal:** Eliminate paint storms and compositor overload.

| Order | Issue | Action |
|-------|-------|--------|
| 2.1 | ISSUE-09 | Replace all Framer `filter: blur()` reveals with opacity/transform only |
| 2.2 | ISSUE-12 | Replace nav `backdrop-blur` with solid `rgba(15,23,42,0.92)` panel while canvas active |
| 2.3 | ISSUE-19 | Gate SVG `feGaussianBlur` blooms behind `pointer: fine` + non-reduced-motion |
| 2.4 | ISSUE-07 | Unify scroll into one rAF-coalesced publisher |
| 2.5 | ISSUE-17 | Coalesce WebGL resize |

**Exit criteria**
- Lighthouse “Avoid Non-Composited Animations” largely cleared for hero/nav
- Floating nav no longer causes visible hitch

---

## Phase 3 — Animation Architecture (Week 2–3)

**Goal:** Keep “living OS” feel with a sustainable animation budget.

| Order | Issue | Action |
|-------|-------|--------|
| 3.1 | ISSUE-01 (part B) | Move drift/rotation to shader uniforms; upload positions only when mouse interacting |
| 3.2 | ISSUE-10 | Line-level headline animation; pause rotation when hero `IntersectionObserver` false |
| 3.3 | ISSUE-11 | Pause section rAF when not in view (`once` or visibility gate) |
| 3.4 | ISSUE-14 | Remove per-particle `THREE.Color`; DPR cap 1.25 mobile; antialias off on mobile |
| 3.5 | — | `prefers-reduced-motion`: static particle plate + no marquee/headline loops |

**Proposed particle architecture (target state)**

```
Hero in view + interacting  →  high fidelity (shader + optional soft CPU subset)
Hero in view + idle         →  GPU drift only, no buffer upload
Past hero                   →  30fps, opacity↓, no mouse forces
Tab hidden / reduced motion →  rAF stopped / static frame
```

**Exit criteria**
- Sustained **≥ 55–60 FPS** scrolling mid-page on reference Android
- Particle aesthetic still reads as “premium atmosphere”

---

## Phase 4 — Image Optimization (Week 3)

| Order | Issue | Action |
|-------|-------|--------|
| 4.1 | ISSUE-13 | Re-encode capabilities/transformations/voices to AVIF/WebP; max dimension by layout |
| 4.2 | ISSUE-13 | Remove erroneous `priority` on below-fold archive images |
| 4.3 | ISSUE-20 | `next.config.ts` images: `formats: ['image/avif','image/webp']` |
| 4.4 | — | Add `sizes` everywhere `fill` is used; LQIP/blur placeholders |

**Exit criteria**
- Public media weight down **≥ 70%**
- Lighthouse “Improve Image Delivery” resolved

---

## Phase 5 — Bundle Optimization (Week 3–4)

| Order | Issue | Action |
|-------|-------|--------|
| 5.1 | ISSUE-08 | `next/dynamic` for Trust, Archive, Voices, Conversation, Closing (ssr true, loading null/skeleton) |
| 5.2 | ISSUE-08 | Lazy-mount `WovenCanvas` after `requestIdleCallback` or first paint |
| 5.3 | ISSUE-16 | Remove unused `lucide-react` **or** adopt it and delete duplicate inline icons |
| 5.4 | ISSUE-20 | `optimizePackageImports` where applicable |
| 5.5 | ISSUE-15 | Drop unused font families/weights |

**Exit criteria**
- Initial JS parse materially reduced (measure chunk graph)
- Lighthouse unused JS warning improved

---

## Phase 6 — React Optimization (Week 4)

| Order | Issue | Action |
|-------|-------|--------|
| 6.1 | — | Split presentational sections; `memo` where props stable |
| 6.2 | ISSUE-06 follow-up | Nav chrome state via CSS class toggled from threshold ref (minimize Framer layout springs) |
| 6.3 | — | Ensure mobile menu mounts lazily (already partial) and avoids animating layout properties |
| 6.4 | ISSUE-05 | Wire hero to `--font-playfair`; delete runtime Google Fonts `<link>` |

**Exit criteria**
- React Profiler: no components re-rendering on every scroll tick
- INP **&lt; 150ms** on mobile lab + field spot-check

---

## Measurement Protocol (every phase)

1. **Lab:** Lighthouse Mobile (same network throttling each run), 3 runs, median.
2. **Runtime:** Chrome Performance — 3s scroll through hero → capabilities while recording.
3. **Counters:** trace main-thread time in Scripting vs Rendering vs Painting.
4. **Real device:** one mid Android + one older laptop, subjective 1–5 smoothness score.
5. Log results in a short `PERF_LOG.md` row (phase, date, LCP, FPS notes).

---

## Explicit Non-Goals (this roadmap)

- Do not remove the particle atmosphere entirely.
- Do not flatten the site into a static brochure.
- Do not chase 100 Performance by deleting brand motion.
- Do not add GSAP on top of Framer without removing equivalent work.

---

## Suggested First PR (smallest high-impact slice)

1. Optimize logo asset (1.1)  
2. Kill CSS blur on canvas (1.2)  
3. Fix nav scroll store (1.5)  
4. Pause rAF when hidden + cut mobile particles to 8k (1.3 + 1.4)

Ship that PR, re-audit scores, then continue Phase 2.
