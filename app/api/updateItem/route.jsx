import { NextResponse } from "next/server";

import { queryDeployTest } from "../../../connectDB/queryDeployTest";

//
export const GET = async (req, { params }) => {
  try {
    if (req.method === "GET") {
      // Create an array

      // // Stringify the array
      const url = new URL(req.url);
      const stringifiedArray = await url.searchParams.get("array_colors");
      const stringifiedArray_old_colors = await url.searchParams.get(
        "old_array_colorsString"
      );
      const stringifiedArrayAll_Color = await url.searchParams.get(
        "all_colors_arrayString"
      );
      // get the exemple of the image :
      const newImage = await url.searchParams.get("exempleLikImage");
      const model_name = await url.searchParams.get("model_name");
      const currentId = await url.searchParams.get("currentId");
      const array_color_id = await url.searchParams.get("array_color_id");

      // '[{"id":1,"value":"#000000"},{"id":2,"value":"#C0C0C0"},{"id":3,"value":"#00000000000"}]'
      const newColors = JSON.parse(stringifiedArray); // 1 : { id: 1, value: "#FFFFFF" }
      const old_colors = JSON.parse(stringifiedArray_old_colors); // 1 : Object { color_name: "#FFFFFF" }
      const All_colors = JSON.parse(stringifiedArrayAll_Color); // 1 : Object { id: 2, color_name: "#000000" }
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

      // this array contain objects of color {id : ... , value : .... }

      let cheakExistColorsIdAndValuesArray = [];

      // array contain the new id's of the colors :
      let arrayIdNewColors = [];

      // update the data in the colors table after cheaking the new colors exists or not :
      //  newColors.map(())
      newColors
        ? newColors.map((elemNew) => {
            All_colors
              ? All_colors.map((elem, index) => {
                  if (elem.color_name == elemNew.value) {
                    //
                    //
                    //
                    //
                    // in case it is the condition true
                    cheakExistColorsIdAndValuesArray.push({
                      id: elemNew.id,
                      value: elemNew.value,
                    });
                    // push the id of color from id's of table colors :
                    arrayIdNewColors.push(elem.id);
                  }
                })
              : "";
          })
        : "";

      // the other colors in the newColors array don't exist already in the table of colors :
      const resultArray = newColors.filter(
        (item) =>
          !cheakExistColorsIdAndValuesArray.some(
            (subItem) => subItem.id === item.id
          )
      );

      // add the new colors in the tables of colors in db :
      if (resultArray && All_colors) {
        resultArray.map(async (elem, index) => {
          await queryDeployTest({
            query: "INSERT INTO colors (color_name) VALUES (?)",
            values: [elem.value],
          });

          // push the new id into the arrayIdNewColors :
          // const newIndex = (await All_colors.length) + index + 1;
          // arrayIdNewColors.push(newIndex);
        });
      }

      resultArray
        ? resultArray.map((_, index) => {
            const lengthOfAllColor = All_colors ? All_colors.length : "";
            arrayIdNewColors.push(lengthOfAllColor + index + 1);
          })
        : "";

      // remove the colors inside the colors-mapping have the array_color_id = ?
      if (array_color_id) {
        await queryDeployTest({
          query: "DELETE FROM color_mappings WHERE color_array_id = ?",
          values: [array_color_id],
        });
      }

      // add all colors (using arrayIdNewColors array ) inside the color_mapping where the array_color_id = ?
      arrayIdNewColors && array_color_id
        ? arrayIdNewColors.map(async (elem) => {
            await queryDeployTest({
              query:
                "INSERT INTO color_mappings (id_color, color_array_id) VALUES (?, ?)",
              values: [elem, array_color_id],
            });
          })
        : "";
      //

      // done
      // done with colors ;
      return NextResponse.json({
        newColors,
        old_colors,
        All_colors,
        newImage,
        model_name,
        currentId,
        array_color_id,
        cheakExistColorsIdAndValuesArray,
        resultArray,
        arrayIdNewColors,
      }); // return in the response a json with value of posts;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
