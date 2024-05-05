import { queryDeployTest } from "@/connectDB/queryDeployTest";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    if (req.method === "GET") {
      const colors = await queryDeployTest({
        query:
          "SELECT co.color_name from colors as co INNER JOIN color_mappings as colMe on colMe.id_color = co.id where colMe.color_array_id = ?   ",
        values: [params.id],
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
