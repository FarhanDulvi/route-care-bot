export function Skill() {
  return (
    <section id="skill" className="px-4 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          Provider config
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          One config. Every provider.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Add a provider with one JSON file. No code changes. RouteHealth reads
          the config and knows exactly what is covered, what it costs, and when
          to route.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#05070d] p-5 font-mono text-[13px]">
            <div className="mb-3 flex items-center gap-2 border-b border-white/5 pb-2">
              <span className="h-2 w-2 rounded-full bg-[#ef4444]" />
              <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
              <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
              <span className="ml-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                install
              </span>
            </div>
            <p>
              <span className="text-accent">$</span>{" "}
              <span className="text-[#e2e8f0]">rh provider add doctor_anywhere</span>
            </p>
            <p className="mt-2 text-[#64748b]">resolving config...</p>
            <p className="text-[#86efac]">✓ doctor_anywhere@1.0.0 loaded</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#05070d] p-5 font-mono text-[13px] leading-relaxed">
            <p className="mb-2 text-[11px] uppercase tracking-wider text-muted-foreground">
              folder structure
            </p>
            <pre className="text-[#e2e8f0]">
{`routehealth.skill/
  SKILL.md
  providers/  doctor_anywhere.json  angsana.json  aia.json  ...
  companies/  techmakers_sb.json
  scripts/    safety_check.py  classify_care.py  route_decision.py`}
            </pre>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-[#05070d] p-5 font-mono text-[13px] leading-relaxed">
          <p className="mb-3 text-[11px] uppercase tracking-wider text-muted-foreground">
            providers/doctor_anywhere.json
          </p>
          <pre className="overflow-x-auto">
<code>
<span className="text-[#94a3b8]">{`{`}</span>{"\n  "}
<span className="text-accent">"doctor_anywhere_corporate"</span>: <span className="text-[#94a3b8]">{`{`}</span>{"\n    "}
<span className="text-accent">"type"</span>: <span className="text-[#86efac]">"telehealth"</span>,{"\n    "}
<span className="text-accent">"covers"</span>: [<span className="text-[#86efac]">"gp_video"</span>, <span className="text-[#86efac]">"mental_health"</span>, <span className="text-[#86efac]">"pharmacy_delivery"</span>],{"\n    "}
<span className="text-accent">"cost_to_employee"</span>: <span className="text-[#86efac]">"RM 0"</span>,{"\n    "}
<span className="text-accent">"annual_limit"</span>: <span className="text-[#94a3b8]">{`{`}</span> <span className="text-accent">"gp_video"</span>: <span className="text-[#7dd3fc]">8</span>, <span className="text-accent">"mental_health"</span>: <span className="text-[#7dd3fc]">6</span> <span className="text-[#94a3b8]">{`}`}</span>,{"\n    "}
<span className="text-accent">"priority_weight"</span>: <span className="text-[#7dd3fc]">10</span>{"\n  "}
<span className="text-[#94a3b8]">{`}`}</span>{"\n"}
<span className="text-[#94a3b8]">{`}`}</span>
</code>
          </pre>
        </div>

        <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
          The config is how RouteHealth scales to every provider in Malaysia.
          The defensibility is the network and the data, not the code.
        </p>
      </div>
    </section>
  );
}
