import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

const PROVIDERS = [
  "Doctor Anywhere Corporate",
  "Angsana Health",
  "AIA",
  "Allianz",
  "Great Eastern",
  "Takaful Ikhlas",
];

export function Onboarding() {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("done"), 1500);
  }

  return (
    <section id="onboarding" className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Set up an SME in 60 seconds
        </h2>

        <form onSubmit={onSubmit} className="panel mt-10 space-y-5 p-6 sm:p-8">
          <Field label="Company name">
            <input
              type="text"
              placeholder="TechMakers Sdn Bhd"
              className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary/60"
            />
          </Field>

          <Field label="Provider">
            <select
              className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary/60"
              defaultValue={PROVIDERS[0]}
            >
              {PROVIDERS.map((p) => (
                <option key={p} value={p} className="bg-secondary">
                  {p}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Employees">
            <textarea
              rows={4}
              placeholder="Paste phone numbers, one per line"
              className="w-full resize-none rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary/60"
            />
          </Field>

          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-70"
          >
            {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
            {status === "loading" ? "Loading demo..." : "Load demo config"}
          </button>

          {status === "done" && (
            <div className="animate-bubble-in flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-500 text-black">
                <Check className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Demo config loaded — try it at t.me/routehealth_bot
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Open Telegram and send a voice note or message. The concierge responds instantly.
                </p>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
