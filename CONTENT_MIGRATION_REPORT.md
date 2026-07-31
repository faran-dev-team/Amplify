# Content Migration Report

**Project:** Amplify IT & Media website  
**Source of truth:** Complete Brand Strategy, Identity & Service Architecture — Version 2.0 · July 27, 2026  
**Migration date:** July 31, 2026  
**Scope:** Text content only

---

## Confirmation

**ZERO visual, structural, animation, styling, or functionality changes were made.**

Modified files contain **string / text-node updates only** (headlines, paragraphs, CTAs, metadata, labels, FAQ answers, aria-labels that carry messaging). No layout, Tailwind classes, motion timing, React logic, hooks, imports, images, icons, Three.js, Framer Motion, GSAP, or component structure was altered.

---

## Sections Updated

| Website section | Component | Brand Strategy source(s) |
|---|---|---|
| SEO metadata | `app/layout.tsx` | §1.1, §1.2, §1.3 |
| Hero | `woven-light-hero.tsx` | §1.1, §1.3, §3.2, §3.3 |
| Navigation CTAs | `amplify-nav.tsx` | §1.3, §3.3 |
| Outcomes / metrics | `signal-outcomes.tsx` | §1.5 Strategic Moat |
| Services / capabilities | `growth-capabilities.tsx` | §1.4 Thirteen Practices |
| Trust / ICP | `trust-ecosystem.tsx` | §1.6 ICP, §5.1 Channels |
| Case / engagement stories | `transformation-archive.tsx` | §1.4, §1.5, §4.1–4.3 |
| Testimonials (placeholders) | `voices-behind-growth.tsx` | §1.5, §3.2, §3.3, §4.1 |
| FAQ / conversation | `conversation-before-begin.tsx` | §1.2, §1.5, §3.2, §4.1–4.2, §5.2 |
| Closing / footer | `closing-chapter.tsx` | §1.1–1.2, §1.5, §3.3–3.4 |

---

## 1. SEO Metadata

**File:** `app/layout.tsx`  
**Source:** §1.1 One-line promise, §1.2 Full positioning, §1.3 Headline positioning

| Field | Before | After |
|---|---|---|
| Title | Amplify IT & Media | Amplify IT & Media \| AI-Native Growth Studio |
| Description | AI Native Growth Studio. Intelligent growth systems for ambitious businesses. | Growth, amplified. One partner. Every channel. Built on AI. The AI-native growth studio for US businesses tired of juggling five agencies — ads, content, SEO, brand, websites, cloud, generative AI, cybersecurity, and digital transformation. |

---

## 2. Hero

**File:** `woven-light-hero.tsx`  
**Source:** §1.1, §1.3, §3.2, §3.3

| Element | Before | After |
|---|---|---|
| Eyebrow | AI Native Growth Studio | AI-Native Growth Studio |
| Rotating headlines | Scale, Amplified. / Growth, Engineered. / Built to Compound. / Intelligence at Work. / Systems That Scale. / Precision at Scale. / Make Scale Inevitable. / The Growth OS. | Growth, Amplified. / One partner. Every channel. / Your marketing, ten times faster. / Built on AI. / We're AI-native. / Founder-led. Premium. / (repeats of official framings) |
| Primary CTA | Start Your Growth Strategy | Let's grow. |
| Secondary CTA | View Our Work | Ready when you are. |

---

## 3. Navigation

**File:** `amplify-nav.tsx`  
**Source:** §1.3, §3.3

| Element | Before | After |
|---|---|---|
| Desktop CTA | Start Your Growth Strategy | Let's grow. |
| Mobile CTA | Start Your Growth Strategy | Let's grow. |
| Mobile tagline | AI Native Growth Studio | AI-Native Growth Studio |
| Nav link labels | Services, Work, Practices, About, Insights, Contact | Unchanged (structural labels; no rename required by brand doc) |

---

## 4. Outcomes (Signal Metrics)

**File:** `signal-outcomes.tsx`  
**Source:** §1.5 Strategic Moat (verified track record only)

| Slot | Before | After |
|---|---|---|
| Metric 1 | 700K+ · Revenue Delivered · generic growth copy | $700K+ · Delivered · Verifiable track record across growth engagements. |
| Metric 2 | 2.4× · Growth Multiplier · invented | $150K+ · US Government Project · Enterprise-quality delivery on an ongoing federal engagement. |
| Metric 3 | 98% · Client Retention · invented | $100K+ · Verified Upwork Earnings · Proof we ship real work — not decks. |

Invented statistics (2.4×, 98%) were removed and replaced with moat-verified figures only.

---

## 5. Services / Capabilities

**File:** `growth-capabilities.tsx`  
**Source:** §1.4 Delivery — 13 Practices

**Layout note:** Site has **5 capability cards** (locked). All 13 practices cannot appear as separate cards without UI changes. Five official practice titles were used as card anchors; remaining practices are named inside descriptions.

| Element | Before | After |
|---|---|---|
| Eyebrow | Operating System | Thirteen Practices |
| Headline | The Growth Engine | One partner. Every channel. |
| Subcopy | Five intelligent modules… | We sell sharp positioning. We deliver broad capability — AI-native across every practice. |
| Card 1 | AI & Automation | **Generative AI** — custom AI apps, chatbots, production workflows |
| Card 2 | Custom Software Development | **Digital Transformation** — end-to-end modernization; strategy & automation |
| Card 3 | Cloud & Data Infrastructure | **Cloud & Data** — infrastructure, pipelines, warehousing + cybersecurity essentials |
| Card 4 | Digital Growth Systems | **Paid Media** — Google/Meta/LinkedIn/GPT-native + content, search, analytics, MarTech |
| Card 5 | Brand & Digital Experience | **Brand Strategy** — positioning, naming, brand systems + creative studio & web |

---

## 6. Trust / Who We Serve

**File:** `trust-ecosystem.tsx`  
**Source:** §1.6 ICP, §5.1 Acquisition channels

| Element | Before | After |
|---|---|---|
| Eyebrow | The Network | Who We Serve |
| Headline | Growing With Industry Leaders | Built for ambitious US businesses. |
| Body | Generic partnership network copy | US-based B2B $2M–$50M revenue, $5K–$25K/month marketing budgets — tired of juggling five agencies |
| Group label 1 | Global Platforms | Acquisition Channels |
| Group label 2 | Industries Served | Primary ICP |
| Industry labels | Technology, Finance, Construction, Manufacturing | Tech Startups, Property Management, Consultancies, Law Firms (ICP-aligned) |
| Kept ICP-aligned | Healthcare, SaaS, E-Commerce, Professional Services, Home Services | Unchanged |
| Platforms | Fiverr, LinkedIn, Upwork, Clutch | Labels unchanged (LinkedIn/Upwork appear in §5.1; Fiverr/Clutch not claimed as Amplify credentials) |

---

## 7. Transformation / Engagement Stories

**File:** `transformation-archive.tsx`  
**Source:** §1.4, §1.5, §4.1–4.3

Brand Strategy has **no published case-study results**. Invented ROAS/% metrics were removed. Stories were rewritten as ICP + retainer-model illustrations; metrics now use documented pricing/protection facts only.

| Element | Before | After |
|---|---|---|
| Eyebrow | Classified Growth Record | Strategic Moat |
| Headline | Transformation Archive | How growth actually happens. |
| Subcopy | Evidence of engineered growth… | AI-native execution. Founder-led premium. Transparent pricing. Outcomes we stand behind with our own money. |
| Archive subhead | Further chapters of measurable change | Launch. Scale. Dominate. |
| Metrics label | Measured Impact | Engagement Profile |
| Featured + archive stories | Invented client outcomes (312%, 4.7×, etc.) | ICP scenarios mapped to Launch / Scale / Dominate / one-off project pricing from §4 |

---

## 8. Testimonials (Placeholder Text)

**File:** `voices-behind-growth.tsx`  
**Source:** §1.5, §3.2, §3.3, §4.1

| Element | Before | After |
|---|---|---|
| Eyebrow | Executive Journal | Founder-Led Premium |
| Subcopy | Excerpts from conversations… | Placeholder perspectives from the ICP Amplify serves… |
| Voice copy | Generic premium agency testimonials | Rewritten around agency sprawl, AI-native, founder-led (Measm + Zainab), Launch/Scale/Dominate, Foreman |
| Closing line | Every transformation begins with a conversation. | Ready when you are. |
| Names / portraits | Unchanged (placeholder structure) | Unchanged |

**Gap:** Brand Strategy does not include real client testimonials. Names remain placeholders; messaging aligned to brand voice only.

---

## 9. FAQ / Conversation

**File:** `conversation-before-begin.tsx`  
**Source:** §1.2, §1.5, §3.2, §4.1–4.2, §5.2

| Element | Before | After |
|---|---|---|
| Eyebrow | Before We Build Together | Launch · Scale · Dominate |
| Subcopy | The questions founders ask… | Pricing, process, and partnership — answered straight. |
| Invite | Still curious? / Let's talk | The next move is yours. / Let's grow. |
| Answers | Generic partnership copy | Positioning, moat stats, AI-native, retainers, 90-day guarantee, sales motion (30→48→45→kickoff), $60K–$240K first-year |

This section also carries **pricing content** (no dedicated pricing UI exists on the locked site).

---

## 10. Closing / Footer

**File:** `closing-chapter.tsx`  
**Source:** §1.1–1.2, §1.5, §3.3–3.4

| Element | Before | After |
|---|---|---|
| Eyebrow | The Beginning | Growth, amplified. |
| Headline | Let's Build What's Next. | Let's grow. |
| Body | Every transformation begins with one conversation… | One partner. Every channel. Built on AI. The next move is yours. |
| CTA | Start the Conversation | Ready when you are. |
| Manifesto | Meaningful growth / technology / design… | Tired of juggling five agencies — speed of a startup, depth of an enterprise team |
| Email | hello@amplify.studio | hello@amplifyitmedia.com |
| Location line | Remote · Global | Global talent · US pricing |
| Copyright | © Amplify. All rights reserved. | © Amplify IT & Media. Growth, amplified. |

---

## Content Gaps

Items in the Brand Strategy that could **not** be fully represented without inventing UI or inventing facts:

1. **Dedicated Pricing section (Launch / Scale / Dominate cards)** — No pricing section exists in the locked layout. Pricing was migrated into FAQ answers + engagement-story metrics.
2. **All 13 practices as individual cards** — Site has 5 capability modules. Five official practice titles used; remaining practices referenced in descriptions only.
3. **Content Marketing, Search, Creative Studio, Web Development, MarTech, Analytics, Cybersecurity, Strategy & Automation** — Not standalone cards; covered in descriptions / FAQ.
4. **Real testimonials / case studies** — Companion “Complete Website Copy v1.0” and published case studies not provided. Placeholders retained; invented performance stats removed.
5. **One-off project price table** — Partially reflected in professional-services engagement story metrics; no full pricing table UI.
6. **Mission / Vision as named sections** — Document does not define separate Mission/Vision headlines; positioning (§1.1–1.3) used instead.
7. **Brand Story as a dedicated About narrative** — No standalone About copy block; founder-led + moat messaging distributed across Voices, FAQ, and Closing.
8. **OG-specific fields** — `metadata` title/description updated; no separate `openGraph` object existed to edit without adding implementation.
9. **Fiverr / Clutch** — Platform nodes remain visually; not claimed as Amplify proof points in brand copy.
10. **Revenue mix / MRR targets / hire plan / trademark sprint** — Internal GTM ops; intentionally not placed on the marketing site.

---

## Files Touched (Text Only)

- `frontend/app/layout.tsx`
- `frontend/components/ui/woven-light-hero.tsx`
- `frontend/components/ui/amplify-nav.tsx`
- `frontend/components/ui/signal-outcomes.tsx`
- `frontend/components/ui/growth-capabilities.tsx`
- `frontend/components/ui/trust-ecosystem.tsx`
- `frontend/components/ui/transformation-archive.tsx`
- `frontend/components/ui/voices-behind-growth.tsx`
- `frontend/components/ui/conversation-before-begin.tsx`
- `frontend/components/ui/closing-chapter.tsx`
- `frontend/CONTENT_MIGRATION_REPORT.md` (this report)

---

## Final Validation Checklist

- [x] Only text strings / messaging aria-labels changed  
- [x] No Tailwind / CSS / spacing / color / typography class edits  
- [x] No Framer Motion / Three.js / animation timing changes  
- [x] No component structure, hooks, imports, or routing changes  
- [x] No invented services, pricing, or statistics  
- [x] Typecheck (`tsc --noEmit`) passed  

**Only the words changed.**
