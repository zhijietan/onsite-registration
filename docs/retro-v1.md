# Retro v1 — How to add a new on-site event RSVP page

_Last updated: 2026-05-19. Covers GrandOpening20260530 and GrandOpening20260613._

---

## What this codebase does

`onsite.us-zj.com` is a Next.js 16 App Router site that lists Zhijie's on-site events.
Each event can optionally have a full bilingual (Chinese default / English toggle) RSVP page.
When a visitor submits the form, a row is written to a Notion database and a Telegram notification fires.

---

## Slug naming convention

```
GrandOpening20260530   →   /GrandOpening20260530
GrandOpening20260613   →   /GrandOpening20260613
```

Use `{EventType}{YYYYMMDD}` — no spaces, no dashes.

---

## Recipe: add a new event page in 5 steps

### Step 1 — Create the event config

**File:** `config/events/{slug}.ts`

```ts
import type { OnsiteEventConfig } from "@/types/onsite";

const config: OnsiteEventConfig = {
  slug: "GrandOpening20260613",          // must match filename & URL segment
  title: "Grand Opening Celebration",
  category: "Office",
  date: "2026-06-13",                    // ISO — used for sort order
  dateLabel: "6/13/2026, SAT",
  timeLabel: "6 PM (EST)",
  location: "New York",
  venueAddress: "37-20 Prince St. Suite 2A, Flushing, NY 11354",
  hasRsvpPage: true,
};

export default config;
```

### Step 2 — Register it in the index

**File:** `config/events/index.ts`

```ts
import grandOpening20260613 from "./GrandOpening20260613";

const allConfigs: OnsiteEventConfig[] = [
  grandOpening20260530,
  grandOpening20260613,   // ← add here
];
```

`generateStaticParams` in `app/[slug]/page.tsx` auto-reads this — no other change needed for routing.

### Step 3 — Wire the slug to GrandOpeningPage

**File:** `app/[slug]/page.tsx`

```tsx
if (
  event.slug === "GrandOpening20260530" ||
  event.slug === "GrandOpening20260613"   // ← add here
) {
  return <GrandOpeningPage slug={event.slug} />;
}
```

### Step 4 — Add date strings to the shared component

**File:** `components/rsvp/GrandOpeningPage.tsx`

Find `EVENT_DATES` near the top and add the new slug:

```ts
const EVENT_DATES = {
  GrandOpening20260530: { zh: "2026年5月30日（星期六）", en: "Saturday, May 30, 2026" },
  GrandOpening20260613: { zh: "2026年6月13日（星期六）", en: "Saturday, June 13, 2026" },
  // ← add new entry here
} as const;
```

The component automatically picks up `slug` prop → looks up dates → injects into translations.
Everything else (design, form logic, bilingual toggle) is shared and unchanged.

### Step 5 — Add the event label to the API route

**File:** `app/api/rsvp/route.ts`

```ts
const EVENT_LABELS: Record<string, string> = {
  GrandOpening20260530: "Grand Opening 2026-05-30",
  GrandOpening20260613: "Grand Opening 2026-06-13",   // ← add here
};
```

This label appears in the Notion `Event` select field and in the Telegram notification header.

---

## Integrations

### Notion
- **Database:** "Onsite Registrants" — ID `aa3d5e43-4777-8307-a43f-01eff1e043c3`
- **Integration name:** "onsite" (Internal Access Token type, not public)
- **Token:** stored as `NOTION_API_KEY` in `.env.local` and Vercel env vars
- **Schema:** Full Name (title) · First Name · Last Name · Phone · Email · Total Number of Guests · Registered At (date) · Status (select, default "Registered") · Event (select)
- **Sharing:** The integration must be explicitly connected to the database page in the Notion UI: open the database → `···` → Connections → select "onsite" → "Add to page". Without this, API calls return 404.

### Telegram
- **Bot:** @ZhijieOnsiteBot
- **Token:** `TELEGRAM_BOT_TOKEN` in env
- **Chat ID:** `TELEGRAM_CHAT_ID` in env (owner's personal chat with the bot)
- **Notification format:** Name · Phone · Email · Guests · Time (EST) · Notion DB link
- No SDK needed — plain `fetch` to `https://api.telegram.org/bot{TOKEN}/sendMessage` with `parse_mode: "HTML"`.

### Vercel deployment
- Project: `zhijietans-projects/onsite-registration`
- Link first: `npx vercel link --yes`
- Add env var: `echo "value" | npx vercel env add KEY production --yes`
- All 4 env vars must exist in Vercel: `NOTION_API_KEY`, `NOTION_DATABASE_ID`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
- Push to `main` → auto-deploys. No manual deploy step needed.

---

## Component architecture

```
app/[slug]/page.tsx          — SSG shell; routes hasRsvpPage slugs to components
components/rsvp/
  GrandOpeningPage.tsx       — "use client"; accepts slug prop; bilingual RSVP page
app/api/rsvp/route.ts        — POST /api/rsvp; validates → Notion → Telegram
config/events/
  {slug}.ts                  — per-event config
  index.ts                   — registry
```

`GrandOpeningPage` is designed to be **reused across multiple Grand Opening events**. The only per-event data it needs is:
- `slug` prop (passed from `app/[slug]/page.tsx`)
- A matching entry in the `EVENT_DATES` map inside the component

---

## Design language

Red/gold flyer aesthetic:
- Hero: `bg-gradient-to-br from-red-950 via-red-900 to-red-800`
- Text gradient: `bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 text-transparent bg-clip-text`
- Accent: `text-yellow-300`, `border-yellow-500`
- Chinese default (`lang = "zh"`), English toggle button top-right (fixed, `z-50`)
- In English mode: subtitle + title merge into one large gold `h1`; Chinese divider hidden

---

## Pitfalls & lessons learned

1. **React inputs need real keyboard events.** Setting `input.value` via JS and dispatching a synthetic `Event('input')` does not trigger React state. Always use the Claude MCP `type` action (or real user input) for controlled inputs.

2. **Notion integration must be manually shared.** Creating the integration is not enough. Open the Notion database page → `···` → Connections → find "onsite" → "Add to page". Only then will API calls succeed. Without this, every `notion.pages.create()` returns a 404.

3. **Vercel CLI needs linking first.** `vercel env add` fails with "not_linked" if the project hasn't been linked in the current working directory. Fix: `npx vercel link --yes` first.

4. **`generateStaticParams` is automatic.** It reads from `getAllEventConfigs()`, so adding a new config to `index.ts` is sufficient — no other routing change is needed to make the URL resolve.

5. **TypeScript `as const` on `EVENT_DATES`.** The `Slug` type is derived from `keyof typeof EVENT_DATES`. Adding a new entry automatically expands the valid type — no manual type update needed.

---

## Checklist for a new event

```
[ ] config/events/{slug}.ts                — new event config
[ ] config/events/index.ts                 — import + add to allConfigs
[ ] app/[slug]/page.tsx                    — add slug to the if-condition
[ ] components/rsvp/GrandOpeningPage.tsx   — add to EVENT_DATES map
[ ] app/api/rsvp/route.ts                  — add to EVENT_LABELS
[ ] git add + commit + push main           — Vercel auto-deploys
```

No new files needed beyond the config. No env var changes. No Vercel dashboard visit.
The entire change is ~10 lines of code across 5 files.
