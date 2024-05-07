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

      // get the color array :
      const array_Old_colors = JSON.parse(data.get("array_Old_colors"));

      // get the color array :
      const all_colors = JSON.parse(data.get("all_colorsString"));

      // logger.info("this is the value of the array : ", array_colors);
      // update the data :
      await queryDeployTest({
        query: "UPDATE items SET model = ?, image = ? WHERE id = ?",
        values: [model_name, image_name, params.id],
      });

      let cheak;
      // for loop over the color_array :
      array_colors.map(async (elem, index) => {
        // case exist :
        // cheak if the color is alerady exsit :
        cheak = array_colors.find((elem, index) => {
          return all_colors.contains(elem.value);
        });

        // case the color is already exist :
        if (cheak) {
          await queryDeployTest({
            // you need to cheak first if the color already exist from the value of the color , or you can drop it then add it :

            // update the colors table first , then update the
            // UPDATE colors SET  color_name ="#000000"  where color_name = "#FFFFFF" AND id = old_id;
            query:
              "UPDATE colors SET  color_name = ?  where color_name = ?    ",
            values: [elem.value, array_Old_colors[index].color_name],
          });
        }

        // else the color not exist :
        else {
          await queryDeployTest({
            // you need to cheak first if the color already exist from the value of the color , or you can drop it then add it :

            // update the colors table first , then update the
            // UPDATE colors SET  color_name ="#000000"  where color_name = "#FFFFFF" AND id = old_id;
            query: "INSERT INTO  colors (color_name) values (?) ",
            values: [elem.value],
          });
        }
      });

      // change the value of colors inside the table of colors_mapping :

      if (
        array_colors.lenght > 0 // first delete old's color_id's
          ? await queryDeployTest({
              // delete all color's id have the same array_color_id
              query: "Delete FROM color_mappings WHERE color_array_id = ? ",
              values: [color_array_id],
            })
          : ""
      )
        // second add new color's id :
        array_colors.map(async (elem) => {
          await queryDeployTest({
            // delete all color's id have the same array_color_id
            query:
              "INSERT INTO color_mappings (id_color , color_array_id) VALUES (?,?)",
            values: [elem.value, color_array_id],
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
