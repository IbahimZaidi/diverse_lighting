// the delete function
export const deleteFunction = async (theId) => {
  try {
    // the id
    const res = await fetch(
      `http://localhost:3000/api/deleteItem?theId=${theId}`
    );

    // Check if the response is successful
    if (!res.ok) {
      throw new Error("Failed to delete item");
    }

    window.location.reload();
    // Optionally, you can perform additional actions after successful deletion
    // For example, update the UI or fetch updated data
  } catch (error) {
    console.error("Error deleting item:", error);
    // Optionally, you can show an error message to the user
  }
};
