"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PhotoLightbox } from "@/components/gallery/photo-lightbox";
import type { EventCardData, PosterCard } from "@/data/events";

const endOf = (e: EventCardData) => e.endDate ?? e.startDate;

export function EventsBrowser({
  events,
  posters,
  builtOn,
}: {
  events: EventCardData[];
  posters: PosterCard[];
  builtOn: string;
}) {
  const [today, setToday] = useState(builtOn);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    setToday(new Date().toLocaleDateString("en-CA"));
  }, []);

  const upcoming = events
    .filter((e) => endOf(e) >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));

  return (
    <>
      <section className="section-pad">
        <div className="container">
          <div className="section-intro">
            <span className="eyebrow">Upcoming</span>
            <h2>
              Events & <em>gatherings.</em>
            </h2>
            <p>
              PKMI’s activities include national conferences, National Kesha,
              prayer and fasting retreats, Kizazi Phenomenal and leadership
              prayer gatherings.
            </p>
          </div>

          {upcoming.length === 0 ? (
            <div className="notice-panel">
              <span className="notice-icon">✦</span>
              <div>
                <h3>Upcoming events will be announced here.</h3>
                <p>
                  Check back for confirmed dates, venues, registration details
                  and event updates. We will publish verified information as it
                  becomes available.
                </p>
              </div>
            </div>
          ) : (
            <div className="upcoming-list">
              {upcoming.map((e) => (
                <article className="upcoming-item" key={e.slug}>
                  <div className="upcoming-date">
                    <strong>{e.badgeDay}</strong>
                    <span>{e.badgeMonth}</span>
                  </div>
                  <div>
                    <span className="eyebrow">{e.category}</span>
                    <h3>{e.title}</h3>
                    <p className="event-meta">
                      {e.dateLabel} · {e.venue}, {e.location}
                    </p>
                    <p className="event-summary">{e.summary}</p>
                  </div>
                  {e.registerUrl && (
                    <a className="button" href={e.registerUrl}>
                      Register ↗
                    </a>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {posters.length > 0 && (
        <section className="soft-section section-pad">
          <div className="container">
            <div className="section-heading-row">
              <div>
                <span className="eyebrow">Previous</span>
                <h2>
                  Stories, moments <em>& milestones.</em>
                </h2>
              </div>
              <Link className="text-link" href="/gallery">
                Full gallery <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="related-grid">
              {posters.map((p, i) => (
                <div key={p.src} className="related-card event-card">
                  <button
                    type="button"
                    className="event-card-image is-poster"
                    aria-label={`View poster: ${p.title} ${p.year}`}
                    onClick={() => setActive(i)}
                  >
                    <Image
                      src={p.src}
                      alt={`Poster for ${p.title} ${p.year}`}
                      fill
                      sizes="(max-width: 800px) 100vw, 360px"
                    />
                  </button>
                  <span className="eyebrow">{p.year}</span>
                  <h3>{p.title}</h3>
                  {p.galleryHref && (
                    <Link className="text-link" href={p.galleryHref}>
                      View photos <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {active !== null && (
        <PhotoLightbox
          photos={posters.map((p) => ({
            src: p.src,
            alt: `Poster for ${p.title} ${p.year}`,
            caption: `${p.title} · ${p.year}`,
          }))}
          index={active}
          onClose={() => setActive(null)}
          onNavigate={setActive}
        />
      )}
    </>
  );
}
