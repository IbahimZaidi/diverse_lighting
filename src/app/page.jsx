"use client";

// import the childe component we use it to make the loop
import Iteam from "@/helperComponents/childes_component_card/Iteam";

// import the data json
import { data } from "@/data/data";

// imort the handle on click functions :
import { handleLeft, handleRight } from "@/helperFunctions/functionsItems";
import { useEffect, useRef, useState } from "react";
//
//
// start of the main component
export default function Home() {
  // test the value of the data in the console first
  console.log("this is the data json info : ", data);

  // useRef() for the div mouvemenet :
  const moveDivRef = useRef();

  // test the useRef :

  // useEffect(() => {
  //   console.log("hello this is the refference : ", moveDivRef.current);
  // }, []);

  // you need to specifie numbers of element inside data.cars array lenght
  // then use it to make limit of pagination ;

  // first declare the variable contain the number of pagination :
  const [numberPagination, setNumberPagination] = useState(0);

  // set container cheak the slider case :
  const [indexSlider, setIndexSlider] = useState(1);

  // arrayFromIndex :
  const [arrayFromIndex, setArrayFromIndex] = useState([]);

  // extract the limit from the data.cars.length
  useEffect(() => {
    // set the numberPaginaation to the new value :
    setNumberPagination(data?.cars?.length / 2); // i devide /2 because each slice of the slider have 2 items
    // console.log("this is the length : ", data?.cars?.length);
  }, [data]);

  //  test the numberPagination value :
  useEffect(() => {
    // log the numberPagination  :
    console.log("test lenght value ", numberPagination);
  }, [numberPagination]);

  // extract the arrayFromIndex array :
  useEffect(() => {
    setArrayFromIndex(
      Array.from({ length: numberPagination }, (_, index) => index + 1)
    );
  }, [numberPagination]);

  useEffect(() => {
    console.log(
      "-------------------------- arrayIndexFrom",
      arrayFromIndex,
      numberPagination
    );
  }, [arrayFromIndex]);

  // // declare the array of array's
  // const [arrayOfArrays, setArrayOfArrays] = useState([]);
  // // arrayOfArrays :
  // useEffect(() => {
  //   setArrayOfArrays(
  //     Array.from(
  //       { length: Math.ceil(numberPagination / 5) },
  //       (_, index) => (index + 1) * 5 // this 5 is the max slide span can show in the same time
  //     )
  //   );
  // }, [arrayFromIndex]);

  // console.log("###############################");
  // console.log("test math equation : ", arrayOfArrays);
  // console.log("###############################");

  // console.log("the value of the arrayFromIndex is :  ", arrayFromIndex);

  return (
    <main className=" bg-yellow-300 min-h-100vh  m-1 py-16   ">
      {" "}
      {/* this section have the container of the items */}
      <section
        className="container m-auto  flex bg-slate-500  relative h-500px overflow-hidden "
        style={{ width: "830px" }}
      >
        {/* this is the inside div contain the move div with changing the left in css  */}
        <div
          className="moveDiv w-fit flex   absolute  "
          style={{
            left: "0%",
            top: "calc(50% - 200px - 16px)",
            padding: "10px",
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
      <section className="jsControllButtons flex justify-around items-center w-500px h-100px border border-red-300 m-auto mt-5 ">
        <button
          onClick={() =>
            handleRight(
              moveDivRef.current,
              numberPagination,
              indexSlider,
              setIndexSlider
            )
          }
          className={`buttonClick ${indexSlider == 1 ? "disableClass" : ""}`}
        >
          {" "}
          rightFun{" "}
        </button>
        <div className="containerOfIndex flex justify-center space-x-1 w-50%">
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

              console.log(
                "start , end  : ",
                start,
                end,
                "index slider : ",
                indexSlider,
                "current element : ",
                elem
              );

              if (
                elem >= start && // case elem = 10
                elem <= end
              ) {
                return (
                  <sapn
                    className={`flex justify-center items-center bg-blue-500 w-6 text-white border-black cursor-pointer ${
                      indexSlider == elem ? "activeSpan" : ""
                    }`}
                    onClick={() => {
                      if (elem > indexSlider) {
                        // elem = 2 > indexSlider = 1
                        handleLeft(
                          moveDivRef.current,
                          numberPagination,
                          elem - 1,
                          setIndexSlider
                        );

                        console.log("#########################");
                        console.log(
                          "index slider : ",
                          indexSlider,
                          "current element : ",
                          elem
                        );
                        console.log("#########################");
                      } else if (elem < indexSlider) {
                        console.log("elem < index Slider ******************");

                        console.log("#########################");
                        console.log(
                          "index slider : ",
                          elem,
                          "current element : ",
                          elem
                        );
                        console.log("#########################");

                        handleRight(
                          moveDivRef.current,
                          numberPagination,
                          elem + 1,
                          setIndexSlider
                        );
                      }

                      // console.log(
                      //   "Hello from the click function span",
                      //   elem,
                      //   indexSlider
                      // );
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
          {arrayFromIndex.length > 5 && indexSlider < arrayFromIndex.length ? (
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
              setIndexSlider
            )
          }
          className={`buttonClick ${
            indexSlider == arrayFromIndex.length ? "disableClass" : ""
          }`}
        >
          {" "}
          leftFun{" "}
        </button>
      </section>
    </main>
  );
}
