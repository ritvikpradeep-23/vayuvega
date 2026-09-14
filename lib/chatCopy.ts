export const chatCopy = {
  greeting: "Hey, I'm Vayuvega 🌬️ — what should I call you?",
  askAge: (name: string) => `Good to meet you, ${name}. How many monsoons have you seen? (your age)`,
  askLocation: "Where are you writing to me from?",
  askEmail: "I'll need a way to reach back. What's your email?",
  askGrievance: "So... how can I help you?",
  transmitting: "On it — let me get this to him.",
  confirmed: (name: string, email: string) =>
    `He has it, ${name}. You'll hear back at ${email} soon 🌬️`,
  retryPrompt: "The wind lost the signal for a second. Let's try sending that again.",
  invalidName: "That doesn't quite sound like a name I can carry on the wind — try again?",
  invalidAge: "I'll need a real number of monsoons — somewhere between 1 and 120.",
  invalidLocation: "I didn't catch a place there. Where are you writing from?",
  invalidEmail: "That doesn't look like a full email address — mind trying again?",
  invalidMessage: "Tell me a little more — even a few words helps me understand.",
  placeholders: {
    name: "Your name...",
    age: "Your age...",
    location: "Your location...",
    email: "Your email...",
    grievance: "What's going on...",
  },
} as const;
