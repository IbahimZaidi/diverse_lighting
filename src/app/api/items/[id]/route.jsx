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

// Define generateStaticParams function
export async function generateStaticParams() {
  // Logic to fetch dynamic IDs from database or other source
  const dynamicIds = ["id1", "id2", "id3"]; // Example dynamic IDs

  // Generate static parameters for each dynamic ID
  const staticParams = dynamicIds.map((id) => ({
    [`/api/items/${id}`]: { page: "/api/items/[id]", query: { id } },
  }));

  return Object.assign({}, ...staticParams);
}
