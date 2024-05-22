import { queryDeployTest } from "../connectDB/queryDeployTest";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    if (req.method === "GET") {
      const colorsMapping = await queryDeployTest({
        query: "SELECT * FROM color_mappings order by color_array_id",
        values: [],
      });

      return NextResponse.json({
        colorsMapping,
      }); // return in the response a json with value of posts;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
