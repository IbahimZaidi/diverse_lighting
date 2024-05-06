"use client";
import React, { useState } from "react";

const page = () => {
  // the container of the value of the file :
  const [file, setFile] = useState();

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
      data.set("file", file);

      console.log("this is the value of the data : ", data.get("file"));
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
  return (
    <div className="bg-yellow-300 h-100vh ">
      <form
        action=""
        onSubmit={handleOnSubmit}
        className="border border-black w-50% h-52 m-auto pt-10 flex flex-col space-y-3"
      >
        {/* the input of the file upload  */}
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files?.[0]);
          }}
        />

        {/*  the submit button  */}
        <input
          type="submit"
          value="Upload"
          className=" bg-blue-300 w-20 h-10 font-bold text-lg cursor-pointer"
          style={{ marginTop: "50px" }}
        />
      </form>
    </div>
  );
};

export default page;
