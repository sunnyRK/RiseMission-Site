import { llmsFullTxt } from "@/lib/llms";

/** llms-full.txt: the site's key content in one Markdown file (built in src/lib/llms.ts). */
export function GET() {
  return new Response(llmsFullTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
