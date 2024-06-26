"use client";
import React, { useEffect, useRef, useState } from "react";

// import :

// import the data concerne the id passe in the props :
import { getItemsColorsId } from "../helperFetchDataDB/getItemsColorsId";
import { getAllColors } from "../helperFetchDataDB/getAllColors";
import { updateIems } from "../helperFetchDataDB/updateIems";
// import the methode use Post to modifie the contenet :
//
const ModleEdit = ({ id, color_array_id, setToggleVal, currentObjectVal }) => {
  // the colors data :
  const [arrayColorId, setColorArrayId] = useState([]);

  // update the color array from the id :
  useEffect(() => {
    // insert the data using the funcion getItemsColorsId :
    getItemsColorsId(color_array_id).then((resolve) => {
      setColorArrayId(resolve);
    });
  }, []);

  // cheak the arrayColorId variable :

  // the state of new color :
  const [valueOfColor, setValueOfColor] = useState("#FFFFFF");

  // the modele state :
  const [valueModele, setVAlueModele] = useState(currentObjectVal.model);

  // the maxToglleColor:
  const [toglleMaxColor, setToggleMaxColor] = useState(false);

  // const colors Array :
  const [colorArray, setColorArray] = useState([]);

  // cheak if the colorArray == 5 or < 5 , and change the value of max :
  useEffect(() => {
    // cheak the length of colorArray :
    if (colorArray.length > 4) {
      setToggleMaxColor(true);
    } else if (colorArray.length < 5) {
      setToggleMaxColor(false);
    }
  }, [colorArray]);

  useEffect(() => {
    //
    console.log(
      "this is the NEW color  Array : ######################## ",
      colorArray
    );
  }, [colorArray]);
  // const the imageNew state :
  const imageNew = useRef();

  // const save the value of the imageNew.current.value :
  const [currentImageNew, setCurrentNewImage] = useState(
    currentObjectVal.image
  );

  // const all_colors from the table of colors :
  const [all_colors, setAllColors] = useState([]);

  // insert the colors into the all_colors :
  useEffect(() => {
    //
    getAllColors().then((resolve) => {
      setAllColors(resolve);
    });
  }, []);

  // cheak the value of the colors :
  // useEffect(() => {
  //   console.log(
  //     "_______________******************this is the value of all colors : ",
  //     all_colors
  //   );
  // }, [all_colors]);

  // the container of the value of the file :
  const [file, setFile] = useState();

  // the image url of the selected image :
  const [previewUrl, setPreviewUrl] = useState(null);

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

  // this is to change the value of the file , and affiche it before the submit handle the file change :
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

  // cheak the currentImage :
  useEffect(() => {
    console.log("this is the current image value : ", currentImageNew);
  }, [currentImageNew]);
  //
  //
  // function upload image  :
  const uploadTheImage = async () => {
    // e.preventDefault() ;
    // e.preventDefault();

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
  }; // ****** end of the function handle the upload of the image
  //
  //
  const handleClick = async () => {
    // the logic here :

    // upload the image function :
    await uploadTheImage();
    //
    console.log("hello from the click ");
    await updateIems(
      colorArray,
      arrayColorId,
      all_colors,
      currentImageNew,
      valueModele,
      currentObjectVal.id,
      currentObjectVal.color_array_id
    ).then((resolve) => {
      console.log(
        "******************************* _________________ this the return from the api route ",
        resolve
      );
    });

    // setToggleVal(false);
    setToggleVal(false);
  };
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
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className=" border border-green-500 p-3 flex flex-col space-y-4 m-3"
        // onSubmit={}
      >
        <input
          className="w-70%"
          type="text"
          value={valueModele}
          placeholder="modele name ?"
          onChange={(e) => {
            setVAlueModele(e.currentTarget.value);
          }}
        />

        {/* div of selected image :  */}

        {/* <input className="w-70%" type="text" placeholder="image here !" /> */}
        <div className="imageDivChange border border-black flex justify-around p-2">
          <img
            src={`images_test/${currentObjectVal.image}`}
            alt="Error 404"
            className="w-10 h-10 "
          />

          {currentImageNew ? (
            <>
              <span> to </span>
              {/* <img
                src={`/images_test/${currentImageNew}`}
                alt="Error 404"
                className="w-10 h-10 "
              /> */}
            </>
          ) : (
            ""
          )}
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
        </div>
        <span
          className={`text-red-700 ${!toglleMaxColor ? "hidden" : "block"}`}
        >
          {" "}
          you reach the max only 5 element !!{" "}
        </span>
        {/* how to change the default value in the colors , and how to make sure the color in the list of the database :  */}
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
        {/* <span
          className="bg-green-400 border border-yellow-300 w-24 flex justify-center py-2"
          onClick={() => {
            // addAllInArrayColor();
          }}
        >
          {" "}
          Add All{" "}
        </span> */}
        {/*  */}
        {/* input of submit the changig , must show other modele of confirmation */}
        <button
          type="submit"
          className=" bg-blue-400 text-white w-32 h-10 "
          onClick={() => {
            handleClick();
            // setToggleAreYouSure(true);
          }}
        >
          {" "}
          save change{" "}
        </button>
      </form>
    </div>
  );
};

export default ModleEdit;
