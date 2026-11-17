/**
 * Web-optimised video variants + WebP posters (public/assets/v/).
 *
 * The original H.264 files in /assets and /assets/reel stay put: sitemap,
 * VideoObject JSON-LD and the "Download MP4" link point at them, and old URLs
 * must keep working. Players list the smaller variants first; the browser takes
 * the first `type` it can decode (AV1 → HEVC → original H.264).
 *
 * Variant filenames carry a content hash, so /assets/v/* is served
 * `immutable` (next.config.ts). Re-encode = new hash = new URL; never
 * overwrite a file in place. Recipe (ffmpeg 7+, source = the H.264 original):
 *
 *   ffmpeg -i in.mp4 -an -c:v libsvtav1 -preset 4 -crf 40 -g 300 \
 *     -pix_fmt yuv420p10le -svtav1-params tune=0 -tag:v av01 -movflags +faststart out.av1.mp4
 *   ffmpeg -i in.mp4 -an -c:v libx265 -preset slow -crf 29 -tag:v hvc1 \
 *     -pix_fmt yuv420p -movflags +faststart out.hevc.mp4
 *   posters: sharp(jpg).webp({ quality: 80, effort: 6 })
 *   then: name.<first 8 hex of sha256>.ext
 *
 * SSIM vs the original: 0.9965+ for every variant.
 */

export type VideoSource = { src: string; type: string };

export type OptimisedVideo = {
  /** Poster to put in the `poster` attribute (WebP; all iOS 14+ / evergreen). */
  poster: string;
  /** `<source>` list, best codec first, original H.264 last. */
  sources: readonly VideoSource[];
};

/**
 * v1.6 media (2026-11-17). Originals in /assets/v16/.
 *   reel 16:9  3,690 KB H.264 -> 1,459 KB AV1 / 1,687 KB HEVC
 *   reel 9:16  3,942 KB H.264 -> 1,621 KB AV1 / 1,819 KB HEVC
 *   app demo     613 KB H.264 ->   350 KB AV1 /   378 KB HEVC
 */

/** v1.6 animated explainer, 1920x1080, 30 s. */
export const REEL_V16_16X9_VIDEO: OptimisedVideo = {
  poster: "/assets/v/rise-mission-1-6-reel-16x9-poster.cc6d91ec.webp",
  sources: [
    { src: "/assets/v/rise-mission-1-6-reel-16x9.av1.d0ecea9d.mp4", type: 'video/mp4; codecs="av01.0.08M.10"' },
    { src: "/assets/v/rise-mission-1-6-reel-16x9.hevc.1eb39fd4.mp4", type: 'video/mp4; codecs="hvc1.1.6.L120.B0"' },
    { src: "/assets/v16/rise-mission-1-6-reel-16x9.mp4", type: 'video/mp4; codecs="avc1.640032"' },
  ],
};

/** v1.6 vertical cut, 1080x1920, 30 s. */
export const REEL_V16_9X16_VIDEO: OptimisedVideo = {
  poster: "/assets/v/rise-mission-1-6-reel-9x16-poster.749d3cca.webp",
  sources: [
    { src: "/assets/v/rise-mission-1-6-reel-9x16.av1.7fcf902b.mp4", type: 'video/mp4; codecs="av01.0.08M.10"' },
    { src: "/assets/v/rise-mission-1-6-reel-9x16.hevc.eaf5cbdf.mp4", type: 'video/mp4; codecs="hvc1.1.6.L120.B0"' },
    { src: "/assets/v16/rise-mission-1-6-reel-9x16.mp4", type: 'video/mp4; codecs="avc1.640032"' },
  ],
};

/** v1.6 real-app screen recording, 1280x720, 24 s. */
export const DEMO_V16_VIDEO: OptimisedVideo = {
  poster: "/assets/v/rise-mission-1-6-app-demo-poster.c452a73f.webp",
  sources: [
    { src: "/assets/v/rise-mission-1-6-app-demo.av1.44aa623c.mp4", type: 'video/mp4; codecs="av01.0.05M.10"' },
    { src: "/assets/v/rise-mission-1-6-app-demo.hevc.ad9aae5c.mp4", type: 'video/mp4; codecs="hvc1.1.6.L93.B0"' },
    { src: "/assets/v16/rise-mission-1-6-app-demo.mp4", type: 'video/mp4; codecs="avc1.64001F"' },
  ],
};

/*
 * Legacy (v1.0 demo, v1.5 reel). Files stay on disk: old sitemap/JSON-LD URLs
 * must keep working. Not shown in /gallery any more; pages should move to the
 * V16 sets above.
 */

/** 30 s product demo, 1280×720. 1,163 KB H.264 → 681 KB AV1 / 839 KB HEVC. */
export const LEGACY_DEMO_VIDEO: OptimisedVideo = {
  poster: "/assets/v/demo-poster.8d3f3448.webp",
  sources: [
    { src: "/assets/v/demo.av1.0a740f8e.mp4", type: 'video/mp4; codecs="av01.0.05M.10"' },
    { src: "/assets/v/demo.hevc.92a425fc.mp4", type: 'video/mp4; codecs="hvc1.1.6.L93.B0"' },
    { src: "/assets/demo.mp4", type: 'video/mp4; codecs="avc1.64001F"' },
  ],
};

/** Animated explainer, 1920×1080. 1,999 KB H.264 → 705 KB AV1 / 886 KB HEVC. */
export const LEGACY_REEL_16X9_VIDEO: OptimisedVideo = {
  poster: "/assets/v/rise-mission-reel-16x9-poster.b39e1849.webp",
  sources: [
    { src: "/assets/v/rise-mission-reel-16x9.av1.34fab2e0.mp4", type: 'video/mp4; codecs="av01.0.08M.10"' },
    { src: "/assets/v/rise-mission-reel-16x9.hevc.a036db61.mp4", type: 'video/mp4; codecs="hvc1.1.6.L120.B0"' },
    { src: "/assets/reel/rise-mission-reel-16x9.mp4", type: 'video/mp4; codecs="avc1.640032"' },
  ],
};

/** Vertical cut, 1080×1920. 2,265 KB H.264 → 776 KB AV1 / 1,040 KB HEVC. */
export const LEGACY_REEL_9X16_VIDEO: OptimisedVideo = {
  poster: "/assets/v/rise-mission-reel-9x16-poster.43d859ee.webp",
  sources: [
    { src: "/assets/v/rise-mission-reel-9x16.av1.68ed0764.mp4", type: 'video/mp4; codecs="av01.0.08M.10"' },
    { src: "/assets/v/rise-mission-reel-9x16.hevc.d64fa728.mp4", type: 'video/mp4; codecs="hvc1.1.6.L120.B0"' },
    { src: "/assets/reel/rise-mission-reel-9x16.mp4", type: 'video/mp4; codecs="avc1.640032"' },
  ],
};

/** Current-version aliases used by the homepage and demo player. */
export const DEMO_VIDEO = DEMO_V16_VIDEO;
export const REEL_16X9_VIDEO = REEL_V16_16X9_VIDEO;
export const REEL_9X16_VIDEO = REEL_V16_9X16_VIDEO;

/** Look up the optimised variant set for an original /assets MP4 URL. */
export function optimisedVideo(originalSrc: string): OptimisedVideo | undefined {
  return [REEL_V16_16X9_VIDEO, REEL_V16_9X16_VIDEO, DEMO_V16_VIDEO, LEGACY_DEMO_VIDEO, LEGACY_REEL_16X9_VIDEO, LEGACY_REEL_9X16_VIDEO].find((v) => v.sources.at(-1)?.src === originalSrc);
}
