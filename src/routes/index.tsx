import { createFileRoute } from "@tanstack/react-router";
import { useReducer } from "react";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";

import { Onboarding } from "@/components/site/Onboarding";
import { Demo } from "@/components/site/Demo";
import { Coverage } from "@/components/site/Coverage";
import { Footer } from "@/components/site/Footer";
import { initialState, reducer } from "@/lib/routehealth-state";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "RouteHealth — Telegram benefits concierge for Malaysian SMEs" },
      {
        name: "description",
        content:
          "RouteHealth routes sick employees to the right care, instantly. Multilingual Telegram concierge for Malaysian SMEs.",
      },
      { property: "og:title", content: "RouteHealth — Benefits concierge on Telegram" },
      {
        property: "og:description",
        content:
          "Routes sick employees to the right covered care, instantly. Patient Journey Automation for Malaysian SMEs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Onboarding />
        <Demo dispatch={dispatch} />
        <Coverage />
      </main>
      <Footer />
    </div>
  );
}
