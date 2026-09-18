# Bhavan Seshu Pokala — Portfolio

A dark cyberpunk portfolio built with Next.js 14 (App Router), TypeScript, and Tailwind CSS, featuring a cursor-controlled & scroll-scrubbed cinematic video background, a 3D draggable circular certification gallery, and a bilateral experience/education timeline.

## Setup

This project could not be `npm install`-ed or built in the sandbox that generated it (no network access there), so please run these steps locally:

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To build for production:

```bash
npm run build
npm start
```

## Structure

- `src/app` — App Router entry (`layout.tsx`, `page.tsx`, `globals.css`)
- `src/components` — `CinematicVideo`, `CustomCursor`, `LenisProvider`, `Navbar`
- `src/components/sections` — `Hero`, `About`, `Experience`, `Projects`, `Skills`, `Certifications`, `Contact`
- `src/data/resume.ts` — all résumé content in one typed file; edit this to update copy
- `public/video/portfolio-background.mp4` — the background video used by the cinematic engine
- `public/Bhavan_Seshu_Pokala_Resume.pdf` — the résumé served by the "Download Résumé" button

## Notes

- The résumé you uploaded is for a **Senior Project Engineer in Enterprise Systems & Data Center Operations** (BMC Control-M, HPE Tandem NonStop, IBM AS/400, mainframe) — not a full-stack/AI engineer. The copy, eyebrow, skill categories, and metrics were adapted to reflect that background accurately; no LeetCode/CodeChef stats were invented since the résumé doesn't mention them. The hero headline and visual system follow your brief exactly.
- The three certifications listed (Google Cloud GenAI L0–L3, AWS Cloud Admin L1, Azure Fundamentals AZ-900) drive the circular gallery — add more entries to `certifications` in `resume.ts` and the gallery will redistribute automatically.
- Because this was generated without a live browser, do a visual pass after `npm run dev` and tune spacing/timing constants (LERP factor, drag friction, radius) to taste.
