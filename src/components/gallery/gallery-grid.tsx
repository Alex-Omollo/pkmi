"use client";

import Image from "next/image";
import { useState } from "react";
import type { PhotoView } from "@/data/gallery";
import { PhotoLightbox } from "./photo-lightbox";

type Props = {
  photos: PhotoView[];
  limit?: number; // show only the first N tiles; the viewer still browses all
  priorityCount?: number; // above-the-fold tiles to eager-load
};

export function GalleryGrid({ photos, limit, priorityCount = 0 }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const shown = limit ? photos.slice(0, limit) : photos;

  return (
    <>
      <div className="photo-grid">
        {shown.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            className="photo-tile"
            onClick={() => setActive(i)}
            aria-label={`Open photo: ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 520px) 50vw, (max-width: 1050px) 33vw, 260px"
              priority={i < priorityCount}
            />
          </button>
        ))}
      </div>
      {active !== null && (
        <PhotoLightbox
          photos={photos}
          index={active}
          onClose={() => setActive(null)}
          onNavigate={setActive}
        />
      )}
    </>
  );
}
