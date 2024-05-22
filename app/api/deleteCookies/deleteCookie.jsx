import { NextResponse } from "next/server";

export const DELETE = async (req) => {
  //

  await req.cookies.set("userObject", {});

  return NextResponse.json({
    result: "succeffully deleted ",
  });
};
