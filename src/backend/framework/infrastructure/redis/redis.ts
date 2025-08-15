import { createClient } from "redis";
import { env } from "../../../utils/env";

export type RedisClient = ReturnType<typeof createClient>;

export function redis(): RedisClient {
  const url = env("REDIS_URL");
  const password = env("REDIS_PASSWORD");
  return createClient({ url, password });
}
