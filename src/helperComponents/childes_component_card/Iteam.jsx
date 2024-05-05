"use client";
import React, { useEffect, useState } from "react";

import { getItemsColorsId } from "@/helperFetchDataDB/getItemsColorsId";
const Iteam = ({ objectVal }) => {
  // the data from the colors have the array_id_color equal the one of the objectVal :
  const [theColors, setTheColors] = useState([]);

  // the default color :
  const [valueOfColor, setValueOfColor] = useState("white");

  // get the data from the api/items/${id}
  useEffect(() => {
    // get the data from the api/items/${id}
    getItemsColorsId(objectVal.color_array_id).then((resolve) => {
      setTheColors(resolve);
    });
  }, []);

  // refresh the default color when the colors come after fetching from the database :
  useEffect(() => {
    // set the first color from the array of colors :
    setValueOfColor(theColors[0]?.color_name);
  }, [theColors]);

  return (
    <div
      className=" bg-green border border-red-500 mr-25px lg:mr-10px w-300px h-300px  lg:h-400px   lg:w-400px  flex flex-col justify-center items-center"
      // style={{ marginRight: "10px" }}
    >
      {/* the container of the image  */}
      <div
        className="containerImage  w-100% h-70%"
        style={{
          backgroundColor: valueOfColor,
          transition: "background-color 1s",
        }}
      >
        <img
          src={`images_test/${objectVal.image}`} // make the image dynamique from the json data :
          alt="Error 404"
          className="w-100% h-100%"
        />
      </div>

      {/* the container of the color span's  */}

      <div
        className="containerSpansColors flex justify-center items-center  space-x-3 w-100% h-30%"
        style={{
          backgroundImage: "linear-gradient(to bottom,  #dcdfe4 , #a3c8ff)",
        }}
      >
        <span className=" w-6 h-6 flex justify-center items-center text-white bg-yellow-500 ">
          {" "}
          {objectVal.id}{" "}
        </span>
        {theColors.length > 0 ? (
          theColors.map((elem, index) => {
            return (
              <span
                style={{ backgroundColor: elem.color_name }}
                className=" rounded-full w-6 h-6 flex justify-center items-center "
                key={index}
                onClick={() => {
                  setValueOfColor(elem.color_name);
                }}
              ></span>
            );
          })
        ) : (
          <div> is loading ...... </div>
        )}
      </div>
    </div>
  );
};

export default Iteam;
