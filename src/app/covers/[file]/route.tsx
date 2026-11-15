import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { BLOG_POSTS } from "@/lib/blog";
import { renderCover } from "@/lib/cover";

/**
 * Static blog covers at descriptive URLs: /covers/<post-slug>.png
 * Prerendered at build time (generateStaticParams), so the icon is read from
 * disk here, never at request time.
 */
export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ file: `${p.slug}.png` }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const post = BLOG_POSTS.find((p) => `${p.slug}.png` === file);
  if (!post) return new Response("Not found", { status: 404 });
  const icon = `data:image/png;base64,${(await readFile(join(process.cwd(), "public/assets/icon.png"))).toString("base64")}`;
  return renderCover({ title: post.title, eyebrow: post.eyebrow, icon });
}
