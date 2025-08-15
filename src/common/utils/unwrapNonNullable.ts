export function unwrapNonNullable<T>(
  value: T | undefined | null
): NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`Expected value to be non-nullable, but got ${value}`);
  }
  return value;
}
