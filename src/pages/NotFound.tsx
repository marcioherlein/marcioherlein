import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    // Useful during development; harmless in prod.
    // eslint-disable-next-line no-console
    console.error("404: Route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-3xl flex-col items-start px-4 py-24 sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-foreground/60">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Page not found</h1>
        <p className="mt-4 text-base leading-relaxed text-foreground/75">
          The page you tried to open doesn’t exist.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-sm transition hover:opacity-90"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
