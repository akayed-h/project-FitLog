# FitLog — Workout Library & Planner

A dark, no-nonsense gym companion built with Next.js. Browse a library of lifts pulled live from an API, open a detailed page for any workout, and lock it into today's plan or save it for later — all backed by persistent local storage.

> Train with intent. Log every set.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Design Notes](#design-notes)
- [Known Considerations](#known-considerations)

---

## Overview

FitLog is a two-page workout planning app:

- **Home (`/`)** — a hero section and a searchable, sortable library of 12 workouts fetched from a public API.
- **Workout Detail (`/workout/[id]`)** — a dynamic route showing full specs, step-by-step instructions, and actions to add a workout to today's plan or save it for later.
- **My Plan (`/my-plan`)** — a running log of today's planned lifts and a separate saved list, with live totals for exercises, minutes, and calories.

State (plan, saved items, completed status) persists across reloads via `localStorage`, so a user's plan survives closing the tab.

---

## Features

1. **Live data fetching** — workouts are fetched from the FitLog API on the client, with a loading animation, error state, and retry action.
2. **Dynamic detail pages** — each workout gets its own route (`/workout/[id]`) with specs, instructions, and category tags.
3. **Plan & Save actions** — add a lift to today's plan (capped at 5) or save it for later, with toast notifications and live navbar badge counters.
4. **My Plan dashboard** — tabbed view of Today's Plan / Saved, live metrics (exercises, minutes, calories), mark-as-done, and remove actions.
5. **Search & sort** — filter the library or plan by workout name or muscle group, and sort by duration, calories, or rating.
6. **Persistent state** — plan and saved lists are stored in `localStorage` so they survive a page reload.
7. **Responsive design** — layouts adapt cleanly from mobile through desktop.
8. **Custom 404 page** — any invalid route (or missing workout ID) shows a branded not-found page instead of a crash.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 15](https://nextjs.org/) (App Router) | Routing, server/client components, dynamic routes |
| [React 19](https://react.dev/) | UI, hooks (`useState`, `useEffect`), Context API |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling and responsive design |
| [lucide-react](https://lucide.dev/) | Icon set |
| `next/font` (Oswald + Inter) | Display and body typography |

---

## Project Structure

```
fitlog/
├── app/
│   ├── layout.jsx          # Root layout — fonts, providers, navbar/footer
│   ├── page.jsx            # Home page (Hero + Library)
│   ├── not-found.jsx       # Global 404
│   ├── my-plan/
│   │   └── page.jsx        # My Plan page
│   └── workout/[id]/
│       └── page.jsx        # Dynamic workout detail route
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── Library.jsx         # Fetch, search, sort, grid + loading/error states
│   ├── WorkoutCard.jsx
│   ├── WorkoutDetail.jsx
│   ├── PlanView.jsx        # My Plan page logic + UI
│   ├── Toast.jsx
│   ├── Stats.jsx / Tags.jsx / Thumb.jsx
│   └── NotFoundView.jsx
├── context/
│   └── PlanContext.jsx     # Global plan/saved state + localStorage sync
├── lib/
│   └── api.js              # Fetch + normalize API data, search/sort helpers
├── public/
│   ├── logo.png
│   └── banner.png
└── README.md
```

---

## Getting Started

**Prerequisites:** Node.js 18.18+ and npm.

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

No environment variables are required — the API base URL is a public endpoint and is set directly in `lib/api.js`.

---

## API Reference

FitLog consumes a public workout API:

| Endpoint | Description |
|---|---|
| `GET /api/fitlog` | Returns all workouts |
| `GET /api/fitlog/:id` | Returns a single workout by ID |

Raw fields are mapped to a consistent shape in `lib/api.js` via `normalize()`, so the rest of the app never touches raw API field names directly. If the API adds or renames fields, update the fallback chains in that one function.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run Next.js linting |

---

## Deployment

The app is ready to deploy on [Vercel](https://vercel.com/):

1. Push this repository to GitHub.
2. Import it into Vercel.
3. Deploy — no environment variables needed.

Because routing is handled by the Next.js App Router on the server, reloading any page directly (including `/my-plan` and `/workout/[id]`) works correctly with no extra configuration.

---

## Design Notes

- **Palette:** near-black background (`#0f1115`) with panel surfaces (`#15171d`), hairline borders (`#232732`), and a single acid-green accent (`#ccff00`) used sparingly for emphasis and primary actions.
- **Type:** Oswald for display/headline text, Inter for body copy.
- **Motion:** kept minimal and purposeful — a spinner for loading states, transitions on hover/focus, no decorative animation.

---

## Known Considerations

- Workout images are served from an external host and rendered with a plain `<img>` tag to avoid remote-image allowlist configuration.
- The plan cap (5 lifts) and metrics are derived entirely from client-side state; there is no backend persistence beyond `localStorage`.

---

## License

This project was built as a learning assignment and is provided as-is for educational use.
