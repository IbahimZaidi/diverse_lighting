export const getItems = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/items`);
  const result = await response.json();

  return result.items;
};
