import { NextRequest, NextResponse } from "next/server";
import { guessLocaleFromHeaders } from "./backend/framework/infrastructure/guessLocaleFromHeaders";
import { localeMap } from "./backend/modules/shared/domain/models/Locale";

const allowedPathSegmentsWithoutLocaleSet: Partial<Record<string, boolean>> = {
  "": true,
  api: true,
  "mode.js": true,
  "favicon.ico": true,
  _next: true,
  admin: true,
};

function guessLocaleFromRequest(req: NextRequest) {
  return guessLocaleFromHeaders(req.headers);
}

export default async function middleware(
  req: NextRequest
): Promise<NextResponse> {
  const pathnameFirstSegment = req.nextUrl.pathname.split("/")[1].split("?")[0];
  if (
    !localeMap[pathnameFirstSegment] &&
    !allowedPathSegmentsWithoutLocaleSet[pathnameFirstSegment]
  ) {
    return NextResponse.redirect(
      new URL(`/${guessLocaleFromRequest(req)}${req.nextUrl.pathname}`, req.url)
    );
  }

  return NextResponse.next();
}
