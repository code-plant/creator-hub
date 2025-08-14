import { v4 } from "uuid";
import { Session } from "../types/Session";

export async function createSession(
  ipAddress: string,
  res: Response
): Promise<Session> {
  const sessionId = v4();
  res.headers.set(
    "Set-Cookie",
    `SESSION_ID=${sessionId}; Path=/; HttpOnly; SameSite=Strict`
  );
  // TODO: add redis session store
  return {
    id: sessionId,
    auth: {
      type: "anonymous",
    },
    previousIpAddress: ipAddress,
    createdAt: new Date(),
    expireOnIpChange: false,
  };
}
