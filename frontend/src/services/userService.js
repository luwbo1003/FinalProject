import api from "../config/api";
const apiUrl = api.apiUrl;

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${apiUrl}/users`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
