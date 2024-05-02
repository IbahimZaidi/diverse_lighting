// function handle the left -

export const handleRight = (
  elem,
  numberPagination,
  index,
  setIndexSlider,
  valueOfLeft
) => {
  // console.log("Hello from the handleLeft function ", elem);

  // test the index :
  // console.log(
  //   "hello from the index in function handleRight value _______________________ : ",
  //   index
  // );

  if (index >= 2) {
    // mean the index must >= 2
    // Update the left value
    if (valueOfLeft == 1) {
      elem.style.left = `${-325 * (index - 2)}px`;
    } else if (valueOfLeft == 2) {
      elem.style.left = `${-830 * (index - 2)}px`;
    } else {
      elem.style.left = `${-1230 * (index - 2)}px`;
    } // -2 : -1 add by Left function (becaue the right function have condtion >=2 , mean don't work untill you have index > 1 , mean must enter the function of right first ) , and -1 for move the container other -820px to the right
    // mean the -2 , -1 to be in the current left of the moveDiv , and other -1 to move it -820px
    setIndexSlider(() => {
      return index - 1;
    });
  }

  // console.log("from Right function , the current left : ", elem.style.left);
};

// function handle the left +
export const handleLeft = (
  elem,
  numberPagination,
  index,
  setIndexSlider,
  valueOfLeft
) => {
  // console.log("Hello from the handleRight function ", elem);

  // console.log(
  //   "hello from the index in function handleLeft value _______________________ : ",
  //   index
  // );
  if (index < numberPagination) {
    // Update the left value
    if (valueOfLeft == 1) {
      elem.style.left = `${-325 * index}px`;
    } else if (valueOfLeft == 2) {
      elem.style.left = `${-820 * index}px`;
    } else {
      elem.style.left = `${-1230 * index}px`;
    }
    // console.log(
    //   "cheak value of index : ",
    //   index,
    //   " , new left :  ",
    //   820 * (index - 1)
    // );

    setIndexSlider(() => {
      return index + 1;
    });
  }

  // console.log(
  //   "hello from the index in function handlLeft value : ",
  //   index,
  //   "and this the max : ",
  //   numberPagination
  // );
  // console.log("from Left function , the current left : ", elem.style.left);
};

// function cheak the current Width change

export const cheakWidthChangeCurrentWidthNumber = (setNumberWidth) => {
  // cheak value of width and change the currentWidthNumber
  const currentWidthPage = window.innerWidth;

  if (currentWidthPage <= 1024) {
    setNumberWidth(() => {
      return 1;
    });
  } else if (currentWidthPage > 1024 && currentWidthPage <= 1536) {
    setNumberWidth(() => {
      return 2;
    });
  } else {
    setNumberWidth(() => {
      return 3;
    });
  }
};

//

// a function for fix the width when the indexSlider changed :
export const changeLeftMovDiv = (
  indexSliderVal,
  numberWidth,
  setIndexSlider
) => {
  // cheak the index Slider :
  if (indexSliderVal != 1) {
    // != 1 to avoid the default case on refresh , and the case 1 will not be differente at any value of numberWidth (1,2,3)

    if (numberWidth == 1) {
      console.log("hello from the number widht == 1 from the changeLeftMovDiv");
      setIndexSlider((prev) => {
        const newValue = prev * 2 - 1;

        // console.log(
        //   "Hello from the change to 1 from 2 , this is saveOld3 : ",
        //   saveOld3,
        //   " , and this is the new value of the indexSlider :  ",
        //   newValue,
        //   "and this is the value of the number Width : ",
        //   numberWidth
        // );

        // set the setSaveOld3 back to null
        return newValue;
      });
      // change the left of the mouvement Div
    } else if (numberWidth == 2) {
      //
      setIndexSlider((prev) => {
        const newValue = Math.floor((prev * 3) / 2);

        // cheak if the prev == 3 and update the :

        return newValue;
      });
      // change the left of the mouvement Div
    }
  }
};

// // function not changing the indexSlider and run every time indexSlider change with useEffect :
// export const changeIndexSliderTracker = (
//   indexSliderVal,
//   numberWidth,
//   divMov
// ) => {
//   // we need to cheak to go forwad or backword ??
//   divMov && divMov?.elem
//     ? (window.getComputedStyle(divMov).left = `${-325 * indexSliderVal}px`)
//     : "";

//   if (indexSliderVal == 18) {
//     console.log(
//       "####################################### this is the value of the left current  ",
//       window.getComputedStyle(divMov).left,
//       " and this is the math calculation : ",
//       -325 * indexSliderVal
//     );
//     // divMov && divMov?.elem ? (divMov.elem.style.left = `${-325}px`) : "";
//     // value of new left :
//   }
// };

export const changeIndexSliderTracker = (
  divMovRef,
  numberPagination,
  index,
  setIndexSlider,
  valueOfLeft // Change parameter name to divMovRef to reflect that it's a ref
) => {
  // Check if divMovRef and divMovRef.current are both defined
  // if (divMovRef && divMovRef.elem) {
  // handleLeft(divMovRef, numberPagination, index, setIndexSlider, valueOfLeft);

  if (index < numberPagination) {
    // Update the left value
    if (valueOfLeft == 1) {
      divMovRef.style.left = `${-325 * (index - 1)}px`;
    } else if (valueOfLeft == 2) {
      divMovRef.style.left = `${-820 * (index - 1)}px`;
    } else {
      divMovRef.style.left = `${-1230 * (index - 1)}px`;
    }

    console.log(
      "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% indexSlider ",
      index,
      " numberPagination : ",
      numberPagination,
      " number width : ",
      valueOfLeft
    );
  }
  // }
};

// function change the history Array when the numberWidth change :

export const historyNubmerWidth = (
  setHistoryPrevNumberWidth,
  historyNubmerWidth,
  numberWidth
) => {
  if (numberWidth) {
    setHistoryPrevNumberWidth((prev) => {
      if (prev != numberWidth) {
        //
        return [...prev, numberWidth];
      } else {
        return prev;
      }
    });
  }
};
