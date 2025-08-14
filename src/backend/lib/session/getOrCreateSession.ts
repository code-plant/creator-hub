import { Session } from "../types/Session";
import { createSession } from "./createSession";
import { getSession } from "./getSession";

export async function getOrCreateSession(
  sessionId: string | undefined,
  ipAddress: string,
  res: Response
): Promise<Session> {
  const existingSession = await getSession(sessionId, ipAddress);
  if (existingSession) {
    return existingSession;
  }

  return createSession(ipAddress, res);
}
