import React from "react";
import ScrollCompItems from "../../adminComponents/ScrollCompItems";
import LogOut from "../../adminComponents/LogOut";

const page = () => {
  return (
    <div className=" w-100% bg-yellow-300 min-h-100vh  m-1  py-16 ">
      {" "}
      <ScrollCompItems />
      hello from admin
      <LogOut />
    </div>
  );
};

export default page;
