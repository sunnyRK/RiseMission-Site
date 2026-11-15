import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
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
