import { llmsTxt } from "@/lib/llms";

/** llms.txt: short, structured index for AI assistants (built in src/lib/llms.ts). */
export function GET() {
  return new Response(llmsTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
