import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { Auth } from "./types/Auth";
import { RequestContext } from "./types/RequestContext";

export async function createRequestContext(
  auth: Auth,
  headers: ReadonlyHeaders
): Promise<RequestContext> {
  return {
    auth,
    ipAddress: (headers.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0],
  };
}
