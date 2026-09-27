# NØIR — Issue 001: The New Era

Editorial fashion e-commerce experience. Next.js App Router, GSAP + ScrollTrigger, Lenis.

## Status: Phases 1–7 complete

**Foundation**
- Next.js + TypeScript project, design tokens (`styles/tokens.css`), global
  base styles, Fraunces/Inter via `next/font`
- Structured product + look data (`data/products.ts`)
- `useReducedMotion` hook gating every scroll-driven animation

**Navigation**
- Minimal fixed header (`components/layout/Header.tsx`) — wordmark, bag
  count, menu trigger — using `mix-blend-mode: difference` so it stays
  legible over any scene
- Fullscreen navigation overlay with a clip-path reveal and staggered
  link entrance (`components/layout/NavigationOverlay.tsx`)

**The homepage sequence** (`app/page.tsx`), in order:
1. `CoverScene` — calm opening, image scale + typography split on scroll
2. `FabricReveal` — the signature pinned, scrubbed FABRIC → GARMENT →
   PERSON sequence
3. `PieceScene` — hero jacket with subtle parallax and a `View piece` CTA
4. `EditorialStory` — asymmetric "Wear / your / identity." composition,
   each word animating on its own axis
5. `LookScene` — full-height look photograph with a shoppable line-item
   panel
6. `CollectionIntro` — the transition from editorial into shopping
7. `CollectionGrid` — the functional editorial product grid
8. `Footer`

**Shop + cart**
- `/product/[slug]` — gallery, size selector, add-to-bag, accordion
  details (material / fit / care / shipping)
- `/look/[slug]` — shop a complete look
- Session cart via `lib/CartContext.tsx` + slide-in `CartDrawer`
  (quantity controls, remove, subtotal) — front-end prototype, no real
  checkout
- `/about`, `/shipping`, `/returns` — short editorial-voice info pages

## Getting started

```bash
npm install
npm run dev
```

## Not yet done

- Custom cursor (View / Shop / Open labels on hover) — optional per the
  brief, not built yet
- Mobile-specific lighter variants of the pinned fabric-reveal scene
  (currently the same scrub timeline runs on all breakpoints)
- Filtering/sorting on the shop grid
- Real checkout flow (intentionally out of scope — front-end prototype)
- Custom @font-face swap if you want real Neue-Haas-style / Canela-style
  licensed fonts instead of the Inter/Fraunces stand-ins

## Phases

1. Project architecture — done
2. Navigation + global visual foundation — done
3. Homepage static structure — done
4. GSAP scroll choreography — done
5. Collection + shop — done
6. Dynamic product pages — done
7. Cart — done
8. Performance pass — pending (real photography will need real testing)
9. Responsive polish beyond the current breakpoint set — pending
10. Final visual polish — pending
