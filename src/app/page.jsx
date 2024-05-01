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

  const [indexSlider, setIndexSlider] = useState(0);

  // extract the limit from the data.cars.length

  useEffect(() => {
    // set the numberPaginaation to the new value :
    setNumberPagination(data?.cars?.length / 2 - 1); // i devide /2 because each slice of the slider have 2 items
    console.log("this is the length : ", data?.cars?.length);
  }, [data]);

  //  test the numberPagination value :
  useEffect(() => {
    // log the numberPagination  :
    console.log("test lenght value ", numberPagination);
  }, [numberPagination]);

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
      <section className="jsControllButtons flex justify-around items-center w-300px h-100px border border-red-300 m-auto mt-5 ">
        <button
          onClick={() =>
            handleRight(
              moveDivRef.current,
              numberPagination,
              indexSlider,
              setIndexSlider
            )
          }
          className="buttonClick"
        >
          {" "}
          left{" "}
        </button>
        <button
          onClick={() =>
            handleLeft(
              moveDivRef.current,
              numberPagination,
              indexSlider,
              setIndexSlider
            )
          }
          className="buttonClick"
        >
          {" "}
          right{" "}
        </button>
      </section>
    </main>
  );
}
