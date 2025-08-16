import { ReadonlyHeaders } from "../framework/infrastructure/ReadOnlyHeaders";

export function getCookiesFromHeaders(
  headers: ReadonlyHeaders
): Partial<Record<string, string>> | null {
  return (
    headers
      .get("cookie")
      ?.split(";")
      .reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split("=");
        acc[key] = value;
        return acc;
      }, {} as Partial<Record<string, string>>) ?? null
  );
}
