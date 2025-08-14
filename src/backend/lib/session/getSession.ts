import { Session } from "../types/Session";

export async function getSession(
  sessionId: string | undefined,
  ipAddress: string
): Promise<Session | undefined> {
  if (!sessionId) {
    return undefined;
  }

  // TODO: add redis session store
}
