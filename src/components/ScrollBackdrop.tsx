import { motion, useScroll } from "framer-motion";
import { useRef } from "react";

/**
 * Apple-ish backdrop:
 * - mesh gradients
 * - optional photo layers with low opacity
 * - subtle parallax on scroll
 *
 * NOTE: Uses MotionValue `.to()` so we avoid hooks inside loops.
 */
export type BackdropLayer = {
  src: string;
  alt?: string;
  className: string; // positioning + size
  opacity?: number; // 0..1
  blur?: number; // px
  rotate?: string; // e.g. "6deg"
  speed?: number; // parallax amount (px)
};

const ScrollBackdrop = ({ layers }: { layers?: BackdropLayer[] }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Mesh gradients */}
      <div className="absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.28),transparent_60%)] blur-3xl" />
      <div className="absolute -bottom-48 left-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.20),transparent_60%)] blur-3xl" />
      <div className="absolute -bottom-56 right-1/4 h-[520px] w-[520px] translate-x-1/3 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.16),transparent_60%)] blur-3xl" />

      {layers?.map((l, idx) => {
        const speed = l.speed ?? 60;
        const y = scrollYProgress.to([0, 1], [speed, -speed]);
        const o = l.opacity ?? 0.16;
        const blur = l.blur ?? 10;
        const rotate = l.rotate ?? "0deg";

        return (
          <motion.img
            key={idx}
            src={l.src}
            alt={l.alt ?? ""}
            aria-hidden={l.alt ? undefined : true}
            style={{ y, opacity: o, rotate, filter: `blur(${blur}px)` }}
            className={`${l.className} select-none`}
            loading="lazy"
          />
        );
      })}

      {/* Soft vignette to keep text readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_18%,rgba(255,255,255,0.70)_72%,rgba(255,255,255,0.92)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_18%,rgba(0,0,0,0.45)_72%,rgba(0,0,0,0.75)_100%)]" />
    </div>
  );
};

export default ScrollBackdrop;
