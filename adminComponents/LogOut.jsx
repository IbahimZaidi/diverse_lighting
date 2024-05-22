"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import React from "react";

const LogOut = () => {
  // function handle logout :
  const route = useRouter();

  const handleLogout = async () => {
    // Remove the cookie
    Cookies.remove("userObject");

    await fetch("/api/deleteCookies");

    // Optionally redirect to the login page or another action
    window.location.reload();
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
