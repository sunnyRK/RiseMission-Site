/**
 * The 30-second product demo (1280×720). Muted autoplay loop; poster keeps
 * LCP fast. `preload="metadata"` so it doesn't block the page.
 */
export function DemoVideo({ className = "" }: { className?: string }) {
  return (
    <video
      className={`aspect-video w-full rounded-2xl bg-ink object-cover ${className}`}
      poster="/assets/demo-poster.jpg"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      width={1280}
      height={720}
      aria-label="Rise Mission demo: the alarm rings, you complete a wake-up challenge, and you're awake"
    >
      <source src="/assets/demo.mp4" type="video/mp4" />
    </video>
  );
}
