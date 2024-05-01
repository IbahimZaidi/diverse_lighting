import React from "react";

const Iteam = ({ theIndex }) => {
  return (
    <div
      className=" bg-white border border-red-500  h-400px w-400px flex justify-center items-center"
      style={{ marginRight: "10px" }}
    >
      Iteam {theIndex ? theIndex : 0}
    </div>
  );
};

export default Iteam;
