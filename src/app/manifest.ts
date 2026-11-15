import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rise Mission: Alarm Clock for Heavy Sleepers",
    short_name: "Rise Mission",
    description: "The iPhone alarm that makes you prove you're awake. Free tools and guides for waking up on time.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#2f5bff",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
