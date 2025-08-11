import { RequestContext } from "./types/RequestContext";

export async function createRequestContext(
  req: Request
): Promise<RequestContext> {
  return {
    auth: { type: "anonymous" }, // TODO: Implement auth
    ipAddress: (req.headers.get("x-forwarded-for") ?? "127.0.0.1").split(
      ","
    )[0],
  };
}
