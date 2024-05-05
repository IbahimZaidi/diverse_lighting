export const getItemsColorsId = async (id) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/items/${id}`
  );
  const result = await response.json();

  return result.colors;
};
