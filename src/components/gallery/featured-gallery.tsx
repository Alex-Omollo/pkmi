import Link from "next/link";
import { getFeaturedPhotos } from "@/data/gallery";
import { MomentsRotator } from "./moments-rotator";

export function FeaturedGallery() {
  const pool = getFeaturedPhotos(24);
  if (pool.length < 3) return null;
  const slots = pool.length >= 6 ? 6 : 3; // layouts are designed for 3 or 6

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
        <MomentsRotator pool={pool} slots={slots} />
      </div>
    </section>
  );
}
