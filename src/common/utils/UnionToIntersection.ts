export type UnionToIntersection<T> = (
  T extends unknown ? (_: T) => void : never
) extends (_: infer I) => void
  ? I
  : never;
