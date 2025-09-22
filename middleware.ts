import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/home", "/admin"];
const authRoutes = ["/", "/login", "/register"]; 



export async function middleware(req:NextRequest) {
    const { nextUrl } = req;
    const sessionCookie = getSessionCookie(req);

    const res =  NextResponse.next();

    const isLoggedIn = !!sessionCookie;
    const isOnProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
    const isOnAuthRoute = authRoutes.includes(nextUrl.pathname);

    
    if(isOnProtectedRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL("/", req.url))
    }

    if(isOnAuthRoute && isLoggedIn) {
        return NextResponse.redirect(new URL("/home", req.url));
    }

    return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}