import { ReadonlyHeaders } from "../../framework/infrastructure/ReadOnlyHeaders";
import { RedisClient } from "../../framework/infrastructure/redis/redis";
import { Session } from "./Session";
import { createSession } from "./createSession";
import { getSession } from "./getSession";
import { saveSession } from "./saveSession";

export async function getOrCreateSession(
  sessionId: string | undefined,
  headers: ReadonlyHeaders,
  redis: RedisClient
): Promise<[session: Session, setCookie: Partial<Record<string, string>>]> {
  const existingSession = await getSession(sessionId, headers, redis);
  if (existingSession) {
    return [existingSession, {}];
  }

  const [session, setCookie] = await createSession(headers, redis);
  await saveSession(session, redis);
  return [session, setCookie];
}
