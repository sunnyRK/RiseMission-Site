import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Tailwind CSS is ~11 KB gzipped: inlining it removes the render-blocking
  // stylesheet round trip for first-time (search) visitors. Client-side
  // navigations still use the cached <link> stylesheet.
  experimental: {
    inlineCss: true,
  },
  images: {
    // AVIF first (~20-30% smaller than WebP), WebP fallback, original last.
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    // Phones top out at 1290 device px; 3840 variants are never needed here.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Static media. /assets/v/* filenames carry a content hash (see
  // src/lib/perf/video-sources.ts), so they are immutable. Other /assets files
  // keep stable, human-readable URLs that may be replaced in place: 1 day in
  // the browser, then served stale while revalidating. HTML is untouched.
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
      {
        source: "/assets/v/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  // Old static-site URLs. App Store Connect points Support at /support.html,
  // and privacy/terms links live inside shipped app builds, so these must
  // keep resolving forever.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/support.html", destination: "/support", permanent: true },
      { source: "/privacy.html", destination: "/privacy", permanent: true },
      { source: "/terms.html", destination: "/terms", permanent: true },
      { source: "/:path*", has: [{ type: "host", value: "www.risemission.app" }], destination: "https://risemission.app/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
