# Asset pipeline instructions for Carlos

This site is built with a placeholder system so it ships visually complete
even before real product imagery exists. Use this guide to drop real assets
in once they're ready.

## Where things live

```
public/
├── images/
│   ├── product/        # screenshots of the product UI
│   ├── solutions/      # hero image per industry
│   ├── customers/      # customer logos + portrait photos
│   ├── team/           # team member photos
│   ├── blog/           # blog post hero + inline images
│   ├── og/             # static Open Graph images (dynamic ones come from /api/og)
│   ├── illustrations/  # custom illustrations
│   └── _raw/           # ⚠ drop unoptimized originals here, run npm run optimize:images
├── videos/
│   ├── demos/          # product demo videos (replaces GIFs — much smaller)
│   ├── tutorials/      # how-to videos
│   ├── hero/           # hero/landing videos
│   └── _raw_gifs/      # ⚠ drop GIFs here, run npm run convert:gifs
└── fonts/
    └── CalSans-SemiBold.woff2   # display font — already shipped
```

## Naming convention

- **kebab-case** always: `tasks-board-dark.png`, not `TasksBoard_Dark.png`.
- **Light/dark variants**: suffix with `-light` and `-dark`
  (e.g. `inbox-light.webp`, `inbox-dark.webp`).
- **Videos**: ship matching `.poster.jpg` (same base name). The
  `<AutoplayVideo>` component expects this.

## Optimization pipeline

### Images

Drop raw images (PNG, JPG, large originals) into `public/images/_raw/`.

```powershell
npm run optimize:images
```

This script processes everything in `_raw/` and writes optimized AVIF +
WebP variants into the correct subfolder, plus generates blur placeholders.

Sizes used across the site:
- **Hero images**: 2880×1620 source, served responsive
- **Bento card visuals**: 1200×900
- **Customer logos**: SVG preferred, otherwise 256px square
- **Avatars / team**: 256×256

### GIFs → MP4 + WebM

GIFs are 5–10× heavier than equivalent video. Drop GIFs into
`public/videos/_raw_gifs/` and run:

```powershell
npm run convert:gifs
```

Output: `.mp4` (H.264) + `.webm` (VP9) + `.poster.jpg` for each input GIF,
written to the appropriate `videos/` subfolder. Both formats are needed
for Safari + everywhere-else compatibility.

Constraints:
- Max 5 MB per video file (after compression).
- Loop-friendly (start frame matches end frame).

## Customer logos

Drop SVGs (preferred) or 256×128 PNGs into `public/images/customers/`.
Filename = company slug. The marquee on the home page picks them up
automatically once you list them in `src/lib/customers.ts` (Phase 3+).

## Until you ship real assets

The site renders gradient placeholders with descriptions of what should go
there. None of this blocks shipping the marketing pages.
