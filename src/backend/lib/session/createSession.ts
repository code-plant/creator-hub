import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { v4 } from "uuid";
import { Session } from "./Session";

export async function createSession(
  headers: ReadonlyHeaders
): Promise<[session: Session, setCookie: Partial<Record<string, string>>]> {
  const ipAddress = (headers.get("x-forwarded-for") ?? "127.0.0.1").split(
    ","
  )[0];
  const sessionId = v4();

  // TODO: add redis session store
  const session: Session = {
    id: sessionId,
    auth: {
      type: "anonymous",
    },
    previousIpAddress: ipAddress,
    createdAt: new Date(),
    expireOnIpChange: false,
  };

  return [
    session,
    {
      "Set-Cookie": `SESSION_ID=${sessionId}; Path=/; HttpOnly; SameSite=Strict`,
    },
  ];
}
