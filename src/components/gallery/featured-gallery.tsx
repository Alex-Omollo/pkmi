import Image from "next/image";
import Link from "next/link";
import { getFeaturedPhotos, GALLERY_INDEX_LIVE } from "@/data/gallery";

export function FeaturedGallery() {
  const all = getFeaturedPhotos(6);
  if (all.length < 3) return null; // not enough curated photos to look good
  const photos = all.slice(0, all.length >= 6 ? 6 : 3); // layouts are designed for 3 or 6

  return (
    <section className="moments-section section-pad">
      <div className="container">
        <div className="section-heading-row">
          <div>
            <span className="eyebrow">From the gallery</span>
            <h2>
              Our Moments. Our Mission. <em>Our Journey.</em>
            </h2>
          </div>
          <Link className="button" href="/gallery">
            View the full gallery <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="moments-grid">
          {photos.map((p) => (
            <Link
              key={p.src}
              href={`/gallery/${p.slug}`}
              className="moments-tile"
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 800px) 50vw, 33vw"
              />
              <span className="moments-caption">
                <strong>{p.eventTitle}</strong>
                <small>{p.year}</small>
              </span>
            </Link>
          ))}
          {/* {GALLERY_INDEX_LIVE && (
            <Link className="button" href="/gallery">
              View the full gallery <span aria-hidden="true">↗</span>
            </Link>
          )} */}
        </div>
      </div>
    </section>
  );
}
