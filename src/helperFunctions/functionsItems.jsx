// function handle the left -

export const handleRight = (elem, numberPagination, index, changeIndex) => {
  // console.log("Hello from the handleLeft function ", elem);

  if (index < numberPagination) {
    // Update the left value
    elem.style.left = `${-820 * (index + 1)}px`;

    changeIndex((prev) => {
      return prev + 1;
    });
  }
  // test the index :
  // console.log("hello from the index in function handleLeft value : ", index);
};

// function handle the left +
export const handleLeft = (elem, numberPagination, index, changeIndex) => {
  // console.log("Hello from the handleRight function ", elem);

  if (index > 0) {
    // Update the left value
    elem.style.left = `${-820 * (index - 1)}px`;

    console.log(
      "cheak value of index : ",
      index,
      " , new left :  ",
      820 * (index - 1)
    );

    changeIndex((prev) => {
      return prev - 1;
    });
  }
  // console.log(
  //   "hello from the index in function handleRight value : ",
  //   index,
  //   "and this the max : ",
  //   numberPagination
  // );
};
