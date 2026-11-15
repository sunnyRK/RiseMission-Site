import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IconTile } from "@/components/site/icons";
import { JsonLd } from "@/components/seo/json-ld";
import { ToolCta } from "@/components/tools/tool-shell";
import { breadcrumbLd, collectionPageLd, pageMetadata } from "@/lib/seo";
import { liveTools, toolPath } from "@/lib/tools";

const DESCRIPTION = "Free sleep and alarm tools: a sleep cycle calculator, nap calculator, online alarm clock and more. They run in your browser with no sign-up.";

export const metadata = pageMetadata({
  title: "Free Sleep & Alarm Tools",
  description: DESCRIPTION,
  path: "/tools",
});

export default function ToolsHub() {
  const tools = liveTools();
  return (
    <>
      <JsonLd
        data={[
          collectionPageLd({ name: "Free sleep & alarm tools", description: DESCRIPTION, path: "/tools", urls: tools.map((t) => toolPath(t.slug)) }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Free tools", path: "/tools" },
          ]),
        ]}
      />
      <section className="sunrise-glow dawn">
        <div className="container-rm pb-12 pt-12 text-center md:pt-16">
          <p className="t-eyebrow justify-center">Free · No sign-up · Works in your browser
          </p>
          <h1 className="t-h1 mx-auto mt-3 max-w-2xl">Free tools for better mornings</h1>
          <p className="t-lead mx-auto mt-4 max-w-2xl">Work out when to sleep, when to nap and what snoozing really costs you, then set an alarm you can&apos;t ignore.</p>
        </div>
      </section>
      <div className="container-rm">
        <ul className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
          {tools.map((t, i) => (
            <li key={t.slug}>
              <Link
                href={toolPath(t.slug)}
                className={`group flex h-full flex-col justify-between rounded-[24px] border p-7 transition hover:-translate-y-0.5 hover:shadow-soft ${i === 0 ? "border-accent bg-accent text-accent-ink" : "border-line bg-card"}`}
              >
                <div>
                  <IconTile name={t.icon} size="lg" tone={i === 0 ? "inverse" : "accent"} />
                  <h2 className="mt-6 text-[1.35rem] font-semibold tracking-tight">{t.name}</h2>
                  <p className={`mt-2 ${i === 0 ? "opacity-85" : "text-ink-2"}`}>{t.description}</p>
                </div>
                <span className="mt-8 inline-flex items-center gap-1.5 font-semibold">
                  Open <ArrowRight aria-hidden className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-10 max-w-2xl text-center text-ink-2">
          Want the research behind them? Start with{" "}
          <Link href="/blog/how-to-wake-up-as-a-heavy-sleeper" className="font-semibold text-accent underline underline-offset-4">
            how to wake up as a heavy sleeper
          </Link>{" "}
          or browse <Link href="/blog" className="font-semibold text-accent underline underline-offset-4">all guides</Link>.
        </p>
      </div>
      <ToolCta placement="tools-hub" title="The alarm that checks you're actually up" body="Rise Mission makes you prove you're awake with push-ups, a walk, a QR scan or math. iPhone, iOS 26 or later." />
    </>
  );
}
