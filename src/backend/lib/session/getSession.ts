import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { RedisClient } from "../../framework/infrastructure/redis/redis";
import { Session } from "./Session";

export async function getSession(
  sessionId: string | undefined,
  headers: ReadonlyHeaders,
  redis: RedisClient
): Promise<Session | undefined> {
  if (!sessionId) {
    return undefined;
  }

  const ipAddress = (headers.get("x-forwarded-for") ?? "127.0.0.1").split(
    ","
  )[0];

  const sessionJson = await redis.get(`session:${sessionId}`);
  if (!sessionJson) {
    return undefined;
  }

  const session = JSON.parse(sessionJson) as Session;
  if (session.expireOnIpChange && session.previousIpAddress !== ipAddress) {
    await redis.del(`session:${sessionId}`);
    return undefined;
  }
  session.previousIpAddress = ipAddress;

  return session;
}
