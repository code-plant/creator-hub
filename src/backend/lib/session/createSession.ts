import { v4 } from "uuid";
import { ReadonlyHeaders } from "../../framework/infrastructure/ReadOnlyHeaders";
import { RedisClient } from "../../framework/infrastructure/redis/redis";
import { Session } from "./Session";
import { saveSession } from "./saveSession";

export async function createSession(
  headers: ReadonlyHeaders,
  redis: RedisClient
): Promise<[session: Session, setCookie: Partial<Record<string, string>>]> {
  const ipAddress = (headers.get("x-forwarded-for") ?? "127.0.0.1").split(
    ","
  )[0];
  const sessionId = v4();

  const session: Session = {
    id: sessionId,
    auth: {
      type: "anonymous",
    },
    previousIpAddress: ipAddress,
    createdAt: new Date(),
    expireOnIpChange: false,
    lastUsedAtNumber: Date.now(),
    expiresAfterNumber: 1800000, // 30 minutes
  };

  await saveSession(session, redis);

  return [
    session,
    {
      "Set-Cookie": `SESSION_ID=${sessionId}; Path=/; HttpOnly; SameSite=Strict`,
    },
  ];
}
