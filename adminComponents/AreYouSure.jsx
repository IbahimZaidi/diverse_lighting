import React from "react";

// icons :
import { IoMdDoneAll } from "react-icons/io";
import { ImCancelCircle } from "react-icons/im";
import { deleteFunction } from "@/helperFetchDataDB/deleteFunction";
const AreYouSure = ({ theID, currentItemId, setToggleAreYouSure }) => {
  // test the idAreYouSure :
  //   const idAreYouSure = 0;
  return (
    <div
      className="  border border-black   w-500px flex flex-col space-y-5 top-1/3 fixed left-1/3 bg-white px-3 "
      style={{ height: "140px" }}
    >
      <span className=" text-lg font-semibold">
        {" "}
        Are you sure you want to{" "}
        {theID == 0
          ? "Delete "
          : theID == 1
          ? "Update "
          : theID == 2
          ? " Create "
          : ""}{" "}
        this Element :{" "}
      </span>
      <div className="buttons  flex justify-between w-100% h-10 border border-blue-700 ">
        <span
          className="flex justify-around w-20% bg-green-300 text-xl cursor-pointer hover:bg-green-500 duration-700  transition-all "
          onClick={() => {
            theID == 0 ? deleteFunction(currentItemId) : "";
          }}
        >
          {" "}
          Yes <IoMdDoneAll className="  pt-1 w-8 h-8 " />
        </span>
        <span
          className="flex justify-around w-20% bg-red-400 hover:bg-red-600 duration-700  text-xl cursor-pointer"
          onClick={() => {
            // close the Are you sure :
            setToggleAreYouSure(false);
          }}
        >
          {" "}
          No <ImCancelCircle className=" pt-1 w-8 h-8 " />
        </span>
      </div>
    </div>
  );
};

export default AreYouSure;
