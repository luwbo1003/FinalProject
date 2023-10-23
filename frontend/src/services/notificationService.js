import api from "../config/api";
import axios from "axios";
import Notification from "../model/notification.model";

const apiUrl = api.apiUrl;

export const getAllEmployees = async () => {
    try {
        const response = await axios.get(`${apiUrl}/notifications`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const getEmployeesById = async (notificationId) => {
    try {
        const response = await axios.get(`${apiUrl}/notifications/${notificationId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching with userID ${notificationId}:`, error);
        throw error;
    }
};

export const createNotification = async (notificationData) => {
    try {
        const response = await axios.post(`${apiUrl}/notifications/create`, notificationData);
        // Xử lý phản hồi và tạo một đối tượng Employee từ dữ liệu phản hồi
        return new Notification(response.data.name, response.data.quantity, response.data.hour, response.data.minute, response.data.DateStart, response.data.DateEnd);
    } catch (error) {
        console.error("Error creating notification:", error);
        throw error;
    }
};