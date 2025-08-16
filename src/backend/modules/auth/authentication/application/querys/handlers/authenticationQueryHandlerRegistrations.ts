import { DILifetime, DIRegistration, fromClass } from "di-typed";
import { GetUserHandler } from "./GetUserHandler";

export const authenticationQueryHandlerRegistrations = {
  getUserHandler: fromClass(GetUserHandler),
} as const satisfies Partial<
  Record<
    string,
    DIRegistration<unknown, Partial<Record<string, unknown>>, DILifetime>
  >
>;
