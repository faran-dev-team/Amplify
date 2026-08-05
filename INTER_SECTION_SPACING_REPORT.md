# Inter-Section Spacing Pass

**Date:** August 3, 2026  
**Scope:** Spacing BETWEEN sections only + FAQ → exactly 5  
**Untouched:** Internal card/content spacing from the prior pass

---

## Sections whose inter-section spacing was reduced

1. Hero → Outcomes  
2. Outcomes → Capabilities  
3. Capabilities → Trust  
4. Trust → Transformation  
5. Transformation → Voices  
6. Voices → FAQ  
7. FAQ → Footer  

---

## Previous vs new section spacing

Shared content-section shell (Capabilities, Trust, Transformation, Voices, FAQ):

| Token | Before | After |
|-------|--------|-------|
| `-mt` | `-mt-20` / `md:-mt-28` | `-mt-28` / `md:-mt-36` |
| `pt` | `pt-2`–`pt-6` / `md:pt-4`–`8` | `pt-2` / `md:pt-4` |
| `pb` | `pb-24` / `md:pb-32` | `pb-12` / `md:pb-14` |
| Bottom fade | `h-40`–`h-48` | `h-20`–`h-24` |

| Transition | Before | After |
|------------|--------|-------|
| Hero bottom fade | `h-[18vh]` | `h-[10vh]` |
| Outcomes outer | `-mt-[14vh] pb-20 pt-[12vh]` → `md:pb-28` | `-mt-[20vh] pb-10 pt-[8vh]` → `md:pb-14` |
| Outcomes bottom fade | `h-36` | `h-20` |
| Footer outer | `-mt-20 pb-12 pt-6` → `md:pb-14` | `-mt-28 pb-8 pt-2` → `md:pb-10` |
| Footer top fade | `h-40` | `h-20` |
| Boundary transition art (start/end SVGs) | `mb-8`–`14`, `h-28`–`40` | `mb-4`–`6`, `h-16`–`28` |

Net effect: stronger section overlap + shorter pads/fades at every handoff. Internal module/card spacing unchanged.

---

## FAQs retained — exactly 5

1. **Services** — What makes Scale 12x different from a traditional agency?  
2. **Process** — What does collaboration look like after launch?  
3. **Pricing** — How involved will our team need to be — and what does pricing look like?  
4. **Timeline** — How quickly can we expect measurable results?  
5. **Getting Started** — What happens when we're ready to start?

---

## FAQs removed

| Removed | Why |
|---------|-----|
| How do AI systems actually improve operational efficiency? | Valuable but outside the required five; AI is already covered in Services positioning |
| We already have an internal team. How would Scale 12x complement our existing workflow? | Secondary partnership FAQ; overlaps Process / Getting Started |

---

## Confirmations

- Internal card/content spacing: untouched  
- Animations / motion / Three.js / nav / brand: untouched  
- FAQ count: **5**  
- Inter-section gaps: reduced on every major transition  
