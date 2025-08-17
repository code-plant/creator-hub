import { DILifetime, DIRegistration, fromClass } from "di-typed";
import { DeleteUserHandler } from "./DeleteUserHandler";

export const authenticationCommandHandlerRegistrations = {
  deleteUserHandler: fromClass(DeleteUserHandler),
} as const satisfies Partial<
  Record<
    string,
    DIRegistration<unknown, Partial<Record<string, unknown>>, DILifetime>
  >
>;
