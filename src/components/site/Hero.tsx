export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[68vh] items-center overflow-hidden px-4 pt-24 pb-10 sm:px-6"
    >
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Vibeathon KL 2026 · Patient Journey Automation
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
            Healthcare benefits, <span className="text-primary">anywhere</span> your team is.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            RouteHealth is a Telegram concierge that routes sick employees to
            the right covered care, instantly. It navigates, it never
            diagnoses. Built for Malaysian SMEs.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="https://t.me/routehealth_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 sm:text-lg"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
              </svg>
              Try on Telegram
            </a>
            <a
              href="#demo"
              className="rounded-full bg-secondary px-6 py-4 text-base font-semibold text-foreground border border-border transition-all hover:bg-muted"
            >
              See live demo
            </a>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Demo data is synthetic. Two-person team.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:mx-0">
          <div className="panel space-y-2 p-4">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                RH
              </span>
              <div>
                <p className="text-[13px] font-semibold text-foreground">RouteHealth bot</p>
                <p className="text-[11px] text-muted-foreground">online · replies instantly</p>
              </div>
            </div>
            <div className="flex justify-end pt-1">
              <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-3 py-2 text-[13.5px] text-primary-foreground shadow-sm">
                ada panel clinic dekat ofis tak?
                <span className="ml-2 text-[10px] opacity-70">09:12</span>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-secondary px-3 py-2 text-[13.5px] text-foreground shadow-sm">
                Yes. Klinik Chew Wangsa Maju, 1.2 km, fully covered by your DA
                Corporate plan. Tap to consult.
                <span className="ml-2 text-[10px] text-muted-foreground">09:12</span>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/15 via-transparent to-accent/15 blur-2xl" />
        </div>
      </div>
    </section>
  );
}
