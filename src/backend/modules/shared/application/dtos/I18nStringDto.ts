import { Locale } from "../../domain/models/Locale";

export interface I18nStringDto {
  original: Locale;
  translations: Partial<Record<Locale, string>>;
}
