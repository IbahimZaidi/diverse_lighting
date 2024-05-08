"use client";
import { deleteFunction } from "@/helperFetchDataDB/deleteFunction";
import React from "react";

const ChildItem = ({
  objectVal,
  setToggleVal,
  setCurrentColor_array_id,
  setCurrentCurrentObjVal,
  setCurrentItemId,
  setToggleAreYouSure,
  setTheIdAreYouSure,
}) => {
  return (
    <div className="border border-blue-600 bg-yellow-300 m-auto  w-90% py-2 min-h-20  flex justify-between">
      {" "}
      {/* you have to make a cheak box  */}
      {/* the div of show the value of the Element :  */}
      <div className="infoDetails bg-slate-500 text-stone-100 flex justify-center items-center w-80% h-16">
        <span className=""> {objectVal.model}</span>
      </div>
      {/* the div of modification : */}
      <div className="modificationDiv flex justify-around items-center w-20%  ">
        <span
          className="edit_button"
          onClick={() => {
            // editFunction(objectVal.id);
            setToggleVal(true);
            setCurrentColor_array_id(objectVal.color_array_id);
            setCurrentCurrentObjVal(objectVal);
            setCurrentItemId(objectVal.id);
            // setTheIdAreYouSure(1);
          }}
        >
          {" "}
          Edit{" "}
        </span>
        <span
          className="delete_Button"
          onClick={() => {
            setCurrentItemId(objectVal.id);
            setToggleAreYouSure(true);
            setTheIdAreYouSure(0);
          }}
        >
          {" "}
          Delete{" "}
        </span>
      </div>
    </div>
  );
};

export default ChildItem;
