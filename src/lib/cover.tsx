import { ImageResponse } from "next/og";

/**
 * Shared 1200×630 cover renderer (sunrise gradient + real app icon + headline).
 * Used by /og (dynamic share cards) and /covers/<slug>.png (static blog covers
 * with descriptive URLs for Google Images).
 */
export function renderCover({ title, eyebrow, icon }: { title: string; eyebrow: string; icon: string }) {
  title = title.slice(0, 110);
  eyebrow = eyebrow.slice(0, 40);
  const size = title.length > 70 ? 56 : title.length > 45 ? 66 : 78;
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
