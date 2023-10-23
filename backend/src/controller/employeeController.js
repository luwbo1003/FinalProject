const { getDatabase } = require("firebase-admin/database");


const getAllEmployees = async (req, res, firebaseApp) => {
    const db = getDatabase();
    try {
        const snapshot = await db.ref("Employee").once("value");
        const data = snapshot.val();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching forms:", error);
        res.status(500).json({ error: "An error occurred" });
        throw error;
    }
};

const getEmployeeById = async (req, res, firebaseApp) => {
    const db = getDatabase();
    const employeeId = req.params.employeeId;

    try {
        const snapshot = await db.ref(`Employee/${employeeId}`).once("value");
        const data = snapshot.val();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching forms:", error);
        res.status(500).json({ error: "An error occurred" });
        throw error;
    }
};

// const addEmployee = async (req, res, firebaseApp) => {
//     const db = getDatabase();
//     try {
//         await db.ref("Employee").child("em_ID8").set({ name: "Lisa", age:20 });
//         res.status(200).json({ message: "added successfully" });
//     } catch (error) {
//         console.error("Error adding Test ref:", error);
//         res.status(500).json({ error: "An error occurred while adding" });
//         throw error;
//     }
// };

const createEmployee = async (req, res, firebaseApp) => {
    const db = getDatabase();
    const { id, name, age } = req.body;

    try {
        // Kiểm tra xem các trường cần thiết đã được cung cấp
        if (!id || !name || !age) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Sử dụng em_id từ yêu cầu để đặt đường dẫn đến nhân viên trong database
        const employeeRef = db.ref("Employee").child(id);

        // Tạo một nhân viên mới với các trường từ yêu cầu
        const newEmployee = {
            name: name,
            age: age,
        };

        // Đặt thông tin nhân viên mới vào Firebase Realtime Database
        await employeeRef.set(newEmployee);

        res.status(200).json({ message: "Employee added successfully" });
    } catch (error) {
        console.error("Error adding employee:", error);
        res.status(500).json({ error: "An error occurred while adding employee" });
        throw error;
    }
};


module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
};