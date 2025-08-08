import { NextRequest, NextResponse } from "next/server";
import { localeMap } from "./shared/domain/models/Locale";

const allowedPathSegmentsWithoutLocaleSet: Partial<Record<string, boolean>> = {
  "": true,
  "mode.js": true,
  "favicon.ico": true,
  _next: true,
};

function guessLocaleFromRequest(req: NextRequest) {
  const cookie = req.cookies.get("LOCALE")?.value;
  if (cookie && localeMap[cookie]) {
    return cookie;
  }
  // TODO: use x-vercel-ip-country header
  return "en";
}

export default async function middleware(req: NextRequest) {
  const pathnameFirstSegment = req.nextUrl.pathname.split("/")[1].split("?")[0];
  if (
    !localeMap[pathnameFirstSegment] &&
    !allowedPathSegmentsWithoutLocaleSet[pathnameFirstSegment]
  ) {
    return NextResponse.redirect(
      new URL(`/${guessLocaleFromRequest(req)}${req.nextUrl.pathname}`, req.url)
    );
  }
}
