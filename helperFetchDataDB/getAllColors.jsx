export const getAllColors = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/allColors`);
  const result = await response.json();

  return result.colors;
};
