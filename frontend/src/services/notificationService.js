import api from "../config/api";
import axios from "axios";
import Notification from "../model/notification.model";

const apiUrl = api.apiUrl;

export const getAllNotification = async () => {
    try {
        const response = await axios.get(`${apiUrl}/notifications`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const getNotificationById = async (notificationId) => {
    try {
        const response = await axios.get(`${apiUrl}/notifications/${notificationId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching with userID ${notificationId}:`, error);
        throw error;
    }
};

// export const createNotification = async (notificationData) => {
//     try {
//         const response = await axios.post(`${apiUrl}/notifications/create`, notificationData, times);
//         // Xử lý phản hồi và tạo một đối tượng Employee từ dữ liệu phản hồi
//         return new Notification(response.data.name, response.data.quantity, response.data.hours, response.data.minutes, response.data.dateStart, response.data.dateEnd);
//     } catch (error) {
//         console.error("Error creating notification:", error);
//         throw error;
//     }
// };
export const createNotification = async (notificationData) => {
    try {
        const response = await axios.post(`${apiUrl}/notifications/create`, notificationData);
        // Xử lý phản hồi và tạo một đối tượng Employee từ dữ liệu phản hồi
        return new Notification(response.data.MCName, response.data.medicines, response.data.times, response.data.dateStart, response.data.dateEnd);
    } catch (error) {
        console.error("Error creating notification:", error);
        throw error;
    }
};