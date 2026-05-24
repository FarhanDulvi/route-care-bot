## RouteHealth — single-page marketing + live demo

Premium dark single-page app on the existing TanStack Start + Tailwind v4 stack. All content, copy, scripts, and seeded data come verbatim from the spec. No backend, no storage, no router — one route (`/`), smooth-scroll anchors, in-memory `useReducer` state.

### Design tokens (src/styles.css)
Replace the default oklch palette with the spec's exact hex values, mapped to semantic tokens so components use `bg-background`, `text-foreground`, `bg-card`, `text-primary`, etc.

- `--background`: #0a0e1a (deep navy)
- `--card`: #0f172a @ 60% + backdrop-blur utility class
- `--foreground`: #f1f5f9, `--muted-foreground`: #94a3b8
- `--primary`: #38bdf8 (sky), `--primary-foreground`: #0a0e1a
- `--accent`: #f97316 (OpenClaw orange) — used only on OpenClaw-native elements
- `--border`: white @ 6% opacity
- WhatsApp-specific tokens: `--wa-bg` #0b141a, `--wa-in` #ffffff, `--wa-out` #d9fdd3, `--wa-text` #111b21
- Inter font via Google Fonts link in `__root.tsx` head
- One radial gradient utility used only in hero

### File structure

```
src/routes/index.tsx          ← page composition + reducer + scenario engine
src/components/site/
  Nav.tsx                     ← sticky blur-on-scroll nav
  Hero.tsx                    ← headline + CTAs + floating WA bubbles
  Problem.tsx                 ← 3 stat cards
  Onboarding.tsx              ← fake form with 1.5s loading → success card
  Demo.tsx                    ← phone frame + chat + gateway log (centerpiece)
  Dashboard.tsx               ← stats + recent events table + proactive panel
  Skill.tsx                   ← orange-accented install/structure/JSON blocks
  Footer.tsx
  WhatsAppBubble.tsx          ← incoming/outgoing variants, ticks, timestamps
  GatewayLog.tsx              ← typewriter monospace lines, emergency = amber/red
  PhoneFrame.tsx              ← device chrome wrapper
src/lib/
  scenarios.ts                ← the 4 scripts verbatim (A/B/C/D), typed
  routehealth-state.ts        ← reducer: counter, savings, events, playing
```

### Scenario engine (Demo.tsx)
One async runner driven by the selected scenario id:
1. Append employee bubble after ~1s
2. Stream gateway log lines one-by-one with typewriter effect (~400–600ms each)
3. Show "Bot is typing…" 3-dot indicator ~1.5s
4. Append bot bubbles staggered with fade-up (~300ms)
5. Render action card with sky-blue button (omitted for emergency scenario D)
6. Action button click → toast "Routed. Logged to dashboard." + dispatch `ROUTE_LOGGED` (counter +1, savings +35, prepend event row). Emergency action does not exist; scenario D mutates no state.

Bubble for scenario B renders a waveform SVG + "0:04" + transcript caption. Emergency bot bubble 1 gets a red left border.

### Dashboard
Reads from reducer. Seeded with counter=7, savings=245, 5 pre-seeded event rows in the exact order/text given. Pulse animation on counter when it changes. Static "Top route" string per spec. Proactive panel is static list. Owner-summary preview is a styled WhatsApp bubble.

### Animations
Framer Motion (already commonly available — will `bun add framer-motion` if missing) for bubble fade-up + counter pulse. CSS transitions for nav blur and hover glows. Typewriter implemented with a small `useTypewriter` hook (no extra dep).

### Toasts
Use existing `sonner` (already wired per stack defaults; add `<Toaster />` in `__root.tsx` if missing).

### Mobile
Tailwind responsive: phone frame + gateway log stack vertically below `md`. Hero floating bubbles move below CTAs on mobile. All sections verified at 375px.

### SEO / head
`__root.tsx` head: title "RouteHealth — WhatsApp benefits concierge for Malaysian SMEs", matching meta description, og tags. Single H1 in Hero.

### Out of scope (explicitly skipped per spec)
Auth, routing, backend, storage, light mode, pricing/about/FAQ, real APIs, placeholder images, lorem.

### Rubric injection
The `[RUBRIC INJECTION]` block is empty for now — no behavior changes. Will revisit only when user pastes content there.
