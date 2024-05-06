import { queryDeployTest } from "@/connectDB/queryDeployTest";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    if (req.method === "GET") {
      const colors = await queryDeployTest({
        query: "select * from colors  ",
        values: [],
      });

      return NextResponse.json({
        colors,
      }); // return in the response a json with value of posts;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
