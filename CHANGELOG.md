# Changelog — DSGVO / legal compliance (fixbike.online)

## 2026-05-31 — Production-ready DSGVO fixes

### Fonts / privacy
- Removed Google Fonts (`fonts.googleapis.com`, `fonts.gstatic.com`) from `index.html`.
- Self-hosted **DM Sans** and **Outfit** via `@fontsource` in `src/styles/fonts.css`.
- Updated CSP in `index.html`, `vercel.json`, `public/_headers`, `public/.htaccess`.

### Cookie consent / external media
- Added `src/lib/consent.ts` and `src/CookieConsent.tsx` (DE banner: „Nur notwendige“ / „Alle akzeptieren“).
- **No Google Analytics** on this site — consent gates **Google Maps embed** and **YouTube embed** only.
- `ConsentGate` shows placeholder + external link until user accepts.

### Datenschutzerklärung
- Full 15-section GDPR policy in `src/legal/legalContent.ts`, rendered in `SiteFooter.tsx`.
- Covers: Vercel hosting, Web3Forms, localStorage, self-hosted fonts, Maps/YouTube consent, no analytics.

### Impressum (DDG)
- Complete Impressum with § 5 DDG, MStV, EU ODR, liability, copyright.
- Business data from `fixbikeConstants.ts` (Adem Osmani, Neuwied).

### Other
- Removed `cdn.simpleicons.org` payment icon requests — text-only payment labels.
- Fixed German umlauts in AGB/FAQ accordion text.
- Documentation: `PRIVACY_AUDIT.md`, `READY_FOR_GERMANY.md`.
