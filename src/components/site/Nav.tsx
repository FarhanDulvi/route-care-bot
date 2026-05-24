import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const anchorLinks = [
    { href: "#demo", label: "Demo" },
    { href: "#coverage", label: "Coverage" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-background/80 border-b border-border shadow-[0_1px_0_rgba(13,27,42,0.04)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-[13px] font-bold text-primary-foreground">
            R
          </span>
          <span className="text-base font-semibold tracking-tight text-foreground">
            RouteHealth
          </span>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            · benefits concierge
          </span>
        </a>
        <ul className="flex items-center gap-1 text-sm sm:gap-2">
          {anchorLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-md px-2.5 py-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground sm:px-3"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="hidden sm:block">
            <a
              href="/admin"
              className="rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Admin ↗
            </a>
          </li>
          <li>
            <a
              href="https://t.me/healthroute_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
            >
              Try on Telegram
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
