import { NextResponse } from "next/server";

export const DELETE = async (req) => {
  //

  await req.cookies.clear();

  return NextResponse.json({
    result: "succeffully deleted ",
  });
};
