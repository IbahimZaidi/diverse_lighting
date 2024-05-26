// import { NextResponse } from "next/server";
// import { queryDeployTest } from "@/connectDB/queryDeployTest";
// export const POST = async (req, { params }) => {
//   try {
//     if (req.method === "POST") {
//       // Create an array

//       // // Stringify the array
//       const data = new FormData();

//       const theId = data.get("theId");
//       // delete the item have the id = valueOfId :
//       if (theId) {
//         await queryDeployTest({
//           query: "DELETE FROM items WHERE id = ?",
//           values: [theId],
//         });
//       }

//       return NextResponse.json({
//         message: "deleted succeffully ",
//       }); // return in the response a json with value of posts;
//     }
//   } catch (error) {
//     console.log(error);
//     throw new Error(error);
//   }
// };

import { NextResponse } from "next/server";
import { queryDeployTest } from "../../../connectDB/queryDeployTest";

export const GET = async (req) => {
  if (req.method === "GET") {
    try {
      //   const theId = url.searchParams();
      const url = new URL(req.url);
      const theId = url.searchParams.get("theId");

      await queryDeployTest({
        query: "DELETE FROM items WHERE id = ?",
        values: [theId],
      });

      return NextResponse.json({
        message: "Item deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting item:", error);
      return NextResponse.error("Internal Server Error", {
        status: 500, // Internal Server Error
      });
    }
  }
};
