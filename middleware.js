import { NextResponse } from "next/server";
export function middleware(req) {
  // middleware
  //

  //
  // const user = false;
  const cheak = req.cookies.get("cheak") || "";

  if (!cheak) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // this is to make hem pass to dashbord page
}

// the path when you can call the midlleware function :
// Matcher configuration

export const config = {
  matcher: ["/admin/:path*"],
};
