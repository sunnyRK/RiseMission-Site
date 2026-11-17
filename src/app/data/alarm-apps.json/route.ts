import { COMPETITORS, SNAPSHOT_DATE, SNAPSHOT_SOURCE } from "@/lib/competitors";
import { SITE_URL } from "@/lib/site";

/** Open dataset behind /alarm-app-size-comparison (CC BY 4.0). */
export function GET() {
  const body = {
    title: "iPhone alarm app sizes and ratings",
    snapshotDate: SNAPSHOT_DATE,
    source: SNAPSHOT_SOURCE,
    license: "CC BY 4.0. Credit Rise Mission (risemission.app) with a link",
    page: `${SITE_URL}/alarm-app-size-comparison`,
    apps: COMPETITORS.map((c) => ({
      name: c.name,
      developer: c.developer,
      appStoreId: c.id,
      appStoreUrl: c.appStoreUrl,
      sizeMB: c.sizeMB,
      rating: c.rating,
      ratingCount: c.ratingCount,
      minimumIOS: c.minIOS,
      lastUpdated: c.lastUpdated,
      missionsNamedInListing: c.missions,
    })),
  };
  return Response.json(body, { headers: { "Cache-Control": "public, s-maxage=86400" } });
}
