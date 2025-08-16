export function unwrapNonNullable<T>(
  value: T | undefined | null,
  message?: string
): NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(
      message ?? `Expected value to be non-nullable, but got ${value}`
    );
  }
  return value;
}
