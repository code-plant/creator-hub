import { getCookiesFromHeaders } from "../../lib/getCookiesFromHeaders";
import { Locale, localeMap } from "../../modules/shared/domain/models/Locale";
import { ReadonlyHeaders } from "./ReadOnlyHeaders";

export function guessLocaleFromHeaders(
  headers: ReadonlyHeaders,
  cookies: Partial<Record<string, string>> | null = getCookiesFromHeaders(
    headers
  )
): Locale {
  const cookieLocaleRaw = cookies?.["LOCALE"];
  const cookieLocale = cookieLocaleRaw && localeMap[cookieLocaleRaw];
  if (cookieLocale) {
    return cookieLocale;
  }
  const acceptLanguages = headers.get("accept-language")?.split(";")[0];
  if (acceptLanguages) {
    for (const acceptLanguage of acceptLanguages) {
      const locale = localeMap[acceptLanguage];
      if (locale) {
        return locale;
      }
    }
  }
  return "en";
}
