import { NextResponse } from "next/server";
import fs from "fs-extra";
import path from "path";

export const POST = async (req) => {
  try {
    // get the data formdata :
    const data = await req.formData();

    // get the file from the data :
    const file = data.get("file");

    // in case file not exist :
    if (!file) {
      return NextResponse.json({ success: false });
    }

    // the case of the file exist :
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // upload it to the pubic/imaes folder :
    const fileName = file.name;
    const filePath = path.join(process.cwd(), "public", "images", fileName);

    // Write the file to the specified path
    await fs.writeFile(filePath, buffer);

    // return success in the json :
    return NextResponse.json({ success: true });
  } catch (error) {
    // If any error occurs during file upload, return a failure response
    console.error("Error uploading file:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
};
