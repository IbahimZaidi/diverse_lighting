import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    if (req.method === "GET") {
      // Create an array
      const colorsArray = [
        { id: 1, value: "#000000" },
        { id: 2, value: "#C0C0C0" },
        { id: 3, value: "#FFFFFF" },
      ];

      // // Stringify the array
      const url = new URL(req.url);
      const stringifiedArray = url.searchParams.get("array_colors");

      console.log(stringifiedArray);
      // console.log("Stringified array:", stringifiedArray);
      // const stringifiedArray = JSON.stringify(colorsArray);
      // // Parse the string back to an array
      const parsedArray = JSON.parse(
        // '[{"id":1,"value":"#000000"},{"id":2,"value":"#C0C0C0"},{"id":3,"value":"#00000000000"}]'
        stringifiedArray
      );
      console.log("Parsed array:", parsedArray);

      return NextResponse.json({
        parsedArray,
      }); // return in the response a json with value of posts;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
