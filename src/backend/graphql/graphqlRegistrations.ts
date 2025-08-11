import { DILifetime, DIRegistration, fromValue } from "di-typed";
import { schema } from "./schema";

export const graphqlRegistrations = {
  graphqlSchema: fromValue(schema),
} as const satisfies Partial<
  Record<
    string,
    DIRegistration<unknown, Partial<Record<string, unknown>>, DILifetime>
  >
>;
