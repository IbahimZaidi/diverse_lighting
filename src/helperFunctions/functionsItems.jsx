// function handle the left -

export const handleRight = (elem, numberPagination, index, setIndexSlider) => {
  // console.log("Hello from the handleLeft function ", elem);

  // test the index :
  console.log(
    "hello from the index in function handleRight value _______________________ : ",
    index
  );

  if (index >= 2) {
    // mean the index must >= 2
    // Update the left value
    elem.style.left = `${-820 * (index - 2)}px`; // -2 : -1 add by Left function (becaue the right function have condtion >=2 , mean don't work untill you have index > 1 , mean must enter the function of right first ) , and -1 for move the container other -820px to the right
    // mean the -2 , -1 to be in the current left of the moveDiv , and other -1 to move it -820px
    setIndexSlider(() => {
      return index - 1;
    });
  }

  console.log("from Right function , the current left : ", elem.style.left);
};

// function handle the left +
export const handleLeft = (elem, numberPagination, index, setIndexSlider) => {
  // console.log("Hello from the handleRight function ", elem);

  console.log(
    "hello from the index in function handleLeft value _______________________ : ",
    index
  );
  if (index <= numberPagination) {
    // Update the left value
    elem.style.left = `${-820 * index}px`;

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
  console.log("from Left function , the current left : ", elem.style.left);
};
