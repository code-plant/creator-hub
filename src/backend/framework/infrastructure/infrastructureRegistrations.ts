import { DILifetime, DIRegistration, fromFunction } from "di-typed";
import { redis } from "./redis/redis";

export const infrastructureRegistrations = {
  redis: fromFunction(redis),
} as const satisfies Partial<
  Record<
    string,
    DIRegistration<unknown, Partial<Record<string, unknown>>, DILifetime>
  >
>;
