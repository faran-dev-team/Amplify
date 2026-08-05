# Services Page Architecture

**Route:** `/services`  
**Experience shell:** `components/ui/services-page.tsx`  
**Design system:** Scale 12x `.s12-*` tokens, atmospheres, surfaces, and motion language

---

## Overall design philosophy

The Services page is not a catalog. It is a product narrative for the **Growth Operating System**.

Scale 12x is positioned as one partner delivering connected capability — marketing, technology, and transformation as a single operating layer. Every section advances that idea:

| Emotion | Section job |
|---|---|
| Curiosity | Hero — what Scale 12x actually does |
| Confidence | Operating System — one connected ecosystem |
| Trust | Marketing + Technology — depth without agency sprawl |
| Excitement | Sticky Showcase — the OS coming alive |
| Understanding | Workflow — how engagement works |
| Authority | Stack + Industries — craft + ICP clarity |
| Desire | Cases + Closing CTA — proof and invitation |

Visual language stays continuous with the homepage: midnight stage, ice borders, violet/cloud accents, Playfair headlines, Space Grotesk UI, `easeEditorial` / `easeOutExpo` choreography, and section atmospheres (`s12-atm-*`).

No WebGL on this route — ambient motion is CSS/SVG only, keeping the page fast while still feeling cinematic.

---

## Section-by-section rationale

### 1. Hero (`services-hero.tsx`)

**Purpose:** Answer “What does Scale 12x actually do?” in one viewport.

- Large Playfair editorial headline: *One partner. Every capability.*
- Supporting line frames the OS thesis (not a service list).
- Dual CTAs: Start Scaling → contact; Explore the System → OS section.
- Trust panel (13 Practices / 1 OS / 5 Cities) establishes authority without a logo wall.
- Soft orbital ambient field replaces homepage Three.js for performance.

### 2. Growth Operating System (`services-operating-system.tsx`)

**Purpose:** Visualize capability as a connected ecosystem before listing practices.

- Interactive hub + spoke SVG: eight practices around Scale 12x core.
- Hover/focus on a node reveals capability detail in an adjacent surface.
- Default state restates *One Partner. Every Channel.*
- Avoids card grids; the diagram *is* the explanation.

### 3. Marketing & Growth (`services-marketing.tsx`)

**Purpose:** Present demand pillars as a premium interactive index.

- Sticky editorial intro (desktop) + expandable pillar list.
- Hover/focus activates a pillar; detail reveals in the sticky column.
- Numbered index, hairline separators, arrow affordance — magazine, not SaaS cards.
- Six practices: Paid, Content, Search, Brand, Creative Studio, Analytics & MarTech.

### 4. Technology & Transformation (`services-technology.tsx`)

**Purpose:** Same brand language, different interaction pattern.

- Horizontal media stage + tabbed module switcher (not another vertical accordion).
- Image and copy swap with soft crossfade; traits as quiet chips.
- Six modules: Generative AI, Digital Transformation, Cloud & Data, Web, Strategy & Automation, Cybersecurity.
- Completes the Thirteen Practices with Marketing section.

### 5. Interactive Sticky Showcase (`services-sticky-showcase.tsx`)

**Purpose:** Signature Apple-like scroll storytelling.

- Desktop: multi-viewport sticky stage; left visualization, right copy.
- Scroll progress drives active beat (Signal → Demand → Intelligence → Infrastructure → Compound).
- Visualization lighting, nodes, and progress arc update per beat.
- Tablet/mobile: sequential chapters (no broken sticky theatre).
- `prefers-reduced-motion`: stacked editorial cards, no scroll coupling.

### 6. Delivery Workflow (`services-workflow.tsx`)

**Purpose:** Explain engagement without a generic timeline.

- Discover → Architect → Activate → Compound.
- Desktop: luminous connector path + four optical columns.
- Mobile: vertical signal spine with stage nodes.
- Meta labels (strategy sprint, 14–21 day close, etc.) from brand delivery language.

### 7. Technology Stack (`services-stack.tsx`)

**Purpose:** Curated tooling presentation — editorial, not logo wallpaper.

- Category rail (AI, Development, Cloud, Automation, Analytics, Infrastructure).
- Active group opens a split editorial panel: thesis + item list.
- Technologies named as capability support, not partner claims.

### 8. Industries (`services-industries.tsx`)

**Purpose:** ICP as ecosystems, not a tag cloud.

- Six atmospheric image cards (existing `/ecosystem` assets).
- Hover/focus lifts card, scales image, reveals depth copy.
- Copy aligned to US B2B ICP from brand strategy.

### 9. Featured Case Studies (`services-cases.tsx`)

**Purpose:** Quality over quantity; no slider.

- One large featured split story + two secondary editorial chapters.
- Metrics from documented retainer model (no invented ROAS).
- Link out to homepage transformation archive for full work.

### 10. Final CTA (`closing-chapter.tsx`)

**Purpose:** Cinematic close shared with the rest of the site.

- Reuses Closing Chapter for brand consistency: signal completion, magnetic CTA, footer meta.
- Atmosphere: `s12-atm-finale`.

---

## Interaction patterns

| Pattern | Where | Behavior |
|---|---|---|
| Hub hover | Operating System | Node focus updates detail panel |
| Pillar activation | Marketing | Hover/focus/click expands context |
| Media stage tabs | Technology | Soft crossfade image + copy |
| Scroll-driven sticky | Showcase | Beat index from scroll progress |
| Category rail | Stack | Hover/click swaps curated group |
| Depth reveal | Industries | Hover expands secondary copy |
| Editorial metrics | Cases | Large type proof, no carousel |

Keyboard: interactive nodes/tabs/buttons are focusable with visible violet focus rings. Reduced motion branches avoid continuous animation and sticky scroll coupling.

---

## Motion strategy

- **Entrances:** opacity + short Y/X translates, `easeEditorial` (~0.55–0.85s).
- **Exits / swaps:** `AnimatePresence` or opacity crossfades ≤ 0.5s.
- **Ambient:** slow radial pulse, orbital dash rotation (80–110s) — atmosphere, not decoration.
- **Sticky showcase:** Framer `useScroll` + `useSpring` for smoothed beat selection; GPU-friendly transforms/opacity only on the visual.
- **Hover:** border luminosity, 2–4px lift, image scale ~1.04–1.05, arrow translate.
- **Never:** bounce easings, parallax overload, particle spam, autoplaying carousels.

---

## Responsive strategy

| Breakpoint | Strategy |
|---|---|
| Ultra-wide | Content capped at `max-w-[1200px]`; stage atmospheres still full-bleed |
| Desktop | Sticky marketing intro; sticky showcase theatre; horizontal workflow |
| Laptop | Same patterns with tighter type/spacing |
| Tablet | Showcase falls back to sequential chapters; workflow vertical |
| Mobile | Single-column stacks; OS diagram full width; pillars reveal detail inline; industries 1-col |

Layouts are rethought per section — not a collapsed desktop grid.

---

## Performance optimizations

- Below-fold sections loaded via `next/dynamic` in `services-page.tsx`.
- No Three.js / WebGL on `/services`.
- Images: `next/image`, lazy by default; responsive `sizes`.
- Sticky scroll logic gated behind `md+` and disabled when `prefers-reduced-motion`.
- SVG/CSS ambient effects preferred over JS loops where possible.
- Homepage and Services share Closing Chapter + Nav (no duplicate footer systems).

---

## Accessibility considerations

- Semantic landmarks: one `h1`, sequential `h2`/`h3`, labelled sections.
- Interactive SVG nodes expose `role="button"` + `aria-label`.
- Tabs/listboxes use `aria-selected` / `aria-activedescendant` where relevant.
- Focus-visible rings using brand violet (`#7C5CFF`).
- Decorative imagery uses empty `alt=""`; meaning carried by adjacent text.
- Reduced-motion: showcase becomes static chapters; ambient field suppressed.
- Color contrast kept on Playfair white / `#9AA8C0` body against midnight surfaces.

---

## Visual hierarchy decisions

1. **Brand + OS thesis first** — hero headline carries Scale 12x’s promise before any practice name.
2. **System before inventory** — OS diagram precedes Marketing/Technology lists.
3. **Distinct interaction per domain** — Marketing = vertical index; Technology = media stage; Showcase = sticky scroll — so the page never feels repetitive.
4. **Proof late** — cases appear after capability and process, when desire is earned.
5. **One job per section** — each block has one eyebrow, one headline, one supporting sentence, one interaction idea.

---

## File map

```
app/services/page.tsx                 # Route + metadata
components/ui/services-page.tsx       # Atmosphere shell + dynamic imports
components/ui/services-hero.tsx
components/ui/services-operating-system.tsx
components/ui/services-marketing.tsx
components/ui/services-technology.tsx
components/ui/services-sticky-showcase.tsx
components/ui/services-workflow.tsx
components/ui/services-stack.tsx
components/ui/services-industries.tsx
components/ui/services-cases.tsx
components/ui/closing-chapter.tsx     # Shared finale
components/ui/amplify-nav.tsx         # Services → /services
```

Nav updates: Services → `/services`; Practices → `/services#marketing`; Work/About → `/#…`; homepage capabilities section links into the full OS page.

---

## Opportunities for future enhancements

1. **Live case metrics** — when published outcomes exist, swap retainer illustrations for verified results without changing layout.
2. **Deep-linkable practices** — route hashes per practice (`/services#paid-media`) with open pillar state.
3. **Pricing chapter** — optional Launch / Scale / Dominate editorial block between workflow and stack (content exists in FAQ today).
4. **Canvas refinement** — optional lightweight Canvas 2D signal field in sticky showcase if motion budget allows.
5. **CMS wiring** — practices, industries, and cases as structured content for non-engineer updates.
6. **Shared motion tokens** — extract `easeEditorial` / `easeOutExpo` into a single module to reduce duplication across sections.
7. **Insights route** — nav still points to `/#insights`; a real editorial hub would complete the IA.

---

## Quality checklist

- [x] Feels handcrafted within the Scale 12x system (not a generic agency template)
- [x] Reads as a product OS experience, not a service menu
- [x] Each section has a distinct purpose and interaction
- [x] Motion is meaningful and reduced-motion aware
- [x] Visual language consistent from Hero → Closing Chapter
- [x] Responsive layouts rethought per breakpoint
- [x] Performance-conscious (dynamic imports, no WebGL, lazy images)
- [x] Accessible structure and focus treatment
- [x] Architecture documented for future teams
