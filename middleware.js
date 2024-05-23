import { NextResponse } from "next/server";
import Cookies from "js-cookie";
import { getCookie } from "cookies-next";

export async function middleware(req) {
  // Logging to ensure middleware is running
  console.log("Middleware is running");

  window.location.reload();
  // await req.cookies.set("userObject", {});

  const cookies = await req.cookies;

  // const userObject = false;

  console.log("&&&&&&&&&&&&&&&&&&___________---- cookies : ", cookies);

  const userObject = getCookie("userObject", { req });

  // const { userObject } = cookies;

  if (!userObject) {
    return NextResponse.redirect(new URL("/login", req.url)); // Absolute URL redirection
  }

  //
  return NextResponse.next();
}

// Matcher configuration
export const config = {
  matcher: ["/admin/:path*"], // Directly match the /admin path
};
