import api from "../config/api";

const apiUrl = api.apiUrl;

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${apiUrl}/users`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
