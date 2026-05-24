export function Onboarding() {
  return (
    <section id="story" className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          Why we built RouteHealth
        </p>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          The benefit exists. The employee never finds it in time.
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* Problem */}
          <div className="panel p-6">
            <span className="inline-flex h-7 items-center rounded-full bg-destructive/10 px-3 text-[11px] font-semibold uppercase tracking-wider text-destructive">
              Problem
            </span>
            <h3 className="mt-4 text-xl font-semibold text-foreground">
              SMEs pay for health plans nobody uses.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Malaysian SMEs spend RM 1,200 to RM 3,000 per employee a year on
              clinic panels, telehealth, insurance and takaful. When an employee
              actually gets sick at 9pm on a Sunday, they don&rsquo;t remember
              which app to open, which clinic is on the panel, or whether the
              consultation is free. So they Google, pay out of pocket, or wait.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                Benefits info lives in 4+ apps and a PDF nobody opens.
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                HR is the help desk, on WhatsApp, after hours.
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                Real emergencies get treated like admin tickets.
              </li>
            </ul>
          </div>

          {/* Solution */}
          <div className="panel border-primary/30 p-6 ring-1 ring-primary/20">
            <span className="inline-flex h-7 items-center rounded-full bg-primary/10 px-3 text-[11px] font-semibold uppercase tracking-wider text-primary">
              Solution
            </span>
            <h3 className="mt-4 text-xl font-semibold text-foreground">
              One Telegram chat that knows your plan.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              RouteHealth is a concierge bot that lives where employees already
              are. They describe what&rsquo;s wrong in plain Malay, English or a
              voice note. The bot checks the company&rsquo;s active providers,
              what each one covers, what&rsquo;s already been used this year, and
              routes them to the cheapest covered option with a one-tap deep
              link.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Multilingual, voice-note ready, instant.
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Reads coverage from one JSON config per provider.
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Navigates only. Never gives medical advice.
              </li>
            </ul>
          </div>

          {/* Safety / Impact */}
          <div className="panel p-6">
            <span className="inline-flex h-7 items-center rounded-full bg-accent/10 px-3 text-[11px] font-semibold uppercase tracking-wider text-accent">
              Safety first
            </span>
            <h3 className="mt-4 text-xl font-semibold text-foreground">
              Emergencies skip the routing entirely.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Every inbound message runs through a safety check before anything
              else. Chest pain, breathing difficulty, suicidal ideation, severe
              bleeding, stroke signs: the bot instantly tells the employee to
              call 999 and go to the nearest emergency department. No video
              consult suggestion. No clinic booking. No delay. The routing
              engine is suppressed until the situation is safe.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                Red-flag classifier runs on every message.
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                Emergency response in under 2 seconds.
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                Audit trail logged for HR and compliance.
              </li>
            </ul>
          </div>
        </div>

        {/* Impact strip */}
        <div className="mt-10 grid gap-3 rounded-2xl border border-border bg-secondary p-6 sm:grid-cols-3 sm:p-8">
          <div>
            <p className="text-3xl font-semibold text-foreground">~RM 80</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Avoided per routed consult, on average. The employee pays nothing
              instead of a private GP visit.
            </p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-foreground">&lt; 30 sec</p>
            <p className="mt-1 text-sm text-muted-foreground">
              From symptom to a covered care option, including a clickable deep
              link or a confirmed clinic slot.
            </p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-foreground">100%</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Of high-risk messages escalate to 999 with no routing, no
              upselling, no friction.
            </p>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
          The renewal conversation finally has data behind it. HR can show the
          insurer real usage. The insurer can price the next year against real
          outcomes. The employee got cared for, in their language, on the chat
          app already open on their phone.
        </p>
      </div>
    </section>
  );
}
