export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-4 pt-24 sm:px-6"
    >
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Vibeathon KL 2026 · Patient Journey Automation
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Your employees forget the benefit exists. We fix that.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            RouteHealth is a Telegram concierge that routes sick employees to the
            right covered care, instantly. It navigates — it never diagnoses.
            Built for Malaysian SMEs.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#demo"
              className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Trigger live demo
            </a>
            <a
              href="#coverage"
              className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-white/30 hover:bg-white/5"
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
            <div className="flex justify-end">
              <div
                className="max-w-[85%] rounded-lg bg-[#2b5278] px-2.5 py-1.5 text-[13.5px] text-white shadow-sm"
                style={{ borderTopRightRadius: 2 }}
              >
                ada panel clinic dekat ofis tak?
                <span className="ml-2 text-[10px] text-[#aac9e0] opacity-70">09:12</span>
              </div>
            </div>
            <div className="flex justify-start">
              <div
                className="max-w-[85%] rounded-lg bg-[#212d3b] px-2.5 py-1.5 text-[13.5px] text-[#e2e8f0] shadow-sm"
                style={{ borderTopLeftRadius: 2 }}
              >
                Yes. Klinik Chew Wangsa Maju, 1.2 km, fully covered by your DA
                Corporate plan. Tap to consult.
                <span className="ml-2 text-[10px] text-[#aac9e0] opacity-70">09:12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
