# timrekelj.si

Personal website deployed as a [Cloudflare Worker](https://workers.cloudflare.com/) with Static Assets.

## Structure

```
├── src/
│   └── index.ts              # Worker entry point (caching headers, SPA fallback)
├── public/                   # Static assets served by the Worker
│   ├── index.html
│   ├── profile.png
│   └── BricolageGrotesque.woff2
├── wrangler.jsonc            # Cloudflare Worker configuration
├── package.json
└── tsconfig.json
```

## Develop locally

```sh
npm install
npm run dev
```

Opens a local dev server (usually at http://localhost:8787).

## Deploy

```sh
npm run deploy
```

Or connect the repo to Cloudflare Pages/Workers for automatic deployments on push.

## Custom domain

In the Cloudflare dashboard, go to **Workers & Pages → timrekelj-si → Settings → Triggers** and add `timrekelj.si` as a custom domain.
