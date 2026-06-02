# Creator Content Dashboard — CLAUDE.md

## Project overview

A creator command-centre for **@tenfoldmarc** (TikTok: `@theaihustle7`).
Lives in the `dashboard/` subdirectory of this repo.

## Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 (App Router) | File-system routing, server components, edge-ready |
| Language | TypeScript | Type safety across all data models |
| Styling | Tailwind CSS v4 | `@import "tailwindcss"` — no config file needed |
| UI primitives | Radix UI + custom components | Accessible, unstyled, easy to theme |
| Charts | Recharts | Lightweight, works with client components |
| Icons | lucide-react | Consistent icon set |
| Date handling | date-fns | Lightweight, tree-shakable |
| Variant classes | class-variance-authority + clsx + tailwind-merge | Composable component API |

## Design decisions

### Dark mode + terracotta accent
- Page background: `#0C0C0C`
- Sidebar: `#111111`
- Card surfaces: `#1A1A1A` / `#242424`
- Border: `#2A2A2A`
- Terracotta accent: `#C05A38` (hover: `#D4683F`)
- Muted text: `#888888`

Tailwind v4 custom colours live in `app/globals.css` under `@theme { }`:
```css
--color-terra: #C05A38;
--color-terra-light: #E07A5F;
--color-terra-dark: #9A3E22;
```

### Tailwind v4 — no config file
v4 uses `@import "tailwindcss"` in globals.css. There is no `tailwind.config.ts`. Custom tokens go in `@theme {}`. Arbitrary values (`bg-[#C05A38]`) are used throughout for one-off colours.

### All pages are client components
Every page uses `"use client"` for local state (filters, selected items, clipboard). When you wire up a real backend, extract data fetching into server components and pass props down.

### Recharts + SSR
Recharts requires a DOM. The `Sparkline` component is `"use client"`. SSR generates width: -1 warnings in the build output — these are harmless; charts render correctly in the browser.

### lucide-react icon note
`Instagram` and `Youtube` icons are not exported in lucide-react v1.17. Replaced with `Smartphone` and `PlayCircle` respectively.

## Directory structure

```
dashboard/
├── app/
│   ├── layout.tsx              # Root layout — Sidebar + main area
│   ├── page.tsx                # Redirect → /hook-vault
│   ├── globals.css             # Tailwind v4 + theme tokens
│   ├── hook-vault/page.tsx     # Hook Vault — saved & templatized hooks
│   ├── analytics/page.tsx      # IG/TikTok metrics + sparklines + heaters
│   ├── competitor-tracker/page.tsx  # Top reels from 8 tracked accounts
│   ├── scheduler/page.tsx      # Multi-platform scheduler + caption gen
│   ├── content-calendar/page.tsx   # Monthly grid + side panel
│   └── trending/page.tsx       # 12-source AI news feed
├── components/
│   ├── sidebar.tsx             # Fixed 240px dark sidebar
│   ├── sparkline.tsx           # Recharts area sparkline
│   └── ui/
│       ├── button.tsx
│       ├── badge.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── select.tsx
│       └── tabs.tsx
├── lib/
│   ├── utils.ts                # cn() helper
│   ├── mock-data.ts            # All seed data (replace with API calls)
│   └── apify.ts               # Apify integration stubs (documented)
└── CLAUDE.md                   # This file
```

## Data layer (current state)

All data comes from `lib/mock-data.ts`. Each page imports what it needs.  
`lib/apify.ts` contains fully-documented stubs for every Apify call — replace the mock returns with real HTTP calls when you're ready to go live.

### Apify actors used
| Feature | Actor ID |
|---|---|
| TikTok profile scrape | `clockworks/tiktok-scraper` |
| Competitor reel scrape | `clockworks/tiktok-scraper` |
| RSS feed ingestion | `apify/rss-reader` |

### Competitor scrape schedule
Every Sunday at 8am (cron: `0 8 * * 0`). Wire up via:
- Apify scheduled run → webhook → `/api/competitors/refresh`
- Or a Vercel Cron job calling `lib/apify.ts#scrapeCompetitorReels()`

## Pages

| Route | File | Key features |
|---|---|---|
| `/hook-vault` | `app/hook-vault/page.tsx` | Search, niche/type filters, "Use This" copy |
| `/analytics` | `app/analytics/page.tsx` | 7D/30D/90D sparklines, heater detection (2× median) |
| `/competitor-tracker` | `app/competitor-tracker/page.tsx` | 8 accounts, top 5 reels, save-to-vault |
| `/scheduler` | `app/scheduler/page.tsx` | Platform checkboxes, AI caption, schedule form |
| `/content-calendar` | `app/content-calendar/page.tsx` | Monthly grid, slide-in post detail panel |
| `/trending` | `app/trending/page.tsx` | 12 sources, hook-potential tags, top-5 feed |

## Running locally

```bash
cd dashboard
npm install
npm run dev      # http://localhost:3000
npm run build    # production build check
```

## Environment variables (to add when going live)

```
APIFY_API_TOKEN=          # Apify API token
ANTHROPIC_API_KEY=        # For AI caption generation
SLACK_WEBHOOK_URL=        # 7am trending digest
INSTAGRAM_ACCESS_TOKEN=   # IG Graph API
TIKTOK_ACCESS_TOKEN=      # TikTok for Developers
YOUTUBE_API_KEY=          # YouTube Data API v3
```
