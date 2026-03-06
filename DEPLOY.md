# Deploy checklist

## Before first deploy

1. **Install and build**
   ```bash
   npm ci
   npm run build
   ```
   The build must pass. If your CI runs `npm run lint`, fix or relax lint rules (there are some existing warnings/errors; the app builds and runs fine).

2. **Optional assets** (referenced in `app/layout.js`; site works without them)
   - `public/favicon.ico` — browser tab icon
   - `public/og-image.png` — 1200×630px for social previews (Open Graph / Twitter)
   - `public/apple-touch-icon.png` — iOS home screen icon

3. **Environment**
   - No env vars are required. Add a `.env.example` if you add any later.

## Deploy on Vercel (recommended)

- Push to GitHub and import the repo in [Vercel](https://vercel.com).
- Vercel detects Next.js and uses `npm run build` and `npm run start`.
- Set **Root Directory** to `.` (or leave default).
- After deploy, set **Production URL** in your domain provider if using a custom domain (e.g. suprnova.co).

## Other platforms

- **Node server**: `npm run build && npm run start` (port from `PORT` or 3000).
- **Docker**: Use the [Next.js standalone output](https://nextjs.org/docs/app/api-reference/next-config-js/output#standalone) by adding `output: 'standalone'` in `next.config.mjs`, then build and run the standalone server in the image.
