import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Video, Wifi, AlertTriangle, Clock, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "RouteHealth — Admin Dashboard" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

const SUPABASE_URL = "https://usztvmemsyttwkrkaoim.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzenR2bWVtc3l0dHdrcmthb2ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1ODkwOTQsImV4cCI6MjA5NTE2NTA5NH0.Yw8cDSMgxX-1MiOa8jfr1MqDWD45-VjSrKqbSvhN2fw";
const ADMIN_PASSWORD = "routehealth2026";
const JITSI_ROOM = "https://meet.jit.si/RouteHealthDemo2026";

interface Conversation {
  id: string;
  created_at: string;
  input_type: string;
  language: string;
  user_message: string;
  category: string;
  provider: string;
  severity: string;
  bot_response: string;
}

interface ConsultRequest {
  id: string;
  created_at: string;
  telegram_chat_id: number;
  category: string;
  user_message: string;
  status: string;
  severity: string;
  room_url: string;
}

const SEVERITY_STYLE: Record<string, string> = {
  critical: "bg-red-500/20 text-red-400 border border-red-500/30",
  high:     "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  medium:   "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  low:      "bg-white/10 text-muted-foreground",
};

const LANG_FLAG: Record<string, string> = {
  en: "🇬🇧", ms: "🇲🇾", zh: "🇨🇳", yue: "🀄", ta: "🇮🇳",
  fr: "🇫🇷", ar: "🇸🇦", ru: "🇷🇺", sw: "🇰🇪", hi: "🇮🇳",
  ur: "🇵🇰", id: "🇮🇩", tl: "🇵🇭", th: "🇹🇭", vi: "🇻🇳",
  ja: "🇯🇵", ko: "🇰🇷", de: "🇩🇪", es: "🇪🇸", pt: "🇧🇷",
};

const PROVIDER_LABEL: Record<string, string> = {
  doctor_anywhere: "Doctor Anywhere",
  angsana: "Angsana Panel",
  none: "—",
};

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [convos, setConvos] = useState<Conversation[]>([]);
  const [consults, setConsults] = useState<ConsultRequest[]>([]);
  const [live, setLive] = useState(false);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [completing, setCompleting] = useState<string | null>(null);

  const markComplete = async (id: string) => {
    setCompleting(id);
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/consult_requests?id=eq.${id}`, {
        method: "PATCH",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ status: "completed" }),
      });
      // Optimistic local update
      setConsults(prev => prev.map(c => c.id === id ? { ...c, status: "completed" } : c));
    } catch (e) {
      console.error("markComplete failed", e);
    } finally {
      setCompleting(null);
    }
  };

  useEffect(() => {
    if (!authed) return;
    const fetch_ = async () => {
      const h = { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` };
      const [cr, cc] = await Promise.all([
        fetch(`${SUPABASE_URL}/rest/v1/rh_conversations?order=created_at.desc&limit=50`, { headers: h }),
        fetch(`${SUPABASE_URL}/rest/v1/consult_requests?order=created_at.desc&limit=20`, { headers: h }),
      ]);
      if (cr.ok) setConvos(await cr.json());
      if (cc.ok) setConsults(await cc.json());
      setLive(true);
    };
    fetch_();
    const t = setInterval(fetch_, 5000);
    return () => clearInterval(t);
  }, [authed]);

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 mb-4">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground">RouteHealth</h1>
            <p className="mt-1 text-sm text-muted-foreground">Admin · Doctor access only</p>
          </div>
          <form onSubmit={e => {
            e.preventDefault();
            if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwError(false); }
            else setPwError(true);
          }} className="space-y-4">
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="Admin password"
              autoFocus
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 focus:bg-white/8 transition-colors"
            />
            {pwError && <p className="text-xs text-red-400">Incorrect password.</p>}
            <button
              type="submit"
              className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Enter dashboard
            </button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowHint(h => !h)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
              >
                Forgot password?
              </button>
              {showHint && (
                <p className="mt-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-foreground">
                  {ADMIN_PASSWORD}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }

  const criticalConsults = consults.filter(c => c.severity === "critical" && c.status === "pending");
  const pendingConsults  = consults.filter(c => c.status === "pending");
  const totalToday       = convos.length;
  const emergencyCount   = convos.filter(c => c.severity === "critical").length;

  return (
    <div className="min-h-screen bg-[#030712] text-foreground">
      {/* Header */}
      <header className="border-b border-white/5 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold">RouteHealth</span>
            <span className="text-xs text-muted-foreground border border-white/10 rounded-full px-2 py-0.5">Admin</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Wifi className={`h-3.5 w-3.5 ${live ? "text-emerald-400" : "text-muted-foreground"}`} />
            <span className={live ? "text-emerald-400" : "text-muted-foreground"}>
              {live ? "Live" : "Connecting…"}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 space-y-8">

        {/* Critical alert banner */}
        {criticalConsults.length > 0 && (
          <div className="flex items-center justify-between rounded-2xl border border-red-500/40 bg-red-500/10 px-6 py-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400 animate-pulse" />
              <div>
                <p className="font-semibold text-red-400">
                  {criticalConsults.length} critical request{criticalConsults.length > 1 ? "s" : ""} — doctor needed now
                </p>
                <p className="text-sm text-red-400/70 mt-0.5">{criticalConsults[0].user_message}</p>
              </div>
            </div>
            <a
              href={criticalConsults[0].room_url ?? JITSI_ROOM}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Video className="h-4 w-4" />
              Join now
            </a>
          </div>
        )}

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { label: "Interactions today", value: totalToday },
            { label: "Pending consults", value: pendingConsults.length },
            { label: "Emergencies", value: emergencyCount },
            { label: "Languages", value: new Set(convos.map(c => c.language)).size },
          ].map(s => (
            <div key={s.label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</p>
              <p className="mt-2 text-3xl font-semibold">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Pending video consults */}
        {pendingConsults.length > 0 && (
          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Pending video consults
            </h2>
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] divide-y divide-white/5">
              {pendingConsults.map(c => (
                <div key={c.id} className="flex items-center justify-between px-5 py-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[11px] font-medium rounded-full px-2 py-0.5 ${SEVERITY_STYLE[c.severity] ?? SEVERITY_STYLE.low}`}>
                        {c.severity}
                      </span>
                      <span className="text-xs text-muted-foreground">{timeAgo(c.created_at)}</span>
                      <span className="text-xs text-muted-foreground capitalize">{c.category.replace("_", " ")}</span>
                    </div>
                    <p className="text-sm text-foreground truncate max-w-lg">{c.user_message}</p>
                  </div>
                  <div className="ml-4 shrink-0 flex items-center gap-2">
                    <a
                      href={c.room_url ?? JITSI_ROOM}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-black transition-opacity hover:opacity-90"
                    >
                      <Video className="h-3.5 w-3.5" />
                      Join call
                    </a>
                    <button
                      onClick={() => markComplete(c.id)}
                      disabled={completing === c.id}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-white/10 disabled:opacity-50"
                    >
                      {completing === c.id ? "Marking…" : "✓ Mark complete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Two-column layout: chat log + detail */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Chat log */}
          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              All interactions
            </h2>
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] divide-y divide-white/5 overflow-hidden">
              {convos.length === 0 ? (
                <p className="px-5 py-8 text-center text-sm text-muted-foreground">No interactions yet.</p>
              ) : convos.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelected(c)}
                  className={`w-full text-left px-5 py-3 transition-colors hover:bg-white/[0.03] ${selected?.id === c.id ? "bg-white/[0.05]" : ""}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-medium rounded-full px-2 py-0.5 ${SEVERITY_STYLE[c.severity] ?? SEVERITY_STYLE.low}`}>
                        {c.severity}
                      </span>
                      <span className="text-xs">{LANG_FLAG[c.language] ?? c.language}</span>
                      <span className="text-xs">{c.input_type === "voice" ? "🎙️" : "💬"}</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground shrink-0">{timeAgo(c.created_at)}</span>
                  </div>
                  <p className="text-sm text-foreground truncate">{c.user_message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 capitalize">{c.category.replace("_"," ")} → {PROVIDER_LABEL[c.provider] ?? c.provider}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Detail panel */}
          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {selected ? "Interaction detail" : "Select a chat"}
            </h2>
            {selected ? (
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[11px] font-medium rounded-full px-2 py-0.5 ${SEVERITY_STYLE[selected.severity] ?? SEVERITY_STYLE.low}`}>
                    {selected.severity}
                  </span>
                  <span className="text-xs text-muted-foreground">{LANG_FLAG[selected.language] ?? selected.language} {selected.language.toUpperCase()}</span>
                  <span className="text-xs text-muted-foreground">{selected.input_type === "voice" ? "🎙️ Voice" : "💬 Text"}</span>
                  <span className="text-xs text-muted-foreground ml-auto flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(selected.created_at).toLocaleString()}</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">User said</p>
                  <p className="text-sm text-foreground bg-white/5 rounded-xl px-4 py-3">{selected.user_message}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Bot response</p>
                  <p className="text-sm text-foreground bg-white/5 rounded-xl px-4 py-3 whitespace-pre-wrap leading-relaxed">{selected.bot_response}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div>
                    <p className="text-xs text-muted-foreground">Category</p>
                    <p className="text-sm capitalize">{selected.category.replace("_"," ")}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Routed to</p>
                    <p className="text-sm">{PROVIDER_LABEL[selected.provider] ?? selected.provider}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 flex items-center justify-center h-64">
                <p className="text-sm text-muted-foreground">Click any interaction to see full details.</p>
              </div>
            )}
          </section>
        </div>

        {/* Video call history */}
        {consults.length > 0 && (
          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Video call history
            </h2>
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-5 py-3">Time</th>
                    <th className="px-5 py-3">Severity</th>
                    <th className="px-5 py-3">Category</th>
                    <th className="px-5 py-3">Message</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {consults.map(c => (
                    <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-3 text-muted-foreground whitespace-nowrap">{timeAgo(c.created_at)}</td>
                      <td className="px-5 py-3">
                        <span className={`text-[11px] font-medium rounded-full px-2 py-0.5 ${SEVERITY_STYLE[c.severity] ?? SEVERITY_STYLE.low}`}>
                          {c.severity}
                        </span>
                      </td>
                      <td className="px-5 py-3 capitalize text-muted-foreground">{c.category.replace("_"," ")}</td>
                      <td className="px-5 py-3 max-w-xs truncate" title={c.user_message}>{c.user_message}</td>
                      <td className="px-5 py-3">
                        <span className={`text-[11px] font-medium rounded-full px-2 py-0.5 ${c.status === "pending" ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <a href={c.room_url ?? JITSI_ROOM} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                            <Video className="h-3 w-3" /> Join
                          </a>
                          {c.status === "pending" && (
                            <button
                              onClick={() => markComplete(c.id)}
                              disabled={completing === c.id}
                              className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors disabled:opacity-50"
                            >
                              {completing === c.id ? "…" : "✓ Done"}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
