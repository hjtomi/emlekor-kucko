# Implementation Plan - Gallery Design & UX Enhancements

This plan details technical improvements to elevate the **Gallery** component aesthetics, mobile interaction, animation quality, and Lightbox modal experience (excluding category badges on cards).

---

## Proposed Improvements

### 1. Mobile Collapsed State Cues
- **Bottom Gradient Fade Overlay**: Add a smooth gradient overlay (`bg-gradient-to-t from-blush-50/90 via-blush-50/40 to-transparent pointer-events-none`) above the "Több mutatása" button when collapsed on mobile (< 640px) to indicate hidden content below.
- **Dynamic Item Count**: Display remaining item count on the mobile toggle button (e.g. `Több mutatása (+${items.length - 3})`).

### 2. Gallery Grid Card Enhancements
- **Skeleton Loading State**: Add a subtle shimmer backdrop (`animate-pulse bg-blush-100/60`) behind images while loading.
- **Glassmorphism Detail Overlay**: Enhance the image hover expand button with a frosted glass backdrop (`backdrop-blur-md bg-white/70 shadow-soft`).

### 3. Lightbox Modal Polish
- **Keyboard & Prev/Next Navigation**: Add `ArrowLeft` / `ArrowRight` arrow key navigation and `Escape` key shortcuts, plus on-screen Prev/Next arrow buttons in [Gallery.tsx](file:///d:/Coding/emlekor-kucko/src/components/Gallery.tsx).
- **Position Counter**: Render an item position badge (`${currentIndex + 1} / ${items.length}`).
- **Body Scroll Lock**: Toggle `document.body.style.overflow = 'hidden'` while Lightbox is open to prevent background scrolling.

### 4. Animation & Micro-Interactions
- **Staggered Entrance & Smooth Height**: Apply Framer Motion staggered children variants for card reveals and smooth height expansion.

---

## Implementation & Tracking Checklist

- [ ] **Phase 1: Mobile Collapsed Cues & Dynamic Button Count**
  - [ ] Add bottom gradient fade overlay on mobile when `!isExpanded` and `items.length > 3`.
  - [ ] Update mobile button text to include remaining item count (`+N`).

- [ ] **Phase 2: Card Glassmorphism & Image Skeleton Loading**
  - [ ] Add loading skeleton background for images.
  - [ ] Upgrade hover zoom icon button with glassmorphism styling (`backdrop-blur-md bg-white/70`).

- [ ] **Phase 3: Lightbox Controls & Body Scroll Lock**
  - [ ] Implement `ArrowLeft` and `ArrowRight` keyboard navigation.
  - [ ] Render on-screen Prev/Next buttons and position counter badge (`X / Y`).
  - [ ] Implement body scroll lock on Lightbox open/close.

- [ ] **Phase 4: Staggered Animations & Transition Polish**
  - [ ] Add staggered reveal animation variants for grid items.
  - [ ] Verify smooth layout animations when toggling expand/collapse.

---

## Verification Plan

### Manual Verification
1. Mobile View (< 640px):
   - Verify bottom gradient fade overlay displays over collapsed bottom edge.
   - Verify toggle button reads `Több mutatása (+N)` and expands smoothly on click.
2. Lightbox Modal:
   - Test navigating forward/backward with keyboard arrows (`←` / `→`) and on-screen Prev/Next buttons.
   - Verify page scrolling behind the modal is locked while open.
