# VIP Experience production handoff

This is a local design and copy mockup. No live site was accessed, edited or published.

## Confirm service destinations

The navigation links scroll to real sections in this mockup. The main Start Your Gallery Experience links scroll to the preview enquiry form. Neither is a substitute for production integration.

The following service buttons have no external destinations. Their `data-destination` attributes identify the intended action for implementation:

- `inventory`: Browse Exotic & Luxury Inventory. Confirm the inventory URL.
- `sourcing`: Request Vehicle Sourcing. Confirm the sourcing page or approved request flow.
- `sell`: Sell Your Car. Confirm the approved vehicle-submission flow.
- `trade`: Value Your Trade. Confirm independently; do not infer this destination from Sell Your Car.
- `consignment`: Explore Car Consignment. Confirm the consignment detail page.

When destinations are approved, replace the corresponding mockup buttons with normal links using those exact URLs. Remove their preview-only attributes and messages. Connect the general Start Your Gallery Experience action to the approved client enquiry form. Remove the preview submit handler only after its real integration is tested.

## Selected photos included

All five supplied photos are now bundled in `assets/`. No external image service is required.

- `vip-experience-bugatti.jpeg`: background behind the VIP Experience heading, introduction and buttons, with the original sample gradient and layout.
- `personal-approach-porsche.jpeg`: beside A Personal Approach to Buying.
- `exotic-luxury-rooftop.jpeg`: background behind Exotic & Luxury Vehicle Sourcing, with the original sample gradient and layout.
- `las-vegas-expertise-retouched.png`: beside Las Vegas Expertise, with the person removed from the Czinger cockpit.
- `gallery-experience-process.jpeg`: beside How Your Gallery Experience Works.

The Czinger photo has been retouched to remove the person from its cockpit. The other four image files are unchanged. Responsive portrait crops and the decorative hero and sourcing backgrounds are controlled in CSS. Alt text describes only visible image content for the three inline photographs. Confirm usage rights before production use. Recheck crops in the final production layout and retain the bundled originals.

## Confirm business facts

Confirm that direct purchase, trade-in, consignment, vehicle sourcing, remote transactions, financing discussions and enclosed transportation coordination are accurately represented. Confirm the service, customization, protection and detailing options mentioned in the final benefits card.

Nationwide coordination is the current claim. The page makes no new international delivery, import/export, guaranteed sourcing, guaranteed sale, immediate valuation, exclusive access or sale-price promises.

## Production SEO and QA

- Keep a single visible H1: The Vegas Auto Gallery VIP Experience.
- Proposed title: Exotic & Luxury Car Services | Vegas Auto Gallery.
- Proposed description: Buy, sell, trade, consign or source an exotic or luxury car with Vegas Auto Gallery. Explore our personalized approach in Las Vegas and nationwide.
- Confirm the production URL, canonical and intended indexability. The mockup intentionally includes `noindex, nofollow`.
- Use crawlable links for confirmed service destinations, not the preview buttons.
- Replace the concept bar, footer caveats and preview-only messages when the production implementation is approved.
- Recheck keyboard navigation, mobile layout, form success/error states, image loading and contrast in the final website.
- These are intent-based copy improvements, not a search-volume study, live-site audit or ranking guarantee.
