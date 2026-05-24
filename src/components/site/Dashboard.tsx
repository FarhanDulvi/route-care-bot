import { useEffect, useRef, useState } from "react";
import { Clock, Wifi, Video } from "lucide-react";
import type { AppState } from "@/lib/routehealth-state";

const SUPABASE_URL = "https://usztvmemsyttwkrkaoim.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzenR2bWVtc3l0dHdrcmthb2ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1ODkwOTQsImV4cCI6MjA5NTE2NTA5NH0.Yw8cDSMgxX-1MiOa8jfr1MqDWD45-VjSrKqbSvhN2fw";

interface Conversation {
  id: string;
  created_at: string;
  input_type: string;
  language: string;
  user_message: string;
  category: string;
  provider: string;
  bot_response: string;
}

const JITSI_ROOM = "https://meet.jit.si/RouteHealthDemo2026";

interface ConsultRequest {
  id: string;
  created_at: string;
  telegram_chat_id: number;
  category: string;
  user_message: string;
  status: string;
  room_url: string;
}

const PROVIDER_LABEL: Record<string, string> = {
  doctor_anywhere: "Doctor Anywhere",
  angsana: "Angsana Panel",
  none: "—",
};

const CATEGORY_LABEL: Record<string, string> = {
  gp: "GP / Fever",
  dental: "Dental",
  mental_health: "Mental Health",
  emergency: "Emergency",
  unclear: "Unclear",
};

const LANG_FLAG: Record<string, string> = {
  en: "🇬🇧",
  ms: "🇲🇾",
  zh: "🇨🇳",
  yue: "🀄",
  ta: "🇮🇳",
  fr: "🇫🇷",
};

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export function Dashboard({ state }: { state: AppState }) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const prevCounter = useRef(state.counter);
  const [convos, setConvos] = useState<Conversation[]>([]);
  const [consults, setConsults] = useState<ConsultRequest[]>([]);
  const [live, setLive] = useState(false);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);

  // Animate counter on change
  useEffect(() => {
    if (state.counter !== prevCounter.current && counterRef.current) {
      counterRef.current.classList.remove("animate-pulse-once");
      void counterRef.current.offsetWidth;
      counterRef.current.classList.add("animate-pulse-once");
      prevCounter.current = state.counter;
    }
  }, [state.counter]);

  // Poll Supabase every 5s
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const headers = {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        };
        const [convRes, consultRes] = await Promise.all([
          fetch(`${SUPABASE_URL}/rest/v1/rh_conversations?order=created_at.desc&limit=10`, { headers }),
          fetch(`${SUPABASE_URL}/rest/v1/consult_requests?order=created_at.desc&limit=5`, { headers }),
        ]);
        if (convRes.ok) setConvos(await convRes.json());
        if (consultRes.ok) setConsults(await consultRes.json());
        setLive(true);
        setLastFetch(new Date());
      } catch {
        setLive(false);
      }
    };

    fetchAll();
    const interval = setInterval(fetchAll, 5000);
    return () => clearInterval(interval);
  }, []);

  const proactive = [
    "Mon 08:00, weekly check-ins, 12 employees",
    "Fri 17:00, owner summary",
    "7 days before renewal, reminder with usage stats",
  ];

  return (
    <section id="dashboard" className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            TechMakers SB, live
          </h2>
          <div className="flex items-center gap-2 text-xs">
            <Wifi className={`h-3.5 w-3.5 ${live ? "text-emerald-400" : "text-muted-foreground"}`} />
            <span className={live ? "text-emerald-400" : "text-muted-foreground"}>
              {live ? `Live · ${lastFetch ? timeAgo(lastFetch.toISOString()) : ""}` : "Connecting…"}
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard label="Consults routed">
            <span ref={counterRef} className="inline-block">
              {convos.length > 0 ? convos.length : state.counter}
            </span>
          </StatCard>
          <StatCard label="Estimated saved">
            RM {convos.length > 0 ? convos.length * 35 : state.savings}
          </StatCard>
          <StatCard label="Top route">
            {convos.length > 0 ? (
              (() => {
                const counts: Record<string, number> = {};
                convos.forEach((c) => { counts[c.provider] = (counts[c.provider] || 0) + 1; });
                const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
                return (
                  <>
                    <span className="text-2xl">{PROVIDER_LABEL[top[0]] ?? top[0]}</span>
                    <span className="ml-2 text-sm text-muted-foreground">({top[1]} of {convos.length})</span>
                  </>
                );
              })()
            ) : (
              <>
                <span className="text-2xl">DA video</span>
                <span className="ml-2 text-sm text-muted-foreground">(4 of 7)</span>
              </>
            )}
          </StatCard>
        </div>

        {/* Live feed from Telegram bot */}
        <div className="mt-8 panel overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
            <h3 className="text-sm font-semibold text-foreground">Live from Telegram</h3>
            {live && convos.length > 0 && (
              <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {convos.length} interaction{convos.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          <div className="overflow-x-auto">
            {convos.length === 0 ? (
              <div className="px-6 py-10 text-center text-sm text-muted-foreground">
                {live
                  ? "No interactions yet. Send a message to t.me/routehealth_bot to see it appear here."
                  : "Connecting to live feed…"}
              </div>
            ) : (
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-6 py-3 font-medium">Time</th>
                    <th className="px-6 py-3 font-medium">Input</th>
                    <th className="px-6 py-3 font-medium">Lang</th>
                    <th className="px-6 py-3 font-medium">Message</th>
                    <th className="px-6 py-3 font-medium">Category</th>
                    <th className="px-6 py-3 font-medium">Routed to</th>
                  </tr>
                </thead>
                <tbody>
                  {convos.map((c) => (
                    <tr
                      key={c.id}
                      className="border-t border-white/5 transition-colors hover:bg-white/[0.02]"
                    >
                      <td className="px-6 py-3 text-muted-foreground whitespace-nowrap">
                        {timeAgo(c.created_at)}
                      </td>
                      <td className="px-6 py-3 text-muted-foreground">
                        {c.input_type === "voice" ? "🎙️" : "💬"}
                      </td>
                      <td className="px-6 py-3">
                        {LANG_FLAG[c.language] ?? c.language}
                      </td>
                      <td className="px-6 py-3 text-foreground max-w-[240px] truncate" title={c.user_message}>
                        {c.user_message}
                      </td>
                      <td className="px-6 py-3 text-foreground">
                        {CATEGORY_LABEL[c.category] ?? c.category}
                      </td>
                      <td className="px-6 py-3 text-muted-foreground">
                        {PROVIDER_LABEL[c.provider] ?? c.provider}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Live consult requests */}
        {consults.length > 0 && (
          <div className="mt-8 panel overflow-hidden border-emerald-500/20">
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-foreground">Live consult requests</h3>
              </div>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {consults.filter(c => c.status === "pending").length} pending
              </span>
            </div>
            <div className="divide-y divide-white/5">
              {consults.map((c) => (
                <div key={c.id} className="flex items-center justify-between px-6 py-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
                        c.status === "pending"
                          ? "bg-amber-500/15 text-amber-400"
                          : "bg-emerald-500/15 text-emerald-400"
                      }`}>
                        {c.status}
                      </span>
                      <span className="text-xs text-muted-foreground">{timeAgo(c.created_at)}</span>
                      <span className="text-xs text-muted-foreground capitalize">{c.category.replace("_", " ")}</span>
                    </div>
                    <p className="mt-1 truncate text-sm text-foreground max-w-md" title={c.user_message}>
                      {c.user_message}
                    </p>
                  </div>
                  <a
                    href={c.room_url ?? JITSI_ROOM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-black transition-opacity hover:opacity-90"
                  >
                    <Video className="h-3 w-3" />
                    Join call
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

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
