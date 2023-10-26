import api from "../config/api";
import axios from "axios";
import Times from "../model/Time";
const apiUrl = api.apiUrl;

export const PushTime = async (times) => {
  try {
    const response = await axios.post(`${apiUrl}/test`, times);
  } catch (error) {
    console.error("Fail:", error);
    throw error;
  }
};
