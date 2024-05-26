"use client";
import { useRouter } from "next/navigation";
import React from "react";

const LogOut = () => {
  //
  const route = useRouter();

  // deleteToken() function :
  const deleteToken = async () => {
    //
    const response = await fetch("api/deleteCookie");

    //
    const resultVal = await response.json();

    //

    alert(resultVal.result);

    // trigged the reload :
    window.location.reload();

    // redirect to login page  :
    route.push("/login");
    //
  };

  return (
    <div>
      <button
        className=" bg-yellow-400 border border-black rounded-sm m-4 p-3 text-black"
        onClick={() => {
          //
          console.log("hello from the console ");
          deleteToken();
        }}
      >
        {" "}
        Log Out{" "}
      </button>
    </div>
  );
};

export default LogOut;
