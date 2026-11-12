# Liquid — a Calibre-Web theme

Liquid gives Calibre-Web a calm, Apple-inspired look based on the toned-down Liquid Glass of iOS 27. Your covers carry the colour, and the interface sits quietly on top as frosted glass.

- **Glass, used sparingly:** a floating top bar and a sidebar panel that blends into the page, laid out on a 16px grid. Buttons, search and pagination are rounded "pills".
- **Books that look like books:** every cover is drawn as a hardcover with a visible spine and shown in full, never cropped. Covers of different sizes stand on the same baseline, and they tilt in 3D towards your mouse.
- **Light and dark:** it follows your device's appearance automatically and uses your system font. No font files are included.
- **Phones first:** on small screens the bar and content run edge to edge, with no wasted space.
- **Accessible:** text meets WCAG AA contrast in both modes. Reduce Transparency and Increase Contrast make the glass solid, and Reduce Motion turns off all animation.

A restyle of the Standard theme: one stylesheet and one small script, with no template changes and nothing loaded from external sites.

## Requirements

A Calibre-Web version that supports user themes (the theme infrastructure from PR #3753).

## Install

1. [Download](https://github.com/tommoors/calibre-web-liquid-theme/releases/download/v1.2/liquid.zip) and unzip `liquid.zip`. You get a folder called `liquid`.
2. Copy the `liquid` folder into the `themes/` folder next to Calibre-Web's settings database (`app.db`). Create `themes/` if it doesn't exist.
   - Docker: usually `./config/themes/liquid`
   - Or point the `CALIBRE_THEMES_DIR` environment variable to the folder that contains `liquid`.
3. Restart Calibre-Web.
4. Go to **Admin → Edit UI Configuration → Theme**, choose **Liquid**, and save.

## Update

Replace the `liquid` folder with the new one. If `info.json` changed, restart Calibre-Web; otherwise a browser refresh is enough.

## Troubleshooting

If Liquid doesn't appear in the theme list, check the Calibre-Web log at startup for `Theme folder '…' skipped`. The folder must be named exactly `liquid` and must contain `info.json` directly, not inside another folder.

## Preview

<img width="1688" height="935" alt="Scherm­afbeelding 2026-11-12 om 17 45 22" src="https://github.com/user-attachments/assets/179612d1-37cd-4634-b504-ad9fb944bef4" />

<img width="1688" height="936" alt="Scherm­afbeelding 2026-11-12 om 17 47 35" src="https://github.com/user-attachments/assets/fff868db-a4f1-48f4-a421-8e2b1148ba2b" />

