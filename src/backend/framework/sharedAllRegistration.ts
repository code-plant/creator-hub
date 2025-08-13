import { PrismaClient } from "@prisma/client";
import { DILifetime, DIRegistration, fromClass, fromValue } from "di-typed";
import { DefaultSession } from "./infrastructure/PrismaSession";

export const sharedAllRegistration = {
  prisma: fromValue(new PrismaClient()),
  session: fromClass(DefaultSession),
} as const satisfies Partial<
  Record<
    string,
    DIRegistration<unknown, Partial<Record<string, unknown>>, DILifetime>
  >
>;
