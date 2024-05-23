import { NextResponse } from "next/server";

export const DELETE = async (req) => {
  //

  //
  // localStorage.setItem("userObject", {});

  // Cookies.set("userObject", null);
  await req.cookies.clear();

  return NextResponse.json({
    result: "succeffully deleted ",
  });
};
