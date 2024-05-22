export const getRowsColorsMapping = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/all_color_mapping`
  );
  const result = await response.json();

  return result.colorsMapping;
};
