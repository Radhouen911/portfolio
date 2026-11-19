// Pulls CTF writeups from the CTF-Writeups repo at build time and turns them
// into blog entries (tag "CTF"), so they become real, indexable pages.
// Set GITHUB_TOKEN to avoid the unauthenticated API rate limit.
import { mkdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const REPO = "Radhouen911/CTF-Writeups";
const OUT = "src/content/blog/ctf-writeups";
const headers = { "User-Agent": "static-site-build", Accept: "application/vnd.github+json" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const slugify = (s) =>
  s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const q = (s) => JSON.stringify(s);
const enc = (path) => path.split("/").map(encodeURIComponent).join("/");

async function gh(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

try {
  const tree = await gh(`https://api.github.com/repos/${REPO}/git/trees/main?recursive=1`);
  const files = tree.tree.filter((t) => t.type === "blob" && t.path.endsWith("/WRITEUP.md"));
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  for (const f of files) {
    const [ctf, challenge] = f.path.split("/");
    const res = await fetch(`https://raw.githubusercontent.com/${REPO}/main/${enc(f.path)}`);
    if (!res.ok) throw new Error(`${res.status} ${f.path}`);
    const raw = await res.text();
    const commits = await gh(
      `https://api.github.com/repos/${REPO}/commits?path=${encodeURIComponent(f.path)}&per_page=1`
    );
    const date = commits[0]?.commit?.committer?.date ?? new Date().toISOString();

    let body = raw.replace(/^﻿/, "");
    const h1 = body.match(/^# (.+)$/m);
    const title = h1 ? h1[1].trim() : challenge;
    if (h1) body = body.replace(h1[0], "").trimStart();
    // description = first blockquote line that is long enough to be a real sentence
    const quote = [...body.matchAll(/^> (.+)$/gm)].map((m) => m[1].replace(/\*\*/g, "").trim());
    const description = quote.find((l) => l.length > 60) ?? `${challenge} - ${ctf} writeup`;

    const fm = [
      "---",
      `title: ${q(title)}`,
      `description: ${q(description)}`,
      `pubDate: ${date}`,
      `tags: ["CTF", ${q(ctf)}]`,
      `source: ${q(`https://github.com/${REPO}/tree/main/${enc(`${ctf}/${challenge}`)}`)}`,
      "---",
      "",
    ].join("\n");
    await writeFile(`${OUT}/${slugify(ctf)}--${slugify(challenge)}.md`, fm + body);
  }
  console.log(`[sync-writeups] wrote ${files.length} writeups`);
} catch (err) {
  console.warn(`[sync-writeups] ${err.message} - ${existsSync(OUT) ? "keeping previously synced writeups" : "continuing without CTF writeups"}`);
  await mkdir(OUT, { recursive: true });
}
