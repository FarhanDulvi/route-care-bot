import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { SCENARIOS, type Scenario, type ChatBubble } from "@/lib/scenarios";
import type { Action } from "@/lib/routehealth-state";
import { WhatsAppBubble, TypingBubble, ActionCardBubble } from "./WhatsAppBubble";
import { GatewayLog } from "./GatewayLog";
import { PhoneFrame, ChatHeader } from "./PhoneFrame";

interface Props {
  dispatch: React.Dispatch<Action>;
}

type RenderItem =
  | { kind: "bubble"; bubble: ChatBubble; key: string }
  | { kind: "typing"; key: string }
  | { kind: "action"; label: string; key: string; consumed: boolean };

export function Demo({ dispatch }: Props) {
  const [activeId, setActiveId] = useState<Scenario["id"] | null>(null);
  const [items, setItems] = useState<RenderItem[]>([]);
  const [logLines, setLogLines] = useState<Scenario["log"]>([]);
  const [runKey, setRunKey] = useState(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  function clearTimers() {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }

  function after(ms: number, fn: () => void) {
    const t = setTimeout(fn, ms);
    timeoutsRef.current.push(t);
  }

  function play(scenario: Scenario) {
    clearTimers();
    setActiveId(scenario.id);
    setItems([]);
    setLogLines([]);
    setRunKey((k) => k + 1);

    // For proactive scenarios, bot fires first
    if (scenario.proactiveOpener) {
      // 0) bot opener at 600ms — bot initiates
      after(600, () => {
        setItems([{ kind: "bubble", bubble: scenario.proactiveOpener!, key: "opener" }]);
      });

      // 1) employee reply at 2.4s
      after(2400, () => {
        setItems((prev) => [...prev, { kind: "bubble", bubble: scenario.employee, key: "emp" }]);
      });

      // 2) gateway log after employee reply
      const logStartDelay = 2900;
      after(logStartDelay, () => setLogLines(scenario.log));

      const logDuration = scenario.log.length * 650 + 200;
      const typingStart = logStartDelay + logDuration;
      after(typingStart, () => {
        setItems((prev) => [...prev, { kind: "typing", key: "typing" }]);
      });

      const botStart = typingStart + 1400;
      after(botStart, () => {
        setItems((prev) => prev.filter((x) => x.kind !== "typing"));
      });

      scenario.bot.forEach((bubble, i) => {
        after(botStart + i * 700, () => {
          setItems((prev) => [...prev, { kind: "bubble", bubble, key: `bot-${i}` }]);
        });
      });

      if (scenario.action) {
        const actionAt = botStart + scenario.bot.length * 700 + 200;
        after(actionAt, () => {
          setItems((prev) => [
            ...prev,
            { kind: "action", label: scenario.action!.label, key: "action", consumed: false },
          ]);
        });
      }
      return;
    }

    // Standard (employee-initiated) flow
    // 1) employee bubble at ~1s
    after(900, () => {
      setItems([{ kind: "bubble", bubble: scenario.employee, key: "emp" }]);
    });

    // 2) gateway log streams shortly after
    const logStartDelay = 1300;
    after(logStartDelay, () => setLogLines(scenario.log));

    // approximate log duration: ~600ms per line
    const logDuration = scenario.log.length * 650 + 200;

    // 3) typing indicator
    const typingStart = logStartDelay + logDuration;
    after(typingStart, () => {
      setItems((prev) => [...prev, { kind: "typing", key: "typing" }]);
    });

    // 4) bot bubbles after typing (~1.5s)
    const botStart = typingStart + 1500;
    after(botStart, () => {
      setItems((prev) => prev.filter((x) => x.kind !== "typing"));
    });

    scenario.bot.forEach((bubble, i) => {
      after(botStart + i * 700, () => {
        setItems((prev) => [
          ...prev,
          { kind: "bubble", bubble, key: `bot-${i}` },
        ]);
      });
    });

    // 5) action card (skip for emergency)
    if (scenario.action) {
      const actionAt = botStart + scenario.bot.length * 700 + 200;
      after(actionAt, () => {
        setItems((prev) => [
          ...prev,
          { kind: "action", label: scenario.action!.label, key: "action", consumed: false },
        ]);
      });
    }
  }

  function handleAction(scenario: Scenario) {
    if (!scenario.routeEvent) return;
    dispatch({ type: "ROUTE_LOGGED", event: scenario.routeEvent });
    toast.success("Routed. Logged to dashboard.");
    setItems((prev) =>
      prev.map((it) =>
        it.kind === "action" ? { ...it, consumed: true, label: "✓ Routed" } : it,
      ),
    );
  }

  const activeScenario = SCENARIOS.find((s) => s.id === activeId);

  return (
    <section id="demo" className="px-4 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Watch a real conversation
        </h2>
        <p className="mt-3 text-muted-foreground">
          Pick a scenario. The concierge discovers, routes, and follows up.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {SCENARIOS.map((s) => {
            const active = activeId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => play(s)}
                className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "border-primary/60 bg-primary/10 text-primary"
                    : "border-border bg-secondary text-foreground hover:border-primary/40 hover:bg-secondary/80"
                }`}
              >
                {s.buttonLabel}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="order-2 lg:order-1">
            <PhoneFrame>
              <ChatHeader />
              <div className="min-h-[520px] space-y-2 bg-[#0e1621] px-3 py-4">
                {items.length === 0 && (
                  <p className="mt-20 text-center text-xs text-[#8696a0]">
                    {activeScenario
                      ? "incoming..."
                      : "Pick a scenario above to start"}
                  </p>
                )}
                {items.map((it) => {
                  if (it.kind === "bubble")
                    return <WhatsAppBubble key={it.key} bubble={it.bubble} />;
                  if (it.kind === "typing") return <TypingBubble key={it.key} />;
                  return (
                    <ActionCardBubble
                      key={it.key}
                      label={it.label}
                      onClick={() => !it.consumed && activeScenario && handleAction(activeScenario)}
                    />
                  );
                })}
              </div>
            </PhoneFrame>
          </div>

          <div className="order-1 min-h-[360px] lg:order-2 lg:min-h-[600px]">
            <GatewayLog lines={logLines} runKey={runKey} />
          </div>
        </div>
      </div>
    </section>
  );
}
