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
      const allColors = JSON.parse(stringifiedAllColors); // 0 : {id: 1, color_name: '#FFFFFF'}
      const allColorsMapping = JSON.parse(stringifiedAllColorsMapping); // 11 : {id_color: 1, color_array_id: 5}
      // console.log("Parsed array:", parsedArray);

      // update the db base on the new values :
      // Update the data in the database

      // insert into the database :
      // first cheak if the combination of newColors array already exist or not :
      // let cheak = false;

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

      // return the arrayOfColors of newColors array exists in the table of colors in db :
      // declare the array contain the id's of the colors (exist or not exist) :
      let arrayIdNewColors = [];

      // declare first the container of the color already exist :
      let colorAlreadyExist = [];

      // start of the loop :
      if (newColors && allColors) {
        // make loop over the allColors and save the colors how already exist :
        newColors.map((elem) => {
          // cheak if the the elemnt of newColors is already exist in the table of colors :
          allColors.map((element) => {
            // if element matching and not selected before (mean don't exist already repedted in the colorAlreadyExist table ) :
            if (elem.value == element.color_name) {
              // if matched push it in the colorAlreadyExist array :
              colorAlreadyExist.push({
                id: elem.id,
                value: element.color_name,
              });
              // push into the arrayIdNewColors the id of colors already exist in the colors table :
              arrayIdNewColors.push(element.id);
            }
          });
        });
      }

      // extract the array of color's news to create them :

      // create the newColor inside the colors arrary in the database :

      // add the new colors in the tables of colors in db :
      // if (notExistColors && allColors) {
      //   notExistColors.map(async (elem, index) => {
      //     await queryDeployTest({
      //       query: "INSERT INTO colors (color_name) VALUES (?)",
      //       values: [elem.value],
      //     });
      //   });
      // }
      // the other colors in the newColors array don't exist already in the table of colors :
      const notExistColors = newColors.filter(
        (item) => !colorAlreadyExist.some((subItem) => subItem.id === item.id)
      );
      // push the newId's of the newColors the id's of new Colors :
      notExistColors
        ? notExistColors.map((_, index) => {
            const lengthOfAllColor = allColors ? allColors.length : "";
            arrayIdNewColors.push(lengthOfAllColor + index + 1);
          })
        : "";

      // pass the new Array to make sure it correct :

      // pass to the client to make sure he extract the array well :

      // done
      // done with colors ;
      return NextResponse.json({
        newColors,
        newImage,
        model_name,
        allColors,
        allColorsMapping,
        colorAlreadyExist,
        notExistColors,
        arrayIdNewColors,
      }); // return in the response a json with value of posts;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
