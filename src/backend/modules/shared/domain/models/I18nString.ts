import { VO } from "../../../../framework/VO";
import { I18nStringInput } from "./I18nStringInput";
import { Locale, localeEntries } from "./Locale";
import { validateI18nStringInput } from "./validateI18nStringInput";

export class I18nString implements VO<I18nString>, I18nStringInput {
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
    return I18nString.fromInput(this);
  }

  public equals(other: I18nString) {
    return (
      this.original === other.original &&
      localeEntries.every(
        (key) => this.translations[key] === other.translations[key]
      )
    );
  }

  public static fromDBTextUnchecked(value: string) {
    return I18nString.fromInput(JSON.parse(value));
  }

  public static fromDBText(value: string) {
    const input: unknown = JSON.parse(value);
    validateI18nStringInput(input);
    return I18nString.fromInput(input);
  }

  public toDBText(): string {
    return JSON.stringify(this.toInput());
  }

  public toInput(): I18nStringInput {
    return {
      original: this.original,
      translations: this.translations,
    };
  }
}
