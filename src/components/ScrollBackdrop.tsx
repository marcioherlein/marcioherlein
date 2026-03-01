import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

/**
 * Backdrop helper:
 * - mesh gradients
 * - optional photo layers with low opacity
 * - subtle parallax on scroll
 */
export type BackdropLayer = {
  src: string;
  alt?: string;
  className: string; // positioning + size
  opacity?: number; // 0..1
  blur?: number; // px
  rotate?: string | number; // e.g. "6deg" or 6
  speed?: number; // parallax amount (px)
};

function toRotateNumber(r?: string | number): number {
  if (typeof r === "number") return r;
  if (!r) return 0;
  const n = parseFloat(String(r).replace("deg", ""));
  return Number.isFinite(n) ? n : 0;
}

function BackdropImage({ layer, progress }: { layer: BackdropLayer; progress: MotionValue<number> }) {
  const speed = layer.speed ?? 60;
  const y = useTransform(progress, [0, 1], [speed, -speed]);
  const opacity = layer.opacity ?? 0.14;
  const blur = layer.blur ?? 0;
  const rotate = toRotateNumber(layer.rotate);

  return (
    <motion.img
      src={layer.src}
      alt={layer.alt ?? ""}
      aria-hidden={layer.alt ? undefined : true}
      className={`${layer.className} select-none`}
      loading="lazy"
      style={{ y, opacity, rotate, filter: `blur(${blur}px)` }}
    />
  );
}

const ScrollBackdrop = ({ layers }: { layers?: BackdropLayer[] }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Mesh gradients */}
      <div className="absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.28),transparent_60%)] blur-3xl" />
      <div className="absolute -bottom-48 left-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.20),transparent_60%)] blur-3xl" />
      <div className="absolute -bottom-56 right-1/4 h-[520px] w-[520px] translate-x-1/3 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.16),transparent_60%)] blur-3xl" />

      {layers?.map((layer, idx) => (
        <BackdropImage key={idx} layer={layer} progress={scrollYProgress} />
      ))}

      {/* Soft vignette to keep text readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_18%,rgba(255,255,255,0.70)_72%,rgba(255,255,255,0.92)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_18%,rgba(0,0,0,0.45)_72%,rgba(0,0,0,0.75)_100%)]" />
    </div>
  );
};

export default ScrollBackdrop;
