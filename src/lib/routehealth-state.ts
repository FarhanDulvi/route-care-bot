export interface EventRow {
  time: string;
  employee: string;
  need: string;
  route: string;
  provider: string;
}

export interface AppState {
  counter: number;
  savings: number;
  events: EventRow[];
  playing: string | null;
}

export const initialState: AppState = {
  counter: 7,
  savings: 245,
  events: [
    { time: "09:14 today", employee: "+60***6789", need: "fever", route: "DA video consult", provider: "Doctor Anywhere" },
    { time: "08:51 today", employee: "+60***4523", need: "headache", route: "DA video consult", provider: "Doctor Anywhere" },
    { time: "16:30 yesterday", employee: "+60***2210", need: "dental", route: "Smile Wangsa Maju", provider: "Angsana" },
    { time: "11:22 yesterday", employee: "+60***9981", need: "rash", route: "DA video consult", provider: "Doctor Anywhere" },
    { time: "14:08 two days ago", employee: "+60***6789", need: "counselling", route: "DA Mental Wellness", provider: "Doctor Anywhere" },
  ],
  playing: null,
};

export type Action =
  | { type: "ROUTE_LOGGED"; event: Omit<EventRow, "time" | "employee"> }
  | { type: "SET_PLAYING"; id: string | null };

function nowLabel() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")} today`;
}

const MASKED_NUMBERS = ["+60***6789", "+60***4523", "+60***2210", "+60***9981", "+60***3344"];

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "ROUTE_LOGGED": {
      const phone = MASKED_NUMBERS[Math.floor(Math.random() * MASKED_NUMBERS.length)];
      return {
        ...state,
        counter: state.counter + 1,
        savings: state.savings + 35,
        events: [
          { time: nowLabel(), employee: phone, ...action.event },
          ...state.events,
        ],
      };
    }
    case "SET_PLAYING":
      return { ...state, playing: action.id };
    default:
      return state;
  }
}
