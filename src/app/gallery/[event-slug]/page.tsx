import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import {
  eventYear,
  formatEventDate,
  getEvent,
  getRelatedEvents,
  publishedEvents,
  toEventView,
  GALLERY_INDEX_LIVE,
} from "@/data/gallery";

type Props = { params: Promise<{ "event-slug": string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedEvents.map((e) => ({ "event-slug": e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = getEvent((await params)["event-slug"]);
  if (!event) return {};
  const view = toEventView(event);
  return {
    title: event.title,
    description: event.summary,
    openGraph: {
      title: event.title,
      description: event.summary,
      images: [{ url: view.coverSrc, alt: view.coverAlt }],
    },
  };
}

export default async function EventGalleryPage({ params }: Props) {
  const event = getEvent((await params)["event-slug"]);
  if (!event) notFound();

  const view = toEventView(event);
  const related = getRelatedEvents(event).map(toEventView);

  return (
    <>
      <PageHero
        eyebrow={`${event.category} · ${eventYear(event)}`}
        title={event.title}
        description={event.summary}
      />

      <section className="section-pad">
        <div className="container">
          <div className="event-detail two-column">
            <div>
              <span className="eyebrow">About this event</span>
              <p className="lead">{event.description ?? event.summary}</p>
            </div>
            <dl className="event-facts">
              <div>
                <dt>Date</dt>
                <dd>{formatEventDate(event)}</dd>
              </div>
              <div>
                <dt>Venue</dt>
                <dd>{event.venue}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{event.location}</dd>
              </div>
              <div>
                <dt>Photographs</dt>
                <dd>{event.photos.length}</dd>
              </div>
            </dl>
          </div>

          <figure className="event-featured">
            <Image
              src={view.coverSrc}
              alt={view.coverAlt}
              fill
              sizes="(max-width: 1160px) 100vw, 1160px"
              priority
            />
          </figure>

          <div className="section-intro">
            <span className="eyebrow">Complete collection</span>
            <h2>
              Every <em>moment.</em>
            </h2>
          </div>
          <GalleryGrid photos={view.photos} />
          <p className="event-back">
            <Link className="text-link" href="/gallery">
              ← Back to all galleries
            </Link>
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="soft-section section-pad">
          <div className="container">
            <div className="section-intro">
              <span className="eyebrow">Related events</span>
              <h2>
                More from <em>our journey.</em>
              </h2>
            </div>
            <div className="related-grid">
              {related.map((e) => (
                <Link
                  key={e.slug}
                  href={`/gallery/${e.slug}`}
                  className="related-card"
                >
                  <span className="related-image">
                    <Image
                      src={e.coverSrc}
                      alt={e.coverAlt}
                      fill
                      sizes="(max-width: 800px) 100vw, 360px"
                    />
                  </span>
                  <span className="eyebrow">
                    {e.category} · {e.year}
                  </span>
                  <h3>{e.title}</h3>
                  <p>
                    {e.venue}, {e.location}
                  </p>
                </Link>
              ))}
              {GALLERY_INDEX_LIVE && (
                <Link className="button" href="/gallery">
                  View the full gallery <span aria-hidden="true">↗</span>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
