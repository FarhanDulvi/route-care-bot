import { useEffect, useState } from "react";
import type { GatewayLine } from "@/lib/scenarios";

interface Props {
  lines: GatewayLine[];
  /** trigger key — when this changes, the log resets and replays */
  runKey: string | number;
  /** ms per character */
  charSpeed?: number;
  /** ms between lines */
  betweenLines?: number;
  onDone?: () => void;
}

export function GatewayLog({ lines, runKey, charSpeed = 14, betweenLines = 180, onDone }: Props) {
  const [rendered, setRendered] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    setRendered([]);
    setCurrentIndex(0);
    setCurrentText("");
  }, [runKey]);

  useEffect(() => {
    if (currentIndex >= lines.length) {
      onDone?.();
      return;
    }
    const target = lines[currentIndex].text;
    if (currentText.length < target.length) {
      const t = setTimeout(() => {
        setCurrentText(target.slice(0, currentText.length + 1));
      }, charSpeed);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setRendered((r) => [...r, target]);
      setCurrentIndex((i) => i + 1);
      setCurrentText("");
    }, betweenLines);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, currentText, lines, runKey]);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#05070d] p-4 font-mono text-[12px] leading-relaxed">
      <div className="mb-3 flex items-center gap-2 border-b border-white/5 pb-2">
        <span className="h-2 w-2 rounded-full bg-[#ef4444]" />
        <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
        <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
        <span className="ml-2 text-[11px] uppercase tracking-wider text-muted-foreground">
          routehealth · gateway.log
        </span>
      </div>
      <div className="flex-1 space-y-1 overflow-y-auto scrollbar-thin">
        {rendered.map((text, i) => (
          <LogLine key={i} text={text} tone={lines[i].tone} />
        ))}
        {currentIndex < lines.length && (
          <LogLine
            text={currentText}
            tone={lines[currentIndex].tone}
            cursor
          />
        )}
        {rendered.length === 0 && currentText.length === 0 && (
          <p className="text-[#475569]">$ awaiting inbound...</p>
        )}
      </div>
    </div>
  );
}

function LogLine({
  text,
  tone,
  cursor,
}: {
  text: string;
  tone?: "normal" | "emergency";
  cursor?: boolean;
}) {
  const isEmergency = tone === "emergency";
  const prompt = isEmergency ? "text-[#ef4444]" : "text-accent";
  const body = isEmergency ? "text-[#fca5a5]" : "text-[#86efac]";
  return (
    <div className="flex gap-2">
      <span className={prompt}>›</span>
      <span className={body}>
        {text}
        {cursor && <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-[#86efac] align-middle" />}
      </span>
    </div>
  );
}
