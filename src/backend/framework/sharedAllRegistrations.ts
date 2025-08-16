import { PrismaClient } from "@prisma/client";
import { DILifetime, DIRegistration, fromClass, fromValue } from "di-typed";
import { DefaultSession } from "./infrastructure/PrismaSession";
import { infrastructureRegistrations } from "./infrastructure/infrastructureRegistrations";

export const sharedAllRegistrations = {
  prisma: fromValue(new PrismaClient()),
  session: fromClass(DefaultSession),
  ...infrastructureRegistrations,
} as const satisfies Partial<
  Record<
    string,
    DIRegistration<unknown, Partial<Record<string, unknown>>, DILifetime>
  >
>;
