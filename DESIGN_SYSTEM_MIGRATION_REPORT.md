# Design System Migration Report — Scale 12x

**Date:** August 3, 2026  
**Source:** Official cinematic AI visual reference (midnight / cloud blue / electric violet)  
**Scope:** Visual language only — colors, backgrounds, lighting, surfaces, borders, type colors

---

## 1. New Color System

| Token | Value | Role |
|-------|-------|------|
| `--s12-void` | `#02040A` | Rich space black |
| `--s12-midnight` | `#050814` | Deep editorial midnight |
| `--s12-navy` | `#0A1224` | Deep navy surfaces |
| `--s12-surface` | `#0C152B` | Elevated UI panels |
| `--s12-violet` | `#7C5CFF` | Electric violet accent |
| `--s12-violet-deep` | `#5B3FD4` | Deep violet |
| `--s12-lavender` | `#B8A4FF` | Soft lavender |
| `--s12-cloud` | `#5B8DEF` | Cloud blue |
| `--s12-ice` | `#A8C5F0` | Ice blue |
| `--s12-cyan-soft` | `#6EB8E8` | Soft luminous blue |
| `--s12-text` | `#F4F7FC` | Luminous white headlines |
| `--s12-body` | `#9AA8C0` | Soft blue-gray body |
| `--s12-muted` | `#6B7890` | Cool muted gray |
| `--s12-faint` | `#4A5568` | Meta / faint labels |
| `--s12-border` | `rgba(168,196,240,0.11)` | Luminous hairline |
| `--s12-border-strong` | `rgba(184,164,255,0.22)` | Accent hairline |

**Removed from system:** flat `#030208` black, pink-magenta `#A855F7` agency purple, warm terracotta About accents, rainbow hero accent cycle (orange/green/rose).

---

## 2. Background System

Implemented as `.s12-stage` on the homepage shell:

1. Deep midnight vertical gradient  
2. Soft ambient cloud-blue radial (top-left)  
3. Subtle violet bloom (top-right / bottom)  
4. Extremely soft atmospheric cloud wash  
5. Thin AI geometric grid (masked, low opacity)  
6. Film-grain noise overlay (soft-light)

Section atmospheres (same DNA, different lighting):

| Section | Class | Lighting |
|---------|-------|----------|
| Hero | `.s12-atm-hero` | Most dramatic violet + blue |
| Outcomes | `.s12-atm-calm` | Calmer blue wash |
| Capabilities | `.s12-atm-editorial` | Soft violet editorial |
| Trust | `.s12-atm-cool` | Cooler blue |
| Transformation | `.s12-atm-editorial` | Editorial |
| About / Voices | `.s12-atm-balanced` | Balanced dual wash |
| FAQ | `.s12-atm-cloud` | Subtle cloud lighting |
| Footer | `.s12-atm-finale` | Deepest / richest close |

No section remains flat pure black.

---

## 3. Component Updates

| Area | Change |
|------|--------|
| `globals.css` | Full Scale 12x token + atmosphere + surface/button system |
| `amplify-home.tsx` | `.s12-stage` + per-section atmosphere wrappers |
| `amplify-nav.tsx` | Violet accents, luminous borders, primary gradient CTA |
| `woven-light-hero.tsx` | Transparent stage, system accent cycle, new buttons, cool type |
| All section TSX | Hex migration → midnight / violet / lavender / ice |
| `layout.tsx` / manifest | Theme color `#050814`, luminous foreground |

---

## 4. Card Styling Changes

- Deep navy glass gradients (`165deg` surface stops)  
- Thin luminous ice/lavender borders  
- Soft inner highlight (`inset 0 1px`)  
- Premium navy shadow + whisper violet bloom  
- Light backdrop blur (restrained, not obvious glassmorphism)  
- Applied to metric cards, FAQ panels, voice narrative cards  

---

## 5. Button Styling Changes

| Type | Treatment |
|------|-----------|
| Primary (`.s12-btn-primary`) | Violet → luminous blue gradient, soft glow, brightness lift on hover |
| Ghost (`.s12-btn-ghost`) | Navy glass + luminous border |
| Applied to | Hero CTAs, nav CTA, mobile CTA, footer CTA |

---

## 6. Typography Color Updates

| Role | Before | After |
|------|--------|-------|
| Headlines | Near-white / mixed accents | `#F4F7FC` luminous white |
| Accent lines | Rainbow cycle | Ice / cloud / lavender / violet only |
| Body | `white/35–45` | `#9AA8C0` soft blue-gray |
| Muted | `white/25–30` | `#6B7890` cool gray |
| Links / CTAs | Pink-lavender | Soft violet `#B8A4FF` / `#D4C8FF` |
| Eyebrows | Magenta purple | Electric violet / lavender |

---

## 7. Lighting System

- Ambient radial blues and violets behind content  
- Section-level volumetric washes  
- Soft purple bloom on interactive cards/CTAs  
- Blue edge lighting via luminous borders  
- Hero remains the brightest atmospheric field  

Lighting never overpowers type.

---

## 8. Gradient System

| Name | Stops |
|------|-------|
| Primary CTA | `#5B3FD4 → #7C5CFF → #4A7BE8 → #5BA3F0` |
| Primary hover | Brighter violet → ice blue |
| Midnight stage | `#050814 → #07101F → #0A1224` |
| Surfaces | `rgba(16,26,50) → rgba(10,18,36)` |

---

## 9. Confirmations

| Constraint | Status |
|------------|--------|
| Layout / component structure preserved | Confirmed |
| Framer Motion / GSAP / Three.js logic untouched | Confirmed (`woven-canvas` unchanged) |
| Smooth scroll / nav structure / SEO content preserved | Confirmed |
| Responsiveness / accessibility rings retained | Confirmed |
| Performance architecture unchanged | Confirmed |
| Only visual language evolved | Confirmed |

---

## Outcome

The site now reads as one **enterprise AI operating system** visual language: cinematic midnight depth, cloud-blue atmosphere, electric violet intelligence, luminous restraint — cohesive from Hero through Footer.
