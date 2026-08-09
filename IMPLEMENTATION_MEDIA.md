# Implementation Plan — Media / Sajtó Section

Add a homepage section for press coverage about Emlékőr kuckó. The company currently has **one** published article, so v1 must look intentional as a featured mention — not a sparse archive or empty card grid.

**Scope:** frontend only. No router, no CMS, no in-site article pages.

---

## Problem

The site has trust signals (testimonials, stats) but no place for third-party coverage. A media section builds credibility; with only one article, a multi-item list/grid would look incomplete.

---

## Goal

1. Add a **Sajtó** section that showcases the one existing article as a single editorial feature.
2. Link out to the original publication (external URL).
3. Match existing section rhythm (eyebrow → Cormorant H2 → subline → `PetalDivider` → content + Framer Motion).
4. Structure data so a second/third article can later become a compact list without redesigning the whole page.
5. Keep Hungarian-only copy and the current cream/blush/ink visual language.

---

## Scope & Page Order

Target section order after implementation:

```
Hero → About → Gallery → Pricing → Trust → Media → FAQ → Contact → Footer
```

| Change | Files affected (expected) |
|---|---|
| Press data + types | `src/data/content.ts` |
| New section UI | New `src/components/Media.tsx` (or `Press.tsx`) |
| Mount + order | `src/App.tsx` |
| Optional outlet logo | `public/images/press/` |
| Nav links | **Out of scope for v1** (discoverable via scroll, same as FAQ/Trust) |

---

## Content Model

Add a typed array in `content.ts` (even with one item), e.g. `pressItems`:

| Field | Purpose |
|---|---|
| `id` | Stable key |
| `outlet` | Publication name |
| `title` | Article title |
| `date` | Display date (ISO string or formatted HU date) |
| `excerpt` | 1–2 sentence teaser |
| `url` | External article URL |
| `outletLogo` | Optional path under `public/images/press/` |
| `pullQuote` | Optional short line from the article |

**v1 behavior:** if `pressItems.length === 1`, render the featured single-item layout. If length grows to 3+, switch (or extend) to a compact list — design v1 around the single feature first.

Confirm real article metadata (title, outlet, URL, date, excerpt, optional quote/logo) with Tamás before wiring final copy.

---

## Design — Single Featured Mention

Do **not** use a 3-column card grid or empty “coming soon” slots.

### Section chrome

- `id="sajto"` (or `#media` if preferred — confirm label)
- Background: alternate cream vs white so it separates from Trust above and FAQ below (pick the unused neighbor tone)
- Vertical padding: `py-24 sm:py-32`, `max-w-7xl` (or slightly narrower for the feature block)

### Header copy (draft — finalize in HU)

- Eyebrow: `Sajtóban` or `Rólunk írták`
- H2: one line that works for a single piece (not “Cikkeink” / “Média megjelenéseink”)
- Subline: one sentence on why third-party storytelling matters (craft / trust / story)
- `PetalDivider`

### Featured block (the one article)

One composition, roughly:

```
[ Outlet logo / name ]     date

Article title (serif, strong)

Short excerpt

Optional pull-quote (italic serif)

[ Cikk elolvasása → ]  (external link, new tab)
```

**Layout notes:**

- Full-width or centered max ~2/3 — enough presence that one item doesn’t feel thin
- Editorial row/list feel, not a quote-card clone of Trust
- Outlet mark quiet and small; no badge clusters, no article screenshot collage unless rights-cleared crops exist
- CTA is the only required interaction container; avoid decorative card chrome if a calm bordered/soft panel is enough

### Motion

- Header `whileInView` fade/slide (same easing as Trust/FAQ)
- Feature block staggered slightly after header
- Keep motion calm — 2 intentional moments max for this section

---

## Interaction & A11y

- External links: `target="_blank"` + `rel="noopener noreferrer"`
- Visible text for the CTA (not icon-only)
- Semantic structure: `<section>` → header → one `<article>` for the press item
- If pull-quote is used, mark as `<blockquote>`

---

## Out of Scope (v1)

- React Router / dedicated `/sajto` page
- Hosting full article bodies on-site
- CMS or admin UI
- Filters, tags, search, pagination
- Header/Footer nav entry
- Placeholder second/third cards
- SEO-specific article landing pages

---

## Implementation Steps

1. Confirm article metadata + Hungarian section labels (eyebrow, H2, CTA).
2. Add `PressItem` type + `pressItems` (1 entry) in `content.ts`.
3. Add optional outlet logo asset under `public/images/press/` if available.
4. Create `Media.tsx` with single-feature layout + section chrome.
5. Mount in `App.tsx` between Trust and FAQ.
6. Check mobile + desktop spacing against Trust/FAQ neighbors.
7. Smoke-check external link opens correctly.

---

## Acceptance Criteria

- [ ] New `#sajto` (or agreed id) section appears between Trust and FAQ
- [ ] One article reads as a deliberate featured mention (not a lonely grid cell)
- [ ] Title, outlet, date, excerpt, and external CTA are visible
- [ ] CTA opens the original article in a new tab safely
- [ ] Section matches existing typography, color, divider, and motion patterns
- [ ] No empty slots, “hamarosan,” or fake extra articles
- [ ] Data is driven from `content.ts` so more items can be added later
- [ ] Mobile: stacked, readable, no cramped side-by-side meta

---

## Future (when more articles exist)

- Switch from single feature → compact vertical list (outlet + title + date + link)
- Optionally keep the newest item featured, with older items listed below
- Revisit nav link only if press becomes a primary destination
- Consider a dedicated page only if owned long-form or SEO needs appear

---

## Open Decisions

| Topic | Options | Default for v1 |
|---|---|---|
| Section label | `Sajtó` / `Sajtóban` / `Rólunk írták` / `Média` | `Sajtóban` |
| Anchor id | `#sajto` / `#media` | `#sajto` |
| Component name | `Media.tsx` / `Press.tsx` | `Media.tsx` |
| Pull-quote | include if a strong line exists | optional |
| Outlet logo | real logo vs text-only outlet name | text-only until asset ready |
| Nav link | add vs scroll-only | scroll-only |
