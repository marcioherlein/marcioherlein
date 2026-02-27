import ProjectCaseStudy from "./ProjectCaseStudy";
import valxScreenshot from "@/assets/valx-screenshot.png";
import cdpScreenshot from "@/assets/cdp-screenshot.png";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "VAL-X",
    subtitle: "Case Study 01",
    description:
      "A real-time valuation dashboard that aggregates global market data, sector ETFs, and independent equity coverage using DCF methodology. Built for analysts who need instant, data-driven insights.",
    features: [
      "Live market data auto-refreshing every 90 seconds",
      "Independent DCF valuation models (FCFF methodology)",
      "US sectors, international ETFs, and equity coverage",
      "Damodaran ERP integration for cost of equity",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Yahoo Finance API", "Vercel"],
    liveUrl: "https://valuation-dashboard-orcin.vercel.app",
    screenshotUrl: valxScreenshot,
  },
  {
    title: "CDP",
    subtitle: "Case Study 02",
    description:
      "A creative director portfolio featuring immersive scroll-driven animations, dynamic visual storytelling, and a bold editorial aesthetic. Designed to captivate and engage from the first scroll.",
    features: [
      "Scroll-triggered parallax and pinned sections",
      "Full-screen cinematic hero with video background",
      "Case study deep-dives with image galleries",
      "Responsive design with mobile-first approach",
    ],
    techStack: ["React", "TypeScript", "Framer Motion", "Tailwind CSS", "Vercel"],
    liveUrl: "https://cdp-three.vercel.app",
    screenshotUrl: cdpScreenshot,
  },
];

const ProjectsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects">
      <div ref={ref} className="max-w-6xl mx-auto px-6 pt-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-sm tracking-[0.3em] uppercase text-accent mb-4 text-center"
        >
          Selected Work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground text-center mb-4"
        >
          Projects
        </motion.h2>
      </div>

      {projects.map((project, i) => (
        <ProjectCaseStudy key={project.title} {...project} index={i} />
      ))}
    </section>
  );
};

export default ProjectsSection;
