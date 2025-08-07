export const localeEntries = ["en", "ko"] as const;
export const localeMap: Partial<Record<string, Locale>> = Object.fromEntries(
  localeEntries.map((locale) => [locale, locale])
);

export type Locale = (typeof localeEntries)[number];
