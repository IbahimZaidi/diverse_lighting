export const insertNewItem = async (
  array_colors,
  exempleLikImage,
  model_name,
  all_colors,
  all_colors_mapping
) => {
  const arrayColorsString = encodeURIComponent(JSON.stringify(array_colors));
  const all_colorsString = encodeURIComponent(JSON.stringify(all_colors));
  const all_colors_mappingString = encodeURIComponent(
    JSON.stringify(all_colors_mapping)
  );

  const url = `http://localhost:3000/api/createItem?array_colors=${arrayColorsString}&all_colors_mappingString=${all_colors_mappingString}&all_colorsString=${all_colorsString}&exempleLikImage=${exempleLikImage}&model_name=${model_name}`;

  const resNew = await fetch(url);

  const result = await resNew.json();
  // after the fetching return result :
  return result;
};
