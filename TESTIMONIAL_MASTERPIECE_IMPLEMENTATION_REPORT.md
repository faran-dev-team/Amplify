# Testimonial Masterpiece Implementation Report

**Date:** August 3, 2026  
**Component:** `frontend/components/ui/voices-behind-growth.tsx`  
**Scope:** Testimonials / About (`#about`) only

---

## 1. New component architecture

| Piece | Role |
|-------|------|
| `STORIES[]` | 5 editorial success stories (quote lines + short transformation) |
| `FeaturedStory` | Single large split card — portrait 38–40% + editorial content |
| `ProgressRail` | Segmented progress with live fill on active story |
| `NavArrow` | Minimal prev/next controls |
| `VoicesBehindGrowth` | Section shell, autoplay, keyboard/swipe, preloading |

**Removed:** marquee rows, multi-card wall, repeating clones, continuous horizontal motion.

Export name unchanged: `VoicesBehindGrowth` (home import intact).

---

## 2. Animation strategy

- **Card swap:** Framer `AnimatePresence mode="wait"` — opacity + translateY + subtle scale  
- **Portrait:** scale-in on enter (`1.06 → 1`), soft scale-out on exit  
- **Quote lines:** staggered fade/slide (Apple-keynote cadence)  
- **Story / founder / CTA:** delayed opacity reveals  
- **Transforms + opacity only** (no continuous blur on the track)  
- **Hover pause** on card; progress freezes until leave  

---

## 3. Transition sequence (~5.5s hold)

1. Progress rail fills on active segment  
2. At end of hold → exit: card fades up slightly + scales to `0.985`  
3. Portrait eases down in scale while content exits  
4. Enter: next portrait scales in; quote lines stagger; story/founder fade  
5. Progress resets; rail advances  

Manual next/prev/dot/swipe/keyboard interrupt and restart the hold cleanly.

---

## 4. Performance optimizations

- Autoplay via `requestAnimationFrame` progress (not interval spam)  
- Pause when: off-viewport, hidden tab, hover, reduced motion  
- First story image `priority`; others lazy via `next/image`  
- Prefetch next portrait with `new Image()` before transition  
- Soft spotlight is static CSS radial (no animated blur filters)  
- Card surface uses existing Scale 12x tokens — no new paint-heavy effects  

---

## 5. Responsive behavior

| Breakpoint | Layout |
|------------|--------|
| Mobile | Portrait on top (4:5), content below, controls under card |
| Tablet | Same stack, larger type |
| Desktop | Horizontal split ~40% / 60%, min portrait height ~420–460px |

Navigation + progress remain thumb-friendly on small screens. Swipe left/right changes story.

---

## 6. Accessibility considerations

- `aria-roledescription="carousel"` + section label  
- Live region announces active founder/quote (`aria-live="polite"`)  
- Progress dots are `role="tab"` with `aria-selected`  
- Arrow buttons labeled; keyboard ←/→ when section in view  
- `prefers-reduced-motion`: no autoplay; instant opacity swaps  
- Meaningful image `alt` includes name, role, company  

---

## 7. Image optimization strategy

- `next/image` with responsive `sizes` (`100vw` mobile / `40vw` desktop)  
- Cover crop for editorial magazine framing  
- Priority only on index 0  
- Prefetch `STORIES[(index+1) % n].portrait` during hold  
- Soft gradient veil for type contrast without crushing the photo  

---

## 8. Confirmation — only Testimonials redesigned

| Constraint | Status |
|------------|--------|
| Color palette / background system | Inherited only (+ subtle spotlight) |
| Hero / Nav / Footer / other sections | Untouched |
| Typography families | Unchanged (Playfair + Space Grotesk) |
| React / Next architecture | Same dynamic import path |
| SEO / `#about` anchor | Preserved |

---

## Outcome

One story. One founder. One transformation.  
A Forbes / Apple-style featured interview — not a carousel wall — aligned with Scale 12x and sized to keep scroll momentum while earning a few seconds of attention.
