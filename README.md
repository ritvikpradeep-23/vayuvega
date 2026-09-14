This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## `/tracker` — Field Ops Tracker

A retro CRT-styled page (`app/tracker`, `components/tracker/*`) with a Kerala-only Leaflet map (hero
sightings + villain markers, masked to the real state boundary via `@turf/turf` and
`public/data/kerala-boundary.json`), a suit archive, a rogues gallery with a per-visitor
"unidentified until investigated" reveal, an ambient HQ Radio dispatch system, a Hero Feed, and a
scripted dispatch chatbot. A few things worth knowing before touching it:

- **Hero Feed comments are per-browser, not shared.** They're stored in `localStorage`
  (`vayuvega-hero-feed-v1`), seeded with sample posts on first load. One visitor's post never
  appears for another visitor — there's no backend behind it. The same is true of villain
  "reveal" state (`vayuvega-revealed-villains-v1`).
- **HQ Radio's voice and the theme jingle are both synthesized in the browser** — the radio uses
  the Web Speech API (`SpeechSynthesisUtterance`) with a text-only fallback when unsupported, and
  the jingle is a short sequence of Web Audio oscillator notes. No external audio files are used
  anywhere on this page.
- **No suit/villain artwork is included.** The suit and villain portrait slots are placeholder SVG
  shapes in the site's palette (faceless/abstract by design) — real art is a manual drop-in later.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
