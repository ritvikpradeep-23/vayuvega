export type ChatStep =
  | "greeting"
  | "name"
  | "age"
  | "location"
  | "email"
  | "grievance"
  | "transmitting"
  | "confirmed"
  | "error";

export interface Visitor {
  name?: string;
  age?: string;
  location?: string;
  email?: string;
  message?: string;
}

export interface ChatMessage {
  id: string;
  from: "bot" | "user";
  text: string;
  time: string;
}

export interface ChatState {
  step: ChatStep;
  messages: ChatMessage[];
  visitor: Visitor;
  errorText?: string;
}

export type ChatAction =
  | { type: "USER_SUBMIT"; payload: string }
  | { type: "SEND_START" }
  | { type: "SEND_SUCCESS" }
  | { type: "SEND_FAILURE"; payload: string }
  | { type: "RETRY" };
