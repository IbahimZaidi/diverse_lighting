// import { NextResponse } from "next/server";

// import { getCookie } from "cookies-next";

// export function middleware(req) {
//   // middleware
//   //
//   console.log("hello runing ");

//   //   // const user = false;
//   //   const userObject = getCookie("userObject", { req });
//   //   console.log("this is the userObject values  : ", userObject);

//   //   if (!userObject) {
//   //     return NextResponse.redirect(new URL("/login", req.url));
//   //   }

//   return NextResponse.redirect(new URL("/login", req.url)); // this is to make hem pass to dashbord page
// }

// // the path when you can call the midlleware function :

// export const config = {
//   matcher: ["/admin/:path*"],
// };

import { NextResponse } from "next/server";

export function middleware(req) {
  // Logging to ensure middleware is running
  console.log("Middleware is running");

  // Since we are testing, we directly redirect to login
  // In a real scenario, you would check for cookies or session
  return NextResponse.redirect(new URL("/login", req.url)); // Absolute URL redirection
}

// Matcher configuration
export const config = {
  matcher: ["/admin"], // Directly match the /admin path
};
