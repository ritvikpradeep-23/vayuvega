export const chatCopy = {
  greeting:
    "...signal's steady. I'm Vayuvega. Before the wind carries your message to me — what's your name?",
  askAge: (name: string) => `Good to meet you, ${name}. How many monsoons have you seen? (your age)`,
  askLocation: "Where are you writing to me from?",
  askEmail: "I'll need a way to reach back. What's your email?",
  askGrievance: "So... tell me. How can I help you?",
  transmitting: "Transmitting to Vayuvega...",
  confirmed: (name: string, email: string) =>
    `Message received, ${name}. I'm already listening. I'll reach out to ${email} soon.`,
  retryPrompt: "The wind lost the signal for a second. Let's try sending that again.",
  invalidName: "That doesn't quite sound like a name I can carry on the wind — try again?",
  invalidAge: "I'll need a real number of monsoons — somewhere between 1 and 120.",
  invalidLocation: "I didn't catch a place there. Where are you writing from?",
  invalidEmail: "That doesn't look like a full email address — mind trying again?",
  invalidMessage: "Tell me a little more — even a few words helps me understand.",
} as const;
