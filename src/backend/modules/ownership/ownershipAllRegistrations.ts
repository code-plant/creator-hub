import { DILifetime, DIRegistration, fromClass } from "di-typed";
import { EntitlementRepositoryImpl } from "./entitlement/infrastructure/persistence/EntitlementRepositoryImpl";

export const ownershipAllRegistrations = {
  entitlementRepository: fromClass(EntitlementRepositoryImpl),
} as const satisfies Partial<
  Record<
    string,
    DIRegistration<unknown, Partial<Record<string, unknown>>, DILifetime>
  >
>;
