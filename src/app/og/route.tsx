import { renderCover } from "@/lib/cover";

// Real app icon (the exact file the nav logo uses), fetched from our own
// static assets so it works on Vercel without bundling public/ into the function.
let iconData: Promise<string> | null = null;
function appIcon(origin: string) {
  iconData ??= fetch(new URL("/assets/icon.png", origin))
    .then((r) => r.arrayBuffer())
    .then((b) => `data:image/png;base64,${Buffer.from(b).toString("base64")}`)
    .catch((e) => {
      iconData = null;
      throw e;
    });
  return iconData;
}

/** Dynamic share card: /og?title=...&eyebrow=... */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const icon = await appIcon(new URL(req.url).origin);
  return renderCover({
    title: searchParams.get("title") ?? "Rise Mission",
    eyebrow: searchParams.get("eyebrow") ?? "Alarm clock for heavy sleepers",
    icon,
  });
}
