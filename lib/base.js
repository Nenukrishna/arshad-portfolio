// GitHub Pages serves the site from /<repo>/, so every asset URL needs that
// prefix. Vercel and local dev serve from the root and set nothing.
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const asset = (p) => `${BASE}${p}`;
