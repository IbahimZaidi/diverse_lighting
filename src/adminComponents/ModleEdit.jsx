"use client";
import React, { use, useEffect, useState } from "react";

// import the data concerne the id passe in the props :
import { getItemsColorsId } from "@/helperFetchDataDB/getItemsColorsId";
// import the methode use Post to modifie the contenet :
//
const ModleEdit = ({ id, color_array_id, totoggleVal, setToggleVal }) => {
  // the colors data :
  const [arrayColorId, setColorArrayId] = useState([]);

  // update the color array from the id :
  useEffect(() => {
    // insert the data using the funcion getItemsColorsId :
    getItemsColorsId(color_array_id).then((resolve) => {
      setColorArrayId(resolve);
    });
  }, []);

  // the state of new color :
  const [valueOfColor, setValueOfColor] = useState("#FFFFFF");

  // the maxToglleColor:
  const [toglleMaxColor, setToggleMaxColor] = useState(false);

  // const colors Array :
  const [colorArray, setColorArray] = useState([]);

  // function drop a element from arrayColor :
  const dropColorFromArray = (id) => {
    const newArray = colorArray.filter((elem) => {
      return elem.id != id;
    });

    // after filter the array , change the state of the arrayColor :
    setColorArray(() => newArray);
  };

  // function changeValueColor of arrayColor :
  const changeValueColor = (e, id) => {
    const newArray = colorArray.map((elem) => {
      if (elem.id == id) {
        return { id: elem.id, value: e.currentTarget.value };
      }
      return elem;
    });

    // change the state of the colorArray :
    setColorArray(() => newArray);
  };

  // function handleOnSubmit :
  const handleSubmitForm = (e) => {
    // prevent the submit for now , whene i testing the Modele :
    e.preventDefault();
    // set the toglle value to false :
    // setToggleValue(false);
    console.log(
      "the type  of the setToggleValue ",
      setToggleVal,
      "toggle value ",
      totoggleVal
    );
  };
  //
  //
  // affiche the value of the color array :
  useEffect(() => {
    // affiche the value of the colorArray :
    console.log("the array color is : ", colorArray);
  }, [colorArray]);

  // replace the arrayColors news with the arrayColor from the id array color :

  useEffect(() => {
    // change the value of the arrayColor new :
    const newArray = arrayColorId.map((elem, index) => {
      return { id: index + 1, value: elem.color_name };
    });

    // change the arrayColor :
    setColorArray(() => newArray);
  }, [arrayColorId]);

  // cheak the value of the id :

  useEffect(() => {
    // console the value of the id :
    console.log("________________ the id is : ", id);
  }, [id]);
  //
  //
  //
  // the return of the ModleEdit :
  return (
    <div
      className="confirmationModel bg-slate-300 border-2 border-red-500 w-600px fixed z-10 "
      style={{ left: "calc(50% - 300px)", top: "120px" }}
    >
      <span
        className="flex justify-center items-center rounded-full h-10 w-10 absolute right-3 top-3 bg-red-200 cursor-pointer"
        onClick={() => {
          setToggleVal(false);
        }}
      >
        {" "}
        close{" "}
      </span>

      {/* the form : */}
      <form
        action=""
        className=" border border-green-500 p-3 flex flex-col space-y-4 m-3"
        onSubmit={(e) => {
          handleSubmitForm(e);
        }}
      >
        <input className="w-70%" type="text" placeholder="modele name ?" />
        <input className="w-70%" type="text" placeholder="image here !" />
        <span
          className={`text-red-700 ${!toglleMaxColor ? "hidden" : "block"}`}
        >
          {" "}
          you reach the max only 5 element !!{" "}
        </span>
        {/* how to change the default value in the colors , and how to make sure the color in the list of the database :  */}
        <div className="listOfColors border border-white flex flex-col space-y-2">
          {colorArray.length > 1 ? (
            colorArray.map((elem, index) => {
              return (
                <div className="flex space-x-3 w-60%">
                  <label
                    htmlFor={`input_${elem.id}`}
                    className=" flex justify-center items-center"
                  >
                    {" "}
                    color {index + 1} :
                  </label>
                  <input
                    type="color"
                    placeholder="red"
                    name={`input_${elem.id}`}
                    value={elem.value}
                    className=" border border-black mr-2"
                    onChange={(e) => {
                      console.log(
                        "hello from the change input color to the new Value ",
                        e.currentTarget.value
                      );
                      changeValueColor(e, elem.id);
                    }}
                  />
                  {elem.id == colorArray[colorArray.length - 1].id ? (
                    <span
                      className="border border-green-600 text-xl w-6 flex justify-center cursor-pointer"
                      onClick={() => {
                        if (colorArray.length < 5) {
                          setColorArray((prev) => {
                            return [
                              ...prev,
                              {
                                id: prev[prev.length - 1].id + 1,
                                value: "#FFFFFF",
                              },
                            ];
                          });
                        } else {
                          setToggleMaxColor(true);
                        }
                      }}
                    >
                      {" "}
                      +{" "}
                    </span>
                  ) : (
                    ""
                  )}

                  {elem.id != colorArray[0].id || colorArray.length > 1 ? (
                    <span
                      className="border border-red-600   h-8 m-auto px-2 flex justify-center items-center cursor-pointer"
                      onClick={() => {
                        if (colorArray.length > 1) {
                          dropColorFromArray(elem.id);
                        }
                      }}
                    >
                      {" "}
                      Delete{" "}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              );
            })
          ) : (
            <div> is loading ....... </div>
          )}
        </div>

        {/* <span
          className="bg-green-400 border border-yellow-300 w-24 flex justify-center py-2"
          onClick={() => {
            // addAllInArrayColor();
          }}
        >
          {" "}
          Add All{" "}
        </span> */}

        {/* input of submit the changig , must show other modele of confirmation */}
        <button type="submit" className=" bg-blue-400 text-white w-32 h-10 ">
          {" "}
          save change{" "}
        </button>
      </form>
    </div>
  );
};

export default ModleEdit;
