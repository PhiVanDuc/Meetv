import { shallowVerifyJWT } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

import { AUTH_ROUTES } from "@/consts";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const accessToken = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;

    const isAuth = Boolean(shallowVerifyJWT(accessToken) && shallowVerifyJWT(refreshToken));
    const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

    if (req.method === "GET") {
        if (!isAuth && !isAuthRoute) {
            const url = req.nextUrl.clone();
            url.pathname = "/sign-in";

            const res = NextResponse.redirect(url);
            res.cookies.delete("accessToken");
            res.cookies.delete("refreshToken");
            return res;
        }
    
        if (isAuth && isAuthRoute) {
            const url = req.nextUrl.clone();
            url.pathname = "/";
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)'
}