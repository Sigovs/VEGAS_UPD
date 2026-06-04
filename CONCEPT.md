# Vegas Auto Gallery — Homepage Redesign Concept

**Positioning:** A luxury automotive *lifestyle* brand first, a dealership second.
Editorial, cinematic, minimal, dark. Closer to McLaren Orlando / Hyperluso /
Barnaba Motors than to a traditional inventory-driven dealer site.

---

## 1. Brand Positioning & Strategy

The site sells a *world*, not a stock list. Every decision is filtered through one
question: **"Would a luxury collector brand do this?"**

| We communicate | We avoid |
| --- | --- |
| Exotic automotive lifestyle | Generic dealership layouts |
| Luxury ownership experience | Walls of body copy |
| Events, rallies, community | Overstock inventory grids |
| Private-client relationships | Inventory counts ("23 available") |
| Exclusive, curated inventory | Cheap promo banners |
| Boutique automotive culture | Busy, crowded navigation |

**Tone:** confident, sparse, cinematic. Few words, large imagery, generous negative
space (here, *black* space). Inventory is reframed as a *collection*.

---

## 2. Visual Design Direction

**Theme — Dark editorial.**
- Canvas: near-black `#0a0a0a` with layered surfaces (`#141414`, `#1d1d1d`).
- Text: platinum white `#f5f5f5` / soft grey `#a0a0a0`.
- Accent: a single restrained warm metallic (`#c9a86a`). Used sparingly — eyebrows,
  hover states, hairline dividers — never as fill-everywhere brand color. Restraint *is* the luxury.

**Typography — two-voice system.**
- **Display (editorial):** a high-contrast serif (Cormorant Garamond) for hero and
  showcase headlines — this is what shifts the feel from "dealer" to "magazine."
- **UI / body:** Inter — nav, labels, buttons, copy. Uppercase + wide tracking on
  labels and nav for a fashion-house cadence.

**Layout language.**
- 12-column feel, but content sits in wide editorial bands with heavy vertical rhythm
  (`--space-8` / `--space-10` between sections).
- Full-bleed imagery; text overlaid or in alternating editorial rows.
- Hairline borders (1px `#2a2a2a`), 4px radii — sharp, not bubbly.
- Motion is slow and deliberate (250–600ms eases), never bouncy.

---

## 3. Homepage Content Hierarchy

```
1. HERO            Cinematic video — emotional hook
2. FEATURED BRANDS Lotus · Czinger · Hennessey — credibility & exclusivity
3. INVENTORY       Entry to the collection (mega-menu nav, no counts)
4. EVENTS & LIFE   Community / lifestyle proof
5. SELL YOUR CAR   Acquisition funnel — "Get An Offer"
6. SERVICES        Maintenance · Performance · Transportation · Concierge
7. SHOWCASE        Editorial alternating image/text — aspirational close
8. FOOTER          Contact · directions · hours · social · brand partners
```

Priority of the eye: **emotion (hero) → trust (brands) → action (inventory/sell) →
belonging (events) → reassurance (services) → desire (showcase).**

---

## 4. Section-by-Section Breakdown

### 4.1 Hero — cinematic
- Full-viewport autoplay/muted/looped **video** (rally footage, cars arriving, private
  showroom, Lotus brand film). Poster image fallback; static image on reduced-motion.
- Dark gradient scrim bottom→top for legibility.
- Headline: **"Where Automotive Passion Meets Luxury"** (serif display).
- Sub: *"Curated exotic, luxury, and collector vehicles in Las Vegas."*
- Primary CTA **View Inventory** · Secondary **Sell Your Vehicle**.
- Subtle scroll-cue at bottom.

### 4.2 Featured Brands — premium panels (not logos)
Three large cards, image-led, dark overlay, tagline reveal on hover:
- **LOTUS** — *Performance Reimagined*
- **CZINGER** — *The Future of Hypercars*
- **HENNESSEY** — *American Performance Without Limits*
Each links to that brand's curated set.

### 4.3 Inventory Experience
- New + Pre-Owned unified under **Inventory**.
- **Desktop:** mega-menu drops from the nav — a clean grid of *currently available*
  makes (Porsche, Ferrari, Lamborghini, McLaren, Bentley, Rolls-Royce…). Dynamic:
  only show makes in stock. **No counts.**
- **Mobile:** the same makes as an accordion/dropdown inside the slide-in menu.
- On-page: a restrained "Explore the Collection" band → into the inventory app.

### 4.4 Events & Lifestyle
- Large feature visual + a 2–3 tile rail: rallies, track days, launches, Cars & Coffee,
  client experiences. Establishes community, not commerce.

### 4.5 Sell Your Vehicle
- Headline: **"Looking To Sell Your Exotic Vehicle?"**
- Four value points: Consignment · Direct Purchase · Nationwide Transportation ·
  Fast Evaluation. CTA **Get An Offer**.

### 4.6 Services
- Clean luxury grid: **Maintenance · Performance Upgrades · Vehicle Transportation ·
  Concierge.** (Transportation lives *here*, not as its own homepage section.)

### 4.7 Luxury Vehicle Showcase — editorial
- Full-width imagery, alternating image/text rows.
- Headline: **"Exceptional Vehicles. Exceptional Experiences."**
- Magazine cadence: large serif, short caption, single quiet link.

### 4.8 Footer — luxury minimal
- Contact · directions · hours · social · brand partners. Hairline columns, lots of
  black space, small tracked caps.

---

## 5. Desktop Layout Concept

```
┌──────────────────────────────────────────────────────────────┐
│  VEGAS AUTO GALLERY    Inventory▾  Brands  Events  Services  ◦ │  sticky, condenses on scroll
├──────────────────────────────────────────────────────────────┤
│                                                                │
│        [ CINEMATIC HERO VIDEO — full viewport ]                │
│        Where Automotive Passion Meets Luxury                   │
│        Curated exotic, luxury & collector vehicles…            │
│        [ View Inventory ]   [ Sell Your Vehicle ]              │
│                                          ↓ scroll              │
├──────────────────────────────────────────────────────────────┤
│  FEATURED BRANDS                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                     │
│  │  LOTUS   │  │ CZINGER  │  │HENNESSEY │   (image panels)     │
│  └──────────┘  └──────────┘  └──────────┘                     │
├──────────────────────────────────────────────────────────────┤
│  [ Inventory mega-menu opens from nav: makes grid, no counts ] │
├──────────────────────────────────────────────────────────────┤
│  EVENTS & LIFESTYLE   [ large feature image ] + tile rail      │
├──────────────────────────────────────────────────────────────┤
│  SELL  ┌ image ┐  Looking To Sell Your Exotic Vehicle?         │
│        └───────┘  • Consignment • Direct • Transport • Fast     │
│                   [ Get An Offer ]                             │
├──────────────────────────────────────────────────────────────┤
│  SERVICES   Maintenance · Performance · Transport · Concierge  │
├──────────────────────────────────────────────────────────────┤
│  SHOWCASE  [ full-bleed image ]  Exceptional Vehicles.         │
│            text ◄► image (alternating editorial rows)          │
├──────────────────────────────────────────────────────────────┤
│  FOOTER  contact · directions · hours · social · partners      │
└──────────────────────────────────────────────────────────────┘
```

## 6. Mobile Layout Concept

```
┌───────────────────────┐
│ VEGAS AUTO GALLERY  ☰ │  sticky
├───────────────────────┤
│  [ hero video / poster]│  ~70vh
│  Where Automotive      │
│  Passion Meets Luxury  │
│  [ View Inventory ]    │  full-width buttons, stacked
│  [ Sell Your Vehicle ] │
├───────────────────────┤
│  LOTUS      (panels    │
│  CZINGER     stack      │
│  HENNESSEY   1-col)     │
├───────────────────────┤
│  ☰ menu → Inventory     │
│     ▸ Porsche           │  accordion of makes
│     ▸ Ferrari …         │
├───────────────────────┤
│  EVENTS (stacked tiles)│
│  SELL (image over text)│
│  SERVICES (1-col)      │
│  SHOWCASE (stacked)    │
│  FOOTER (stacked cols) │
└───────────────────────┘
```

Mobile nav: full-screen slide-in drawer, large tracked-caps links, Inventory expands
to a makes accordion. Thumb-reachable CTAs, full-width buttons.

---

## 7. UX Recommendations

- **Two clear paths, always:** *buy* (View Inventory) and *sell* (Get An Offer). Keep
  both reachable from hero, nav, and footer.
- **Reframe inventory as a collection** — never surface counts or "deals."
- **Dynamic makes:** render only in-stock brands so the menu never lies. Empty makes
  simply disappear.
- **One accent, used rarely.** Luxury reads as restraint; if everything is gold, nothing is.
- **Performance is brand-critical:** lazy-load below-the-fold media, compress the hero
  video, ship a poster + reduced-motion static fallback. A slow luxury site feels cheap.
- **Accessibility:** AA contrast on the dark theme, visible focus rings, `prefers-reduced-motion`
  honored, captions/labels on all media, keyboard-operable mega-menu.
- **Sticky header condenses** on scroll (shorter, subtle background) to stay out of the way.
- **No dead ends:** every section ends in one quiet, confident link — never a wall of choices.

---

## 8. Premium Interactions & Animation

| Element | Interaction |
| --- | --- |
| Page load | Hero copy fades + rises (stagger), video slow ken-burns zoom |
| Scroll | Section content reveals on enter (IntersectionObserver, fade + 24px rise) |
| Header | Condenses + gains hairline/background after ~80px scroll |
| Nav links | Underline grows from left on hover; mega-menu fades/drops 200ms |
| Brand panels | Image zoom 1.0→1.06, overlay darkens, tagline shifts up on hover |
| Editorial rows | Light parallax on imagery; text reveals slightly after image |
| Buttons | Background/border ease 250ms; primary lifts subtly |
| Showcase images | Reveal with scale-down (1.08→1.0) as they enter |
| Reduced motion | All of the above collapse to instant — no parallax, no autoplay video |

**Motion principles:** slow, eased, purposeful. Nothing bounces. Motion guides the eye
down the narrative; it never performs for its own sake.

---

*This concept is implemented in `index.html` + `css/` + `js/main.js` as a working
front-end. Hero video and final brand/event photography are placeholders pending client assets.*
