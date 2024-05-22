"use client";

import { getAllColors } from "@/helperFetchDataDB/getAllColors";
import { getRowsColorsMapping } from "@/helperFetchDataDB/getRowsColor_mapping";
import { insertNewItem } from "@/helperFetchDataDB/insertNewIteam";
import React, { useEffect } from "react";

import { useState } from "react";
const ModleCreate = ({ settoggleValCreate }) => {
  // the container of the value of the file :
  const [file, setFile] = useState();

  // the maxToglleColor:
  const [toglleMaxColor, setToggleMaxColor] = useState(false);

  // the image url of the selected image :
  const [previewUrl, setPreviewUrl] = useState(null);

  // const colors Array :
  const [colorArray, setColorArray] = useState([{ id: 1, value: "#FFFFFF" }]);

  // the image track state :
  const [currentImageNew, setCurrentNewImage] = useState("default_image.jpg");

  // the modele name :
  const [valueModele, setValueModele] = useState("");

  //
  // const all_colors from the table of colors :
  const [all_colors, setAllColors] = useState([]);

  // insert the colors into the all_colors :
  useEffect(() => {
    //
    getAllColors().then((resolve) => {
      setAllColors(resolve);
    });
  }, []);

  // const all_colors_mapping from the table of colors :
  const [all_colors_mapping, setAll_colors_mapping] = useState([]);

  useEffect(() => {
    //
    getRowsColorsMapping().then((resolve) => {
      setAll_colors_mapping(resolve);
    });
  }, []);

  // cheak the allColors mapping array value :
  // useEffect(() => {
  //   // console.log() the array  :
  //   console.log("this is the value of colors mapping : ", all_colors_mapping);
  // }, [all_colors_mapping]);

  // // cheak the value of the colors :
  // useEffect(() => {
  //   console.log(
  //     "_______________******************this is the value of all colors : ",
  //     all_colors
  //   );
  // }, [all_colors]);

  //
  // cheak if the colorArray == 5 or < 5 , and change the value of max :
  useEffect(() => {
    // cheak the length of colorArray :
    if (colorArray.length > 5) {
      setToggleMaxColor(true);
    } else if (colorArray.length < 5) {
      setToggleMaxColor(false);
    }
  }, [colorArray]);

  // handle the file change :
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
        setCurrentNewImage(selectedFile.name);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  //
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

  // track the change of the array color :
  useEffect(() => {
    console.log(
      "_____________________________ this is the value of the array color : ",
      colorArray
    );
  }, [colorArray]);
  //
  // track the change of the image :
  useEffect(() => {
    console.log(
      "_____________________________ this is the value of the new image  : ",
      currentImageNew
    );
  }, [currentImageNew]);
  //

  // track the modele name change :

  useEffect(() => {
    // console.log :
    console.log("this is the value of the model : ", valueModele);
  }, [valueModele]);
  //
  //

  // function upload image  :
  const uploadTheImage = async () => {
    console.log("hello from the handle function !!!!!!!! ");
    // cheak if the file empty :
    if (!file) return;

    // the case of the file not empty :
    try {
      // create the data contain  the value of the file :
      const data = new FormData();

      // set the value of the data to the value of the file :

      // set the value of the data to the value of the file :
      data.set("file", file);

      // console.log("this is the value of the data : ", data.get("file"));
      // make the request using the methode POST :
      const res = await fetch("api/upload", {
        method: "POST",
        body: data,
      });

      // handle the Error Case :

      if (!res.ok) throw new Error(await res.text());
    } catch (e) {
      // Handler Error here :
      console.error("this is the error : ", e);
    }
  }; // ****** end of the function the upload of the image

  /// the function hanlde on Submit the form :

  const handleOnSubmit = async (e) => {
    // prevent the default  :
    e.preventDefault();

    // first upload the image into the local repo : public/images_test ;
    await uploadTheImage();
    // the corps function insert the data into database :

    // import the function do the work :
    await insertNewItem(
      colorArray,
      currentImageNew,
      valueModele,
      all_colors,
      all_colors_mapping
    ).then((resolve) => {
      // print the values return :
      console.log(
        "this is the value return from the function insertNewItem : ",
        resolve
      );
    });

    // close the modele :
    settoggleValCreate(false);

    // toggle the reload :
    window.location.reload();
  };
  // the return component :
  return (
    <div
      className="confirmationModel bg-slate-300 border-2 border-red-500 w-600px fixed z-10 "
      style={{ left: "calc(50% - 300px)", top: "120px" }}
    >
      {/* the close span :  */}
      <span
        className=" absolute top-0 right-0 bg-green-500 h-12 w-12 flex justify-center items-center rounded-full cursor-pointer"
        onClick={() => {
          settoggleValCreate(false);
        }}
      >
        {" "}
        close{" "}
      </span>
      {/*  */}
      <form
        action=""
        onSubmit={(e) => {
          handleOnSubmit(e);
        }}
        className=" border border-green-500 p-3 flex flex-col space-y-4 m-3"
        // onSubmit={}
      >
        {/* the input take the module name  */}
        <input
          className="w-70%"
          type="text"
          //   value={valueModele}
          placeholder="modele name ?"
          onChange={(e) => {
            setValueModele(e.currentTarget.value);
          }}
        />
        {/*  */}
        <div className=" flex justify-start items-center space-x-3 bg-white">
          <img
            src={previewUrl ? previewUrl : ""}
            alt="Error"
            className={`${!previewUrl ? "hidden" : ""} w-20 h-20`}
          />
          {/* the input of the file upload  */}
          <input
            type="file"
            onChange={(e) => {
              // setFile(e.target.files?.[0]);
              handleFileChange(e);
            }}
          />
        </div>

        {/*  */}
        {/*  */}
        <span className={`text-red-700 ${!toglleMaxColor ? "hidden" : ""}`}>
          {" "}
          you reach the max only 5 element !!{" "}
        </span>
        <div className="listOfColors border border-white flex flex-col space-y-2">
          {colorArray.length > 0 ? (
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
                  {elem.id == colorArray[colorArray.length - 1].id &&
                  colorArray.length > 0 ? (
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

        {/* the submit button : */}
        {/*  */}
        {/*  */}
        {/*  */}

        <button
          className=" bg-blue-500 h-10 w-32 m-auto text-xl "
          type="submit"
        >
          create +
        </button>
      </form>
    </div>
  );
};

export default ModleCreate;
