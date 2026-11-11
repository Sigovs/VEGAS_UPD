# Source a Vehicle proof — AAN handoff

This is the standalone source of the private Vegas Auto Gallery vehicle-sourcing proof, version 2, exported November 9, 2026. The page, styles, JavaScript, logo, and photographs are unchanged from the proof.

## Open it locally

1. Extract the ZIP completely. Do not open files from inside the ZIP.
2. Open `index.html` in a current Chrome, Edge, Firefox, or Safari browser.
3. If your browser restricts local-file scripts or images, use the local-server option below.

### Recommended: local server

With Python 3 installed, open a terminal in this folder and run:

```sh
python3 start-preview.py
```

On Windows you can instead run:

```powershell
py start-preview.py
```

Then open http://127.0.0.1:8000/ in your browser. Press Ctrl+C in the terminal to stop the server. If port 8000 is busy, run `python3 start-preview.py 8001` (or `py start-preview.py 8001`) and use the address it prints.

No npm install, build, account, network access, or ChatGPT sign-in is needed for the page. All page assets are bundled locally; fonts use the browser's installed/system fonts. The server binds only to this computer's loopback address.

## Included

- `index.html`: page markup and content-security policy.
- `styles.css`: desktop/mobile styling.
- `app.js`: local-only form validation and preview dialogs.
- `assets/`: the logo and all eight photos from the existing proof.
- `start-preview.py`: optional standard-library local server.
- `ASSET-SOURCES.md`: original asset provenance and build notes. URLs there are references, not runtime dependencies.
- `VERIFICATION.md`: export verification and remaining limits.

## Demo behavior

The request form only displays a local preview. It does not send or save a lead. No CRM, email delivery, SMS delivery, analytics, backend, cookies, storage integration, or account system is included. The content-security policy blocks connections and form submission. Browser-managed autofill is controlled by the person using the browser.

Required fields and conditional phone validation work in the local demo. Marketing checkboxes are unchecked and optional. The privacy policy link intentionally opens a placeholder. Photographs are illustrative, not a statement of current inventory or availability.

## AAN implementation notes

Before a production launch, AAN and Vegas Auto Gallery should:

1. Agree on the final copy, imagery, sourcing workflow, and approval to launch.
2. Connect the form to approved lead handling and CRM routing, with server-side validation, spam protection, delivery-error handling, and a real success state.
3. Replace the privacy-policy placeholder and review channel-specific marketing consent language and recordkeeping.
4. Adjust the restrictive demo CSP only for approved integrations; add tracking only if separately approved.
5. Review responsive behavior, keyboard/accessibility support, and target-browser compatibility on the final platform. The optional year range currently allows 1900–2027 and should be maintained over time.
6. Remove `noindex, nofollow` only when approved for publication and indexing.

This ZIP has no hosting identity, repository history, secrets, credentials, live lead records, or deployment configuration. Packaging it did not change or publish either the proof or the dealership website. No files or messages have been sent to AAN.
