"use client";

import Image from "next/image";

const LEFT_IMAGES = [
  "/projects/harbor-realty.jpg",
  "/projects/bloom-retail.jpg",
  "/projects/pulse-fit.jpg",
];

const RIGHT_IMAGES = [
  "/projects/vertex-support.jpg",
  "/projects/table-tap.jpg",
  "/projects/atelier-north.jpg",
];

/**
 * 3D portfolio backdrop for the hero — project images float behind
 * the headline on the left and right, tilted in 3D perspective
 * with blur for depth. Pure CSS, solid and smooth.
 */
export default function PortfolioBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Left stack */}
      <div className="absolute left-0 top-1/2 hidden -translate-y-1/2 lg:block">
        <div className="flex flex-col gap-6 pl-4" style={{ transformStyle: "preserve-3d" }}>
          {LEFT_IMAGES.map((src, i) => (
            <div
              key={src}
              className="animate-float-slow overflow-hidden rounded-2xl border border-white/10 opacity-40 blur-[2px]"
              style={{
                transform: `rotateY(24deg) translateZ(${-i * 60}px)`,
                animationDelay: `${i * 1.8}s`,
                width: 260 - i * 30,
                height: 160,
              }}
            >
              <Image
                src={src}
                alt=""
                width={260}
                height={160}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right stack */}
      <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block">
        <div className="flex flex-col gap-6 pr-4" style={{ transformStyle: "preserve-3d" }}>
          {RIGHT_IMAGES.map((src, i) => (
            <div
              key={src}
              className="animate-float-slow overflow-hidden rounded-2xl border border-white/10 opacity-40 blur-[2px]"
              style={{
                transform: `rotateY(-24deg) translateZ(${-i * 60}px)`,
                animationDelay: `${i * 1.8 + 0.9}s`,
                width: 260 - i * 30,
                height: 160,
                marginLeft: "auto",
              }}
            >
              <Image
                src={src}
                alt=""
                width={260}
                height={160}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
