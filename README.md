# Sri Ram Books & Stationery

A modern, responsive website for **Sri Ram Books & Stationery**, a neighbourhood shop for pens, notebooks, art supplies, toys, balloons, colour xerox, printouts, online services and money transfer.

**Live site:** `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/` *(replace after enabling GitHub Pages)*

## Features

- Responsive layout for phones, tablets and desktops
- Hero section with the shop front and four service buttons styled like the shop signboard
- Product category tiles with real photos from the shop
- Print, xerox and money transfer section with UPI note
- Photo gallery with a full-screen viewer (tap a photo, then use arrows or the Esc key)
- Call, WhatsApp and Google Maps buttons, with a fixed quick-action bar on mobile
- Light and dark mode that follows the visitor's device setting
- No frameworks or build step: plain HTML, CSS and JavaScript

## Project structure

```
.
├── index.html        Page content: text, phone numbers, links
├── style.css     Colours, fonts and layout
├── script.js     Gallery and photo viewer, image list
├── images/           Shop photos, logo and banner
└── README.md
```

## Customise

| What to change | Where |
| --- | --- |
| Phone numbers (80747 97719, 98660 25837) | Search `index.html` for the numbers (both the `tel:` / `wa.me` links and the visible text) |
| Shop text and descriptions | `index.html` |
| Main colour | `--brand` and `--brand-dark` at the top of `css/style.css` |
| Service button colours | `--orange`, `--purple`, and the `.p-pink` / `.p-green` rules in `css/style.css` |
| Fonts | `--display` and `--body` in `css/style.css`, plus the Google Fonts `<link>` in `index.html` |
| Photos | Replace a file in `images/` with a new one of the same name |
| Gallery captions and order | The `GALLERY` list in `js/script.js` |
| Google Maps location | Search `index.html` for `maps?cid=` |

Tip: keep photos under about 250 KB each (around 1100 px wide) so the site loads quickly on mobile data.

## Fonts

[Poppins](https://fonts.google.com/specimen/Poppins) for headings and body text, and [Noto Sans Telugu](https://fonts.google.com/noto/specimen/Noto+Sans+Telugu) for the Telugu shop name. Both load from Google Fonts.

## Contact

**Sri Ram Books & Stationery**
Call / WhatsApp: 80747 97719
Shop phone: 98660 25837

## License and credits

Photos, logo, banner and shop name belong to Sri Ram Books & Stationery. All rights reserved. Do not reuse them without permission.
