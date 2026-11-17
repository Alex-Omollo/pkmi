import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const SRC = "gallery-originals"; // gallery-originals/<year>/<event-slug>/<photo>
const OUT = "public/images/gallery";
const MAX = 2400;
const EXTS = new Set([".jpg", ".jpeg", ".png", ".tif", ".tiff"]);
const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

for await (const src of walk(SRC)) {
  const { name, ext, dir } = path.parse(src);
  if (!EXTS.has(ext.toLowerCase())) continue;

  const slug = kebab(path.basename(dir));
  if (dir === SRC || /^\d{4}$/.test(slug)) {
    console.warn("⚠ skipped (photo is not inside an event folder):", src);
    continue;
  }

  const destDir = path.join(OUT, slug);
  const dest = path.join(destDir, `${kebab(name)}.jpg`);
  await mkdir(destDir, { recursive: true });

  const destStat = await stat(dest).catch(() => null);
  if (destStat && destStat.mtimeMs > (await stat(src)).mtimeMs) continue; // up to date

  await sharp(src)
    .rotate()
    .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(dest);
  console.log("✓", dest);
}