export const entitlementTypeEntries = [
  "owned",
  "revocableRented",
  "irrevocableRented",
] as const;
export type EntitlementType = (typeof entitlementTypeEntries)[number];
