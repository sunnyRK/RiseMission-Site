import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { AppStoreButton } from "@/components/site/app-store-button";
import { JsonLd } from "@/components/seo/json-ld";
import { GALLERY_SHOTS, GALLERY_VIDEOS, abs } from "@/lib/media";
import { optimisedVideo } from "@/lib/perf/video-sources";
import { breadcrumbLd, pageMetadata, publisherRef } from "@/lib/seo";
import { APP_NAME_FULL, CHALLENGES, LIVE_VERSION } from "@/lib/site";

const DESCRIPTION =
  "Screenshots and videos of Rise Mission, the iPhone alarm that makes you prove you're awake: the ringing screen, camera-counted push-ups, challenges, streaks and a 30-second demo.";

export const metadata = pageMetadata({
  title: "Rise Mission Screenshots & Videos",
  description: DESCRIPTION,
  path: "/gallery",
  ogImage: "/assets/reel/rise-mission-reel-16x9-poster.jpg",
});

const iso = (s: number) => `PT${s}S`;

export default function GalleryPage() {
  const [hero, demo, vertical] = GALLERY_VIDEOS;
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: "Rise Mission screenshots and videos",
            description: DESCRIPTION,
            url: abs("/gallery"),
            about: { "@type": "MobileApplication", name: APP_NAME_FULL },
            associatedMedia: GALLERY_SHOTS.map((s) => ({
              "@type": "ImageObject",
              contentUrl: abs(s.src),
              name: s.title,
              caption: s.caption,
              creator: publisherRef(),
              creditText: "Rise Mission",
              copyrightNotice: "© 2026 Sunny Radadiya",
              license: abs("/gallery#image-use"),
              acquireLicensePage: abs("/gallery#image-use"),
            })),
          },
          ...GALLERY_VIDEOS.map((v) => ({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: v.title,
            description: `${v.description} ${v.transcript.join(" ")}`,
            thumbnailUrl: abs(v.poster),
            contentUrl: abs(v.src),
            uploadDate: v.uploadDate,
            duration: iso(v.durationSec),
            width: v.width,
            height: v.height,
            publisher: publisherRef(),
          })),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Gallery", path: "/gallery" },
          ]),
        ]}
      />

      <section className="sunrise-glow dawn">
        <div className="container-rm pb-10 pt-12 text-center md:pt-16">
          <p className="t-eyebrow justify-center">Gallery · Version {LIVE_VERSION}</p>
          <h1 className="t-h1 mx-auto mt-3 max-w-3xl">Rise Mission screenshots &amp; videos</h1>
          <p className="t-lead mx-auto mt-4 max-w-2xl">
            See exactly what happens when the alarm rings: the ringing screen, the {CHALLENGES.length} wake-up challenges, camera-counted
            push-ups and the streak that keeps you going.
          </p>
        </div>
      </section>

      {/* VIDEOS */}
      <section aria-labelledby="videos" className="container-rm">
        <h2 id="videos" className="t-h2">Videos</h2>

        <figure className="mt-8">
          <div className="rounded-[24px] border border-line bg-card p-1.5 shadow-soft sm:p-2">
            <video
              className="aspect-video w-full rounded-[18px] bg-paper-2"
              poster={optimisedVideo(hero.src)?.poster ?? hero.poster}
              controls
              muted
              playsInline
              preload="none"
              width={hero.width}
              height={hero.height}
              aria-label={hero.title}
            >
              {(optimisedVideo(hero.src)?.sources ?? [{ src: hero.src, type: "video/mp4" }]).map((v) => (
                <source key={v.src} src={v.src} type={v.type} />
              ))}
            </video>
          </div>
          <figcaption className="mt-4">
            <h3 className="t-h3">{hero.title}</h3>
            <p className="mt-1 text-ink-2">{hero.description}</p>
            <VideoTranscript lines={hero.transcript} />
          </figcaption>
        </figure>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <figure>
            <div className="rounded-[24px] border border-line bg-card p-1.5 shadow-soft sm:p-2">
              <video
                className="aspect-video w-full rounded-[18px] bg-ink"
                poster={optimisedVideo(demo.src)?.poster ?? demo.poster}
                controls
                muted
                playsInline
                preload="none"
                width={demo.width}
                height={demo.height}
                aria-label={demo.title}
              >
                {(optimisedVideo(demo.src)?.sources ?? [{ src: demo.src, type: "video/mp4" }]).map((v) => (
                <source key={v.src} src={v.src} type={v.type} />
              ))}
              </video>
            </div>
            <figcaption className="mt-4">
              <h3 className="t-h3">{demo.title}</h3>
              <p className="mt-1 text-ink-2">{demo.description}</p>
              <VideoTranscript lines={demo.transcript} />
            </figcaption>
          </figure>

          <figure className="mx-auto w-full max-w-[320px]">
            <div className="rounded-[28px] border border-line bg-card p-1.5 shadow-soft">
              <video
                className="aspect-[9/16] w-full rounded-[22px] bg-paper-2"
                poster={optimisedVideo(vertical.src)?.poster ?? vertical.poster}
                controls
                muted
                playsInline
                preload="none"
                width={vertical.width}
                height={vertical.height}
                aria-label={vertical.title}
              >
                {(optimisedVideo(vertical.src)?.sources ?? [{ src: vertical.src, type: "video/mp4" }]).map((v) => (
                <source key={v.src} src={v.src} type={v.type} />
              ))}
              </video>
            </div>
            <figcaption className="mt-4">
              <h3 className="t-h3">{vertical.title}</h3>
              <p className="mt-1 text-ink-2">{vertical.description}</p>
              <a
                href={vertical.src}
                download
                className="mt-3 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-accent hover:underline"
              >
                <Download aria-hidden className="h-4 w-4" /> Download MP4
              </a>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* SCREENSHOTS */}
      <section aria-labelledby="screenshots" className="container-rm mt-20 md:mt-28">
        <div className="max-w-2xl">
          <h2 id="screenshots" className="t-h2">Screenshots</h2>
          <p className="t-lead mt-3">The App Store screenshots for the current version. Tap any image to open it full size.</p>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {GALLERY_SHOTS.map((s, i) => (
            <li key={s.src}>
              <figure>
                <a href={s.src} target="_blank" rel="noopener" className="block transition hover:-translate-y-1">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={1320}
                    height={2868}
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 280px"
                    preload={i < 2}
                    className="h-auto w-full rounded-[22px] border border-line shadow-[0_24px_50px_-28px_rgb(22_20_31/0.4)]"
                  />
                </a>
                <figcaption className="mt-3">
                  <p className="font-semibold leading-snug text-ink">{s.title}</p>
                  <p className="mt-1 text-[0.88rem] leading-relaxed text-muted">{s.caption}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      {/* IMAGE USE */}
      <section id="image-use" aria-labelledby="image-use-h" className="container-rm mt-16 scroll-mt-24">
        <div className="mx-auto max-w-3xl rounded-2xl border border-line bg-card p-6">
          <h2 id="image-use-h" className="t-h3">Using these images and videos</h2>
          <p className="mt-2 text-ink-2">
            Writers, reviewers and bloggers may use these screenshots, videos and the app icon to write about Rise Mission, with
            credit to &quot;Rise Mission&quot; and a link to risemission.app. Please don&apos;t edit them in a way that changes what
            the app does. For other uses, email us from the <Link href="/about" className="font-semibold text-accent underline underline-offset-4">about page</Link>.
          </p>
        </div>
      </section>

      {/* LEARN MORE */}
      <section className="container-rm mt-20">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { href: "/blog/wake-up-challenges-explained", t: "Every challenge explained", d: "Which wake-up challenge suits you, and why they work." },
            { href: "/blog/push-up-alarm-clock", t: "How the push-up alarm works", d: "On-device rep counting, setup tips and limits." },
            { href: "/alarm-app-size-comparison", t: "Alarm app size comparison", d: "How Rise Mission's size compares with 11 other alarm apps." },
          ].map((c) => (
            <Link key={c.href} href={c.href} className="group rounded-2xl border border-line bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-soft">
              <p className="t-h3">{c.t}</p>
              <p className="mt-1.5 text-[0.92rem] text-ink-2">{c.d}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-accent">
                Read <ArrowRight aria-hidden className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-rm mt-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-[28px] bg-ink px-6 py-10 text-center text-paper">
          <p className="t-h2 !text-[1.6rem] !text-paper">Try it tomorrow morning</p>
          <p className="max-w-md text-paper/75">Set an alarm tonight, run the test alarm, and see if you can snooze it.</p>
          <AppStoreButton placement="gallery" className="!bg-paper !text-ink" />
        </div>
      </section>
    </>
  );
}

function VideoTranscript({ lines }: { lines: string[] }) {
  return (
    <details className="mt-3 rounded-xl border border-line bg-card px-4 py-3 text-[0.92rem]">
      <summary className="cursor-pointer font-semibold text-ink">What happens in this video</summary>
      <ol className="mt-2 list-decimal space-y-1 pl-5 text-ink-2">
        {lines.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ol>
    </details>
  );
}
