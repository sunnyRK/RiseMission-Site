/**
 * The app's clay brand tile (DesignSystem/RMClayBrandTile.swift) as inline SVG:
 * glossy blue squircle, top sheen, rim light, and the puffy sunrise mark with
 * a deep-blue under-layer. Same geometry as the Swift Canvas, in a 100×100 box.
 */

const r2 = (n: number) => Math.round(n * 100) / 100;

// RMClayRiseMark constants mapped into the tile (mark box 66×44, offset y +3).
const S = 66;
const OX = 17;
const OY = 31 + (44 - 0.62 * S) / 2;
const p = (x: number, y: number) => [r2(OX + x * S), r2(OY + y * S)] as const;
const HY = 0.577;
const CX = 0.5;
const SUN_R = 0.29;

const rays = [24, 57, 90, 123, 156]
  .map((deg) => {
    const a = (deg * Math.PI) / 180;
    const [x1, y1] = p(CX + Math.cos(a) * 0.375, HY - Math.sin(a) * 0.375);
    const [x2, y2] = p(CX + Math.cos(a) * 0.545, HY - Math.sin(a) * 0.545);
    return `M${x1} ${y1}L${x2} ${y2}`;
  })
  .join("");
const [sx1, sy] = p(CX - SUN_R, HY);
const [sx2] = p(CX + SUN_R, HY);
const sun = `M${sx1} ${sy}A${r2(SUN_R * S)} ${r2(SUN_R * S)} 0 0 1 ${sx2} ${sy}Z`;
const [hx1, hy] = p(0.05, HY);
const [hx2] = p(0.95, HY);
const horizon = `M${hx1} ${hy}L${hx2} ${hy}`;

export function ClayTile({ size = 108, className = "" }: { size?: number; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" width={size} height={size} className={`rm-clay ${className}`}>
      <defs>
        <linearGradient id="clay-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5B7CFF" />
          <stop offset=".5" stopColor="#2F5BFF" />
          <stop offset="1" stopColor="#1E3FD9" />
        </linearGradient>
        <linearGradient id="clay-under" x1="0" y1=".5" x2="0" y2="1">
          <stop offset="0" stopColor="#0E2499" stopOpacity="0" />
          <stop offset="1" stopColor="#0E2499" stopOpacity=".45" />
        </linearGradient>
        <linearGradient id="clay-sheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".42" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="clay-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".75" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".08" />
          <stop offset="1" stopColor="#0E2499" stopOpacity=".5" />
        </linearGradient>
        <linearGradient id="clay-body" x1="0" y1={OY} x2="0" y2={OY + (HY + 0.09) * S} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".55" stopColor="#FFF1DC" />
          <stop offset="1" stopColor="#FFD9A8" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="29" fill="url(#clay-fill)" />
      <rect width="100" height="100" rx="29" fill="url(#clay-under)" />
      <ellipse cx="50" cy="26" rx="44" ry="26" fill="url(#clay-sheen)" />
      <rect x="1.25" y="1.25" width="97.5" height="97.5" rx="27.8" fill="none" stroke="url(#clay-rim)" strokeWidth="2.5" />
      <g transform="translate(0 2.3)" stroke="#1530A8" strokeOpacity=".55" fill="#1530A8" fillOpacity=".55" strokeLinecap="round">
        <path d={rays} strokeWidth={r2(0.085 * S)} fill="none" />
        <path d={sun} stroke="none" />
        <path d={horizon} strokeWidth={r2(0.09 * S)} />
      </g>
      <g stroke="url(#clay-body)" fill="url(#clay-body)" strokeLinecap="round">
        <path d={rays} strokeWidth={r2(0.085 * S)} fill="none" />
        <path d={sun} stroke="none" />
        <path d={horizon} strokeWidth={r2(0.09 * S)} />
      </g>
      <ellipse cx={r2(OX + (CX - SUN_R * 0.35) * S)} cy={r2(OY + (HY - SUN_R * 0.73) * S)} rx="4.8" ry="2.3" fill="#fff" opacity=".9" />
    </svg>
  );
}
