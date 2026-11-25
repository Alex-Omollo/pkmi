import sharp from "sharp";
import { readdir, mkdir, stat, readFile, writeFile, rm } from "node:fs/promises";
import path from "node:path";

// gallery-originals/<year>/<event-slug>/<any filenames>
//   -> public/images/gallery/<event-slug>/<event-slug>-<n>.webp
const SRC = "gallery-originals";
const OUT = "public/images/gallery";
const MANIFEST = path.join(OUT, ".manifest.json");
const MAX = 2400;
const QUALITY = 85;
const EXTS = new Set([".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp"]);

const args = new Set(process.argv.slice(2));
const DRY = args.has("--dry"); // preview only, writes nothing
const FORCE = args.has("--force"); // reprocess everything
const PRUNE = args.has("--prune"); // delete output files no longer produced

const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const natural = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" }).compare;

async function* eventDirs(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = entries
    .filter((e) => e.isFile() && EXTS.has(path.extname(e.name).toLowerCase()))
    .map((e) => e.name)
    .sort(natural);
  if (files.length) yield { dir, files };
  for (const e of entries) if (e.isDirectory()) yield* eventDirs(path.join(dir, e.name));
}

const manifest = await readFile(MANIFEST, "utf8").then(JSON.parse).catch(() => ({}));
const next = {};
const seen = new Set();
let done = 0, skipped = 0;

for await (const { dir, files } of eventDirs(SRC)) {
  const slug = kebab(path.basename(dir));
  if (dir === SRC || /^\d{4}$/.test(slug)) {
    console.warn("⚠ skipped (photos not inside an event folder):", dir);
    continue;
  }
  if (seen.has(slug)) {
    console.warn(`⚠ skipped (duplicate event slug "${slug}"):`, dir);
    continue;
  }
  seen.add(slug);

  const destDir = path.join(OUT, slug);
  if (!DRY) await mkdir(destDir, { recursive: true });
  const produced = new Set();

  for (const [i, name] of files.entries()) {
    const src = path.join(dir, name);
    const destName = `${slug}-${i + 1}.webp`;
    const dest = path.join(destDir, destName);
    const key = `${slug}/${destName}`;
    const { mtimeMs, size } = await stat(src);
    const sig = `${path.relative(SRC, src)}|${mtimeMs}|${size}`;

    produced.add(destName);
    next[key] = sig;

    const exists = await stat(dest).then(() => true, () => false);
    if (!FORCE && exists && manifest[key] === sig) { skipped++; continue; }

    console.log(`${DRY ? "·" : "✓"} ${path.relative(SRC, src)} -> ${key}`);
    if (!DRY) {
      await sharp(src)
        .rotate()
        .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(dest);
    }
    done++;
  }

  if (PRUNE) {
    for (const f of await readdir(destDir).catch(() => [])) {
      if (f.endsWith(".webp") && !produced.has(f)) {
        console.log(`${DRY ? "·" : "✗"} prune ${slug}/${f}`);
        if (!DRY) await rm(path.join(destDir, f));
      }
    }
  }
}

if (!DRY) await writeFile(MANIFEST, JSON.stringify(next, null, 2));
console.log(`\n${DRY ? "Dry run: " : ""}${done} processed, ${skipped} up to date.`);