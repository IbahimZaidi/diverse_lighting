import { NextResponse } from "next/server";

import { queryDeployTest } from "@/connectDB/queryDeployTest";
export const GET = async (req, { params }) => {
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
      const newImage = url.searchParams.get("exempleLikImage");
      const model_name = url.searchParams.get("model_name");
      const currentId = url.searchParams.get("currentId");
      const array_color_id = url.searchParams.get("array_color_id");

      // '[{"id":1,"value":"#000000"},{"id":2,"value":"#C0C0C0"},{"id":3,"value":"#00000000000"}]'
      const newColors = JSON.parse(stringifiedArray);
      const old_colors = JSON.parse(stringifiedArray_old_colors);
      const All_colors = JSON.parse(stringifiedArrayAll_Color);
      // console.log("Parsed array:", parsedArray);

      // update the db base on the new values :
      // Update the data in the database

      if (model_name && newImage && currentId) {
        await queryDeployTest({
          query: "UPDATE items SET model = ?, image = ? WHERE id = ?",
          values: [model_name, newImage, currentId],
          // query: "select * from items ",
          // values: [],
        });
      }

      return NextResponse.json({
        newColors,
        old_colors,
        All_colors,
        newImage,
        model_name,
        currentId,
        array_color_id,
      }); // return in the response a json with value of posts;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
