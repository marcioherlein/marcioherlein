import { motion, useScroll, useTransform, useInView } from "framer-motion";
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imgScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);

  const isEven = index % 2 === 0;

  return (
    <section ref={sectionRef} className="py-24 md:py-40 px-6">
      <div className={`max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isEven ? '' : 'lg:direction-rtl'}`}>
        {/* Screenshot */}
        <motion.div
          style={{ y: imgY, scale: imgScale }}
          className={`relative ${isEven ? '' : 'lg:order-2'}`}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-foreground/5 border border-border/50 bg-secondary">
            <img
              src={screenshotUrl}
              alt={`${title} screenshot`}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Content */}
        <div ref={contentRef} className={`${isEven ? '' : 'lg:order-1'}`}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm tracking-[0.3em] uppercase text-accent mb-4"
          >
            {subtitle}
          </motion.p>

          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-6"
          >
            {title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground font-light leading-relaxed mb-8"
          >
            {description}
          </motion.p>

          {/* Features */}
          <div className="space-y-3 mb-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                <span className="text-sm text-foreground">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* Tech stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs rounded-full bg-secondary text-muted-foreground border border-border/50"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors group"
          >
            View Live Project
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ProjectCaseStudy;
