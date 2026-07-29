# Implementation Plan - Mobile Gallery "See More" Toggle

This document outlines the design and plan for limiting the visible images in the gallery to **3 items on phone/mobile screens**, hiding the rest until the user clicks a **"See More" ("Több mutatása")** button.

---

## Technical Overview

Currently, [Gallery.tsx](file:///d:/Coding/emlekor-kucko/src/components/Gallery.tsx) renders all filtered gallery items in a responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`). On mobile screens (under `sm:` breakpoint, <640px), if there are more than 3 gallery items, all items are displayed in a long single column.

### Key Requirements
1. On phone/mobile view (`< sm` breakpoint), display only the first **3 items** if total filtered items exceed 3.
2. Provide an interactive **"Több mutatása" ("See More")** / **"Kevesebb mutatása" ("Show Less")** button on mobile view when items exceed 3.
3. On larger screens (`sm:` and up), all filtered items should remain visible (or unaffected by the mobile expanded/collapsed state).
4. Reset or maintain smooth state transitions when category filters are changed.

---

## Proposed Changes

### [Gallery Component](file:///d:/Coding/emlekor-kucko/src/components/Gallery.tsx)

#### State & Logic
- Add state variable `isExpanded` (boolean, default `false`) to track whether the user has clicked "See More".
- Reset `isExpanded` to `false` whenever the category filter (`active`) changes.
- Determine visible items:
  - Mobile mode (`sm:hidden` logic or JavaScript slice condition): Slice `items` to first 3 elements if `!isExpanded` and in mobile context, OR use CSS utility classes (e.g. `sm:block` vs conditional render) to ensure seamless layout transition.
  - Recommended React approach: Render items with index check or responsive visibility so Framer Motion layout animations remain smooth without breaking layout grids. Alternatively, conditionally render/slice items on mobile or toggle hidden state per item based on index (`index >= 3 && !isExpanded ? 'hidden sm:block' : 'block'`). Using CSS class-based display toggle (`hidden sm:block` for index >= 3 when `!isExpanded`) allows Tailwind breakpoints to naturally apply on desktop while respecting the mobile toggle.

#### UI & Styling
- Add a "Több mutatása" / "Kevesebb mutatása" button below the grid, styled consistently with the website design system (gradient button or subtle border button with smooth hover effects and Lucide icon like `ChevronDown` / `ChevronUp`).
- Wrap button in a container that is hidden on `sm:` screens (`sm:hidden`) or only rendered when `items.length > 3`.

---

## Implementation & Tracking Checklist

- [ ] **Phase 1: State & Visibility Logic**
  - [ ] Add `isExpanded` state to [Gallery.tsx](file:///d:/Coding/emlekor-kucko/src/components/Gallery.tsx).
  - [ ] Reset `isExpanded` state when `active` filter changes.
  - [ ] Apply mobile hiding logic (e.g. index-based Tailwind classes `index >= 3 && !isExpanded ? 'hidden sm:block' : ''`).

- [ ] **Phase 2: "See More" Button Component & Integration**
  - [ ] Import `ChevronDown` and `ChevronUp` icons from `lucide-react`.
  - [ ] Render "Több mutatása" / "Kevesebb mutatása" toggle button below gallery grid when `items.length > 3`.
  - [ ] Ensure button is styled with existing design system (pink/blush accents, subtle animations, hidden on `sm:` and up).

- [ ] **Phase 3: Verification & UX Polish**
  - [ ] Verify functionality on phone view (< 640px viewport): check that 3 images are shown initial state.
  - [ ] Verify expanding shows remaining images seamlessly with smooth animation.
  - [ ] Verify collapse action works as expected.
  - [ ] Verify desktop view (>= 640px): ensure all items remain visible regardless of toggle state.
  - [ ] Verify changing category filters correctly resets expanded state.

---

## Verification Plan

### Manual Verification
1. Open dev server and test responsive viewport using browser dev tools (< 640px phone viewport).
2. Check initial gallery load: only 3 cards visible on mobile.
3. Click "Több mutatása": verify remaining gallery cards reveal.
4. Click "Kevesebb mutatása": verify gallery collapses back to 3 items.
5. Switch category tabs: verify collapsed state resets and items match active filter.
6. Switch viewport to tablet/desktop (>= 640px): verify all items show without needing to click the toggle button.
