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

// a function change the indexSlider value when the nubmerWidth change (1,2,3)
export const changeLeftMovDiv = (
  indexSliderVal,
  numberWidth,
  setIndexSlider,
  historyPrevNumberWidth
) => {
  // cheak the index Slider :
  if (
    indexSliderVal != 1 &&
    historyPrevNumberWidth.length <= 2 // > 0 to avoid the first time
  ) {
    // != 1 to avoid the default case on refresh , and the case 1 will not be differente at any value of numberWidth (1,2,3)

    if (numberWidth == 1) {
      console.log("hello from the number widht == 1 from the changeLeftMovDiv");
      setIndexSlider((prev) => {
        // const newValue = prev * 2 - 1;

        // declare the container of the new value :
        let newValue;

        // get the prev last from the historyPrevNumberWidth :

        const prevLast =
          historyPrevNumberWidth[historyPrevNumberWidth.length - 2];
        if (historyPrevNumberWidth.length > 1) {
          if (prevLast == 2) {
            // in case we got from 2 screan to 1 screan :
            newValue = prev * 2; // the case of prev = 0 don't exist and the case of 1 is already don't process do to the if fist in this function
          }
        }

        console.log(
          "####################################### the number of current Width ",

          numberWidth,
          "and the previous number width : ",
          historyPrevNumberWidth,
          "indexSliderVal is change from    ",
          prev,
          " to :",
          newValue
        );

        // set the setSaveOld3 back to null
        return newValue;
      });
      // change the left of the mouvement Div
    } else if (numberWidth == 2) {
      //

      //
      setIndexSlider((prev) => {
        // const newValue = Math.floor((prev * 3) / 2);

        // declare the container of the new value :
        let newValue;

        // get the prev last from the historyPrevNumberWidth :

        const prevLast =
          historyPrevNumberWidth[historyPrevNumberWidth.length - 2];
        if (historyPrevNumberWidth.length > 1) {
          if (prevLast == 1) {
            // in case we got from 1 screan to 2 screan :

            newValue = Math.floor(prev / 2);
          }
          if (prevLast == 3) {
            // in case we got from 3 screan to 2 screan :
            // newValue = Math.floor((prev * 3) / 2);
            newValue = Math.floor((prev * 3) / 2);
          }
        }

        console.log(
          "####################################### the number of current Width ",
          numberWidth,
          "and the previous number width : ",
          historyPrevNumberWidth,
          "indexSliderVal is change from    ",
          prev,
          " to :",
          newValue
        );

        // set the setSaveOld3 back to null
        return newValue;
      });
      // change the left of the mouvement Div
    } else if (numberWidth == 3) {
      //
      setIndexSlider((prev) => {
        // const newValue = Math.floor((prev * 3) / 2);

        // declare the container of the new value :
        let newValue;

        // get the prev last from the historyPrevNumberWidth :

        const prevLast =
          historyPrevNumberWidth[historyPrevNumberWidth.length - 2];
        if (historyPrevNumberWidth.length > 1) {
          if (prevLast == 2) {
            // in case we got from 2 screan to 3 screan :
            newValue = Math.floor((prev * 2) / 3);
          }
        }

        console.log(
          "########################## the number of current Width ",
          numberWidth,
          "and the previous number width : ",
          historyPrevNumberWidth,
          "indexSliderVal is change from    ",
          prev,
          " to :",
          newValue
        );

        // set the setSaveOld3 back to null
        return newValue;
      });
      // change the left of the mouvement Div
    }
  }

  if (indexSliderVal == 1 && historyPrevNumberWidth.length == 2) {
    // mean come from 2 to 1

    if (numberWidth == 1) {
      setIndexSlider((prev) => {
        // const newValue = prev * 2 - 1;

        // declare the container of the new value :
        let newValue;

        // get the prev last from the historyPrevNumberWidth :

        const prevLast =
          historyPrevNumberWidth[historyPrevNumberWidth.length - 2];
        if (historyPrevNumberWidth.length > 1) {
          if (prevLast == 2) {
            // in case we got from 2 screan to 1 screan :
            newValue = prev * 2; // the case of prev = 0 don't exist and the case of 1 is already don't process do to the if fist in this function
          }
        }

        console.log(
          "####################################### the number of current Width ",

          numberWidth,
          "and the previous number width : ",
          historyPrevNumberWidth,
          "indexSliderVal is change from    ",
          prev,
          " to :",
          newValue
        );

        // set the setSaveOld3 back to null
        return newValue;
      });
      // change the left of the mouvement Div
    }
  }
};

//

// this function will run when the indexSlider changed :

export const changeIndexSliderTracker = (
  divMovRef,
  numberPagination,
  index,
  // setIndexSlider,
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

// slice only the 3 last elements :

export const sliceLast3Element = (
  historyPrevNumberWidth,
  setHistoryPrevNumberWidth
) => {
  const sliceArrayTes = historyPrevNumberWidth.slice(-2);
  setHistoryPrevNumberWidth(sliceArrayTes);
};

// use the history of numberWidth to move the mouvement div :
