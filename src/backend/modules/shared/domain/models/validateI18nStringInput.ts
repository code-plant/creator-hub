import { expectOptionalPropertyType } from "../../../../../common/utils/validate/expectOptionalPropertyType";
import { expectPropertyType } from "../../../../../common/utils/validate/expectPropertyType";
import { I18nStringInput } from "./I18nStringInput";
import { localeEntries, localeMap } from "./Locale";

export function validateI18nStringInput(
  input: unknown
): asserts input is I18nStringInput {
  if (typeof input !== "object" || input === null) {
    throw new Error(`Invalid I18nString input: ${input} is not an object`);
  }
  if (!("original" in input && "translations" in input)) {
    throw new Error(
      `Invalid I18nString input: ${input} is not an object with original and translations`
    );
  }
  if (
    typeof input.original !== "string" ||
    localeMap[input.original] === undefined
  ) {
    throw new Error(
      `Invalid I18nString input: ${input.original} is not a valid locale`
    );
  }
  if (typeof input.translations !== "object" || input.translations === null) {
    throw new Error("Invalid I18nString input: translations is not an object");
  }
  const { original, translations } = input;
  expectPropertyType(
    translations,
    original,
    "string",
    "Invalid I18nString input: original translation is not a string"
  );
  for (const locale of localeEntries) {
    if (locale === original) {
      continue;
    }
    expectOptionalPropertyType(
      translations,
      locale,
      "string",
      () => `Invalid I18nString input: ${locale} is defined but not a string`
    );
  }
}
