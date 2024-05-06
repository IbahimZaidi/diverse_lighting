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

//
export const POST = async (req, { params }) => {
  if (req.method === "POST") {
    try {
      const data = await req.formData();
      // get the new name of the modele :
      const model_name = data.get("model_name");

      // get the image new name :
      const image_name = data.get("image_name");

      // get color_array_id :
      const color_array_id = data.get("color_array_id");

      // get the color array :
      const array_colors = JSON.parse(data.get("array_colors"));

      // update the data :
      await queryDeployTest({
        query:
          "update table items set model = ? and image = ?    where id = ?    ",
        values: [model_name, image_name, params.id],
      });

      // for loop over the color_array :
      array_colors.map(async (elem, index) => {
        await queryDeployTest({
          query: "drop then inset  ",
          values: [color_id, elem.value, color_array_id],
        });
      });

      // neccery to return something :
      return NextResponse.json({
        message: `Post added successfully`,
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
};
