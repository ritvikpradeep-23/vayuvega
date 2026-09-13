import { chatCopy } from "@/lib/chatCopy";
import { isValidAge, isValidEmail, isValidLocation, isValidMessage, isValidName } from "@/lib/validation";
import type { ChatAction, ChatState } from "./chatTypes";

let idCounter = 0;
function nextId(): string {
  idCounter += 1;
  return `msg-${idCounter}`;
}

function botMessage(text: string) {
  return { id: nextId(), from: "bot" as const, text };
}

function userMessage(text: string) {
  return { id: nextId(), from: "user" as const, text };
}

export const initialChatState: ChatState = {
  step: "name",
  messages: [botMessage(chatCopy.greeting)],
  visitor: {},
};

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "USER_SUBMIT": {
      const raw = action.payload;
      const trimmed = raw.trim();

      switch (state.step) {
        case "name": {
          if (!isValidName(trimmed)) {
            return { ...state, messages: [...state.messages, userMessage(raw), botMessage(chatCopy.invalidName)] };
          }
          return {
            ...state,
            step: "age",
            visitor: { ...state.visitor, name: trimmed },
            messages: [...state.messages, userMessage(raw), botMessage(chatCopy.askAge(trimmed))],
          };
        }
        case "age": {
          if (!isValidAge(trimmed)) {
            return { ...state, messages: [...state.messages, userMessage(raw), botMessage(chatCopy.invalidAge)] };
          }
          return {
            ...state,
            step: "location",
            visitor: { ...state.visitor, age: trimmed },
            messages: [...state.messages, userMessage(raw), botMessage(chatCopy.askLocation)],
          };
        }
        case "location": {
          if (!isValidLocation(trimmed)) {
            return { ...state, messages: [...state.messages, userMessage(raw), botMessage(chatCopy.invalidLocation)] };
          }
          return {
            ...state,
            step: "email",
            visitor: { ...state.visitor, location: trimmed },
            messages: [...state.messages, userMessage(raw), botMessage(chatCopy.askEmail)],
          };
        }
        case "email": {
          if (!isValidEmail(trimmed)) {
            return { ...state, messages: [...state.messages, userMessage(raw), botMessage(chatCopy.invalidEmail)] };
          }
          return {
            ...state,
            step: "grievance",
            visitor: { ...state.visitor, email: trimmed },
            messages: [...state.messages, userMessage(raw), botMessage(chatCopy.askGrievance)],
          };
        }
        case "grievance": {
          if (!isValidMessage(trimmed)) {
            return { ...state, messages: [...state.messages, userMessage(raw), botMessage(chatCopy.invalidMessage)] };
          }
          return {
            ...state,
            step: "transmitting",
            visitor: { ...state.visitor, message: trimmed },
            messages: [...state.messages, userMessage(raw)],
          };
        }
        default:
          return state;
      }
    }
    case "SEND_START":
      return state;
    case "SEND_SUCCESS": {
      const { name, email } = state.visitor;
      return {
        ...state,
        step: "confirmed",
        messages: [...state.messages, botMessage(chatCopy.confirmed(name ?? "friend", email ?? ""))],
      };
    }
    case "SEND_FAILURE": {
      return {
        ...state,
        step: "error",
        errorText: action.payload,
        messages: [...state.messages, botMessage(chatCopy.retryPrompt)],
      };
    }
    case "RETRY": {
      return {
        ...state,
        step: "transmitting",
        errorText: undefined,
      };
    }
    default:
      return state;
  }
}
