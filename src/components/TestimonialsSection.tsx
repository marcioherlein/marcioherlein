import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    quote: "Marcio brings a rare combination of financial acumen and technical skill. His work on our valuation platform transformed how our team analyzes market data.",
    name: "Alex R.",
    role: "Director of Research",
  },
  {
    quote: "Working with Marcio was a seamless experience. He understood the creative vision immediately and translated it into a stunning digital experience.",
    name: "Sofia L.",
    role: "Creative Director",
  },
  {
    quote: "The attention to detail and performance optimization in Marcio's work is exceptional. He delivered beyond what we imagined possible.",
    name: "Daniel M.",
    role: "Product Manager",
  },
];

const TestimonialsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-32 md:py-48 px-6 bg-secondary/40">
      <div ref={ref} className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-sm tracking-[0.3em] uppercase text-accent mb-8 text-center"
        >
          Testimonials
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground text-center mb-20"
        >
          What people say
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
              className="p-8 rounded-2xl bg-background border border-border/50"
            >
              <p className="text-foreground leading-relaxed mb-8 font-light">
                "{t.quote}"
              </p>
              <div>
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
