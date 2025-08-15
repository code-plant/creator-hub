import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { Session } from "./Session";
import { createSession } from "./createSession";
import { getSession } from "./getSession";

export async function getOrCreateSession(
  sessionId: string | undefined,
  headers: ReadonlyHeaders
): Promise<[session: Session, setCookie: Partial<Record<string, string>>]> {
  const existingSession = await getSession(sessionId, headers);
  if (existingSession) {
    return [existingSession, {}];
  }

  return createSession(headers);
}
