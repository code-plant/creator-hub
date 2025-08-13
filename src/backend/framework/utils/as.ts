import { BrandedString } from "../types/BrandedString";

export function as<T extends string>(value: string): BrandedString<T>;
export function as<T extends string>(
  value: string | null
): BrandedString<T> | null;
export function as<T extends string>(
  value: string | undefined
): BrandedString<T> | undefined;
export function as<T extends string>(
  value: string | null | undefined
): BrandedString<T> | null | undefined;
export function as<T extends string>(
  value: string | null | undefined
): BrandedString<T> | null | undefined {
  return value as BrandedString<T> | null | undefined;
}
