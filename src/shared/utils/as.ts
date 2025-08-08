import { BrandedString } from "../../framework/types/BrandedString";

export function as<T extends string>(value: string): BrandedString<T> {
  return value as BrandedString<T>;
}
