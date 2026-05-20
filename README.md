# Onsite Archive

Archive of onsite events curated by Zhijie Tan. Lives at [onsite.us-zj.com](https://onsite.us-zj.com).

## Stack

Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript. Deployed on Vercel.

## Active event pages

| Slug | Date | URL |
|---|---|---|
| GrandOpening20260530 | Sat May 30, 2026 | /GrandOpening20260530 |
| GrandOpening20260613 | Sat Jun 13, 2026 | /GrandOpening20260613 |

Each page is bilingual (Chinese default / English toggle), submits RSVPs to Notion, and fires a Telegram notification.

## Add a new event page

See **[docs/retro-v1.md](docs/retro-v1.md)** for the full recipe and checklist.
Short version — 5 files, ~10 lines total:

1. `config/events/{slug}.ts` — new config
2. `config/events/index.ts` — import + register
3. `app/[slug]/page.tsx` — add slug to if-condition
4. `components/rsvp/GrandOpeningPage.tsx` — add to `EVENT_DATES`
5. `app/api/rsvp/route.ts` — add to `EVENT_LABELS`

Then `git push main` — Vercel auto-deploys.

## Local dev

```bash
npm install
npm run dev
```

Requires `.env.local` with `NOTION_API_KEY`, `NOTION_DATABASE_ID`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.
