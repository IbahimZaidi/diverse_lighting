import { NextResponse } from "next/server";
import { getCookie } from "cookies-next";

export function middleware(req) {
  // Logging to ensure middleware is running
  console.log("Middleware is running");

  //
  const userObject = getCookie("userObject", { req });
  const cheak = true;
  console.log("this is the value of the userObject ", userObject);

  if (!cheak) {
    return NextResponse.redirect(new URL("/login", req.url)); // Absolute URL redirection
  }
  // Since we are testing, we directly redirect to login
  // In a real scenario, you would check for cookies or session

  return NextResponse.next();
}

// Matcher configuration
export const config = {
  matcher: ["/admin"], // Directly match the /admin path
};
