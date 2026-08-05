# Brand Migration Report — Amplify → Scale 12x

**Date:** August 3, 2026  
**Scope:** Complete brand identity migration only  
**Standard:** Premium global AI-native growth studio

---

## 1. Files Modified

### Application & SEO
| File | Change |
|------|--------|
| `frontend/app/layout.tsx` | Title, description, Open Graph, Twitter Card, icons, manifest, JSON-LD Organization schema |
| `frontend/app/favicon.ico` | Regenerated from Scale 12x master logo |
| `frontend/package.json` | Package name → `scale-12x` |
| `frontend/README.md` | Brand overview rewritten for Scale 12x |

### Components (content & branding only)
| File | Change |
|------|--------|
| `frontend/components/ui/woven-light-hero.tsx` | Headlines, CTAs, supporting line, global presence cities |
| `frontend/components/ui/amplify-nav.tsx` | Logo, aria labels, CTAs, mobile brand lockup |
| `frontend/components/ui/closing-chapter.tsx` | Footer hierarchy, logo, email, copyright, manifesto, CTAs |
| `frontend/components/ui/trust-ecosystem.tsx` | Hub label, logo asset, section positioning copy |
| `frontend/components/ui/transformation-archive.tsx` | Brand reference in featured transformation |
| `frontend/components/ui/voices-behind-growth.tsx` | About section + all “Why Amplify” → “Why Scale 12x” |
| `frontend/components/ui/conversation-before-begin.tsx` | FAQ brand references + closing CTA |

### Brand Assets (new / replaced)
| Asset | Purpose |
|-------|---------|
| `frontend/public/logo.png` | Primary white-on-transparent lockup (dark UI) |
| `frontend/public/logo-mark.png` / `.webp` | Navbar / mobile mark |
| `frontend/public/logo-dark.png` | Black-on-transparent (light contexts) |
| `frontend/public/logo-master.png` | Archived master from uploaded artwork |
| `frontend/public/favicon.ico` | Multi-size favicon |
| `frontend/public/favicon-16x16.png` | Favicon 16 |
| `frontend/public/favicon-32x32.png` | Favicon 32 |
| `frontend/public/apple-touch-icon.png` | Apple touch icon |
| `frontend/public/icon-192.png` / `icon-512.png` | PWA / app icons |
| `frontend/public/og-image.png` | Open Graph share image |
| `frontend/public/site.webmanifest` | Web app manifest |

---

## 2. Brand References Replaced

| Location | Before | After |
|----------|--------|-------|
| Browser / SEO title | Amplify IT & Media \| AI-Native Growth Studio | Scale 12x \| AI-Native Growth Studio |
| Meta description | Growth, amplified… Amplify IT & Media… | Scale Faster. Scale Smarter. Scale with AI… |
| Navbar logo alt / aria | Amplify | Scale 12x |
| Nav desktop CTA | Let's grow. | Let's Scale |
| Mobile menu CTA | Let's grow. | Start Scaling |
| Mobile brand signature | Amplify / Growth, amplified. | Scale 12x logo + Scale Faster. Scale Smarter. |
| Hero rotating headlines | Growth, Amplified. / etc. | Scale Faster. / Scale 12x. / Scale with AI. / etc. |
| Hero CTAs | Let's grow. / Ready when you are. | Start Scaling / Book Your Growth Strategy |
| Trust hub node | Amplify | Scale 12x |
| Voices chapter labels | Why Amplify | Why Scale 12x |
| Voices body / reflections | Amplify… | Scale 12x… |
| About subcopy | ICP Amplify serves… | companies Scale 12x serves… |
| FAQ questions / answers | Amplify | Scale 12x |
| FAQ verb wordplay | We amplify them. | We multiply their impact. |
| Transformation copy | outcomes Amplify stands behind | outcomes Scale 12x stands behind |
| Conversation invite | Let's grow. | Let's Scale. |
| Footer aria-label | Contact Amplify IT & Media | Contact Scale 12x |
| Footer eyebrow / H2 | Growth, amplified. / Let's grow. | Ready to Scale? / Let's Scale. |
| Footer manifesto | …Amplify delivers… | …Scale 12x delivers… |
| Email (visible + mailto) | hello@amplifyitmedia.com | hello@scale12x.com |
| Copyright | © Amplify IT & Media. Growth, amplified. | © Scale 12x. Scale Faster. Scale Smarter. |
| Manifest name | — | Scale 12x |
| JSON-LD Organization | — | Scale 12x |

**Intentionally unchanged (not visible branding):**
- Internal React identifiers: `AmplifyHome`, `AmplifyNav`, file names `amplify-*.tsx`
- DOM ids such as `amplify-mobile-menu` (architecture / a11y wiring)
- CSS custom properties `--amplify-midnight`, `--amplify-purple` (token names, not UI copy)
- Historical audit markdown (`CONTENT_MIGRATION_REPORT.md`, `PERFORMANCE_AUDIT.md`)

---

## 3. Logo Integration Summary

- Master artwork used exactly as provided (typography, proportions, composition preserved).
- Converted to white-on-transparent for the dark site without redesigning letterforms.
- Navbar: responsive height (`72px` → `88px`), auto width, left-aligned, crisp WebP.
- Mobile menu: logo as visual anchor above studio descriptor.
- Footer: larger elegant lockup with studio line and manifesto stack beneath.
- Trust ecosystem hub card: `logo-mark.webp`.
- Favicons / apple / PWA icons generated from the same master.
- No stretch, no filters-as-redesign, no decorative effects beyond existing drop-shadow language already used on site.

---

## 4. Hero Improvements

- Positioning eyebrow retained: **AI-Native Growth Studio**
- Rotating headlines reframed around Scale Faster / Smarter / with AI / 12x
- Supporting line: one partner, every channel, enterprise trust, founder-led execution
- CTAs: **Start Scaling** / **Book Your Growth Strategy**
- Layout, WebGL atmosphere, motion timing, and interaction model unchanged

---

## 5. Global Presence Implementation

Premium credibility row inside the Hero (not plain dumped text):

- Label: **Operating Across**
- Meta: **Estd. 2026**
- Cities with thin vertical separators:  
  **London · New York · Dubai · San Francisco · Riyadh**
- Uppercase micro-typography, restrained opacity, editorial spacing
- Soft fade-in only (existing Framer Motion patterns)
- Mirrored in footer contact meta line for consistency

---

## 6. SEO Changes

| Surface | Update |
|---------|--------|
| `metadata.title` | Scale 12x \| AI-Native Growth Studio |
| `metadata.description` | AI-native / exponential scale positioning + cities |
| Open Graph | title, description, siteName, og-image.png |
| Twitter Card | summary_large_image + same messaging |
| Icons | favicon.ico, 16, 32, apple-touch |
| Manifest | `/site.webmanifest` |
| JSON-LD | Organization schema with foundingDate 2026, cities, email, slogan |
| Canonical / metadataBase | `https://scale12x.com` |

---

## 7. Footer Updates

- Headline system: Ready to Scale? / Let's Scale.
- CTA: Start Scaling (button styling unchanged)
- Manifesto repositioned for Scale 12x / AI-native / exponential growth
- Email: hello@scale12x.com
- Location line: global city lockup
- Large Scale 12x logo
- Descriptor: AI-Native Growth Studio
- Stack line: Growth. Strategy. Technology. Execution. / One Partner. Every Channel.
- Copyright: © Scale 12x. Scale Faster. Scale Smarter.

---

## 8. Metadata Updates

- Application name, authors, creator, publisher → Scale 12x
- Keywords aligned to AI-native growth studio
- Theme color / color scheme retained (`#030208`)
- Robots index/follow retained
- Structured data areaServed cities match Hero presence

---

## 9. Confirmation — Scope Guardrails

| Constraint | Status |
|------------|--------|
| No layout / component structure changes | Confirmed — branding & copy only within existing sections |
| No animation / Framer Motion / GSAP / Three.js changes | Confirmed — existing motion APIs and timings reused |
| No smooth-scroll / performance optimizations altered | Confirmed |
| No functionality / state / scroll logic changes | Confirmed |
| No React / Next.js architecture refactor | Confirmed — internal `Amplify*` component names retained |
| No CSS architecture rewrite | Confirmed — utility classes only where needed for logo aspect ratio / type |
| Particle system / background effects untouched | Confirmed |

### Notes
- No dedicated loading-screen component existed in the codebase; logo was applied to all existing brand surfaces (nav, mobile, footer, trust hub, favicons).
- Internal file/component names remain `amplify-*` to avoid architecture churn; all **visible** Amplify branding has been removed.

---

## Positioning Outcome

The site now reads as **Scale 12x** — an elite AI-native Growth Studio:

**Scale Faster. Scale Smarter. Scale with AI. Scale 12x.**

Globally positioned across London, New York, Dubai, San Francisco, and Riyadh — premium, editorial, enterprise-ready.
