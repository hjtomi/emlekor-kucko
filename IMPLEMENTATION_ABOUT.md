# Implementation Plan — About (Rólam) Two-Beat Split

Restructure the About section so a long personal bio no longer sits beside a single portrait. Split into two visual beats: a short face-to-face intro, then a full-width story.

**Scope:** frontend only. File: `src/components/About.tsx` (no nav/App changes expected — `#rolam` stays one section).

---

## Problem

Current layout is a 2-column grid: portrait + entire bio + value cards on the text side.

That layout worked for ~3 short paragraphs. The new bio is essay-length, so the portrait floats mid-column while text and cards dominate the right side. Hierarchy and balance break, especially on desktop.

---

## Goal

1. **Beat A — Intro:** warm “meet Szabina” moment (photo + short who-I-am copy + value cards).
2. **Beat B — Story:** the longer origin story as a readable letter/editorial block.
3. Keep one `#rolam` section, existing motion language, floral accents, and brand typography.
4. Mobile: stacked, clear, no cramped sidebars.

---

## Content Split

### Beat A — Intro (beside portrait)

Keep only:

- `Sziasztok!`
- Who she is: mom of two, Emlékőr kuckó founder; hobbies (family, friends, concerts, reading, motorcycling).

Do **not** start the origin story here.

### Beat B — Story (full width below)

Structure with clear subheadings (serif, section-consistent):

| Subheading | Content |
|---|---|
| *Hogy is született meg az Emlékőr kuckó?* | Becoming a mom the second time; wanting to keep that hard-but-wonderful early moment |
| *Az epoxy gyanta* (or similar) | Discovering keepsake jewelry / epoxy resin |
| *Az anyatej tartósítása* | Experimentation; liquid breast milk in resin as her distinctive method |
| *Hajból rajzolás* | Exploring style; co-creating unique pieces from client stories |
| *(no subheading or short lead)* | Treating each DNA/sample package as her own; care and craftsmanship |
| *(closing)* | Future unknown; keeps going as long as the drive lasts |

**Closing pull-quote** (centered, italic serif — not a normal body paragraph):

> „Az Emlékőr kuckó értetek van, hogy megörökítse életetek fontos pillanatait.”

Copy stays as provided; only structure/paragraph breaks and optional subheadings change. Confirm “dns csomaggal” wording with Tamás before polish (keep as-is unless asked to fix).

---

## Layout

### Shared section chrome (unchanged role)

- Section `id="rolam"`, white background, floral corners, vertical padding.
- Centered header: eyebrow `Rólam` → H2 `Simon Szabina` → italic tagline → `PetalDivider`.

### Beat A — Intro row

```
[ Portrait ]  |  Short intro copy
              |  (optional: tagline echo only if needed)
              |
              |  Value cards (3) — under intro text on desktop
                 OR full-width under the whole intro row
```

**Portrait:** keep existing frame (gradient rings, 4/5 crop, founder pill). No sticky behavior in v1.

**Copy column:** short only — balanced height with the image on `lg`.

**Value cards (`VALUES`):** stay under Beat A only, so they support “who I am / how I work” and do not compete with the essay.

**Recommended card placement:** full-width row under the intro grid (3 columns on `sm+`), not squeezed into the text column. That keeps the photo/text pair clean and gives cards room.

### Beat B — Story block

- Below Beat A with clear vertical separation (`mt-16`–`mt-20` or a light `PetalDivider`).
- Narrow reading measure: centered column, ~`max-w-2xl` or ~`max-w-3xl` (aim ~65ch).
- Body: slightly calmer than hero — `text-base` / `sm:text-lg`, relaxed leading, generous paragraph spacing.
- Subheadings: `font-serif`, ink color, modest size (not competing with section H2).
- Pull-quote: extra top margin, italic serif, maybe soft blush tint or subtle left/center emphasis — no card chrome.

### Mobile

1. Section header  
2. Portrait  
3. Short intro  
4. Value cards (stack or 1-col → 3-col as today)  
5. Story with subheadings  
6. Pull-quote  

---

## Motion

Reuse existing Framer Motion patterns:

- Beat A: image from left, intro copy from right (current style).
- Value cards: staggered fade-up (current).
- Beat B: single fade-up on enter viewport (`once: true`), no per-paragraph animation spam.

---

## Files & Scope

| Item | Action |
|---|---|
| `src/components/About.tsx` | Restructure markup; split content; restyle story + quote |
| `Header.tsx` / `Footer.tsx` | No change (`#rolam` unchanged) |
| New components / data files | Not required for v1 (all content can stay in `About.tsx`) |
| Images | Keep current portrait URL unless a real photo is provided later |

Optional later (out of scope for this plan): second process photo mid-story; sticky portrait; “read more” collapse.

---

## Implementation Steps

1. **Split content constants** (or inline blocks) into `INTRO_PARAS` and `STORY_SECTIONS` (`{ heading?, paragraphs[] }`) plus `CLOSING_QUOTE` for easier editing.
2. **Rebuild Beat A:** keep 2-col grid; intro copy only; move value cards to a full-width row under that grid.
3. **Add Beat B:** full-width story column with subheadings, body paragraphs, closing pull-quote.
4. **Tune spacing:** section header → Beat A → cards → Beat B → quote so desktop and mobile don’t feel either cramped or sparse.
5. **Visual check:** desktop (balanced intro heights), tablet, mobile (portrait first, readable story).
6. **A11y:** one H2 for the section; story titles as `h3`; quote as styled paragraph (or `blockquote` if it fits semantics).

---

## Acceptance Criteria

- [x] Intro + portrait feel balanced on desktop (no tall empty gap next to a short image).
- [x] Long bio is not in the side column next to the portrait.
- [x] Story is easy to scan via subheadings.
- [x] Closing line reads as a pull-quote, distinct from body copy.
- [x] Value cards sit with the intro beat, not buried under the essay.
- [x] `#rolam` still works from header/footer.
- [x] Mobile stack order is logical and readable.
- [x] Motion and floral accents remain consistent with the rest of the site.

---

## Open Decisions (confirm before / during build)

1. **Value card placement:** full-width under intro grid (recommended) vs. still in the text column.
2. **Story subheading wording:** use the table above, or softer variants (e.g. keep her exact “Hogy is született meg az Emlékőr kuckó?!” as the first H3).
3. **“dns csomaggal”:** keep literal, or correct to “DNS” / clearer wording if Tamás prefers.
4. **Second image:** none for v1 unless a real workshop/process photo is ready.

---

## Out of Scope

- Rewriting/shortening the bio beyond structural splits
- New About page or separate route
- Sticky scroll portrait
- Expand/collapse “read more”
- Replacing the Pexels placeholder with a real portrait (unless provided in the same pass)
