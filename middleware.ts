import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const publicRoutes = ["/", "/signin", "/signup"];
  const protectedRoutes = ["/dashboard"];
  const pathname = req.nextUrl.pathname;
  if (!token) {
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
    return NextResponse.next();
  }
  const userRole = token.role;
  if (token) {
    // Admin Role: Only allow access to "/dashboard" and its sub-paths
    if (userRole === "ADMIN") {
      if (!pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return NextResponse.next();
    }

    // Non-Admin Role: Only allow access to public routes, redirect to home otherwise
    if (userRole !== "ADMIN") {
      if (!token.name) {
        if (pathname !== "/signup") {
          return NextResponse.redirect(new URL("/signup", req.url));
        }
        return NextResponse.next();
      }

      // If the user is on "/signup" but their data is complete, redirect to "/"
      if (token.name && pathname === "/signup") {
        return NextResponse.redirect(new URL("/", req.url));
      }

      // Deny access to "/dashboard" or its sub-paths
      if (pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      // Redirect /signin to home if user is already authenticated
      if (pathname === "/signin") {
        return NextResponse.redirect(new URL("/", req.url));
      }

      // Allow access to public routes
      if (publicRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.next();
      }
    }

    return NextResponse.next();
  }
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
