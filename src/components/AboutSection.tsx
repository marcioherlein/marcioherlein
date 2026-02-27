import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "10+", label: "Projects Delivered" },
  { value: "2", label: "Industries" },
];

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 md:py-48 px-6">
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-sm tracking-[0.3em] uppercase text-accent mb-8"
        >
          About
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-tight mb-12"
        >
          I bridge the gap between{" "}
          <span className="text-accent">financial thinking</span> and{" "}
          <span className="text-accent">technical execution</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl mb-20"
        >
          With a background spanning equity research, financial modeling, and full-stack development, 
          I create tools and experiences that make complex financial data accessible and actionable. 
          My work lives at the intersection of analytical rigor and thoughtful design.
        </motion.p>

        <div className="grid grid-cols-3 gap-8 md:gap-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
              className="text-center md:text-left"
            >
              <div className="text-3xl md:text-5xl font-semibold text-foreground mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
