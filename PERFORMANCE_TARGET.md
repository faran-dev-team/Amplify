# PERFORMANCE_TARGET.md

**Product bar:** Apple / Stripe / Linear / Vercel / OpenAI-level smoothness — not “green Lighthouse only.”  
**Source baseline:** Mobile Lighthouse Performance **67**, LCP **4.5s**, scroll hitching on mid devices.

---

## North-Star Experience Targets

| Experience | Target | How we know |
|------------|--------|-------------|
| Scroll | Locked **60 FPS** feel (no stuck frames) | Performance panel + real device |
| Hero atmosphere | Premium particles retained | Design QA |
| Interactions | No delayed taps/hovers | INP field/lab |
| Load | Brand visible fast without flash of emptiness | FCP/LCP + filmstrip |

---

## Lighthouse Mobile Targets

| Metric | Current | Target | Stretch |
|--------|---------|--------|---------|
| Performance | 67 | **95–100** | 98+ |
| FCP | 1.4s | **&lt; 1.2s** | &lt; 1.0s |
| LCP | 4.5s | **&lt; 2.2s** | &lt; 1.8s |
| CLS | 0.011 | **&lt; 0.05** | &lt; 0.02 (already met) |
| TBT | 0ms | **&lt; 50ms** | &lt; 30ms |
| Speed Index | 2.9s | **&lt; 2.0s** | &lt; 1.6s |
| Accessibility | 97 | **≥ 97** | 100 |
| Best Practices | 100 | **100** | 100 |
| SEO | 100 | **100** | 100 |

---

## Runtime / Interaction Targets

| Metric | Target |
|--------|--------|
| INP | **&lt; 150ms** |
| Scrolling FPS (hero → mid page) | **60 FPS** sustained; no multi-frame stalls |
| Animation stutter | None visible at arm’s length on mid Android |
| Tab background | **0** WebGL frames while `document.hidden` |
| `prefers-reduced-motion` | No continuous particle/headline loops |

---

## Technical Budgets (enforcement aids)

| Budget | Limit |
|--------|-------|
| LCP image bytes (decoded transfer) | **&lt; 40KB** for logo |
| Above-fold JS (gzipped, critical path) | Trend down each phase; avoid shipping all sections eagerly |
| Active particles (mobile) | **≤ 8,000** |
| Active particles (desktop) | **≤ 20,000** |
| CSS `filter: blur` on live WebGL | **Forbidden** |
| Framer animated `filter` | **Forbidden** in production paths |
| Window scroll → React `setState` | **Only on threshold crossings** |
| Concurrent page rAF loops when idle mid-scroll | **≤ 1** (prefer 0 + CSS) |

---

## Definition of Done (Performance Program)

All must be true:

1. Mobile Lighthouse Performance **≥ 95** (median of 3).
2. LCP **&lt; 2.2s** with LCP element = optimized logo or hero text (not a megabyte PNG).
3. Real-device scroll through first three sections feels continuous (stakeholder sign-off).
4. Particle system still present and on-brand.
5. No regression: Accessibility ≥ 97, BP/SEO = 100.
6. Audit issues **ISSUE-01, 02, 03, 04, 06** closed or explicitly waived with data.

---

## Tracking

| Checkpoint | When |
|------------|------|
| Baseline | This audit |
| After Phase 1 PR | Re-Lighthouse + scroll trace |
| After Phase 3 | FPS sign-off |
| After Phase 5 | Bundle / unused JS check |
| Final | All DoD items |

Record each checkpoint against this file’s tables.

---

## Non-Negotiables

- Do not “win” Lighthouse by deleting the signature atmosphere.
- Do not introduce layout shift chasing fonts (keep CLS &lt; 0.05).
- Do not add uncapped particle counts again.
- Prefer GPU `transform`/`opacity` for UI motion; keep simulation cost on a budgeted path.

---

*Targets align with `OPTIMIZATION_ROADMAP.md`. Implement only after audit review.*
