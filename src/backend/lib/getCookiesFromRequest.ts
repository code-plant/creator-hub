export function getCookiesFromRequest(
  req: Request
): Partial<Record<string, string>> | undefined {
  return req.headers
    .get("cookie")
    ?.split(";")
    .reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {} as Partial<Record<string, string>>);
}
