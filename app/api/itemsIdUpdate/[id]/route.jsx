//

import { queryDeployTest } from "../../../connectDB/queryDeployTest";
import { NextResponse } from "next/server";

//
export const GET = async (req, { params }) => {
  if (req.method === "GET") {
    try {
      //   const data = await req.formData();
      const url = new URL(req.url);

      // get the new name of the modele :
      //   const model_nameString = url.searchParams.get("model_name");
      //   const model_name = JSON.parse(model_nameString);
      const model_name = url.searchParams.get("model_name");

      // get the image new name :
      //   const image_nameString = url.searchParams.get("image_name");
      //   const image_name = JSON.parse(image_nameString);
      const image_name = url.searchParams.get("image_name");

      // get color_array_id :
      //   const color_array_idString = url.searchParams.get("color_array_id");
      //   const color_array_id = JSON.parse(color_array_idString);
      const color_array_id = url.searchParams.get("color_array_id");

      // test this time the search params :
      // const stringifiedArray = url.searchParams.get("array_colors");

      //   // get the color array :
      //   // const array_colors = JSON.parse(data.get("array_colors"));
      //   const stringifiedArray_colors = url.searchParams.get(
      //     "arrayNewColorsString"
      //   );
      //   const array_colors = JSON.parse(stringifiedArray_colors);

      //   // get the color array :
      //   // const array_Old_colors = JSON.parse(data.get("array_Old_colors"));
      //   const stringifiedArray_Old_colors = url.searchParams.get(
      //     "arrayOldColorIdString"
      //   );
      //   const array_Old_colors = JSON.parse(stringifiedArray_Old_colors);

      //   // get the color array :
      //   // const all_colors = JSON.parse(data.get("all_colorsString"));
      //   const stringifiedArray_All_colors =
      //     url.searchParams.get("all_colorsString");
      //   const all_colors = JSON.parse(stringifiedArray_All_colors);

      // logger.info("this is the value of the array : ", array_colors);
      // update the data :
      await queryDeployTest({
        query: "UPDATE items SET model = ?, image = ? WHERE id = ?",
        values: [model_name, image_name, params.id],
      });

      //   let cheak;
      //   // for loop over the color_array :
      //   array_colors.map(async (elem, index) => {
      //     // case exist :
      //     // cheak if the color is alerady exsit :
      //     cheak = array_colors.find((elem, index) => {
      //       return all_colors.contains(elem.value);
      //     });

      //     // case the color is already exist :
      //     if (cheak) {
      //       await queryDeployTest({
      //         // you need to cheak first if the color already exist from the value of the color , or you can drop it then add it :

      //         // update the colors table first , then update the
      //         // UPDATE colors SET  color_name ="#000000"  where color_name = "#FFFFFF" AND id = old_id;
      //         query:
      //           "UPDATE colors SET  color_name = ?  where color_name = ?    ",
      //         values: [elem.value, array_Old_colors[index].color_name],
      //       });
      //     }

      //     // else the color not exist :
      //     else {
      //       await queryDeployTest({
      //         // you need to cheak first if the color already exist from the value of the color , or you can drop it then add it :

      //         // update the colors table first , then update the
      //         // UPDATE colors SET  color_name ="#000000"  where color_name = "#FFFFFF" AND id = old_id;
      //         query: "INSERT INTO  colors (color_name) values (?) ",
      //         values: [elem.value],
      //       });
      //     }
      //   });

      //   // change the value of colors inside the table of colors_mapping :

      //   if (
      //     array_colors.lenght > 0 // first delete old's color_id's
      //       ? await queryDeployTest({
      //           // delete all color's id have the same array_color_id
      //           query: "Delete FROM color_mappings WHERE color_array_id = ? ",
      //           values: [color_array_id],
      //         })
      //       : ""
      //   )
      //     // second add new color's id :
      //     array_colors.map(async (elem) => {
      //       await queryDeployTest({
      //         // delete all color's id have the same array_color_id
      //         query:
      //           "INSERT INTO color_mappings (id_color , color_array_id) VALUES (?,?)",
      //         values: [elem.value, color_array_id],
      //       });
      //     });

      // neccery to return something :
      return NextResponse.json({
        // array_colors,
        // array_Old_colors,
        // all_colors,
        items: "helloWorld",
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
};
