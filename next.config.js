/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages
  output: 'export',
  // This repo deploys to https://drthaodao3101.github.io (a USER page at the
  // domain root), so no basePath/assetPrefix is needed. If you ever rename the
  // repo to a PROJECT page (e.g. /portfolio), set basePath: '/portfolio'.
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
};
module.exports = nextConfig;
