import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

interface ProjectProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  techStack: string[];
  liveUrl: string;
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
      className="rounded-3xl border border-border/60 bg-background/50 p-6 shadow-sm"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
        <div className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-background">
            <img src={screenshotUrl} alt={`${title} screenshot`} className="w-full" loading="lazy" />
          </div>
        </div>

        <div className={`lg:col-span-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
          <p className="text-xs font-medium text-muted-foreground">{subtitle}</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f}
                className="rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-muted-foreground"
              >
                {f}
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {techStack.map((t) => (
              <span key={t} className="rounded-full bg-accent px-3 py-1 text-xs text-muted-foreground">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6">
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90"
            >
              View live <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCaseStudy;
