# Export verification

Verified November 9, 2026 against the existing private proof, version 2.

## Passed

- HTML, CSS, JavaScript, logo, and all eight photographs match the original source byte-for-byte.
- Every image, script, and stylesheet referenced by the page is bundled locally. No runtime CDN, remote font, or dealership website request is needed.
- JavaScript syntax and the Python preview-helper syntax pass.
- ZIP integrity passes; the ZIP was extracted before previewing.
- The bundled local-server helper serves the extracted HTML, CSS, JavaScript, and all nine asset files correctly.
- Chrome desktop preview of the extracted page rendered the hero and all referenced images successfully, with no horizontal overflow at a 1180 × 757 viewport.
- Empty submission displayed the four required-field errors.
- Selecting phone contact required a phone number; switching back to email made it optional.
- A valid synthetic inquiry opened the preview clearly stating that nothing was sent or saved.
- Repeated preview/open/close controls and the privacy-placeholder dialog worked.
- Both marketing checkboxes were unselected by default.
- No form destination, external connection, analytics, or persistent storage was added; the restrictive demo content-security policy is preserved.
- No Git history, hosting identity/configuration, credentials, or test input is included in the package.

## Limits

This is a handoff of an existing design proof, not a production-ready lead form. See README.md for the required production integration and approval steps.

This export was tested in Chrome desktop over a local HTTP server. The original responsive styles are included unchanged; a new mobile-device or full cross-browser audit was not performed for this export. Opening index.html directly depends on each browser's local-file policy; use the supplied local-server option if needed.

The production website and private hosted proof were not changed or republished. The dealership website was not accessed to prepare this export. Photographs were copied from the proof's existing source.
