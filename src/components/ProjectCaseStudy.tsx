import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

interface ProjectProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  techStack: string[];
  liveUrl?: string;
  screenshotUrl: string;
  index: number;
}

const ProjectCaseStudy = ({
  title,
  subtitle,
  description,
  features,
  techStack,
  liveUrl,
  screenshotUrl,
  index,
}: ProjectProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  const isEven = index % 2 === 0;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="group relative overflow-hidden rounded-[32px] border border-foreground/10 bg-background/65 p-6 shadow-sm backdrop-blur"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-500/18 via-emerald-500/10 to-transparent blur-3xl opacity-0 transition duration-700 group-hover:opacity-100" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
        <div className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
          <div className="relative overflow-hidden rounded-[28px] border border-foreground/10 bg-foreground/5 shadow-sm">
            <motion.img
              src={screenshotUrl}
              alt={`${title} screenshot`}
              className="h-full w-full object-cover"
              loading="lazy"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          </div>
        </div>

        <div className={`lg:col-span-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
          <p className="text-xs font-medium text-foreground/60">{subtitle}</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-foreground/70">{description}</p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f}
                className="rounded-2xl border border-foreground/10 bg-background/60 px-4 py-3 text-sm text-foreground/70 shadow-sm"
              >
                {f}
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {techStack.map((t) => (
              <span
                key={t}
                className="rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/70"
              >
                {t}
              </span>
            ))}
          </div>

          {liveUrl ? (
            <div className="mt-6">
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-sm transition hover:opacity-90"
              >
                View live <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          ) : (
            <div className="mt-6 text-xs text-foreground/60">No public demo link — shared as an educational UI study.</div>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCaseStudy;
