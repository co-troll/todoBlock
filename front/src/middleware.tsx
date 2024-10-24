import { NextResponse } from "next/server";

export function middleware(request: { cookies: { has: (arg0: string) => any; }; nextUrl: { pathname: string; }; url: string | URL | undefined; }) {
  const auth = request.cookies.has("userToken");
  
  // 로그인 + 로그인 페이지
  
  // 로그인 X + 로그인 페이지 X
  if (!auth && request.nextUrl.pathname.startsWith("/todolist")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (auth && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/todolist", request.url));
  }
}