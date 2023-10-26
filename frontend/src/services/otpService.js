import axios from "axios";
import api from "../config/api";
const apiUrl = api.apiUrl;

export const sendVerification = async (phoneNumber) => {
  try {
    const response = await axios.post(`${apiUrl}/generateOTP`, phoneNumber);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const confirmCode = async (phoneNumber, otpCode) => {
  try {
    const response = await axios.post(
      `${apiUrl}/verifyOTP`,
      phoneNumber,
      otpCode
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const setSession = async (sessionId, userId, phoneNumber) => {
  try {
    const response = await axios.post(
      `${apiUrl}/setSession`,
      sessionId,
      userId,
      phoneNumber
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
