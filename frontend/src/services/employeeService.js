import api from "../config/api";
import axios from "axios";
import Employee from "../model/employee.model";

const apiUrl = api.apiUrl;

export const getAllEmployees = async () => {
    // try {
    //     const response = await fetch(`${apiUrl}/employees`);
    //     return await response.json();
    // } catch (error) {
    //     console.error("Error fetching users:", error);
    //     throw error;
    // }
    try {
        const response = await axios.get(`${apiUrl}/employees`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const getEmployeesById = async (employeeId) => {
    try {
        const response = await axios.get(`${apiUrl}/employees/${employeeId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching with userID ${employeeId}:`, error);
        throw error;
    }
};

export const createEmployee = async (employeeData) => {
    try {
        const response = await axios.post(`${apiUrl}/employees/create`, employeeData);
        // Xử lý phản hồi và tạo một đối tượng Employee từ dữ liệu phản hồi
        return new Employee(response.data.id, response.data.name, response.data.age);
    } catch (error) {
        console.error("Error creating employee:", error);
        throw error;
    }
};
