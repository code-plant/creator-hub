import { evalLazyMessage } from "./evalLazyMessage";
import { LazyMessage } from "./LazyMessage";

export function unwrapNonNullable<T>(
  value: T | undefined | null,
  message?: LazyMessage
): NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(
      evalLazyMessage(message) ??
        `Expected value to be non-nullable, but got ${value}`
    );
  }
  return value;
}
