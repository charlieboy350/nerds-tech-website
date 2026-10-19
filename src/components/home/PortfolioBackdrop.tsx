"use client";

import Image from "next/image";

const TOP_IMAGES = [
  "/projects/harbor-realty.jpg",
  "/projects/vertex-support.jpg",
  "/projects/bloom-retail.jpg",
  "/projects/table-tap.jpg",
  "/projects/pulse-fit.jpg",
];

const BOTTOM_IMAGES = [
  "/projects/atelier-north.jpg",
  "/projects/cornerstone.jpg",
  "/projects/ironpulse.jpg",
  "/projects/swift-bite.jpg",
  "/projects/pulseboard.jpg",
];

/**
 * Curved 3D portfolio carousel (Athlon-style) — project images arc
 * around the hero headline like the inside of a cylinder:
 * center card faces forward, edge cards rotate away and sink back.
 */
function ArcRow({ images }: { images: string[] }) {
  const n = images.length;
  return (
    <div
      className="flex items-center justify-center"
      style={{ perspective: "1600px" }}
    >
      {images.map((src, i) => {
        const t = (i / (n - 1)) * 2 - 1; // -1 (far left) → +1 (far right)
        const edge = Math.abs(t);
        return (
          <div
            key={src}
            className="shrink-0"
            style={{
              transform: `rotateY(${-t * 34}deg) translateZ(${-edge * 260}px)`,
              transformStyle: "preserve-3d",
              margin: "0 -16px",
              zIndex: n - Math.round(edge * n),
            }}
          >
            <div
              className="animate-float-slow overflow-hidden rounded-xl border border-white/10"
              style={{
                animationDelay: `${i * 0.8}s`,
                width: 300,
                height: 190,
                opacity: 1 - edge * 0.25,
              }}
            >
              <Image
                src={src}
                alt=""
                width={300}
                height={190}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function PortfolioBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Top arc */}
      <div className="absolute inset-x-0 top-14 hidden lg:block">
        <ArcRow images={TOP_IMAGES} />
      </div>
      {/* Bottom arc */}
      <div className="absolute inset-x-0 bottom-14 hidden lg:block">
        <ArcRow images={BOTTOM_IMAGES} />
      </div>
    </div>
  );
}
