import { evalLazyMessage } from "../evalLazyMessage";
import { LazyMessage } from "../LazyMessage";
import { getProperty } from "./getProperty";

export function expectPropertyType<T extends object, const K extends string>(
  obj: T,
  key: K,
  type: "string",
  message?: LazyMessage
): asserts obj is T & Record<K, string>;
export function expectPropertyType<T extends object, const K extends string>(
  obj: T,
  key: K,
  type: "number",
  message?: LazyMessage
): asserts obj is T & Record<K, number>;
export function expectPropertyType<T extends object, const K extends string>(
  obj: T,
  key: K,
  type: "boolean",
  message?: LazyMessage
): asserts obj is T & Record<K, boolean>;
export function expectPropertyType<T extends object, const K extends string>(
  obj: T,
  key: K,
  type: "object",
  message?: LazyMessage
): asserts obj is T & Record<K, object | null>;
export function expectPropertyType<T extends object, const K extends string>(
  obj: T,
  key: K,
  type: "undefined",
  message?: LazyMessage
): asserts obj is T & Partial<Record<K, undefined>>;
export function expectPropertyType<T extends object, const K extends string>(
  obj: T,
  key: K,
  type: string,
  message?: LazyMessage
): asserts obj is T & Partial<Record<K, unknown>>;
// // TypeScript doesn't affected by this overload even only this has non-const type parameter
// export function expectPropertyType<T extends object>(
//   obj: T,
//   key: string,
//   type: string,
//   message?: LazyMessage
// ): void;
export function expectPropertyType(
  obj: object,
  key: string,
  type: string,
  message?: LazyMessage
) {
  if (typeof getProperty(obj, key) !== type) {
    throw new Error(
      evalLazyMessage(message) ??
        `Expected property ${key} to be of type ${type}, but got ${typeof getProperty(
          obj,
          key
        )}`
    );
  }
}
