# Arshad Ahmed — portfolio

Next.js 15 (App Router), no CSS framework. One codebase, two deploy targets.

```bash
npm install
npm run dev          # http://localhost:3222
npm run build        # Vercel / Node target
npm run build:pages  # static export into out/ for GitHub Pages
```

`NEXT_PUBLIC_BASE_PATH` unset → served from the root (Vercel, local dev).
Set it → `output: 'export'` plus a `basePath`, which is what `build:pages`
does. `lib/base.js` `asset()` prefixes every media URL, so never hardcode a
`/media/...` path in a component.

## Where the content lives

| What | File |
|---|---|
| All page copy — bio, ledger figures, ticker, craft, work history, contact | `app/page.js` |
| Grid entries | `lib/works.json` |
| Showreel chapter marks | `CHAPTERS` in `components/Reel.js` |
| Design tokens (paper, ink, cobalt, type) | `:root` in `app/globals.css` |

`lib/works.json` fields: `slug` (must match the filenames in
`public/media/{films,previews,posters}/`), `brand` (displayed), `tag` (drives
the filter chips), `title`, `fmt`, `ar`, `role`, `hook`.

## Media

- `public/media/films/<slug>.mp4` — 720×1280, what the lightbox plays
- `public/media/previews/<slug>.mp4` — 360×640, silent, plays on hover
- `public/media/posters/<slug>.jpg` — 540×960, the card still
- `public/media/showreel-{1600,1024}.mp4` — the cut reel, 1920×1080 master downscaled

To add a film, drop the three files in under one slug and add a row to
`lib/works.json`. Nothing else needs touching.

## Still to do

- **No photograph of Arshad.** The About portrait is an `AA` monogram standing
  in for one. Replace the `.mono-mark` div in `app/page.js` with
  `<img src={asset('/media/arshad.jpg')} alt="Arshad Ahmed" />` once a picture
  exists.
- The reel carries each ad's own audio, cross-faded between segments. If a
  single music bed is preferred, the segment sources are listed in the build
  script and can be muted.
