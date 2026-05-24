import { useEffect, useRef } from "react";
import { Clock } from "lucide-react";
import type { AppState } from "@/lib/routehealth-state";

export function Dashboard({ state }: { state: AppState }) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const prevCounter = useRef(state.counter);

  useEffect(() => {
    if (state.counter !== prevCounter.current && counterRef.current) {
      counterRef.current.classList.remove("animate-pulse-once");
      // force reflow
      void counterRef.current.offsetWidth;
      counterRef.current.classList.add("animate-pulse-once");
      prevCounter.current = state.counter;
    }
  }, [state.counter]);

  const proactive = [
    "Mon 08:00, weekly check-ins, 12 employees",
    "Fri 17:00, owner summary",
    "7 days before renewal, reminder with usage stats",
  ];

  return (
    <section id="dashboard" className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          TechMakers SB, this week
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard label="Consults routed">
            <span ref={counterRef} className="inline-block">
              {state.counter}
            </span>
          </StatCard>
          <StatCard label="Estimated saved">RM {state.savings}</StatCard>
          <StatCard label="Top route">
            <span className="text-2xl">DA video</span>
            <span className="ml-2 text-sm text-muted-foreground">(4 of 7)</span>
          </StatCard>
        </div>

        <div className="mt-8 panel overflow-hidden">
          <div className="border-b border-white/5 px-6 py-4">
            <h3 className="text-sm font-semibold text-foreground">Recent events</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-6 py-3 font-medium">Time</th>
                  <th className="px-6 py-3 font-medium">Employee</th>
                  <th className="px-6 py-3 font-medium">Need</th>
                  <th className="px-6 py-3 font-medium">Route</th>
                  <th className="px-6 py-3 font-medium">Provider</th>
                </tr>
              </thead>
              <tbody>
                {state.events.map((e, i) => (
                  <tr
                    key={`${e.time}-${e.employee}-${i}`}
                    className="border-t border-white/5 transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-3 text-muted-foreground">{e.time}</td>
                    <td className="px-6 py-3 font-mono text-xs text-foreground">{e.employee}</td>
                    <td className="px-6 py-3 text-foreground">{e.need}</td>
                    <td className="px-6 py-3 text-foreground">{e.route}</td>
                    <td className="px-6 py-3 text-muted-foreground">{e.provider}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="panel p-6">
            <h3 className="text-sm font-semibold text-foreground">Proactive</h3>
            <ul className="mt-4 space-y-3">
              {proactive.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-foreground">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-white/5 pt-4 text-xs text-muted-foreground">
              RouteHealth runs on a schedule. It acts, it does not just answer.
            </p>
          </div>

          <div className="panel p-6">
            <h3 className="text-sm font-semibold text-foreground">Weekly owner summary</h3>
            <p className="mt-2 text-xs text-muted-foreground">Sent every Friday, 17:00</p>
            <div className="mt-5 rounded-xl bg-[#0b141a] p-4">
              <div className="flex justify-end">
                <div
                  className="max-w-[90%] rounded-lg bg-[#d9fdd3] px-3 py-2 text-[13px] text-[#111b21] shadow-sm"
                  style={{ borderTopRightRadius: 2 }}
                >
                  <span className="font-semibold">RouteHealth:</span> this week 7
                  of your team used their benefits. Estimated saving RM 245. Most
                  used: DA video.{" "}
                  <span className="text-[#1d4ed8] underline">View report.</span>
                  <span className="ml-2 text-[10px] text-[#667781]">17:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="panel hover-glow p-6">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-4xl font-semibold tracking-tight text-foreground">
        {children}
      </p>
    </div>
  );
}
