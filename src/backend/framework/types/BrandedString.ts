export type BrandedString<T extends string> = string & {
  " brand": T;
};
