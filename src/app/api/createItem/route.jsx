import { NextResponse } from "next/server";

import { queryDeployTest } from "@/connectDB/queryDeployTest";
export const GET = async (req, { params }) => {
  try {
    if (req.method === "GET") {
      // Create an array

      // // Stringify the array
      const url = new URL(req.url);
      const stringifiedArray = await url.searchParams.get("array_colors");
      const stringifiedAllColors = await url.searchParams.get(
        "all_colorsString"
      );
      const stringifiedAllColorsMapping = await url.searchParams.get(
        "all_colors_mappingString"
      );

      // get the exemple of the image :
      const newImage = await url.searchParams.get("exempleLikImage");
      const model_name = await url.searchParams.get("model_name");

      // '[{"id":1,"value":"#000000"},{"id":2,"value":"#C0C0C0"},{"id":3,"value":"#00000000000"}]'
      const newColors = JSON.parse(stringifiedArray); // 1 : { id: 1, value: "#FFFFFF" }
      const allColors = JSON.parse(stringifiedAllColors); // 1 : { id: 1, value: "#FFFFFF" }
      const allColorsMapping = JSON.parse(stringifiedAllColorsMapping); // 1 : { id: 1, value: "#FFFFFF" }
      // console.log("Parsed array:", parsedArray);

      // update the db base on the new values :
      // Update the data in the database

      // insert into the database :
      // first cheak if the combination of newColors array already exist or not :
      let cheak = false;

      // first algorithme :

      // first you need array of color_array_id exist in the table color_mapping :

      // second you need to devid the color_mapping table into small array's base on the color_array_id

      // third you need to cheak newColors array come from the client already exist in combination of array of arays

      // if not exist create a new color_array_id and insert to hem the id's of color ;

      // in case of color's new , you need to create a new one in the table of colors with new id ;

      // **
      // **

      // seconde algorithme , get the rows have the same color's exist in  the new Colors Array :
      // first get all row's from the table of colors have the same name of colors , and store the already exist colors id's
      // -> in case at least  one of this color's don't exist , mean you don't need to cheak the color_mapping array
      // -> and you need to mark the exist colors id , and create the new colors and marke the id's of the new colors also ;
      // -> you will automatically create a new color_array_id ;
      // -> in case you have all the colors in the array newColors , you need the cheak the combination exist or not
      // -> how to cheak combinition exist or not :
      // -> idea 1 : get all row's have the same colors id , and save the row in array have to arguments :
      // -> --- color_id , color_array_id , -then cheak the color_array_id it is have one value of differente values;

      // -> case the color_array_id have multi value , create a new color_array_id , else save the color_array_id and use
      // heme to create the new Item ;

      // **
      // what you need : ( all_colorsArrray , newColors array , all_rows_color_mapping )
      // **

      if (newColors) {
        //
      }
      // done
      // done with colors ;
      return NextResponse.json({
        newColors,
        newImage,
        model_name,
        allColors,
        allColorsMapping,
      }); // return in the response a json with value of posts;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
