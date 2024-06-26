"use client";

import React, { useEffect, useState } from "react";
import { getItemsColorsId } from "../../helperFetchDataDB/getItemsColorsId";
const Iteam = ({ objectVal, theIndex }) => {
  const [theColors, setTheColors] = useState([]);
  const [valueOfColor, setValueOfColor] = useState("white");

  useEffect(() => {
    getItemsColorsId(objectVal.color_array_id).then((resolve) => {
      setTheColors(resolve);
    });
  }, []);

  useEffect(() => {
    console.log(" this is the value of color's ", theColors);
  }, [theColors]);

  useEffect(() => {
    setValueOfColor(theColors[0]?.color_name);
  }, [theColors]);

  return (
    <div className="bg-green-300 overflow-hidden border border-red-500 mr-25px lg:mr-10px w-300px h-300px lg:h-400px lg:w-400px flex flex-col justify-center items-center ">
      <div
        // className="containerImage w-100% h-70% "
        className="containerImage w-100% h-70%  overflow-hidden  hover:h-[110%] hover:w-[110%] transition-all duration-700 origin-center"
        style={{
          backgroundColor: valueOfColor,
          // transition: "background-color 1s",
        }}
      >
        {/*  hello from this comment to avoid the issue of behind by one  */}
        <img
          src={`images_test/${
            objectVal.image
              ? objectVal.image
              : objectVal.image == "null"
              ? "default_image.jpg"
              : ""
          }`}
          alt="Error 404"
          // className="w-full h-full overflow-hidden transition-all duration-700 transform hover:scale-120"
          // className="w-full h-full "
          className="w-100% h-100% border border-black "
        />
      </div>

      <div
        className="containerSpansColors flex justify-center items-center space-x-3 w-100% h-30%"
        style={{
          backgroundImage: "linear-gradient(to bottom,  #dcdfe4 , #a3c8ff)",
        }}
      >
        <span className="w-6 h-6 flex justify-center items-center text-white bg-yellow-500 ">
          {theIndex + 1}
        </span>
        {theColors && theColors.length > 0 ? (
          theColors.map((elem, index) => (
            <span
              style={{ backgroundColor: elem.color_name }}
              className="rounded-full w-6 h-6 flex justify-center items-center"
              key={index}
              onClick={() => {
                setValueOfColor(elem.color_name);
              }}
            ></span>
          ))
        ) : (
          <div>is loading ......</div>
        )}
      </div>
    </div>
  );
};

export default Iteam;
