const { getDatabase } = require("firebase-admin/database");


const getAllNotifications = async (req, res, firebaseApp) => {
    const db = getDatabase();
    try {
        const snapshot = await db.ref("MedicineCalendar").once("value");
        const data = snapshot.val();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching forms:", error);
        res.status(500).json({ error: "An error occurred" });
        throw error;
    }
};

const getNotificationById = async (req, res, firebaseApp) => {
    const db = getDatabase();
    const notificationId = req.params.notificationId;
    try {
        const snapshot = await db.ref("MedicineCalendar").child(`userId/${notificationId}`).once("value");
        const data = snapshot.val();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching forms:", error);
        res.status(500).json({ error: "An error occurred" });
        throw error;
    }
};
const createNotification = async (req, res, firebaseApp) => {
    // const db = getDatabase();
    // const { name, quantity,  hours, minutes, dateStart, dateEnd} = req.body;
    // try {
    //     const notiRef = db.ref("MedicineCalendar").child("userId").child("MCId2");
    //     const medListRef = notiRef.child("MedicineList");
    //     const medTimetRef = notiRef.child("Time");
    //     const newMedicPick = {
    //         "idMed_1":{
    //             name: name,
    //             quantity: quantity,
    //         }
    //     }
    //     const newTimePick = {
    //         "idTime_1":{
    //             hour: hours,
    //             min: minutes,
    //         }
    //     }
    //
    //     const newDatePick = {
    //         DateStart: dateStart,
    //         DateEnd: dateEnd,
    //         Everyday: "false",
    //         MCName: "Toa thuoc 2",
    //     };
    //
    //     // Đặt thông tin nhân viên mới vào Firebase Realtime Database
    //     // await employeeRef.set(newEmployee);
    //
    //     await notiRef.set(newDatePick);
    //     await medListRef.set(newMedicPick);
    //     await medTimetRef.set(newTimePick);
    //
    //     res.status(200).json({ message: "Notification picker added successfully" });
    // } catch (error) {
    //     console.error("Error adding notification picker:", error);
    //     res.status(500).json({ error: "An error occurred while adding notifications" });
    //     throw error;
    // }
    const db = getDatabase();
    const { name, quantity,  hours, minutes, dateStart, dateEnd} = req.body;
    try {
        const userRef = db.ref("MedicineCalendar").child("userId");
        await userRef.once("value", async (snapshot) => {
            if (snapshot.exists()) {
                // Lấy danh sách các child node
                const children = snapshot.val();
                let maxIndex = 1;
                for (const key in children) {
                    if (key.startsWith("MCId")) {
                        const index = parseInt(key.slice(4)); // Lấy số sau "MCId"
                        if (!isNaN(index) && index > maxIndex) {
                            maxIndex = index;
                        }
                    }
                }
                const newKey = `MCId${maxIndex + 1}`;
                const notiRef = userRef.child(newKey);
                const medListRef = notiRef.child("MedicineList");
                const medTimetRef = notiRef.child("Time");
                const newMedicPick = {
                    "idMed": {
                        name: name,
                        quantity: quantity,
                    }
                };
                const newTimePick = {
                    "idTime": {
                        hour: hours,
                        min: minutes,
                    }
                };
                const newDatePick = {
                    DateStart: dateStart,
                    DateEnd: dateEnd,
                    Everyday: "false",
                    MCName: "Toa thuoc",
                };
                await notiRef.set(newDatePick);
                await medListRef.set(newMedicPick);
                await medTimetRef.set(newTimePick);
                res.status(200).json({message: "Notification picker added successfully"});
            } else {
                console.log("Nút người dùng không tồn tại.");
                res.status(404).json({error: "User node not found"});
            }
        });
    } catch (error) {
        console.error("Error adding notification picker:", error);
        res.status(500).json({ error: "An error occurred while adding notifications" });
        throw error;
    }
};

// const addNotificationPicker = async (req, res, firebaseApp) => {
//     const db = getDatabase();
//     let MCId = 1, idMed, idTime;
//
//     try {
//         const notiRefTest = db.ref("MedicineCalendar").child("userId").child("MCId1");
//         const medListRefTest = notiRefTest.child("MedicineList");
//         const medTimetRefTest = notiRefTest.child("Time");
//         console.log(notiRefTest.toString())
//         const newMedicPickTest = {
//             idMed:{
//                 name: "Panadol",
//                 quantity: "2",
//             }
//         }
//         const newTimePickTest = {
//             idTime:{
//                 hour: "2",
//                 min: "23",
//             }
//         }
//         const newDatePickTest = {
//             DateStart: "27/04/2023",
//             DateEnd: "29/04/2023",
//             Everyday: "true",
//             MCName: "Don thuoc 1",
//         };
//
//         await notiRefTest.set(newDatePickTest);
//         await medListRefTest.set(newMedicPickTest);
//         await medTimetRefTest.set(newTimePickTest);
//         res.status(200).json({ message: "added successfully" });
//
//     } catch (error) {
//         console.error("Error adding Test ref:", error);
//         res.status(500).json({ error: "An error occurred while adding" });
//         throw error;
//     }
// };

module.exports = {
    createNotification,
    addNotificationPicker,
    getAllNotifications,
    getNotificationById
};