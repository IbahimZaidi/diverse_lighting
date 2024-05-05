"use client";
import React, { useEffect, useState } from "react";
// import the helper component child :
import ChildItem from "./ChildItem";

// import the function fetch data from the database :
import { getItems } from "@/helperFetchDataDB/getItems";
import ModleEdit from "./ModleEdit";

// start the main component of ScrollCompItems :
const ScrollCompItems = () => {
  // first get the items :
  const [data, setData] = useState([]);

  // updatae the state of the data :
  useEffect((elem, index) => {
    getItems().then((resolve) => {
      setData(resolve);
    });
  }, []);

  // the return component :
  return (
    <div className="scrollDivMain w-80% overflow-y-scroll overflow-x-hidden h-400px m-auto bg-slate-300 border-2 border-black flex flex-col space-y-4 relative">
      {/* <div> Hello </div> */}
      {data.length > 0 ? (
        data.map((elem, index) => {
          return <ChildItem objectVal={elem} key={index} />;
        })
      ) : (
        <div> is Loading ......... </div>
      )}

      {/* the modele :  */}
      <ModleEdit id={1} />
    </div>
  );
};

export default ScrollCompItems;
