// handle testFunction testing the passing array to api route  :
export const updateIems = async (
  array_colors,
  old_array_colors,
  all_colors_array,
  exempleLikImage,
  model_name,
  currentId,
  array_color_id
) => {
  const arrayColorsString = encodeURIComponent(JSON.stringify(array_colors));
  const old_array_colorsString = encodeURIComponent(
    JSON.stringify(old_array_colors)
  );
  const all_colors_arrayString = encodeURIComponent(
    JSON.stringify(all_colors_array)
  );
  const url = `http://localhost:3000/api/testPassArray?array_colors=${arrayColorsString}&old_array_colorsString=${old_array_colorsString}&all_colors_arrayString=${all_colors_arrayString}&exempleLikImage=${exempleLikImage}&model_name=${model_name}&currentId=${currentId}&array_color_id=${array_color_id}`;

  const resNew = await fetch(url);

  const result = await resNew.json();
  // after the fetching return result :
  return result;
};
