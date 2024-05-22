"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import React from "react";

const LogOut = () => {
  // function handle logout :
  const route = useRouter();

  const handleLogout = () => {
    // Remove the cookie
    Cookies.remove("userObject");
    // Optionally redirect to the login page or another action
    route.push("/login");
  };
  return (
    <div>
      <button
        className=" bg-red-400 w-[200px] h-[40px] "
        onClick={handleLogout}
      >
        {" "}
        Log Out
      </button>
    </div>
  );
};

export default LogOut;
