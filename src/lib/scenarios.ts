export type GatewayLineTone = "normal" | "emergency";
export interface GatewayLine {
  text: string;
  tone?: GatewayLineTone;
}
export interface ChatBubble {
  from: "employee" | "bot";
  text?: string;
  voice?: { duration: string; transcript: string };
  emphasis?: "emergency" | "muted";
}
export interface ActionCard {
  label: string;
}
export interface Scenario {
  id: "fever" | "dental" | "mental" | "emergency";
  title: string;
  buttonLabel: string;
  isEmergency?: boolean;
  employee: ChatBubble;
  log: GatewayLine[];
  bot: ChatBubble[];
  action?: ActionCard;
  routeEvent?: { need: string; route: string; provider: string };
}

export const SCENARIOS: Scenario[] = [
  {
    id: "fever",
    title: "Fever",
    buttonLabel: "Fever (routes to DA)",
    employee: { from: "employee", text: "need to see a doctor, throat sore since last night" },
    log: [
      { text: "[gateway] inbound message received" },
      { text: "[skill:routehealth] safety_check: no red flag" },
      { text: "[skill:routehealth] company: TechMakers SB -> DA Corporate" },
      { text: "[skill:routehealth] category: gp | coverage: video 6/8 remaining" },
      { text: "[skill:routehealth] decision: DA video, RM 0, ETA 0 min" },
    ],
    bot: [
      { from: "bot", text: "Sorry to hear that. Your company has DA Corporate, 8 free video consults a year, 2 used." },
      { from: "bot", text: "Fastest covered option: video consult now, meds delivered Klang Valley in about 3 hours. Free for you." },
      { from: "bot", text: "I help you find covered care. I do not give medical advice.", emphasis: "muted" },
    ],
    action: { label: "Open DA video consult" },
    routeEvent: { need: "fever", route: "DA video consult", provider: "Doctor Anywhere" },
  },
  {
    id: "dental",
    title: "Toothache",
    buttonLabel: "Toothache, voice note (Angsana panel)",
    employee: { from: "employee", voice: { duration: "0:04", transcript: "nak buat rawatan gigi" } },
    log: [
      { text: "[gateway] voice note received" },
      { text: "[whisper] transcribed (ms): nak buat rawatan gigi" },
      { text: "[skill:routehealth] safety_check: no red flag" },
      { text: "[skill:routehealth] category: dental | DA: no dental | Angsana: covered" },
      { text: "[skill:routehealth] geo: nearest panel 1.4 km" },
    ],
    bot: [
      { from: "bot", text: "Boleh. Pelan TechMakers anda cover rawatan gigi di panel Angsana." },
      { from: "bot", text: "Klinik terdekat: Smile Wangsa Maju, 1.4 km. Tap untuk tempah slot hari ini." },
    ],
    action: { label: "Book at Angsana panel" },
    routeEvent: { need: "dental", route: "Smile Wangsa Maju", provider: "Angsana" },
  },
  {
    id: "mental",
    title: "Mental health",
    buttonLabel: "Mental health (DA counselling)",
    employee: { from: "employee", text: "feeling really anxious lately, cannot sleep, think I need to talk to someone" },
    log: [
      { text: "[gateway] inbound message received" },
      { text: "[skill:routehealth] safety_check: no acute self-harm signal, sensitive" },
      { text: "[skill:routehealth] category: mental_health | DA Mental Wellness 0/6 used" },
      { text: "[skill:routehealth] decision: confidential counselling, video" },
    ],
    bot: [
      { from: "bot", text: "Thank you for telling me, that takes courage. Your DA plan includes 6 free confidential counsellor sessions a year, video based." },
      { from: "bot", text: "You can book a slot anytime today, available 9am to 11pm." },
    ],
    action: { label: "Open DA Mental Wellness" },
    routeEvent: { need: "counselling", route: "DA Mental Wellness", provider: "Doctor Anywhere" },
  },
  {
    id: "emergency",
    title: "Chest pain",
    buttonLabel: "Chest pain (emergency escalation)",
    isEmergency: true,
    employee: { from: "employee", text: "dada rasa berat, susah nak nafas" },
    log: [
      { text: "[gateway] inbound message received" },
      { text: "[skill:routehealth] safety_check: EMERGENCY red flag (cardiac/respiratory, multilingual)", tone: "emergency" },
      { text: "[skill:routehealth] action: ESCALATE, no routing", tone: "emergency" },
    ],
    bot: [
      { from: "bot", text: "This may be an emergency. Call 999 now.", emphasis: "emergency" },
      { from: "bot", text: "Go to the nearest emergency department. Do not wait for a video consult." },
    ],
  },
];
