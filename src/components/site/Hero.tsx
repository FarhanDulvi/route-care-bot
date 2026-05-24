export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[88vh] items-center overflow-hidden px-4 pt-28 pb-16 sm:px-6"
    >
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Vibeathon KL 2026 · Patient Journey Automation
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.6rem]">
            Healthcare benefits, <span className="text-primary">anywhere</span> your team is.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            RouteHealth is a Telegram concierge that routes sick employees to
            the right covered care, instantly. It navigates — it never
            diagnoses. Built for Malaysian SMEs.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#demo"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
            >
              Trigger live demo →
            </a>
            <a
              href="#coverage"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-sm transition-all hover:bg-accent/90 hover:shadow-md"
            >
              See coverage config
            </a>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
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
