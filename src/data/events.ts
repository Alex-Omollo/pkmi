import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import {
  formatEventDate,
  publishedEvents,
  toEventView,
  type GalleryCategory,
} from "./gallery";

export type ListedEvent = {
  slug: string; // also the poster filename: public/images/events/<slug>.webp
  title: string;
  category: GalleryCategory;
  startDate: string; // ISO "2027-04-19"
  endDate?: string;
  venue: string;
  location: string;
  summary: string;
  registerUrl?: string;
};

// Events WITHOUT a gallery: upcoming ones, and past ones that only have a poster.
// Events that exist in gallery.ts are picked up automatically; don't repeat them here.
export const listedEvents: ListedEvent[] = [
  // {
  //   slug: "grand-mega-levitical-conference-2027",
  //   title: "Grand Mega Levitical Conference",
  //   category: "Conferences",
  //   startDate: "2027-04-19",
  //   endDate: "2027-04-23",
  //   venue: "CORAT Africa",
  //   location: "Karen, Nairobi",
  //   summary: "Verse or one-line theme here.",
  // },
];

export type EventCardData = ListedEvent & {
  dateLabel: string;
  badgeDay: string;
  badgeMonth: string;
  poster?: string;
  galleryHref?: string;
};

const badge = (iso: string, opt: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-GB", { ...opt, timeZone: "UTC" }).format(
    new Date(iso),
  );


const POSTER_DIR = "public/images/events";
// const POSTER_DIR = "events"; // public/events
const POSTER_EXTS = [".webp", ".jpg", ".jpeg", ".png"];

const posterFor = (slug: string) => {
  const ext = POSTER_EXTS.find((x) =>
    existsSync(path.join(process.cwd(), "public", POSTER_DIR, `${slug}${x}`)),
  );
  return ext ? `/${POSTER_DIR}/${slug}${ext}` : undefined;
};

const toCard = (
  e: ListedEvent,
  extra: Partial<EventCardData> = {},
): EventCardData => ({
  slug: e.slug,
  title: e.title,
  category: e.category,
  startDate: e.startDate,
  endDate: e.endDate,
  venue: e.venue,
  location: e.location,
  summary: e.summary,
  registerUrl: e.registerUrl,
  dateLabel: formatEventDate(e),
  badgeDay: badge(e.startDate, { day: "numeric" }),
  badgeMonth: badge(e.startDate, { month: "short" }),
  poster: posterFor(e.slug),
  ...extra,
});

/** Runs at build time only. Serializable, so it can be passed to a client component. */
export function getAllEvents(): EventCardData[] {
  const fromGallery = publishedEvents.map((e) =>
    toCard(e, { galleryHref: `/gallery/${e.slug}` }),
  );
  const gallerySlugs = new Set(publishedEvents.map((e) => e.slug));
  const listed = listedEvents
    .filter((e) => !gallerySlugs.has(e.slug))
    .map((e) => toCard(e));
  return [...fromGallery, ...listed];
}

export type PosterCard = {
  src: string;
  title: string;
  year: number;
  galleryHref?: string;
};


// poster filename (no extension, lowercase) -> gallery slug, when photos exist
const galleryLinks: Record<string, string> = {
  "kizazi-phenomenal-2025-14": "kizazi-phenomenal-2025",
  "kizazi-phenomenal-2026-1": "kizazi-phenomenal-2026",
};

// name part of the filename (before the year) -> display title, where the default reads badly
const titleOverrides: Record<string, string> = {
  "pkm-prayer-fasting": "PKM Prayer & Fasting",
};

const humanize = (s: string) =>
  s
    .split("-")
    .map((w) =>
      w.toLowerCase() === "pkm"
        ? "PKM"
        : w.charAt(0).toUpperCase() + w.slice(1),
    )
    .join(" ");

/** Build time only. Pattern: <name>-<year>[-<n>].webp */
export function getPosters(): PosterCard[] {
  let files: string[] = [];
  try {
    files = readdirSync(path.join(process.cwd(), POSTER_DIR));
  } catch {
    // folder missing: no posters
  }
  return files
    .flatMap((file) => {
      const m = file.match(/^(.+?)-(\d{4})(?:-\d+)?\.webp$/i);
      if (!m) return [];
      const name = m[1].toLowerCase();
      const stem = file.replace(/\.webp$/i, "").toLowerCase();
      const slug = galleryLinks[stem];
      return [
        {
          src: `/images/events/${file}`,
          title: titleOverrides[name] ?? humanize(m[1]),
          year: Number(m[2]),
          galleryHref:
            slug && publishedEvents.some((e) => e.slug === slug)
              ? `/gallery/${slug}`
              : undefined,
        },
      ];
    })
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
}