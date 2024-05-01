// export const handleLeft = (elem) => {
//   console.log("Hello from the handleLeft function ", elem);

//   // move it to left (-..px  from the left , must be 1 item width )
//   elem.style.left = `${elem.style.left - 100}px`;

//   console.log(elem.style.left);
// };

// export const handleRight = (elem) => {
//   console.log("Hello from the handleRight function ", elem);

//   // move it to the right (+left )
//   elem.style.left = `${elem.style.left + 100}px`;
// };

export const handleLeft = (elem) => {
  console.log("Hello from the handleLeft function ", elem);

  // Get the current left value
  const currentLeft = parseFloat(window.getComputedStyle(elem).left);
  const currentWidth = parseFloat(window.getComputedStyle(elem).width);
  const widthParent = 900;

  // Update the left value
  elem.style.left = `${currentLeft - 820}px`;

  console.log(
    currentLeft,
    currentWidth,
    widthParent,
    "value is : ",
    currentWidth - 900
  );
};

export const handleRight = (elem) => {
  console.log("Hello from the handleRight function ", elem);

  // Get the current left value
  const currentLeft = parseFloat(window.getComputedStyle(elem).left);
  const currentWidth = parseFloat(window.getComputedStyle(elem).width);
  const widthParent = 900;

  // Update the left value
  elem.style.left = `${currentLeft + 820}px`;
  console.log(
    currentLeft,
    currentWidth,
    widthParent,
    "value is : ",
    currentWidth - 900
  );
};
