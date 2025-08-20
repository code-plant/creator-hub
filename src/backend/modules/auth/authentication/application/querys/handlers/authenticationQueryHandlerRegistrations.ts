import { DILifetime, DIRegistration, fromClass } from "di-typed";
import { GetUserByAccountHandler } from "./GetUserByAccountHandler";
import { GetUserByEmailHandler } from "./GetUserByEmailHandler";
import { GetUserHandler } from "./GetUserHandler";

export const authenticationQueryHandlerRegistrations = {
  getUserHandler: fromClass(GetUserHandler),
  getUserByEmailHandler: fromClass(GetUserByEmailHandler),
  getUserByAccountHandler: fromClass(GetUserByAccountHandler),
} as const satisfies Partial<
  Record<
    string,
    DIRegistration<unknown, Partial<Record<string, unknown>>, DILifetime>
  >
>;
