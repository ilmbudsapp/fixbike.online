# Privacy audit — fixbike.online

Date: **May 2026**

## Problems found (before fix)

| Area | Issue |
|------|--------|
| Google Fonts | Loaded from Google CDN in `index.html` + CSP allowed google font domains |
| Datenschutz | Placeholder text only (~3 lines) |
| Impressum | Placeholder note + incomplete DDG structure |
| Google Maps embed | Loaded without consent |
| YouTube embed | Loaded without consent |
| Payment icons | Loaded from `cdn.simpleicons.org` (third-party) |
| Analytics | None found ✅ |

## External requests (after fix)

| Request | Purpose | Necessary? | Action |
|---------|---------|------------|--------|
| `self` (HTML/JS/CSS/fonts) | Site delivery | Yes | Keep |
| `api.web3forms.com` | Rental/contact form | Yes | Documented in privacy policy |
| `maps.google.com` (iframe) | Map embed | Optional | **Consent required** |
| `youtube-nocookie.com` (iframe) | Workshop video | Optional | **Consent required** |
| `wa.me` | WhatsApp links | Optional | Link only — disclosed |
| `google.com/maps/search` | External map link | Optional | User leaves site |
| `pexels.com` | License link in footer | Optional | Link only |
| `agrmultimedia.eu` | Designer credit | Optional | Link only |
| ~~`fonts.googleapis.com`~~ | Fonts | No | **Removed** |
| ~~`cdn.simpleicons.org`~~ | Payment SVGs | No | **Removed** (text labels) |

## Consent model

- **Nur notwendige:** Web3Forms still works (essential for booking); Maps/YouTube show placeholder.
- **Alle akzeptieren:** Maps iframe + YouTube iframe load.
- No analytics cookies on this site.

## Manual follow-up for site owner (Adem Osmani)

| Item | Status |
|------|--------|
| USt-IdNr. in Impressum | Placeholder if not applicable (Kleinunternehmer §19) |
| Vercel DPA | Accept in Vercel dashboard |
| Web3Forms privacy/DPA | Confirm in Web3Forms dashboard |
| Replace Pexels stock photos | Optional — own workshop photos |

## Verification

1. Network tab: no `fonts.googleapis.com` on page load.
2. First visit: cookie banner visible.
3. „Nur notwendige“: no Maps/YouTube iframe requests.
4. „Alle akzeptieren“: Maps + YouTube load.
5. `#datenschutz` and `#impressum` show full legal text.
