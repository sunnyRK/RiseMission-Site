import { ImageResponse } from "next/og";

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

/**
 * 1200×630 share card + generated blog cover: /og?title=...&eyebrow=...
 * Sunrise gradient + the real app icon + headline.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? "Rise Mission").slice(0, 110);
  const eyebrow = (searchParams.get("eyebrow") ?? "Alarm clock for heavy sleepers").slice(0, 40);
  const size = title.length > 70 ? 56 : title.length > 45 ? 66 : 78;
  const icon = await appIcon(new URL(req.url).origin);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(160deg, #fff5e3 0%, #fafafa 48%, #eef1ff 100%)",
          color: "#16141f",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* sun */}
        <div
          style={{
            position: "absolute",
            right: -120,
            bottom: -220,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "radial-gradient(circle, #ffcf6b 0%, #f5a524 45%, rgba(245,165,36,0) 72%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={icon} width={56} height={56} alt="" style={{ borderRadius: 14 }} />
          <div style={{ fontSize: 30, fontWeight: 700 }}>Rise Mission</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 700,
              color: "#2f5bff",
              marginBottom: 18,
            }}
          >
            {eyebrow}
          </div>
          <div style={{ fontSize: size, fontWeight: 700, lineHeight: 1.06, letterSpacing: -2 }}>{title}</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#46444f" }}>risemission.app</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable" },
    },
  );
}
