import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[380px]">
      <div className="relative rounded-[2.5rem] border border-white/10 bg-[#1a1f2e] p-2 shadow-2xl">
        <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-[#0a0e1a]" />
        <div className="overflow-hidden rounded-[2rem] bg-[#0b141a]">
          {children}
        </div>
      </div>
    </div>
  );
}

export function ChatHeader() {
  return (
    <div className="flex items-center gap-3 bg-[#202c33] px-4 pb-3 pt-8 text-white">
      <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
        RH
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold leading-tight">RouteHealth Bot</p>
        <p className="flex items-center gap-1.5 text-[11px] text-[#8696a0]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
          online
        </p>
      </div>
    </div>
  );
}
