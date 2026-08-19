# Portfolio

Minimal dark portfolio for a photographer / videographer / editor.
Next.js (App Router) + TypeScript + Tailwind CSS v4.

## Develop

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Editing content

Everything on the page comes from `src/data/site.ts`:

- `site` - name, role, location, email, bio paragraphs, services, social links
- `photography` - the stills grid
- `videography` - the film/edit list

No other file needs to change to put your own work up.

## Adding images

Drop files into `public/` and point at them with a root-relative path:

```
public/work/salt-flats.jpg  ->  src: "/work/salt-flats.jpg"
```

```ts
{ title: "Salt Flats", meta: "Editorial - 2025", shape: "landscape", src: "/work/salt-flats.jpg" }
```

Any item without a `src` renders as a labelled placeholder frame, so the
layout is complete before the real work lands.

- Photos take `shape: "portrait" | "landscape" | "square"` (defaults to portrait).
  The stills grid is CSS masonry, so mixed crops pack without gaps.
- Films are always 16:9. Add `href` to link a film out to Vimeo/YouTube.

## Design notes

- Dark only - the palette lives in `:root` in `src/app/globals.css`.
- Animation is deliberately minimal: colour/opacity hovers and smooth anchor
  scrolling, both disabled under `prefers-reduced-motion`.
