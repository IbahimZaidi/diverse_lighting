import React, { useState } from "react";

const Iteam = ({ theIndex, objectVal }) => {
  const [valueOfColor, setValueOfColor] = useState(objectVal.colors[0].code);
  return (
    <div
      className=" bg-green border border-red-500 mr-0 lg:mr-10px w-300px h-300px lg:h-400px   lg:w-400px  flex flex-col justify-center items-center"
      // style={{ marginRight: "10px" }}
    >
      {/* the container of the image  */}
      <div
        className="containerImage  w-100% h-70%"
        style={{ backgroundColor: valueOfColor }}
      >
        <img
          src="images_test/first_module.png"
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
          {theIndex + 1}{" "}
        </span>
        {objectVal.colors.map((elem, index) => {
          return (
            <span
              style={{ backgroundColor: elem.code }}
              className=" rounded-full w-6 h-6 flex justify-center items-center "
              key={index}
              onClick={() => {
                setValueOfColor(elem.code);
              }}
            ></span>
          );
        })}
      </div>
    </div>
  );
};

export default Iteam;
