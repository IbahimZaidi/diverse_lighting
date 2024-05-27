import { NextResponse } from "next/server";
<<<<<<< HEAD
export function middleware(req) {
  // middleware
  //
=======
import { getCookie } from "cookies-next";

export async function middleware(req) {
  // Logging to ensure middleware is running
  console.log("Middleware is running");

  // window.location.reload();

  // await req.cookies.set("userObject", {});

  const cookies = await req.cookies;
  console.log("this is the values of cookies : ", cookies);
>>>>>>> 62e99994b46e3d0d4c144d2032b0bfbf2b21f655

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
