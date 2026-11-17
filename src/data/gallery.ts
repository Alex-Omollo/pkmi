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
  description: string; // intro paragraph on the event page
  cover: string; // must match a file in photos
  published: boolean;
  photos: GalleryPhoto[];
};

/* ---------- CONTENT: replace the example below with real, approved events ---------- */
const events: GalleryEvent[] = [
  {
    slug: "grand-mega-prayer-retreat-2026",
    title: "Grand Mega Prayer Retreat",
    category: "Prayer & Retreats",
    startDate: "2026-11-11",
    endDate: "2026-11-14",
    venue: "Heavens Gate",
    location: "Nakuru",
    summary: "TODO one-line summary.",
    description: "TODO event introduction.",
    cover: "",
    published: false,
    photos: [],
  },
  {
    slug: "dunamis-prayer-breakfast-2026",
    title: "Dunamis Prayer Breakfast",
    category: "Prayer & Retreats",
    startDate: "2026-11-14",
    venue: "Kingdom Seekers Complex",
    location: "Nakuru",
    summary: "TODO one-line summary.",
    description: "TODO event introduction.",
    cover: "",
    published: false,
    photos: [],
  },
  {
    slug: "kizazi-phenomenal-2026",
    title: "Kizazi Phenomenal",
    category: "Family & Children",
    startDate: "2026-10-30",
    venue: "Brethren Fellowship Church",
    location: "Bungoma",
    summary: "TODO one-line summary.",
    description: "TODO event introduction.",
    cover: "",
    published: false,
    photos: [],
  },
  {
    slug: "kizazi-phenomenal-2025",
    title: "Kizazi Phenomenal",
    category: "Family & Children",
    startDate: "2025-12-11",
    endDate: "2025-12-14",
    venue: "Heavens Gate",
    location: "Nakuru",
    summary: "TODO one-line summary.",
    description: "TODO event introduction.",
    cover: "",
    published: false,
    photos: [],
  },
  {
    slug: "grand-levitical-ladies-conference-2026",
    title: "Grand Levitical Ladies Conference",
    category: "Conferences",
    startDate: "2026-04-21",
    endDate: "2026-04-23",
    venue: "CORAT Africa",
    location: "Karen, Nairobi",
    summary: "TODO one-line summary.",
    description: "TODO event introduction.",
    cover: "",
    published: false,
    photos: [],
  },
  {
    slug: "grand-mega-levitical-conference-2026",
    title: "Grand Mega Levitical Conference",
    category: "Conferences",
    startDate: "2026-04-20",
    endDate: "2026-04-24",
    venue: "CORAT Africa",
    location: "Karen, Nairobi",
    summary: "TODO one-line summary.",
    description: "TODO event introduction.",
    cover: "",
    published: false,
    photos: [],
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
