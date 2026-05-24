export function Coverage() {
  return (
    <section id="coverage" className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          Provider network
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Coverage is config, not code.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Adding a provider to RouteHealth is one JSON file. No engineering work.
          The concierge reads coverage, limits, and deeplinks at runtime — so the
          network scales without touching application logic.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Provider config */}
          <div className="rounded-2xl border border-white/10 bg-[#05070d] p-5 font-mono text-[13px] leading-relaxed">
            <div className="mb-3 flex items-center gap-2 border-b border-white/5 pb-2">
              <span className="h-2 w-2 rounded-full bg-[#ef4444]" />
              <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
              <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
              <span className="ml-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                providers/doctor_anywhere.json
              </span>
            </div>
            <pre className="overflow-x-auto">
<code>
<span className="text-[#94a3b8]">{"{"}</span>{"\n  "}
<span className="text-accent">"doctor_anywhere_corporate"</span>: <span className="text-[#94a3b8]">{"{"}</span>{"\n    "}
<span className="text-accent">"type"</span>: <span className="text-[#86efac]">"telehealth"</span>,{"\n    "}
<span className="text-accent">"covers"</span>: [<span className="text-[#86efac]">"gp_video"</span>, <span className="text-[#86efac]">"mental_health"</span>, <span className="text-[#86efac]">"pharmacy"</span>],{"\n    "}
<span className="text-accent">"deeplink"</span>: <span className="text-[#86efac]">"https://dranywhr.my/app"</span>,{"\n    "}
<span className="text-accent">"cost_to_employee"</span>: <span className="text-[#86efac]">"RM 0"</span>,{"\n    "}
<span className="text-accent">"annual_limit"</span>: <span className="text-[#94a3b8]">{"{"}</span> <span className="text-accent">"gp_video"</span>: <span className="text-[#7dd3fc]">8</span>, <span className="text-accent">"mental_health"</span>: <span className="text-[#7dd3fc]">6</span> <span className="text-[#94a3b8]">{"}"}</span>,{"\n    "}
<span className="text-accent">"priority_weight"</span>: <span className="text-[#7dd3fc]">10</span>{"\n  "}
<span className="text-[#94a3b8]">{"}"}</span>{"\n"}
<span className="text-[#94a3b8]">{"}"}</span>
</code>
            </pre>
          </div>

          {/* Company config */}
          <div className="rounded-2xl border border-white/10 bg-[#05070d] p-5 font-mono text-[13px] leading-relaxed">
            <div className="mb-3 flex items-center gap-2 border-b border-white/5 pb-2">
              <span className="h-2 w-2 rounded-full bg-[#ef4444]" />
              <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
              <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
              <span className="ml-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                companies/techmakers_sb.json
              </span>
            </div>
            <pre className="overflow-x-auto">
<code>
<span className="text-[#94a3b8]">{"{"}</span>{"\n  "}
<span className="text-accent">"company_id"</span>: <span className="text-[#86efac]">"techmakers_sb"</span>,{"\n  "}
<span className="text-accent">"display_name"</span>: <span className="text-[#86efac]">"TechMakers Sdn Bhd"</span>,{"\n  "}
<span className="text-accent">"employee_count"</span>: <span className="text-[#7dd3fc]">24</span>,{"\n  "}
<span className="text-accent">"active_providers"</span>: [{"\n    "}
<span className="text-[#86efac]">"doctor_anywhere_corporate"</span>,{"\n    "}
<span className="text-[#86efac]">"angsana_panel"</span>{"\n  "}
],{"\n  "}
<span className="text-accent">"renewal_date"</span>: <span className="text-[#86efac]">"2026-12-01"</span>{"\n"}
<span className="text-[#94a3b8]">{"}"}</span>
</code>
            </pre>
          </div>
        </div>

        {/* Provider coverage grid */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-[#05070d] p-5">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Currently integrated
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { name: "Doctor Anywhere", type: "Telehealth" },
              { name: "Angsana Health", type: "Panel network" },
              { name: "AIA", type: "Insurer" },
              { name: "Allianz", type: "Insurer" },
              { name: "Great Eastern", type: "Insurer" },
              { name: "Takaful Ikhlas", type: "Takaful" },
            ].map((p) => (
              <div
                key={p.name}
                className="rounded-xl border border-white/8 bg-white/[0.03] p-3"
              >
                <p className="text-[13px] font-medium text-foreground">{p.name}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{p.type}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
          The moat is the network and the routing data — not the code. RouteHealth
          runs on the{" "}
          <span className="text-foreground">OpenClaw</span> agent framework,
          connected to Telegram for the demo and WhatsApp for production.
        </p>
      </div>
    </section>
  );
}
