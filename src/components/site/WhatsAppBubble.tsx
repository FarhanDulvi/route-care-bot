import type { ChatBubble as Bubble } from "@/lib/scenarios";

function Ticks() {
  return (
    <svg viewBox="0 0 16 11" className="ml-1 inline h-3 w-4" aria-hidden="true">
      <path
        fill="#53bdeb"
        d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.405-2.272a.463.463 0 0 0-.336-.144.41.41 0 0 0-.328.144L.546 6.812a.488.488 0 0 0 0 .685l3.624 3.43c.092.09.218.144.343.144a.49.49 0 0 0 .39-.203L11.92 1.49l.025-.026a.487.487 0 0 0-.05-.685l-.823-.126Z"
      />
      <path
        fill="#53bdeb"
        d="M15.404.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-.499-.47-.722.891 1.273 1.215c.092.09.218.144.343.144a.49.49 0 0 0 .39-.203L16.253 1.49l.025-.026a.487.487 0 0 0-.05-.685l-.824-.126Z"
      />
    </svg>
  );
}

function Time({ outgoing }: { outgoing?: boolean }) {
  return (
    <span className="ml-2 inline-flex items-center text-[10px] text-[#667781]">
      {timeString()}
      {outgoing && <Ticks />}
    </span>
  );
}

function timeString() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function WhatsAppBubble({ bubble }: { bubble: Bubble }) {
  const outgoing = bubble.from === "bot";
  const emergency = bubble.emphasis === "emergency";
  const muted = bubble.emphasis === "muted";

  return (
    <div
      className={`flex w-full animate-bubble-in ${outgoing ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`relative max-w-[78%] rounded-lg px-2.5 py-1.5 shadow-sm ${
          outgoing ? "bg-[#ffffff] text-[#111b21]" : "bg-[#d9fdd3] text-[#111b21]"
        } ${emergency ? "border-l-4 border-[#dc2626]" : ""}`}
        style={{
          borderTopLeftRadius: outgoing ? 2 : 8,
          borderTopRightRadius: outgoing ? 8 : 2,
        }}
      >
        {bubble.voice ? (
          <VoiceBubble duration={bubble.voice.duration} transcript={bubble.voice.transcript} />
        ) : (
          <p
            className={`whitespace-pre-wrap break-words text-[13.5px] leading-snug ${
              muted ? "italic text-[#667781]" : ""
            } ${emergency ? "font-semibold text-[#7f1d1d]" : ""}`}
          >
            {bubble.text}
            <Time outgoing={outgoing} />
          </p>
        )}
      </div>
    </div>
  );
}

function VoiceBubble({ duration, transcript }: { duration: string; transcript: string }) {
  return (
    <div className="min-w-[200px]">
      <div className="flex items-center gap-2 py-1">
        <button
          type="button"
          className="grid h-7 w-7 place-items-center rounded-full bg-[#00a884] text-white"
          aria-label="play voice note"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
        <svg viewBox="0 0 120 24" className="h-5 flex-1" aria-hidden="true">
          {Array.from({ length: 28 }).map((_, i) => {
            const h = 4 + ((i * 7) % 14);
            return (
              <rect
                key={i}
                x={i * 4.2}
                y={(24 - h) / 2}
                width="2"
                height={h}
                rx="1"
                fill="#667781"
              />
            );
          })}
        </svg>
        <span className="text-[11px] text-[#667781]">{duration}</span>
      </div>
      <p className="mt-1 border-t border-[#e9edef] pt-1 text-[11px] italic text-[#667781]">
        transcribed: {transcript}
        <Time outgoing={false} />
      </p>
    </div>
  );
}

export function TypingBubble() {
  return (
    <div className="flex w-full animate-bubble-in justify-start">
      <div
        className="rounded-lg bg-white px-3 py-2 shadow-sm"
        style={{ borderTopLeftRadius: 2 }}
      >
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}

export function ActionCardBubble({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <div className="flex w-full animate-bubble-in justify-start">
      <div
        className="w-[78%] overflow-hidden rounded-lg bg-white text-[#111b21] shadow-sm"
        style={{ borderTopLeftRadius: 2 }}
      >
        <button
          type="button"
          onClick={onClick}
          className="block w-full bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          {label}
        </button>
        <div className="px-3 py-1.5 text-right">
          <span className="text-[10px] text-[#667781]">{timeString()}</span>
        </div>
      </div>
    </div>
  );
}
