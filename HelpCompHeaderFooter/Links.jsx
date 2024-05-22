"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

// the arrayLinks
const arrayLinks = [
  {
    title: "items",
    url: "/",
  },
  {
    title: "admin",
    url: "/admin",
  },

  {
    title: "testUpload",
    url: "/testUpload",
  },
];

// the start of the Links component :
const Links = () => {
  // get the current path :
  const pathName = usePathname();

  console.log("((((((((( , this is the pathName ", pathName);
  return (
    <div className="bg-yellow-500 flex justify-center items-center space-x-40 border border-black h-100% w-80% m-auto">
      {/* map over the links objects : */}

      {arrayLinks.length > 0 ? (
        arrayLinks.map((elem, index) => {
          return (
            <Link
              href={elem.url}
              className={`bg-white border border-red-500 w-200px px-3  h-90% text-black flex justify-center  items-center   uppercase  ${
                pathName == elem.url ? "activeLink" : ""
              }`}
              key={index}
              style={{ transition: "background-color .8s " }}
            >
              {" "}
              {elem.title}
            </Link>
          );
        })
      ) : (
        <div> is loading ....... </div>
      )}
    </div>
  );
};

export default Links;
