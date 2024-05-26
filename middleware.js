import { NextResponse } from "next/server";
import { getCookie } from "cookies-next";
export function middleware(req) {
  // middleware
  //

  // const user = false;
  const userObject = getCookie("tokenVal", { req });

  console.log("hello this is the tokenVal : ", userObject);
  if (!userObject) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // this is to make hem pass to dashbord page
}

// the path when you can call the midlleware function :
// Matcher configuration

export const config = {
  matcher: ["/admin/:path*"],
};
