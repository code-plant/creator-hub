import { BrandedString } from "./BrandedString";

export type IdType<T extends string> = BrandedString<`id:${T}`>;
