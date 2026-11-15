#!/usr/bin/env node
/**
 * Push URLs to IndexNow (Bing, Yandex, Seznam, Naver; Bing feeds ChatGPT search).
 *   node scripts/indexnow.mjs               -> every URL in the live sitemap
 *   node scripts/indexnow.mjs /blog/a /tools -> just these paths
 * Key file: public/1234604e902a5cca1a9f3587ad63c7d5.txt (must stay deployed). Run AFTER a deploy is live.
 */
const HOST = "risemission.app";
const KEY = "1234604e902a5cca1a9f3587ad63c7d5";
const args = process.argv.slice(2);
let urls;
if (args.length) {
  urls = args.map((p) => (p.startsWith("http") ? p : `https://${HOST}${p.startsWith("/") ? p : "/" + p}`));
} else {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URLs`);
if (res.status >= 400) process.exit(1);
