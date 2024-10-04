// export { auth as middleware } from "@/auth";

import { auth } from "./auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protedtedRoutes = ["/server"];

export default async function middleware(request: NextRequest) {
  const session = await auth();

  const isProtectedRoute = protedtedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (!session && isProtectedRoute) {
    const absoluteUrl = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};