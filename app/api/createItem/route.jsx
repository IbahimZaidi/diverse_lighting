import { NextResponse } from "next/server";

import { queryDeployTest } from "../../../connectDB/queryDeployTest";

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

      // the cheak if the comibination is already exist :
      let combinitionExist = false; // the default value is true , mean not  exist ;

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
                id: element.id,
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

      // the other colors in the newColors array don't exist already in the table of colors :
      const notExistColors = newColors.filter(
        (item) =>
          !colorAlreadyExist.some((subItem) => subItem.value === item.value)
      );

      // add the new colors in the tables of colors in db :
      if (notExistColors && allColors) {
        notExistColors.map(async (elem, index) => {
          await queryDeployTest({
            query: "INSERT INTO colors (color_name) VALUES (?)",
            values: [elem.value],
          });
        });
      }
      // push the newId's of the newColors the id's of new Colors :
      notExistColors
        ? notExistColors.map((_, index) => {
            const lengthOfAllColor = allColors ? allColors.length : "";
            arrayIdNewColors.push(lengthOfAllColor + index + 1);
          })
        : "";

      // change the value of combinitionExist in case of notExistColors.length > 0
      if (notExistColors && notExistColors.length > 0) {
        combinitionExist = false;
      }

      // cheak in case of notExistColors.length = 0 , and we need to know if the combination of colors of alreadyExist array or newColors combination eixst or not :
      // declare the array contain the color_array_id and the color's id :
      let color_array_idPluscolors_ids = [];
      // array of saving the color_array_id's :
      let color_array_idArray = [];

      if (notExistColors.length == 0 && colorAlreadyExist.length > 0) {
        // do loop over the mappin_colors Array and save the rows how have the same color's id :

        arrayIdNewColors.map((elem) => {
          // over the mappingcolors array :
          allColorsMapping.map((element, index) => {
            // cheak the match rows :
            //{id_color: 1, color_array_id: 5}
            if (elem == element.id_color) {
              // push into color_array_idPluscolors_ids :
              color_array_idPluscolors_ids.push({
                id_color: element.id_color,
                color_array_id: element.color_array_id,
              });
              // push into color_array_id :
              !color_array_idArray.includes(element.color_array_id)
                ? color_array_idArray.push(element.color_array_id)
                : "";
            }
          });
        });
      }

      // the next step is extract the array combination of colorMapping.color_id  table how equal the array == arrayIdNewColors.id

      // first devide the colors mapping into arrayOfArrays base on value of color_array_id value :
      let arrayOfArraysBaseOnColor_id_array = [];

      // declate the variable contain allArray_color_id in the table mapping color :
      let arrayColorIdDistinctMappingArray = [];

      //

      // loop over
      allColorsMapping.map((elem) => {
        // push into color_array_id :
        !arrayColorIdDistinctMappingArray.includes(elem.color_array_id)
          ? arrayColorIdDistinctMappingArray.push(elem.color_array_id)
          : "";
      });

      if (notExistColors.length == 0 && colorAlreadyExist.length > 0) {
        //
        arrayColorIdDistinctMappingArray.map((elem) => {
          //
          let newArray = [];
          allColorsMapping.map((element) => {
            // cheak matched then push :
            if (elem == element.color_array_id) {
              newArray.push({
                id_color: element.id_color,
                color_array_id: element.color_array_id,
              });
            }
          });

          // push the new Array :
          arrayOfArraysBaseOnColor_id_array.push({
            color_array_id: newArray[0].color_array_id,
            newArray: newArray,
          });
        });
      }

      // show the array of array base on the value of the array_id_color :

      // cheak the if combination exist in the arrayofArray of combination base on color_array_id :

      let arrayOfArrayPossible = [];
      arrayOfArraysBaseOnColor_id_array.map((elem) => {
        color_array_idArray.map((element) => {
          if (element == elem.color_array_id) {
            // push into the arrayOfArrayPossible :
            arrayOfArrayPossible.push(elem);
          }
        });
      });

      // the container of the oldExistCombination :
      let oldExistCombinationId = 1;
      // loop over arrayOfArrayPossible :

      if (arrayOfArrayPossible) {
        arrayOfArrayPossible.map((elem) => {
          if (elem.newArray.length == colorAlreadyExist.length) {
            let theCheak = true;
            for (let i = 0; i < colorAlreadyExist.length; i++) {
              if (elem.newArray[i].id_color != colorAlreadyExist[i].id) {
                theCheak = false;
              }
            }

            // theCheak ?(  : "";
            if (theCheak) {
              combinitionExist = true;
              oldExistCombinationId = elem.color_array_id;
            }
          }
        });
      }

      // change the value of oldExistCombinationId
      if (!combinitionExist) {
        oldExistCombinationId = arrayColorIdDistinctMappingArray.length + 1;
      }
      // start the for loop :

      ///////////////////////////// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& ********************
      // insert base on the value of the combinitionExist false or true :
      if (!combinitionExist && arrayColorIdDistinctMappingArray && newColors) {
        // insert in the array Mapping also :
        arrayIdNewColors.map(async (elem) => {
          await queryDeployTest({
            query:
              "INSERT INTO color_mappings (id_color , color_array_id) VALUES(?,?)",
            values: [elem, oldExistCombinationId],
          });
        });
        // INSERT INTO items (model,image,color_array_id) VALUES("testfromDBphpymyadmin" , "hi.jpg" , 3) ;
        await queryDeployTest({
          query:
            "INSERT INTO items (model,image,color_array_id) VALUES(? , ? , ?)",
          values: [
            model_name,
            newImage,
            arrayColorIdDistinctMappingArray.length + 1,
          ],
        });
      }

      /// handle case is combination already exist :

      if (
        combinitionExist &&
        arrayColorIdDistinctMappingArray &&
        newColors &&
        oldExistCombinationId
      ) {
        // INSERT INTO items (model,image,color_array_id) VALUES("testfromDBphpymyadmin" , "hi.jpg" , 3) ;
        await queryDeployTest({
          query:
            "INSERT INTO items (model,image,color_array_id) VALUES(? , ? , ?)",
          values: [model_name, newImage, oldExistCombinationId],
        });
      }

      //
      //

      // arrayColorIdDistinctMappingArray;
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
        combinitionExist,
        color_array_idPluscolors_ids,
        color_array_idArray,
        arrayOfArraysBaseOnColor_id_array,
        arrayColorIdDistinctMappingArray,
        arrayOfArrayPossible,
        oldExistCombinationId,
        supposeValue: arrayColorIdDistinctMappingArray.length + 1,
      }); // return in the response a json with value of posts;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
