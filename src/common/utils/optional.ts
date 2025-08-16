export function optional<T, R>(fn: (value: T) => R, value: T): R;
export function optional<T, R>(fn: (value: T) => R, value: T | null): R | null;
export function optional<T, R>(
  fn: (value: T) => R,
  value: T | undefined
): R | undefined;
export function optional<T, R>(
  fn: (value: T) => R,
  value: T | null | undefined
): R | null | undefined;
export function optional<T, R>(
  fn: (value: T) => R,
  value: T | null | undefined
): R | null | undefined {
  return value === null || value === undefined
    ? (value as null | undefined)
    : fn(value);
}
