import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#problem", label: "Problem" },
    { href: "#demo", label: "Demo" },
    { href: "#dashboard", label: "Dashboard" },
    { href: "#coverage", label: "Coverage" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="text-base font-semibold tracking-tight text-foreground">
            RouteHealth
          </span>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="hidden text-xs text-muted-foreground sm:inline">
            benefits concierge
          </span>
        </a>
        <ul className="flex items-center gap-1 text-sm sm:gap-2">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-md px-2.5 py-1.5 text-muted-foreground transition-colors hover:text-foreground sm:px-3"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
