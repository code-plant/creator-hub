import { VO } from "../../../framework/VO";
import { I18nStringInput } from "./I18nStringInput";
import { Locale, localeEntries } from "./Locale";

export class I18nString implements VO<I18nString> {
  private constructor(
    public readonly original: Locale,
    public readonly translations: Partial<Record<Locale, string>>
  ) {
    if (!(original in translations)) {
      throw new Error("Original locale must be in translations");
    }
  }

  public static fromInput({ original, translations }: I18nStringInput) {
    return new I18nString(original, translations);
  }

  public get(locale: Locale) {
    return this.translations[locale] ?? this.translations[this.original];
  }

  public clone() {
    return new I18nString(this.original, { ...this.translations });
  }

  public equals(other: I18nString) {
    return (
      this.original === other.original &&
      localeEntries.every(
        (key) => this.translations[key] === other.translations[key]
      )
    );
  }
}
