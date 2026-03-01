import { motion, useScroll, useTransform } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "ERM", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 320, 420], [0, 0, 1]);
  const backdropBlur = useTransform(scrollY, [320, 420], [0, 16]);
  const blurFilter = useTransform(backdropBlur, (v) => `blur(${v}px)`);

  return (
    <motion.header
      style={{ opacity, backdropFilter: blurFilter }}
      className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/80"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#"
          className="flex items-center gap-2 rounded-md px-2 py-1 text-sm font-semibold tracking-tight hover:bg-accent"
          aria-label="Go to top"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
            MH
          </span>
          <span className="hidden sm:block">Marcio Herlein</span>
        </a>

        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-foreground/70 transition hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
};

export default Navbar;
