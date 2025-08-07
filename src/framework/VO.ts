export interface VO<T> {
  clone(): T;
  equals(other: T): boolean;
}
