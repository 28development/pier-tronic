import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const LOCALE_COOKIE = "NEXT_LOCALE";
const SUPPORTED = new Set(["en", "de", "nl"]);

export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  // Skip middleware for Next.js internals and any static assets (also handles locale-prefixed paths)
  if (
    pathname.includes("/_next/") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/videos/") ||
    pathname.startsWith("/images/") ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
