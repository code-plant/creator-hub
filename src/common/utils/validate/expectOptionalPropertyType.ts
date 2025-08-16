import { evalLazyMessage } from "../evalLazyMessage";
import { LazyMessage } from "../LazyMessage";
import { getProperty } from "./getProperty";

export function expectOptionalPropertyType<
  T extends object,
  const K extends string
>(
  obj: T,
  key: K,
  type: "string",
  message?: LazyMessage
): asserts obj is T & Partial<Record<K, string>>;
export function expectOptionalPropertyType<
  T extends object,
  const K extends string
>(
  obj: T,
  key: K,
  type: "number",
  message?: LazyMessage
): asserts obj is T & Partial<Record<K, number>>;
export function expectOptionalPropertyType<
  T extends object,
  const K extends string
>(
  obj: T,
  key: K,
  type: "boolean",
  message?: LazyMessage
): asserts obj is T & Partial<Record<K, boolean>>;
export function expectOptionalPropertyType<
  T extends object,
  const K extends string
>(
  obj: T,
  key: K,
  type: "object",
  message?: LazyMessage
): asserts obj is T & Partial<Record<K, object | null>>;
export function expectOptionalPropertyType<
  T extends object,
  const K extends string
>(
  obj: T,
  key: K,
  type: "undefined",
  message?: LazyMessage
): asserts obj is T & Partial<Record<K, undefined>>;
export function expectOptionalPropertyType<
  T extends object,
  const K extends string
>(
  obj: T,
  key: K,
  type: string,
  message?: LazyMessage
): asserts obj is T & Partial<Record<K, unknown>>;
// // TypeScript doesn't affected by this overload even only this has non-const type parameter
// export function expectOptionalPropertyType<T extends object>(
//   obj: T,
//   key: string,
//   type: string,
//   message?: LazyMessage
// ): void;
export function expectOptionalPropertyType(
  obj: object,
  key: string,
  type: string,
  message?: LazyMessage
) {
  const prop = getProperty(obj, key);
  if (prop !== undefined && typeof prop !== type) {
    throw new Error(
      evalLazyMessage(message) ??
        `Expected property ${key} to be undefined or of type ${type}, but got ${typeof getProperty(
          obj,
          key
        )}`
    );
  }
}
