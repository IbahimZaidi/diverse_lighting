import { queryDeployTest } from "../../../../connectDB/queryDeployTest";

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

// // Import the necessary modules
// import { queryDeployTest } from "@/connectDB/queryDeployTest"; // Replace with your actual database module
// import { NextResponse } from "next/server";
// import { URLSearchParams } from "url";

// // Define the GET handler function
// export const GET = async (req, { params }) => {
//   if (req.method !== "GET") {
//     return NextResponse.error(new Error("Method not allowed"), { status: 405 });
//   }

//   try {
//     // Parse the query parameters from the URL
//     const urlParams = new URLSearchParams(req.url);

//     // Extract query parameters and validate JSON
//     const model_name = JSON.parse(urlParams.get("model_name") || null);
//     const image_name = JSON.parse(urlParams.get("image_name") || null);
//     const color_array_id = JSON.parse(urlParams.get("color_array_id") || null);
//     const arrayNewColorsString = JSON.parse(
//       urlParams.get("arrayNewColorsString") || null
//     );
//     const arrayOldColorIdString = JSON.parse(
//       urlParams.get("arrayOldColorIdString") || null
//     );
//     const all_colors = JSON.parse(urlParams.get("all_colorsString") || null);

//     // Update the data in the database
//     await queryDeployTest({
//       query: "UPDATE items SET model = ?, image = ? WHERE id = ?",
//       values: [model_name, image_name, params.id],
//     });

//     // Process color array
//     for (const elem of arrayNewColorsString || []) {
//       const exists = all_colors.find(
//         (color) => color.color_name === elem.value
//       );
//       if (exists) {
//         await queryDeployTest({
//           query: "UPDATE colors SET color_name = ? WHERE color_name = ?",
//           values: [
//             elem.value,
//             arrayOldColorIdString.find(
//               (oldColor) => oldColor.color_name === elem.value
//             ).color_name,
//           ],
//         });
//       } else {
//         await queryDeployTest({
//           query: "INSERT INTO colors (color_name) VALUES (?)",
//           values: [elem.value],
//         });
//       }
//     }

//     // Update color mappings
//     await queryDeployTest({
//       query: "DELETE FROM color_mappings WHERE color_array_id = ?",
//       values: [color_array_id],
//     });

//     for (const elem of arrayNewColorsString || []) {
//       await queryDeployTest({
//         query:
//           "INSERT INTO color_mappings (id_color, color_array_id) VALUES (?, ?)",
//         values: [elem.value, color_array_id],
//       });
//     }

//     // Return response
//     return NextResponse.json({
//       array_colors: arrayNewColorsString,
//       array_Old_colors: arrayOldColorIdString,
//       all_colors,
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.error(new Error("Internal Server Error"), {
//       status: 500,
//     });
//   }
// };
