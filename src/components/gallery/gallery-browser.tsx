"use client";

import Link from "next/link";
import { useState } from "react";
import type { EventView } from "@/data/gallery";
import { GalleryFilters } from "./gallery-filters";
import { GalleryGrid } from "./gallery-grid";

type Props = {
  events: EventView[];
  years: number[];
  categories: readonly string[];
};

export function GalleryBrowser({ events, years, categories }: Props) {
  const [year, setYear] = useState<number | "all">("all");
  const [category, setCategory] = useState("all");

  const filtered = events.filter(
    (e) =>
      (year === "all" || e.year === year) &&
      (category === "all" || e.category === category),
  );

  return (
    <>
      <GalleryFilters
        years={years}
        categories={categories}
        year={year}
        category={category}
        onYear={setYear}
        onCategory={setCategory}
      />
      {filtered.length === 0 && (
        <p className="gallery-empty">No galleries match these filters yet.</p>
      )}
      {filtered.map((event, i) => (
        <article className="event-section" key={event.slug}>
          <header className="event-section-head">
            <div>
              <span className="eyebrow">
                {event.category} · {event.year}
              </span>
              <h3>
                <Link href={`/gallery/${event.slug}`}>{event.title}</Link>
              </h3>
              <p className="event-meta">
                {event.dateLabel} · {event.venue}, {event.location}
              </p>
              <p className="event-summary">{event.summary}</p>
            </div>
            <Link className="text-link" href={`/gallery/${event.slug}`}>
              View full collection ({event.photos.length}){" "}
              <span aria-hidden="true">→</span>
            </Link>
          </header>
          <GalleryGrid
            photos={event.photos}
            limit={6}
            priorityCount={i === 0 ? 3 : 0}
          />
        </article>
      ))}
    </>
  );
}
