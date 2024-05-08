"use client";
import React, { useEffect, useState } from "react";
// import the helper component child :
import ChildItem from "./ChildItem";

// import the function fetch data from the database :
import { getItems } from "@/helperFetchDataDB/getItems";
import ModleEdit from "./ModleEdit";
import ModleCreate from "./ModleCreate";
import AreYouSure from "./AreYouSure";
import { deleteFunction } from "@/helperFetchDataDB/deleteFunction";

// start the main component of ScrollCompItems :
const ScrollCompItems = () => {
  // first get the items :
  const [data, setData] = useState([]);

  // currentId :
  const [currentColor_array_id, setCurrentColor_array_id] = useState(1);

  // currentId :
  const [currentObjectVal, setCurrentCurrentObjVal] = useState({});

  // the toggleValue of ModleEdit :
  const [toggleVal, setToggleVal] = useState(false);

  // the toggleValue of ModeleEdite:
  const [toggleValCreate, settoggleValCreate] = useState(false);

  // current object :
  const [currentItemId, setCurrentItemId] = useState();

  // const
  const [toggleAreYouSure, setToggleAreYouSure] = useState(false);

  // the id of Are you sure :
  const [theIdAreYouSure, setTheIdAreYouSure] = useState();

  useEffect(() => {
    console.log("this is the value of the toggle Value : ", toggleVal);
    // window.location.reload();
  }, [toggleVal]);

  console.log("HHHHHHHHHHHHHHHHHHHHHHHh");
  // updatae the state function of the data :
  const fetchData = async () => {
    const resolvedData = await getItems();
    setData(resolvedData);
  };

  // update the data each toggleVal change :
  useEffect(() => {
    console.log("this is the value of the toggle Value : ", toggleVal);
    fetchData();
  }, [toggleVal]); // Fetch data only when toggleVal changes

  // the return component :
  return (
    <div className="scrollDivMain w-80% overflow-y-scroll overflow-x-hidden h-400px m-auto bg-slate-300 border-2 border-black flex flex-col space-y-4 py-3 ">
      <div className=" flex justify-end px-3 ">
        <span
          className=" bg-green-400  w-26 h-16  p-3 rounded-sm cursor-pointer text-lg font-bold flex justify-center  items-center"
          onClick={() => {
            settoggleValCreate(true);
          }}
        >
          {" "}
          {"create + "}
        </span>
      </div>
      {/* <div> Hello </div> */}
      {data.length > 0 ? (
        data.map((elem, index) => {
          return (
            <ChildItem
              objectVal={elem}
              key={index}
              setToggleVal={setToggleVal}
              setCurrentColor_array_id={setCurrentColor_array_id}
              setCurrentCurrentObjVal={setCurrentCurrentObjVal}
              setCurrentItemId={setCurrentItemId}
              setToggleAreYouSure={setToggleAreYouSure}
              setTheIdAreYouSure={setTheIdAreYouSure}
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
          currentObjectVal={currentObjectVal}
        />
      ) : (
        ""
      )}

      {toggleValCreate ? (
        <ModleCreate settoggleValCreate={settoggleValCreate} />
      ) : (
        ""
      )}

      {/* deleteFunction(objectVal.id); */}
      {toggleAreYouSure ? (
        <AreYouSure
          currentItemId={currentItemId}
          theID={theIdAreYouSure}
          setToggleAreYouSure={setToggleAreYouSure}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ScrollCompItems;
