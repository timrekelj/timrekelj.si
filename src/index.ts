/**
 * timrekelj.si — Cloudflare Worker
 *
 * Serves the static personal site from Workers Static Assets.
 * Replicates the caching behavior of the previous nginx config:
 *   - HTML pages: no-cache (always revalidate)
 *   - Static assets (images, fonts): long-lived immutable cache
 */

export interface Env {
  ASSETS: Fetcher;
}

const HTML_NO_CACHE = "no-cache";
const ASSET_IMMUTABLE_CACHE = "public, max-age=31536000, immutable";

function cacheControlFor(path: string): string {
  if (path === "/" || path === "/index.html") return HTML_NO_CACHE;
  if (/\.(png|jpe?g|gif|webp|svg|woff2?|ttf|otf|css|js)$/i.test(path)) {
    return ASSET_IMMUTABLE_CACHE;
  }
  return HTML_NO_CACHE;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Serve the asset, falling back to index.html for unknown paths (SPA-style)
    const assetPath = path === "/" ? "/index.html" : path;
    let response = await env.ASSETS.fetch(new URL(assetPath, url.origin));

    // If the asset doesn't exist, serve index.html (client-side routing fallback)
    if (response.status === 404) {
      response = await env.ASSETS.fetch(new URL("/index.html", url.origin));
    }

    // Clone so we can add headers without mutating the original
    const headers = new Headers(response.headers);
    headers.set("Cache-Control", cacheControlFor(path));

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
} satisfies ExportedHandler<Env>;
