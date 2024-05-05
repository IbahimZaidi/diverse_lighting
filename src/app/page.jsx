"use client";

// import the childe component we use it to make the loop
import Iteam from "@/helperComponents/childes_component_card/Iteam";

// import the data json
import { data } from "@/data/data";

// import the icon :

import { ImPrevious } from "react-icons/im";
import { BiSkipNextCircle } from "react-icons/bi";
// imort the handle on click functions :
import {
  handleLeft,
  handleRight,
  historyNubmerWidth,
} from "@/helperFunctions/functionsItems";
import { useEffect, useRef, useState } from "react";

// import the function handle the change of the width of the body :
import { cheakWidthChangeCurrentWidthNumber } from "@/helperFunctions/functionsItems";
//
// import the change the index slider base on the resize of the sceane :
import { changeLeftMovDiv } from "@/helperFunctions/functionsItems";

// import the function track the change of the indexSlider :
import { changeIndexSliderTracker } from "@/helperFunctions/functionsItems";

// import the function save only 3 last element in the history :
import { sliceLast3Element } from "@/helperFunctions/functionsItems";

// start of the main component
export default function Home() {
  // test the value of the data in the console first

  // make the data into a state :

  // useRef() for the div mouvemenet :
  const [moveDivRef, setMoveDiveRef] = useState(useRef());

  // useRef() for the section contain the movement Div :
  const containerMove = useRef();

  // the number change with the width :
  const [numberWidth, setNumberWidth] = useState();

  // const of History of last 3 screan :

  const [historyPrevNumberWidth, setHistoryPrevNumberWidth] = useState([]);
  useEffect(() => {
    // this is to cheak the first time before the resize of the window :
    cheakWidthChangeCurrentWidthNumber(setNumberWidth);
    // add eventLister in case of resize the window :
    window.addEventListener("resize", () => {
      cheakWidthChangeCurrentWidthNumber(setNumberWidth);
    });
  }, []);

  // change the value of the history :

  useEffect(() => {
    const slicedHistory = historyPrevNumberWidth.slice(-3);
    if (historyPrevNumberWidth.length > 3) {
      historyNubmerWidth(setHistoryPrevNumberWidth, slicedHistory, numberWidth);
    } else {
      historyNubmerWidth(
        setHistoryPrevNumberWidth,
        historyNubmerWidth,
        numberWidth
      );
    }
  }, [numberWidth]);

  // make sure only we have 3 last in the history div  :
  useEffect(() => {
    historyPrevNumberWidth.length > 2
      ? sliceLast3Element(historyPrevNumberWidth, setHistoryPrevNumberWidth)
      : "";
  }, [historyPrevNumberWidth]);

  // cheak the historyPrevNumberWidth :

  useEffect(() => {
    console.log(
      "Y&&&&&&&&&&&&&&&&&&&&&&&&&&&&&(((((((((((((((((()))))))))))))))))) __________________ ",
      historyPrevNumberWidth
    );
  }, [historyPrevNumberWidth]);

  // first declare the variable contain the number of pagination :
  const [numberPagination, setNumberPagination] = useState(0);

  // set container cheak the slider case :
  const [indexSlider, setIndexSlider] = useState(1);

  // arrayFromIndex :
  const [arrayFromIndex, setArrayFromIndex] = useState([]);

  // const set the data length :

  const [dataLength, setDataLength] = useState(0);

  // this value for fix issue of resize width:
  // extract the limit from the data.cars.length
  useEffect(() => {
    // set the numberPaginaation to the new value :
    setNumberPagination(Math.ceil(data?.cars?.length / numberWidth)); // i devide /2 because each slice of the slider have 2 items
    // console.log("this is the length : ");

    // cheak the value of the index Slider :

    console.log(" this is the value of the indexSlider ", indexSlider);

    setDataLength(data?.cars?.length);
    // window.reload();
    // Reload the current page
  }, [data, numberWidth]);

  useEffect(() => {
    // affiche the numberPagination :

    console.log(
      "YYYYYYYYYYYYYYYYYYYYYYYYYYYYY number pagination : ",
      numberPagination
    );
  }, [numberPagination]);

  // tracker of the change of the numberWidth :

  useEffect(() => {
    changeLeftMovDiv(
      indexSlider,
      numberWidth,
      setIndexSlider,
      historyPrevNumberWidth,
      dataLength
    );
  }, [historyPrevNumberWidth]);
  // tarcker of indexSlider change :
  useEffect(() => {
    if (indexSlider != 1) {
      changeIndexSliderTracker(
        moveDivRef.current,
        numberPagination,
        indexSlider,
        // setIndexSlider,
        numberWidth
      ); // Change parameter name to divMovRef to reflect that it's a ref
      console.log(
        "this is the value of index Slider : ___________________________________",
        indexSlider,
        numberWidth
      );
    }
  }, [indexSlider, numberWidth]);

  // const isInitialRender = useRef(true);

  // extract the arrayFromIndex array :
  useEffect(() => {
    setArrayFromIndex(
      Array.from({ length: numberPagination }, (_, index) => index + 1)
    );
  }, [numberPagination]);

  useEffect(() => {}, [arrayFromIndex]);

  // // declare the array of array's
  // console.log("the value of the arrayFromIndex is :  ", arrayFromIndex);

  return (
    <main className=" bg-yellow-300 min-h-100vh  m-1  py-16   ">
      {" "}
      {/* this section have the container of the items */}
      <section
        className="container m-auto  flex bg-slate-500  relative h-400px lg:h-500px overflow-hidden w-350px lg:w-830px 2xl:w-1240px  "
        style={{ transition: "width .5s" }}
        ref={containerMove}
      >
        {/* this is the inside div contain the move div with changing the left in css  */}
        <div
          className="moveDiv w-fit flex pl-25px lg:pl-0   absolute box-border  " // make border border-black to cheak it
          style={{
            left: "0%", // -150px for the hald width of the item(300px),
            top: `${
              numberWidth != 1
                ? "calc(50% - 200px - 10px)" // -200px becaus the item have a height 400px , and 10px for the padding top
                : "calc(50% - 150px )" // -150px for the hald height of the item(300px)
            }`,
            padding: `${numberWidth != 1 ? "10px" : ""}`,
            transition: "left 0.5s",
          }} // this 200px for the item half height , and 16px for the padding , to make the movement div in the middle
          ref={moveDivRef}
        >
          {data?.cars ? (
            data.cars.map((elem, index) => {
              return <Iteam objectVal={elem} key={index} theIndex={index} />;
            })
          ) : (
            <div> is loading</div>
          )}
        </div>
      </section>
      {/* this is the second section of the js controll button */}
      <section className="jsControllButtons flex justify-around items-center w-300px lg:w-500px 2xl:w-500px h-100px border border-red-300 m-auto mt-5 ">
        <buttonc
          onClick={() =>
            handleRight(
              moveDivRef.current,
              numberPagination,
              indexSlider,
              setIndexSlider,
              numberWidth
            )
          }
          className={`buttonClick ${indexSlider == 1 ? "disableClass" : ""}`}
        >
          {" "}
          <ImPrevious className="w-6 h-6" />{" "}
        </buttonc>
        <div className="containerOfIndex  justify-center space-x-1 w-50%  hidden lg:flex ">
          {/* add this div for more element div  */}
          {arrayFromIndex.length > 5 && indexSlider >= 5 ? (
            <div className="moreElementDiv"> . . . </div>
          ) : (
            ""
          )}
          {/* start the loop over arrayFromIndex */}
          {arrayFromIndex.length > 0 ? (
            arrayFromIndex.map((elem, index, theArray) => {
              // first specifie each number equivalant from the arrayOfArray
              // the number of index 0 to 5 must have the arrayOfArray[0]
              // the number of index 6 to 10  must have the arrayOfArray[1]

              const start = Math.floor(indexSlider / 5) * 5 - 1;
              const end = Math.floor(indexSlider / 5) * 5 + 5;

              if (
                elem >= start && // case elem = 10
                elem <= end
              ) {
                return (
                  <sapn
                    className={`flex justify-center items-center bg-blue-500 w-6 text-white  border-black cursor-pointer ${
                      indexSlider == elem ? "activeSpan" : ""
                    }`}
                    onClick={() => {
                      if (elem > indexSlider) {
                        // elem = 2 > indexSlider = 1
                        handleLeft(
                          moveDivRef.current,
                          numberPagination,
                          elem - 1,
                          setIndexSlider,
                          numberWidth
                        );
                      } else if (elem < indexSlider) {
                        handleRight(
                          moveDivRef.current,
                          numberPagination,
                          elem + 1,
                          setIndexSlider,
                          numberWidth
                        );
                      }
                    }}
                    key={index}
                  >
                    {" "}
                    {elem}
                  </sapn>
                );
              }

              // case we more 5 slide :
            })
          ) : (
            <div> is loading ..... </div>
          )}

          {/* add this div for more element div  */}
          {arrayFromIndex.length > 5 &&
          indexSlider < Math.floor(arrayFromIndex.length / 5) * 5 ? ( // must indexSlider < 9 , 10 , 11 ( mean )
            <div className="moreElementDiv"> . . . </div>
          ) : (
            ""
          )}
        </div>
        <button
          onClick={() =>
            handleLeft(
              moveDivRef.current,
              numberPagination,
              indexSlider,
              setIndexSlider,
              numberWidth
            )
          }
          className={`buttonClick ${
            indexSlider == arrayFromIndex.length ? "disableClass" : ""
          }`}
        >
          {" "}
          <BiSkipNextCircle className="w-6 h-6" />{" "}
        </button>
      </section>
    </main>
  );
}
