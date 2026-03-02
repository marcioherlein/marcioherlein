import { motion, useScroll, useTransform } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "ERM", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 120], [-8, 0]);
  const opacity = useTransform(scrollY, [0, 160], [0, 1]);

  return (
    <motion.header style={{ y, opacity }} className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#"
          className="group inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/70 px-3 py-2 text-sm font-semibold tracking-tight text-foreground shadow-sm backdrop-blur transition hover:bg-accent"
          aria-label="Go to top"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background">
            MH
          </span>
          <span className="hidden sm:block">Marcio Herlein</span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-foreground/10 bg-background/70 p-1 text-sm text-foreground/70 shadow-sm backdrop-blur sm:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition hover:bg-foreground hover:text-background"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="inline-flex items-center rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/40 hover:brightness-110"
        >
          Contact
        </a>
      </div>
    </motion.header>
  );
};

export default Navbar;
