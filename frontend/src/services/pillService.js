import api from "../config/api";
const apiUrl = api.apiUrl;

export const getAllPills = async () => {
  try {
    const response = await fetch(`${apiUrl}/getAllPills`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching pills:", error);
    throw error;
  }
};

export const getPillByUserID = async (userId) => {
  try {
    const response = await fetch(`${apiUrl}/getPillByUserID/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching pills:", error);
    throw error;
  }
};
