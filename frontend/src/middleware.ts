import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { i18nRouter } from 'next-i18n-router';
// import i18nConfig from './i18nConfig';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  
  const user = request.cookies.get("loginData")?.value;
  if (!user) {
    return NextResponse.redirect(new URL("/pfms/auth/login", request.url));
  } 

  // return i18nRouter(request, i18nConfig);
  // return NextResponse.redirect(new URL(request.url, request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: '/((?!api|static|.*\\..*|_next).*)'
  matcher: [
    '/((?!api|_next/static|_next/image|johar.png|Juidco.png|Jhar_logo.png|favicon.ico|auth/login|profile.png).*)',
  ],
};
