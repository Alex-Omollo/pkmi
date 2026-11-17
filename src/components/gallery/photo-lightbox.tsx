"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { PhotoView } from "@/data/gallery";

type Props = {
  photos: PhotoView[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function PhotoLightbox({ photos, index, onClose, onNavigate }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = photos.length;
  const photo = photos[index];

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((index - 1 + count) % count);
      if (e.key === "ArrowRight") onNavigate((index + 1) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, count, onClose, onNavigate]);

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      <button
        ref={closeRef}
        className="lightbox-btn lightbox-close"
        onClick={onClose}
        aria-label="Close viewer"
      >
        ✕
      </button>
      {count > 1 && (
        <>
          <button
            className="lightbox-btn lightbox-prev"
            onClick={() => onNavigate((index - 1 + count) % count)}
            aria-label="Previous photo"
          >
            ←
          </button>
          <button
            className="lightbox-btn lightbox-next"
            onClick={() => onNavigate((index + 1) % count)}
            aria-label="Next photo"
          >
            →
          </button>
        </>
      )}
      <div className="lightbox-stage">
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="100vw"
          quality={85}
          priority
          className="lightbox-img"
        />
      </div>
      <div className="lightbox-bar">
        <span>{photo.caption ?? photo.alt}</span>
        <span>
          {index + 1} / {count}
        </span>
      </div>
    </div>
  );
}
