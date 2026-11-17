import { readdirSync } from "node:fs";
import path from "node:path";

export const GALLERY_INDEX_LIVE = true;

export const categories = [
  "Conferences",
  "Prayer & Retreats",
  "Fellowship",
  "Family & Children",
  "Training",
] as const;
export type GalleryCategory = (typeof categories)[number];

export type GalleryPhoto = {
  file: string; // filename inside public/images/gallery/<slug>/
  alt: string; // meaningful description (required)
  caption?: string;
  featured?: boolean; // eligible for the homepage
};

export type GalleryEvent = {
  slug: string;
  title: string;
  category: GalleryCategory;
  startDate: string; // ISO, e.g. "2025-08-14"
  endDate?: string;
  venue: string;
  location: string;
  summary: string; // one line, used on cards, hero and metadata
  description?: string; // intro paragraph on the event page
  cover: string; // must match a file in photos
  published: boolean;
  photos: GalleryPhoto[];
};

const EXT = ".webp";

const fromFolder = (
  slug: string,
  alt: string,
  featured: number[] = [],
): GalleryPhoto[] => {
  const dir = path.join(process.cwd(), "public/images/gallery", slug);
  let files: string[] = [];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith(EXT));
  } catch {
    // folder not created yet: event stays hidden
  }
  if (process.env.NODE_ENV !== "production" && files.length === 0)
    console.warn(`[gallery] no ${EXT} files for "${slug}" in ${dir}`);
  files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  return files.map((file, i) => ({
    file,
    alt: `${alt} (photo ${i + 1})`,
    featured: featured.includes(i + 1),
  }));
};

/* ---------- CONTENT: replace the example below with real, approved events ---------- */
const events: GalleryEvent[] = [
  {
    slug: "kizazi-phenomenal-2025",
    title: "Kizazi Phenomenal",
    category: "Family & Children",
    startDate: "2025-12-11",
    endDate: "2025-12-14",
    venue: "Heavens Gate",
    location: "Nakuru",
    summary:
      "James 5:17-18 : Elias was a man subject to like passions as we are ...",
    description: "",
    cover: "kizazi-phenomenal-2025-1.webp", // keep your chosen cover
    published: true,
    photos: fromFolder(
      "kizazi-phenomenal-2025",
      "Kizazi Phenomenal 2025 at Heavens Gate, Nakuru",
      [1, 5, 9], // keep your featured picks
    ),
  },
  {
    slug: "kizazi-phenomenal-2026",
    title: "Kizazi Phenomenal",
    category: "Family & Children",
    startDate: "2026-10-30",
    venue: "Brethren Fellowship Church",
    location: "Bungoma",
    summary:
      "Philippians 3:10 : That I may know Him and the power of His resurrection.",
    description: "",
    cover: "kizazi-phenomenal-2026-1.webp",
    published: true,
    photos: fromFolder(
      "kizazi-phenomenal-2026",
      "Kizazi Phenomenal 2026 at Brethren Fellowship Church, Bungoma",
    ),
  },
  {
    slug: "grand-mega-prayer-retreat-2026",
    title: "Grand Mega Prayer Retreat",
    category: "Prayer & Retreats",
    startDate: "2026-11-11",
    endDate: "2026-11-14",
    venue: "Heavens Gate",
    location: "Nakuru",
    summary:
      "Daniel 11:32 : ...but the people that do know their God shall be strong, and do exploits.",
    description: "",
    cover: "grand-mega-prayer-retreat-2026-1.webp",
    published: true,
    photos: fromFolder(
      "grand-mega-prayer-retreat-2026",
      "Grand Mega Prayer Retreat 2026 at Heavens Gate, Nakuru",
    ),
  },
  {
    slug: "dunamis-prayer-breakfast-2026",
    title: "Dunamis Prayer Breakfast",
    category: "Prayer & Retreats",
    startDate: "2026-11-14",
    venue: "Kingdom Seekers Complex",
    location: "Nakuru",
    summary:
      "Psalm 18:29 : For by thee I have run through a troop; and by my God have I leaped over a wall.",
    description: "",
    cover: "dunamis-prayer-breakfast-2026-1.webp",
    published: true,
    photos: fromFolder(
      "dunamis-prayer-breakfast-2026",
      "Dunamis Prayer Breakfast 2026 at Kingdom Seekers Complex, Nakuru",
    ),
  },
  {
    slug: "grand-mega-levitical-conference-2026",
    title: "Grand Mega Levitical Conference",
    category: "Conferences",
    startDate: "2026-04-20",
    endDate: "2026-04-24",
    venue: "CORAT Africa",
    location: "Karen, Nairobi",
    summary: "1st Samuel 30:8 : Pursue, overtake and recover all!",
    description: "",
    cover: "grand-mega-levitical-conference-2026-1.webp",
    published: true,
    photos: fromFolder(
      "grand-mega-levitical-conference-2026",
      "Grand Mega Levitical Conference 2026 at CORAT Africa, Karen, Nairobi",
    ),
  },
  {
    slug: "grand-levitical-ladies-conference-2026",
    title: "Grand Levitical Ladies Conference",
    category: "Conferences",
    startDate: "2026-04-21",
    endDate: "2026-04-23",
    venue: "CORAT Africa",
    location: "Karen, Nairobi",
    summary: "1st Samuel 30:8 : Pursue, overtake and recover all!",
    description: "",
    cover: "grand-levitical-ladies-conference-2026-1.webp",
    published: true,
    photos: fromFolder(
      "grand-levitical-ladies-conference-2026",
      "Grand Levitical Ladies Conference 2026 at CORAT Africa, Karen, Nairobi",
    ),
  },
];
/* ----------------------------------------------------------------------------------- */

export type PhotoView = { src: string; alt: string; caption?: string };
export type EventView = {
  slug: string;
  title: string;
  category: GalleryCategory;
  year: number;
  dateLabel: string;
  venue: string;
  location: string;
  summary: string;
  coverSrc: string;
  coverAlt: string;
  photos: PhotoView[];
};
export type FeaturedPhoto = PhotoView & {
  eventTitle: string;
  year: number;
  slug: string;
};

const fmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export const photoSrc = (slug: string, file: string) =>
  `/images/gallery/${slug}/${file}`;
export const eventYear = (e: GalleryEvent) => Number(e.startDate.slice(0, 4));

export const publishedEvents = events
  .filter((e) => e.published && e.photos.length > 0)
  .sort((a, b) => b.startDate.localeCompare(a.startDate));

export const galleryYears = [...new Set(publishedEvents.map(eventYear))].sort(
  (a, b) => b - a,
);
export const galleryCategories = categories.filter((c) =>
  publishedEvents.some((e) => e.category === c),
);

export const getEvent = (slug: string) =>
  publishedEvents.find((e) => e.slug === slug);

export function formatEventDate(e: GalleryEvent) {
  const start = fmt.format(new Date(e.startDate));
  return e.endDate && e.endDate !== e.startDate
    ? `${start} – ${fmt.format(new Date(e.endDate))}`
    : start;
}

export function toEventView(e: GalleryEvent): EventView {
  const cover = e.photos.find((p) => p.file === e.cover) ?? e.photos[0];
  return {
    slug: e.slug,
    title: e.title,
    category: e.category,
    year: eventYear(e),
    dateLabel: formatEventDate(e),
    venue: e.venue,
    location: e.location,
    summary: e.summary,
    coverSrc: photoSrc(e.slug, cover.file),
    coverAlt: cover.alt,
    photos: e.photos.map((p) => ({
      src: photoSrc(e.slug, p.file),
      alt: p.alt,
      caption: p.caption,
    })),
  };
}

export function getRelatedEvents(
  event: GalleryEvent,
  limit = 3,
): GalleryEvent[] {
  const others = publishedEvents.filter((e) => e.slug !== event.slug);
  const sameCategory = others.filter((e) => e.category === event.category);
  return [
    ...sameCategory,
    ...others.filter((e) => e.category !== event.category),
  ].slice(0, limit);
}

/** Curated: only photos flagged `featured`. One per event (newest first), then fill remaining slots. */
export function getFeaturedPhotos(limit = 6): FeaturedPhoto[] {
  const perEvent = publishedEvents.map((e) =>
    e.photos
      .filter((p) => p.featured)
      .map((p) => ({
        src: photoSrc(e.slug, p.file),
        alt: p.alt,
        caption: p.caption,
        eventTitle: e.title,
        year: eventYear(e),
        slug: e.slug,
      })),
  );
  const out: FeaturedPhoto[] = [];
  for (let round = 0; out.length < limit; round++) {
    let added = false;
    for (const list of perEvent) {
      if (list[round] && out.length < limit) {
        out.push(list[round]);
        added = true;
      }
    }
    if (!added) break;
  }
  return out;
}
