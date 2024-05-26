//

import { NextResponse } from "next/server";

export const GET = async (req) => {
  //

  const userObject = (await req.cookies.get("tokenVal")?.value) || "none ..";

  const userObjectObj = userObject ? JSON.parse(userObject) : {};

  let cheak = false;
  if (
    userObjectObj &&
    userObjectObj.email == process.env.EMAIL &&
    userObjectObj.password == process.env.PASSWORD
  ) {
    // change the cheak value :
    cheak = true;
  }
  return NextResponse.json({
    result: "hello from the return of cheakCookies route ",
    userObjectObj,
    cheak,
  });
};
