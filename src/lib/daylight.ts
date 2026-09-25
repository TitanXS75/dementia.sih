/**
 * Daylight orientation utilities for the patient dashboard.
 * Always anchors the elder in time-of-day with culturally appropriate greetings.
 */

export type DaylightPhase = "morning" | "noon" | "evening" | "night";

export function getDaylightPhase(hour?: number): DaylightPhase {
  const h = hour ?? new Date().getHours();
  if (h >= 5 && h < 12) return "morning";
  if (h >= 12 && h < 16) return "noon";
  if (h >= 16 && h < 20) return "evening";
  return "night";
}

export function getDaylightDescription(phase: DaylightPhase): string {
  switch (phase) {
    case "morning":
      return "Morning sunlight fills the veranda.";
    case "noon":
      return "Warm midday. Time for lunch and rest.";
    case "evening":
      return "Golden evening. Time for Sandhya prayer.";
    case "night":
      return "Peaceful night. Rest well.";
  }
}

export function getDaylightIcon(phase: DaylightPhase): string {
  switch (phase) {
    case "morning":
      return "SunMedium";
    case "noon":
      return "Sun";
    case "evening":
      return "Sunset";
    case "night":
      return "Moon";
  }
}

const greetings: Record<string, Record<DaylightPhase, string>> = {
  en: {
    morning: "Good morning",
    noon: "Good afternoon",
    evening: "Good evening",
    night: "Good night",
  },
  as: {
    morning: "সুপ্ৰভাত",
    noon: "শুভ মধ্যাহ্ন",
    evening: "শুভ সন্ধিয়া",
    night: "শুভ ৰাতি",
  },
  bn: {
    morning: "সুপ্রভাত",
    noon: "শুভ মধ্যাহ্ন",
    evening: "শুভ সন্ধ্যা",
    night: "শুভ রাত্রি",
  },
  hi: {
    morning: "सुप्रभात",
    noon: "शुभ दोपहर",
    evening: "शुभ संध्या",
    night: "शुभ रात्रि",
  },
};

export function getGreeting(language: string, name?: string, phase?: DaylightPhase): string {
  const p = phase ?? getDaylightPhase();
  const langGreetings = greetings[language] ?? greetings.en;
  const greeting = langGreetings[p];
  return name ? `${greeting}, ${name}!` : `${greeting}!`;
}

export function getFormattedDate(language: string): string {
  const now = new Date();
  const locale = language === "as" ? "as-IN" : language === "bn" ? "bn-IN" : language === "hi" ? "hi-IN" : "en-IN";

  try {
    const day = now.toLocaleDateString(locale, { weekday: "long" });
    const date = now.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return `${day}, ${date}`;
  } catch {
    return now.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
}

export function getFormattedTime(): string {
  return new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
