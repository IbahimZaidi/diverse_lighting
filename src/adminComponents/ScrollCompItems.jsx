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

  // currentId :
  const [currentColor_array_id, setCurrentColor_array_id] = useState(1);

  // the toggleValue of ModleEdit :
  const [toggleVal, setToggleVal] = useState(false);

  useEffect(() => {
    console.log("this is the value of the toggle Value : ", toggleVal);
  }, [toggleVal]);

  console.log("HHHHHHHHHHHHHHHHHHHHHHHh");
  // updatae the state of the data :
  useEffect((elem, index) => {
    getItems().then((resolve) => {
      setData(resolve);
    });
  }, []);

  // the return component :
  return (
    <div className="scrollDivMain w-80% overflow-y-scroll overflow-x-hidden h-400px m-auto bg-slate-300 border-2 border-black flex flex-col space-y-4 py-3 relative">
      {/* <div> Hello </div> */}
      {data.length > 0 ? (
        data.map((elem, index) => {
          return (
            <ChildItem
              objectVal={elem}
              key={index}
              setToggleVal={setToggleVal}
              setCurrentColor_array_id={setCurrentColor_array_id}
            />
          );
        })
      ) : (
        <div> is Loading ......... </div>
      )}

      {/* the modele :  */}
      {toggleVal ? (
        <ModleEdit
          id={currentColor_array_id}
          setToggleVal={setToggleVal}
          toggleVal={toggleVal}
          color_array_id={currentColor_array_id}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ScrollCompItems;
