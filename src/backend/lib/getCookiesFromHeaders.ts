import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export function getCookiesFromHeaders(
  headers: ReadonlyHeaders
): Partial<Record<string, string>> | undefined {
  return headers
    .get("cookie")
    ?.split(";")
    .reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {} as Partial<Record<string, string>>);
}
