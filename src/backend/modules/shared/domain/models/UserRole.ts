export const userRoleEntries = ["user", "admin"] as const;
export type UserRole = (typeof userRoleEntries)[number];
