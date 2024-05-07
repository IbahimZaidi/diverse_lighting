"use client";
import { updateIems } from "@/helperFetchDataDB/updateIems";
import React, { useState } from "react";

const page = () => {
  // the container of the value of the file :
  const [file, setFile] = useState();

  // the image url of the selected image :
  const [previewUrl, setPreviewUrl] = useState(null);

  // handle the file change :
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // the handleFunctionOnSubmit :
  const handleOnSubmit = async (e) => {
    // e.preventDefault() ;
    e.preventDefault();

    console.log("hello from the handle function !!!!!!!! ");
    // cheak if the file empty :
    if (!file) return;

    // the case of the file not empty :
    try {
      // create the data contain  the value of the file :
      const data = new FormData();

      // set the value of the data to the value of the file :

      // set the value of the data to the value of the file :
      data.set("file", file);

      // console.log("this is the value of the data : ", data.get("file"));
      // make the request using the methode POST :
      const res = await fetch("api/upload", {
        method: "POST",
        body: data,
      });

      // handle the Error Case :

      if (!res.ok) throw new Error(await res.text());
    } catch (e) {
      // Handler Error here :
      console.error("this is the error : ", e);
    }
  };

  //
  // handle testFunction testing the passing array to api route  :
  const testFunction = async () => {
    // const arrayColorStringy = JSON.stringify(array_color);
    const array_colors = [
      { id: 1, value: "#000000" },
      { id: 2, value: "#C0C0C0" },
      { id: 3, value: "#FFFFFF" },
    ];

    const exempleLikImage = "image_name.jpg";

    // cheak the value return from the updateItems :
    updateIems(array_colors, exempleLikImage).then((resolve) => {
      console.log(
        "_________________---- this is the return value from the function updateItems : ",
        resolve
      );
    });
  };

  //
  //
  // start of the main code of the component :

  return (
    <div className="bg-yellow-300 h-100vh ">
      <form
        action=""
        onSubmit={handleOnSubmit}
        className="border border-black w-50% h-52 m-auto pt-10 flex flex-col space-y-3"
      >
        <div className=" flex justify-start items-center space-x-3 bg-white">
          <img
            src={previewUrl ? previewUrl : ""}
            alt="Error"
            className={`${!previewUrl ? "hidden" : ""} w-20 h-20`}
          />
          {/* the input of the file upload  */}
          <input
            type="file"
            onChange={(e) => {
              // setFile(e.target.files?.[0]);
              handleFileChange(e);
            }}
          />
        </div>

        {/*  the submit button  */}
        <input
          type="submit"
          value="Upload"
          className=" bg-blue-300 w-20 h-10 font-bold text-lg cursor-pointer"
          style={{ marginTop: "50px" }}
        />
        {/* button handle the test pass the array :  */}

        <button
          onClick={testFunction}
          className=" bg-green-400 h-20 w-50% m-auto px-4 "
        >
          test pass array
        </button>
      </form>
    </div>
  );
};

export default page;
