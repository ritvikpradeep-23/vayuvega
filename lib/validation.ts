export interface GrievancePayload {
  name: string;
  age: string;
  location: string;
  email: string;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidName(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length >= 2 && /^[a-zA-Z\s'.-]+$/.test(trimmed);
}

export function isValidAge(value: string): boolean {
  if (!/^\d{1,3}$/.test(value.trim())) return false;
  const n = Number(value);
  return n >= 1 && n <= 120;
}

export function isValidLocation(value: string): boolean {
  return value.trim().length >= 2;
}

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

export function isValidMessage(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length >= 5 && trimmed.length <= 2000;
}

export function validateGrievance(payload: Partial<GrievancePayload>): string | null {
  if (!payload.name || !isValidName(payload.name)) return "A valid name is required.";
  if (!payload.age || !isValidAge(payload.age)) return "A valid age (1-120) is required.";
  if (!payload.location || !isValidLocation(payload.location)) return "A valid location is required.";
  if (!payload.email || !isValidEmail(payload.email)) return "A valid email is required.";
  if (!payload.message || !isValidMessage(payload.message)) return "A message between 5 and 2000 characters is required.";
  return null;
}
