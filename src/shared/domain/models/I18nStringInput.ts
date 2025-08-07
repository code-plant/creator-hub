import { Locale } from "./Locale";

export interface I18nStringInput {
  original: Locale;
  translations: Partial<Record<Locale, string>>;
}
