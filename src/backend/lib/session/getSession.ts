import { ReadonlyHeaders } from "../../framework/infrastructure/ReadOnlyHeaders";
import { RedisClient } from "../../framework/infrastructure/redis/redis";
import { Session } from "./Session";
import { saveSession } from "./saveSession";

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
  session.lastUsedAtNumber = Date.now();
  await saveSession(session, redis);

  return session;
}
