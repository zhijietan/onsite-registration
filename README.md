# Onsite Archive

Archive of onsite events curated by Zhijie Tan. Lives at [onsite.us-zj.com](https://onsite.us-zj.com).

## Stack

Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript. Deployed on Vercel.

## Add an event

1. Drop a flyer image at `public/image/onsite/{slug}.jpg`.
2. Create `config/events/{slug}.ts` exporting an `OnsiteEventConfig`.
3. Import it in `config/events/index.ts` and add to `allConfigs`.

## Local dev

```bash
npm install
npm run dev
```
