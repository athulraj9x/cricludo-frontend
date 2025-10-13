import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(word: string) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export const userTypeCollection = {
  "1": "admin",
  "3": "master",
  "5": "agent"
} as const;

export function convertSecondsToHHMMSS(seconds: number) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  // Pad with leading zeros if needed
  const hoursStr = String(hrs).padStart(2, '0');
  const minutesStr = String(mins).padStart(2, '0');
  const secondsStr = String(secs).padStart(2, '0');

  return `${hoursStr} hour, ${minutesStr} min, ${secondsStr} sec`;
}
