# Ready for Germany — fixbike.online checklist

## Completed (code)

- [x] Google Fonts removed; DM Sans + Outfit self-hosted
- [x] CSP updated (no Google Fonts domains)
- [x] Full Datenschutzerklärung (15 sections)
- [x] Full Impressum (§ 5 DDG + MStV + liability)
- [x] Cookie consent banner (DE)
- [x] Google Maps embed — consent-gated
- [x] YouTube embed — consent-gated
- [x] No Google Analytics / GTM / Meta Pixel (confirmed)
- [x] Web3Forms documented in privacy policy
- [x] Removed simpleicons CDN (payment icons → text)
- [x] German legal text umlauts fixed in accordion
- [x] Build verified (`npm run build`)

## Manual / owner actions

- [ ] Confirm **USt-IdNr.** line in Impressum (remove placeholder if not applicable)
- [ ] Accept **Vercel** GDPR/DPA in dashboard
- [ ] Review **Web3Forms** data processing settings
- [ ] Optional: replace Pexels placeholder photos with own images
- [ ] Optional: legal review by German **Datenschutz** / **IT-Recht** advisor

## Post-deploy test

1. https://fixbike.online — cookie banner on first visit
2. Choose „Nur notwendige“ — no Maps/YouTube in Network tab
3. Clear storage, reload, „Alle akzeptieren“ — embeds load
4. Scroll to footer `#impressum` and `#datenschutz` — full text visible

## Legal note

Implementation follows common GDPR practice for small German business sites but does not replace professional legal advice.
