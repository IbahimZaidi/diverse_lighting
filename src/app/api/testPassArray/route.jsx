import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    if (req.method === "GET") {
      // Create an array

      // // Stringify the array
      const url = new URL(req.url);
      const stringifiedArray = url.searchParams.get("array_colors");
      const stringifiedArray_old_colors = url.searchParams.get(
        "old_array_colorsString"
      );
      const stringifiedArrayAll_Color = url.searchParams.get(
        "all_colors_arrayString"
      );
      // get the exemple of the image :
      const exempleImage = url.searchParams.get("exempleLikImage");

      // '[{"id":1,"value":"#000000"},{"id":2,"value":"#C0C0C0"},{"id":3,"value":"#00000000000"}]'
      const parsedArray = JSON.parse(stringifiedArray);
      const parsedArray_old_colors = JSON.parse(stringifiedArray_old_colors);
      const parsedArray_All_colors = JSON.parse(stringifiedArrayAll_Color);
      // console.log("Parsed array:", parsedArray);

      return NextResponse.json({
        parsedArray,
        parsedArray_old_colors,
        parsedArray_All_colors,
        exempleImage,
      }); // return in the response a json with value of posts;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
