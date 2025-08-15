import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { Session } from "./Session";

export async function getSession(
  sessionId: string | undefined,
  headers: ReadonlyHeaders
): Promise<Session | undefined> {
  if (!sessionId) {
    return undefined;
  }

  const ipAddress = (headers.get("x-forwarded-for") ?? "127.0.0.1").split(
    ","
  )[0];

  // TODO: add redis session store
}
