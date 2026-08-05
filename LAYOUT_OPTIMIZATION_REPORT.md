# Layout Optimization Report

**Date:** August 3, 2026  
**Scope:** Vertical spacing rhythm + FAQ conversion optimization only  
**Standard:** Apple / Linear / Stripe / Vercel information density

---

## 1. Sections Adjusted

| Section | File |
|---------|------|
| Hero | `woven-light-hero.tsx` |
| Signal Outcomes | `signal-outcomes.tsx` |
| Growth Capabilities | `growth-capabilities.tsx` |
| Trust Ecosystem | `trust-ecosystem.tsx` |
| Transformation Archive | `transformation-archive.tsx` |
| Voices (About) | `voices-behind-growth.tsx` |
| Conversation (FAQ) | `conversation-before-begin.tsx` |
| Closing / Footer | `closing-chapter.tsx` |

---

## 2. Previous Spacing vs New Spacing

### Spacing system (intentional, not uniform)

| Role | Previous tendency | New rhythm |
|------|-------------------|------------|
| Hero top inset | `pt-[26vh]` / `md:pt-[28vh]` | `pt-[18vh]` / `md:pt-[20vh]` |
| Content section outer `pt` | `pt-8`–`pt-16` | `pt-4`–`pt-8` |
| Content section outer `pb` | `pb-36`–`pb-52` | `pb-24`–`pb-32` |
| Section overlap `-mt` | `-mt-24` / `-mt-32` | `-mt-20` / `-mt-28` |
| Headline block `mb` | `mb-16` → `lg:mb-28`–`36` | `mb-10` → `lg:mb-16`–`20` |
| Large internal stacks | `gap-24` → `gap-40` | `gap-14` → `gap-24` |
| Footer stack margins | `mb-14`–`mb-28` | `mb-6`–`mb-16` |

### Hero
| Token | Before | After |
|-------|--------|-------|
| Content top | `pt-[26vh]` / `md:pt-[28vh]` | `pt-[18vh]` / `md:pt-[20vh]` |
| Eyebrow → headline | `mb-3` / `md:mb-4` | `mb-2.5` / `md:mb-3` |
| Subcopy | `mt-5` / `md:mt-6` | `mt-4` / `md:mt-5` |
| CTA row | `mt-7` / `sm:mt-8` | `mt-6` / `sm:mt-7` |
| Global presence | `mt-10` / `md:mt-12` | `mt-8` / `md:mt-9` |
| Bottom fade | `h-[28vh]` | `h-[18vh]` |

### Signal Outcomes
| Token | Before | After |
|-------|--------|-------|
| Outer shell | `-mt-[18vh] min-h-[110vh] pb-32 pt-[18vh]` → `md:pb-48 md:min-h-[130vh]` | `-mt-[14vh] min-h-[96vh] pb-20 pt-[12vh]` → `md:pb-28 md:min-h-[110vh]` |
| Inner canvas | `min-h-[1080px]` / `640–860px` | `min-h-[920px]` / `560–740px` |
| Terrace offsets | `md:mt-28/56` `lg:mt-36/72` | `md:mt-20/36` `lg:mt-24/48` |
| Metric cards | `px-8 py-9` | `px-6 py-7` |
| Terrace grid | `mt-20` / `lg:mt-14` | `mt-12` / `lg:mt-10` |

### Growth Capabilities
| Token | Before | After |
|-------|--------|-------|
| Outer | `-mt-24 pb-36 pt-8` → `md:pb-48` | `-mt-20 pb-24 pt-6` → `md:pb-32` |
| Headline `mb` | `mb-20 md:mb-28 lg:mb-36` | `mb-12 md:mb-16 lg:mb-20` |
| Module stack gap | `gap-24 md:gap-32 lg:gap-40` | `gap-14 md:gap-20 lg:gap-24` |
| Module grid gap | `gap-8 md:gap-12 lg:gap-16` | `gap-6 md:gap-10 lg:gap-12` |
| Path canvas `min-h` | `2800px` / `3000px` | `2400px` / `2600px` |

### Trust Ecosystem
| Token | Before | After |
|-------|--------|-------|
| Outer | `-mt-24 pb-40 pt-10` → `md:pb-52` | `-mt-20 pb-24 pt-6` → `md:pb-32` |
| Headline `mb` | `mb-16 md:mb-24 lg:mb-28` | `mb-10 md:mb-14 lg:mb-16` |
| ICP strip | `mb-8 md:mb-10` | `mb-6 md:mb-8` |

### Transformation Archive
| Token | Before | After |
|-------|--------|-------|
| Outer | `-mt-24 pb-40 pt-12` → `md:pb-52` | `-mt-20 pb-24 pt-6` → `md:pb-32` |
| Headline `mb` | `mb-16…lg:mb-28` | `mb-10…lg:mb-16` |
| Intro art | `mb-16 md:mb-24` | `mb-10 md:mb-14` |
| Archive block | `mt-28…lg:mt-44` | `mt-16…lg:mt-24` |
| Subhead wrap | `mb-14 md:mb-20` | `mb-10 md:mb-14` |
| Chapter stack | `gap-20 md:gap-28 lg:gap-32` | `gap-12 md:gap-16 lg:gap-20` |
| Detail panel | `mt-16 md:mt-24` | `mt-12 md:mt-16` |
| Modal body | `p-5 md:p-8 lg:p-10` | `p-4 md:p-6 lg:p-8` |
| Beat list | `space-y-6 md:space-y-7` | `space-y-4 md:space-y-5` |

### Voices Behind Growth
| Token | Before | After |
|-------|--------|-------|
| Outer | `-mt-24 pb-40 pt-12` → `md:pb-52` | `-mt-20 pb-24 pt-6` → `md:pb-32` |
| Headline `mb` | `mb-16…lg:mb-28` | `mb-10…lg:mb-16` |
| Intro art | `mb-14 md:mb-20` | `mb-10 md:mb-14` |
| Supporting stack | `mt-28 gap-24` → `lg:gap-40` | `mt-16 gap-14` → `lg:gap-24` |
| Close block | `mt-28 md:mt-40 lg:mt-48` | `mt-16 md:mt-24 lg:mt-28` |
| Expanded card | `px-5 py-7 md:px-8 md:py-9` | `px-5 py-5 md:px-7 md:py-7` |
| Chapter list | `space-y-6 md:space-y-7` | `space-y-4 md:space-y-5` |

### Conversation (FAQ)
| Token | Before | After |
|-------|--------|-------|
| Outer | `-mt-28 pb-36 pt-6` → `md:pb-48` | `-mt-20 pb-24 pt-4` → `md:pb-32` |
| Headline `mb` | `mb-14 md:mb-20` | `mb-10 md:mb-14` |
| Invite | `mt-20 md:mt-28` | `mt-14 md:mt-16` |
| Row spacing | `mb-5 md:mb-6` | `mb-4 md:mb-5` |
| Question button | `px-5 py-5 md:px-7 md:py-6` | `px-5 py-4 md:px-6 md:py-5` |
| Answer panel | `pb-6 md:pb-8` | `pb-5 md:pb-6` |
| Answer lines | `space-y-4 md:space-y-5` | `space-y-3 md:space-y-4` |

### Closing / Footer
| Token | Before | After |
|-------|--------|-------|
| Outer | `-mt-24 pb-16 pt-8` → `md:pb-20` | `-mt-20 pb-12 pt-6` → `md:pb-14` |
| Signal art | `mb-10 md:mb-14` | `mb-6 md:mb-8` |
| Headline wrap | `mb-8 md:mb-10` | `mb-6 md:mb-8` |
| CTA block | `mb-20 md:mb-28` | `mb-12 md:mb-16` |
| Destinations | `mb-16 md:mb-20` | `mb-10 md:mb-12` |
| Manifesto | `mb-16 md:mb-20` | `mb-10 md:mb-12` |
| Contact | `mb-12 md:mb-14` | `mb-8 md:mb-10` |
| Social | `mb-14 md:mb-16` | `mb-8 md:mb-10` |
| Brand mark | `mb-8` | `mb-6` |
| Origin pulse | `mt-14 md:mt-16` | `mt-10 md:mt-12` |
| Copyright | `mt-8` | `mt-6` |

---

## 3. Components Where Unnecessary Whitespace Was Removed

- Hero top viewport padding and bottom fade height
- Metric outcome cards (internal padding)
- Capability module vertical stack + grid gaps + path canvas min-height
- Trust headline / ICP label strip
- Transformation intro art, archive gaps, modal padding, beat lists
- Voices supporting chapter stack, expanded narrative card, close spacing
- FAQ accordion button/panel padding and answer line spacing
- Footer CTA → links → manifesto → contact → social cascade

---

## 4. FAQ Questions Removed (and Why)

Started with **9** exchanges. Removed **2**:

| Removed | Why |
|---------|-----|
| “What usually prevents ambitious companies from taking the next step?” | Generic hesitation filler; weak conversion value; restates agency sprawl already covered elsewhere |
| “Can you work with our current technology stack?” | Generic integration FAQ; less differentiating than AI capabilities; stack flexibility is implied in process answers |

Also tightened one retained question to cover pricing explicitly:
- “How involved will our team need to be?” → “…and what does pricing look like?”

---

## 5. Final FAQs Retained — **7**

1. **Services / differentiation** — What makes Scale 12x different from a traditional agency?  
2. **AI capabilities** — How do AI systems actually improve operational efficiency?  
3. **Process** — What does collaboration look like after launch?  
4. **Pricing + communication** — How involved will our team need to be — and what does pricing look like?  
5. **Timeline** — How quickly can we expect measurable results?  
6. **Communication / partnership** — How would Scale 12x complement our existing workflow?  
7. **Getting started** — What happens when we're ready to start?

---

## 6. Scope Confirmations

| Constraint | Status |
|------------|--------|
| No animations / Framer Motion / GSAP / Three.js changes | Confirmed — timing, springs, and motion APIs untouched |
| No functionality changes | Confirmed — FAQ accordion behavior unchanged; only content set reduced |
| No visual identity / brand / logo / color / typography changes | Confirmed |
| No navigation / section order / SEO / a11y architecture changes | Confirmed |
| Only spacing + FAQ optimization performed | Confirmed |

---

## Outcome

The page retains its premium editorial character with denser vertical rhythm: less empty scroll, stronger section adjacency, and a conversion-focused FAQ set of seven questions.
