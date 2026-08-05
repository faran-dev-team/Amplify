# Testimonial Section Redesign Report

**Date:** August 3, 2026  
**File:** `frontend/components/ui/voices-behind-growth.tsx`  
**Scope:** Testimonials / About (`#about`) only

---

## 1. Previous layout vs new layout

| | Previous | New |
|---|----------|-----|
| Structure | Long vertical editorial chapters (featured + supporting stacks) | Dual infinite horizontal marquees |
| Height | Extremely tall (multi-viewport) | ~600–700px class experience (`py-10/12` + 2 compact rows) |
| Reading model | Blog-like deep narratives | Credibility wall first; short quotes second |
| Motion | Expand/collapse chapter storytelling | Continuous opposing marquees |
| Cards | Large portrait + multi-beat stories | Compact premium product cards |

---

## 2. Performance considerations

- Motion via `translate3d` + `will-change-transform` only  
- Single `requestAnimationFrame` loop per row (no Framer Motion on the track)  
- Pauses when: off-screen (`useInView`), tab hidden (`visibilitychange`), hover, drag, `prefers-reduced-motion`  
- Images sized at `48px` portraits; first 3 cards per track get `priority` sparingly  
- No continuous blur filters on the moving track  
- Triple-cloned track for seamless wrap without layout thrashing  

---

## 3. Animation approach

- **Engine:** lightweight rAF offset accumulator (not CSS keyframes) so pause/resume and drag keep absolute position  
- **Top row:** constant leftward speed (~32px/s)  
- **Bottom row:** constant rightward speed (~26px/s)  
- **Wrap:** offset kept in `[-half, 0)` where `half = scrollWidth / 3`  
- **Hover:** freezes row; resumes from current offset  
- **Reduced motion:** static horizontal scroll strip (no autoplay)  

Entrance of headline/metrics still uses existing Framer Motion patterns (opacity/y only).

---

## 4. Responsiveness improvements

- Card widths: `300 → 320 → 340px` across breakpoints  
- Edge fades scale (`w-10` → `md:w-24`)  
- Touch: pointer capture drag with momentum handoff back to autoplay  
- Compact header + metrics wrap on small screens  
- Section padding stays tight so scroll momentum continues  

---

## 5. Accessibility considerations

- Section `aria-label="Voices behind the scale"`  
- `id="about"` preserved for nav  
- Decorative portraits use empty `alt` (name is adjacent text)  
- Screen-reader summary via `.sr-only`  
- `prefers-reduced-motion`: no continuous motion; native overflow scroll  
- Focusable “Read Story →” links remain keyboard accessible  
- Marquee container is `role="presentation"` (content remains in DOM for AT)  

---

## 6. Card redesign summary

Each card includes:

- Circular professional portrait  
- Name / role · company  
- Short quote (max ~4 lines, `line-clamp-4`)  
- Trust chip (tier / relationship)  
- **Read Story →** → `#contact`  

Visual language: Scale 12x navy glass, luminous borders, soft inner highlight, restrained hover lift — no new colors.

---

## 7. Marquee implementation details

| Detail | Implementation |
|--------|----------------|
| Rows | 2 independent `MarqueeRow` instances |
| Directions | Top → left, Bottom → right |
| Content | 6 cards/row from 10 short testimonials (opening/reflection distilled) |
| Cloning | ×3 for seamless ultra-wide coverage |
| Pause | Hover, off-screen, hidden tab, reduced motion, drag |
| Drag | Pointer events + capture; wrap-safe offset |
| Fades | Left/right midnight gradients matching site stage |

---

## 8. Confirmation — no other sections modified

| Area | Status |
|------|--------|
| Hero / Nav / Footer / other sections | Untouched |
| Brand colors / background system | Inherited only |
| React / Next architecture | Same export `VoicesBehindGrowth` |
| SEO content intent | Preserved via compact quotes + sr-only |
| `amplify-home.tsx` import path | Unchanged |

---

## Outcome

The About / testimonials block is now a **wall of trust**: short, cinematic, continuously alive, and easy to pass through without breaking page momentum — while inviting a few moments of watching.
