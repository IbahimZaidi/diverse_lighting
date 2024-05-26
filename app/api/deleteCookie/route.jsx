//

import { NextResponse } from "next/server";

export const GET = async () => {
  //
  //

  try {
    // remove the cookies :

    //
    const response = NextResponse.json({
      result: "Deleted succeffully ",
    });

    // interacte with the cookies :
    response.cookies.set("tokenVal", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    //

    return response;
  } catch (error) {
    //

    return NextResponse.json({
      error: error.message,
    });
  }
  //
  //
};
