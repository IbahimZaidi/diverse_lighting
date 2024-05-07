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
      // update the data in the colors table after cheaking the new colors exists or not :
      //  newColors.map(())
      All_colors
        ? All_colors.map((elem, index) => {
            newColors
              ? newColors.map((elemNew) => {
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
                  }
                })
              : "";
          })
        : "";

      // cheakNotExistColorsIdAndValuesArray
      // let cheakNotExistColorsIdAndValuesArray = newColors.filter((elem) => {
      //   return !cheakExistColorsIdAndValuesArray.includes({
      //     id: elem.id,
      //     value: elem.value,
      //   });
      // });

      const resultArray = newColors.filter(
        (item) =>
          !cheakExistColorsIdAndValuesArray.some(
            (subItem) => subItem.id === item.id
          )
      );
      // let cheakNotExistColorsIdAndValuesArray = newColors
      //   ? newColors.filter(
      //       (elem) => !arrayToSubtract.some((subElem) => subElem.id === elem.id)
      //     )
      //   : [];

      //
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
      }); // return in the response a json with value of posts;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
