# Vegas Auto Gallery — client pages handoff (12 Nov 2026)

Five pieces to build into the site. They are designed on the site's own system (Oswald / Roboto Condensed, the existing tokens and components), so most of the styling already exists in the theme; what is new is listed per page.

**Previews** (password `cars`):

| # | Page | Preview |
|---|------|---------|
| 1 | Source a Vehicle — landing page | https://sigovs.github.io/VEGAS_UPD/source7.html |
| 2 | VIP Experience | https://sigovs.github.io/VEGAS_UPD/vip7.html |
| 3 | Locations & Hours | https://sigovs.github.io/VEGAS_UPD/locations7.html |
| 4 | Sell Your Car — Consignment block | https://sigovs.github.io/VEGAS_UPD/sell7.html#consignment |
| 5 | Consignment form — photos uploaded state | https://sigovs.github.io/VEGAS_UPD/consign7.html |

## Menu changes (against the current demo menu)

Everything else in the menu stays exactly as on the demo.

| Menu | Change | Link to |
|------|--------|---------|
| Inventory → Personalized Shopping | **New item: Source a Vehicle**, under Saved Vehicles | Source a Vehicle page (1) |
| Inventory → Personalized Shopping → Saved Vehicles | Unchanged item; the page now carries a *Vehicle Sourcing* panel linking to Source a Vehicle (client request) | Saved Vehicles / My Collection |
| About Us | **New item: VIP Experience**, directly after Our Story | VIP Experience page (2) |
| About Us → Locations & Hours | Unchanged item, now points to a real page (it was "Coming soon") | Locations & Hours page (3) |
| About Us → Vegas Auto Gallery Lotus West Directions | Unchanged, kept for now — the client may remove it, since Locations & Hours now covers both addresses | — |

**Files:** [`vag-client-pages-2026-11-12.zip`](vag-client-pages-2026-11-12.zip) is a self-contained copy of the five pages with only the CSS, JS and images they use. Unzip it and open any page through a local server (`python -m http.server` in the folder). No password in the zip. The header and footer link to other pages that are not in the zip; those links 404 there, which is expected.

The same files live at the repo root: [`source7.html`](../../source7.html), [`vip7.html`](../../vip7.html), [`locations7.html`](../../locations7.html), [`sell7.html`](../../sell7.html), [`consign7.html`](../../consign7.html), [`css/components.css`](../../css/components.css), [`css/client-pages.css`](../../css/client-pages.css), [`js/main.js`](../../js/main.js).

---

## 1. Source a Vehicle

**Where it goes:** Inventory mega menu → *Personalized Shopping* → **Source a Vehicle**, under *Saved Vehicles*. The client also asked for it to be linked from the Saved Vehicles page (a "Vehicle Sourcing" panel next to the sign-in panel: see `garage7.html` in the repo).

**Sections:** hero (gallery at night) → two path cards ("I know what I want" / "Help me find my direction") → detail photos + three planning steps → request form → FAQ → closing CTA.

**Form fields** (the client's own field list):
- *I'm here to…*: Find a specific vehicle / Get help choosing (radio, the two path cards pre-select it)
- 01 Your details: First name*, Last name*, Email*, Preferred contact method (Email / Phone), Phone (required only when Phone is chosen)
- 02 Your search: What are you looking for?* — and an optional *Refine your search* panel: Make, Model/trim, Year from/to, Budget from/to (USD), Colors/features/specs, Max mileage, Timeframe, Trade-in? (Yes/No/Possibly) → Trade-in details (shown only for Yes/Possibly)
- Keep in touch (optional): email news checkbox, SMS news checkbox
- Privacy policy link — **placeholder, needs the real URL**

**Code:**
- CSS: `css/client-pages.css` (path cards, detail pair, inquiry split, segmented "I'm here to…" control, FAQ split). Shared pieces in `components.css`: `.heading-accent`, `.vdp-form`, `.vdp-accordion`.
- JS: `js/main.js` → block *"Sourcing form (source7)"* — path cards set the radio and scroll to the form, phone becomes required when Phone is the preferred contact, trade-in details show/hide.
- Images: `assets/images/source/*`.

**Before live:** connect the form to lead routing / CRM (it is a front-end stub that shows a thank-you line), add the privacy policy URL, keep `noindex` until approved.

## 2. VIP Experience

**Where it goes:** About Us dropdown → **VIP Experience**, right after *Our Story*. The client: "separate from About Us … keep the existing About Us / Our Story page … a new standalone page under Discover". There is no *Discover* item in the menu today, so it sits in About Us; if they want *Discover* as its own item, it is a menu change only.

**Sections:** hero (Bugatti) → A Personal Approach (intro) → 01 Buy (split, links to inventory and to Source a Vehicle) → 02 Sell / Trade / Consign (three cards → Sell Your Car, Value Your Trade, Consignment) → 03 Vehicle Sourcing (photo band → Source a Vehicle) → 04 National Reach (split) → 05 The Process (split, three steps) → Why Choose VAG (four cards) → enquiry form (First, Last, Email, Phone, I'm interested in, Vehicle/model, Message).

**Code:** CSS in `css/client-pages.css` (`.lede-block`, `.topic-list`, `.vip-source`, `.vip-routes`, `.services-split--portrait`) plus `.step-list` / `.heading-accent` in `components.css`. Images: `assets/images/vip/*` (the client's five photos; the Czinger one is the client's retouched file).

**Before live:** point the card links at the live URLs, connect the form, confirm the claims the client's own notes flag for review (nationwide, enclosed transportation, remote transactions).

## 3. Locations & Hours

**Where it goes:** About Us → **Locations & Hours** (it pointed to an empty "Coming soon" page). Client: combine Lotus West Directions and Locations & Hours, keep the title, two maps — the gallery and the service center. The *Lotus West Directions* menu item is left in place for now (client may remove it).

**Layout:** hero (gallery at night) with jump buttons → two equal cards side by side (one column below 1100px). Each card: photo with the location name → today's status → address + phone → week hours → Get Directions / Call → map.

| | Showroom & Sales | Service & Aftermarket |
|---|---|---|
| Address | 5530 Rafael Rivera Way, Las Vegas, NV 89118 | 6551 Westwind Road, Suites 125–135, Las Vegas, NV 89118 |
| Phone | 702-782-8882 | 702-964-2886 |
| Mon–Fri | 9:00 AM – 7:00 PM | 8:00 AM – 6:00 PM |
| Saturday | 9:00 AM – 6:00 PM | 9:00 AM – 6:00 PM |
| Sunday | Closed | Closed |

Addresses and hours are the ones the site footer publishes.

**Code:**
- CSS: `components.css` → section *"locations7 — two addresses, one gallery"* (`.loc-hero`, `.loc-grid`, `.loc-card*`).
- JS: inline at the bottom of `locations7.html` — Leaflet maps on **Esri Dark Gray** tiles (the same tiles the demo uses; CARTO's dark tiles now return "API KEY REQUIRED") and the **open/closed status**: each card carries its hours in `data-hours`, computed in Las Vegas time (`America/Los_Angeles`) → "Open now · until 7:00 PM" / "Closed now · opens tomorrow 9:00 AM". Without JS the status line stays hidden.
- Images: `assets/images/source/gallery-night.webp` (hero), `assets/images/sell/sell-hero-showroom.webp`, `assets/images/demo/svc-hero-poster.jpg`.

**Before live:** if hours change, update both the visible list and `data-hours` on the card.

## 4. Sell Your Car — Consignment block

**Brief:** the client's consignment design brief (headline *Your car. Its next chapter.*, body, button *Start a consignment inquiry*, supporting line *Continue to our existing form.*, three discussion cues), built in the site's split layout instead of the brief's serif look.

**Layout:** copy and the three steps (01 Share your vehicle / 02 Discuss the details / 03 Choose your next step) on the left, the Ferrari F12 studio photo on the right — shown whole at 3:2, on the page grid. On mobile the photo sits above the copy, as in every split on the site.

**Code:** `components.css` → `.consign-split`, `.heading-accent`, `.step-list`, `.services-split__inner p`. Image: `assets/images/sell/consign-ferrari-f12.webp` (dealer photo, as the brief asks for a real photograph).

**Before live:** the button goes to the existing consignment form — the brief's placeholder `EXISTING_FORM_URL_TO_CONFIRM`; in the preview it links to `consign7.html`.

## 5. Consignment form — uploaded photos state

**What it is:** the photo drop zone now shows the chosen photos as thumbnails under the zone, each with its own remove (×) control, and a count ("3 of 8 photos"). New photos add to the selection instead of replacing it (click or drag-and-drop); × removes the photo from the form's file input too; at 8 the zone dims. Same component on Value Your Trade.

**Code:**
- JS: `js/main.js` → the `[data-upload]` block (keeps the file list, rebuilds `input.files` through `DataTransfer`, renders `.consign-thumbs`).
- CSS: `components.css` → `.consign-thumbs`, `.consign-thumb`, `.consign-thumb__remove`, `.consign-upload.is-full`.

**Preview only — remove before live:** the zone carries `data-upload-demo`, which pre-fills three sample photos so the state is visible in review. Delete that attribute (or the matching JS lines) and the zone starts empty. `?uploads=demo` on the URL does the same on demand.

---

All forms in these pages are front-end stubs: they validate, show a thank-you line and send nothing.
