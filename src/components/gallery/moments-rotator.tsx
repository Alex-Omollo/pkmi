"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FeaturedPhoto } from "@/data/gallery";

type Layer = { id: number; photo: FeaturedPhoto };

const INTERVAL = 5000; // ms between swaps (one tile at a time)
const FADE = 900; // keep in sync with .moments-layer transition

function TileLayer({
  layer,
  instant,
  onSettled,
}: {
  layer: Layer;
  instant: boolean;
  onSettled: () => void;
}) {
  const [ready, setReady] = useState(instant);
  const { photo } = layer;

  useEffect(() => {
    if (!ready || instant) return;
    const t = setTimeout(onSettled, FADE + 100); // drop the layer underneath
    return () => clearTimeout(t);
  }, [ready, instant, onSettled]);

  return (
    <span className={ready ? "moments-layer is-shown" : "moments-layer"}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 800px) 50vw, 33vw"
        onLoad={() => setReady(true)}
      />
      <span className="moments-caption">
        <strong>{photo.eventTitle}</strong>
        <small>{photo.year}</small>
      </span>
    </span>
  );
}

export function MomentsRotator({
  pool,
  slots,
}: {
  pool: FeaturedPhoto[];
  slots: number;
}) {
  const [stacks, setStacks] = useState<Layer[][]>(() =>
    pool.slice(0, slots).map((photo, i) => [{ id: i, photo }]),
  );
  const stacksRef = useRef(stacks);
  stacksRef.current = stacks;

  const nextId = useRef(slots);
  const cursor = useRef(slots); // next pool index to show
  const tick = useRef(0);
  const paused = useRef(false);

  const settle = useCallback(
    (slot: number, id: number) =>
      setStacks((prev) =>
        prev.map((s, i) => (i === slot ? s.filter((l) => l.id >= id) : s)),
      ),
    [],
  );

  useEffect(() => {
    if (pool.length <= slots) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(() => {
      if (paused.current || document.hidden) return;
      const current = stacksRef.current;
      const onScreen = new Set(current.map((s) => s[s.length - 1].photo.src));

      let photo: FeaturedPhoto | undefined;
      for (let k = 0; k < pool.length; k++) {
        const candidate = pool[cursor.current % pool.length];
        cursor.current++;
        if (!onScreen.has(candidate.src)) {
          photo = candidate;
          break;
        }
      }
      if (!photo) return;

      const slot = tick.current++ % slots;
      const next = current.slice();
      next[slot] = [...current[slot], { id: nextId.current++, photo }];
      setStacks(next);
    }, INTERVAL);

    return () => clearInterval(timer);
  }, [pool, slots]);

  return (
    <div
      className="moments-grid"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      {stacks.map((stack, slot) => {
        const top = stack[stack.length - 1];
        return (
          <Link
            key={slot}
            href={`/gallery/${top.photo.slug}`}
            className="moments-tile"
          >
            {stack.map((layer, i) => (
              <TileLayer
                key={layer.id}
                layer={layer}
                instant={layer.id < slots}
                onSettled={() => settle(slot, layer.id)}
              />
            ))}
          </Link>
        );
      })}
    </div>
  );
}
