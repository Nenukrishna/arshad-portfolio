/** @type {import('next').NextConfig} */
// One codebase, two targets. Vercel (and local dev) serve from the root and
// need no prefix. GitHub Pages serves from /<repo>/ and needs a static export
// plus a basePath, which the build:pages script sets via NEXT_PUBLIC_BASE_PATH.
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  ...(base ? { output: 'export', basePath: base, assetPrefix: base } : {}),
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
