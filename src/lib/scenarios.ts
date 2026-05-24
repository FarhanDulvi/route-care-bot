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
  id: "fever" | "dental" | "mental" | "emergency" | "chronic";
  title: string;
  buttonLabel: string;
  isEmergency?: boolean;
  /** When set, this bot bubble fires first — bot initiates the conversation */
  proactiveOpener?: ChatBubble;
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
    buttonLabel: "Fever → DA video",
    employee: { from: "employee", text: "need to see a doctor, throat sore since last night" },
    log: [
      { text: "[routehealth] inbound message received" },
      { text: "[routehealth] safety_check: no red flag" },
      { text: "[routehealth] company: TechMakers SB → DA Corporate" },
      { text: "[routehealth] category: gp | coverage: video 6/8 remaining" },
      { text: "[routehealth] decision: DA video, RM 0, ETA 0 min" },
    ],
    bot: [
      { from: "bot", text: "Sorry to hear that. Your company has DA Corporate — 8 free video consults a year, 2 used." },
      { from: "bot", text: "Fastest covered option: video consult now, meds delivered Klang Valley ~3 hours. Free for you." },
      { from: "bot", text: "I help you find covered care. I do not give medical advice.", emphasis: "muted" },
    ],
    action: { label: "Open DA video consult →" },
    routeEvent: { need: "fever", route: "DA video consult", provider: "Doctor Anywhere" },
  },
  {
    id: "dental",
    title: "Toothache",
    buttonLabel: "Toothache → Angsana panel",
    employee: { from: "employee", voice: { duration: "0:04", transcript: "nak buat rawatan gigi" } },
    log: [
      { text: "[routehealth] voice note received" },
      { text: "[whisper] transcribed: nak buat rawatan gigi" },
      { text: "[routehealth] safety_check: no red flag" },
      { text: "[routehealth] category: dental | DA: no dental cover | Angsana: covered" },
      { text: "[routehealth] geo: nearest panel 1.4 km" },
    ],
    bot: [
      { from: "bot", text: "Boleh. Pelan TechMakers anda cover rawatan gigi di panel Angsana." },
      { from: "bot", text: "Klinik terdekat: Smile Wangsa Maju, 1.4 km. Tap untuk tempah slot hari ini." },
    ],
    action: { label: "Book at Smile Wangsa Maju →" },
    routeEvent: { need: "dental", route: "Smile Wangsa Maju", provider: "Angsana" },
  },
  {
    id: "mental",
    title: "Mental health",
    buttonLabel: "Anxiety → DA counselling",
    employee: { from: "employee", text: "feeling really anxious lately, cannot sleep, think I need to talk to someone" },
    log: [
      { text: "[routehealth] inbound message received" },
      { text: "[routehealth] safety_check: no acute self-harm signal, sensitive" },
      { text: "[routehealth] category: mental_health | DA Mental Wellness 0/6 used" },
      { text: "[routehealth] decision: confidential counselling, video" },
    ],
    bot: [
      { from: "bot", text: "Thank you for telling me — that takes courage. Your DA plan includes 6 free confidential counsellor sessions a year, video-based." },
      { from: "bot", text: "You can book a slot anytime today. Available 9am to 11pm." },
    ],
    action: { label: "Open DA Mental Wellness →" },
    routeEvent: { need: "counselling", route: "DA Mental Wellness", provider: "Doctor Anywhere" },
  },
  {
    id: "chronic",
    title: "Chronic care",
    buttonLabel: "Chronic care (bot initiates)",
    proactiveOpener: {
      from: "bot",
      text: "Hi Ahmad 👋 Your monthly blood pressure review is overdue — last visit was 3 weeks ago at Klinik Suria. Want me to find you a slot today?",
    },
    employee: { from: "employee", text: "ya lupa, tolong carikan" },
    log: [
      { text: "[routehealth] proactive: chronic_care_check triggered (EMP-004)" },
      { text: "[routehealth] last_visit: 21 days ago | next_due: overdue" },
      { text: "[routehealth] safety_check: no red flag" },
      { text: "[routehealth] category: gp_chronic | Angsana panel: covered" },
      { text: "[routehealth] geo: nearest panel 0.8 km | slot: 10:30 available" },
    ],
    bot: [
      { from: "bot", text: "Dapat. Klinik Suria Wangsa Maju, 0.8 km, slot jam 10:30 hari ini — fully covered." },
      { from: "bot", text: "Panel Angsana, tiada co-pay. Benefit monthly chronic visit reset hujung bulan." },
    ],
    action: { label: "Confirm slot at Klinik Suria →" },
    routeEvent: { need: "chronic care (BP)", route: "Klinik Suria Wangsa Maju", provider: "Angsana" },
  },
  {
    id: "emergency",
    title: "Chest pain",
    buttonLabel: "Chest pain → 999 escalation",
    isEmergency: true,
    employee: { from: "employee", text: "dada rasa berat, susah nak nafas" },
    log: [
      { text: "[routehealth] inbound message received" },
      { text: "[routehealth] safety_check: EMERGENCY — cardiac/respiratory signal", tone: "emergency" },
      { text: "[routehealth] action: ESCALATE TO 999 — routing suppressed", tone: "emergency" },
    ],
    bot: [
      { from: "bot", text: "This may be an emergency. Call 999 now.", emphasis: "emergency" },
      { from: "bot", text: "Go to the nearest emergency department. Do not wait for a video consult." },
    ],
  },
];
