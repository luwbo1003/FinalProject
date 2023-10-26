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
    const snapshot = await db
      .ref("MedicineCalendar")
      .child(`userId/${notificationId}`)
      .once("value");
    const data = snapshot.val();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred" });
    throw error;
  }
};
// const createNotification = async (req, res, firebaseApp) => {
//     // const db = getDatabase();
//     // const { name, quantity,  hours, minutes, dateStart, dateEnd} = req.body;
//     // try {
//     //     const notiRef = db.ref("MedicineCalendar").child("userId").child("MCId2");
//     //     const medListRef = notiRef.child("MedicineList");
//     //     const medTimetRef = notiRef.child("Time");
//     //     const newMedicPick = {
//     //         "idMed_1":{
//     //             name: name,
//     //             quantity: quantity,
//     //         }
//     //     }
//     //     const newTimePick = {
//     //         "idTime_1":{
//     //             hour: hours,
//     //             min: minutes,
//     //         }
//     //     }
//     //
//     //     const newDatePick = {
//     //         DateStart: dateStart,
//     //         DateEnd: dateEnd,
//     //         Everyday: "false",
//     //         MCName: "Toa thuoc 2",
//     //     };
//     //
//     //     // Đặt thông tin nhân viên mới vào Firebase Realtime Database
//     //     // await employeeRef.set(newEmployee);
//     //
//     //     await notiRef.set(newDatePick);
//     //     await medListRef.set(newMedicPick);
//     //     await medTimetRef.set(newTimePick);
//     //
//     //     res.status(200).json({ message: "Notification picker added successfully" });
//     // } catch (error) {
//     //     console.error("Error adding notification picker:", error);
//     //     res.status(500).json({ error: "An error occurred while adding notifications" });
//     //     throw error;
//     // }

//     const db = getDatabase();
//     const { name, quantity, dateStart, dateEnd} = req.body;
//     const { hours, minutes} = req.body;
//     try {
//         const userRef = db.ref("MedicineCalendar").child("userId");
//         // Lấy dữ liệu hiện tại
//         await userRef.once("value", async (snapshot) => {
//             if (snapshot.exists()) {
//                 // Lấy danh sách các child node
//                 const children = snapshot.val();
//                 // Tìm child node cuối cùng với key có định dạng MCId
//                 let maxIndex = 1;
//                 for (const key in children) {
//                     if (key.startsWith("MCId")) {
//                         const index = parseInt(key.slice(4)); // Lấy số sau "MCId"
//                         if (!isNaN(index) && index > maxIndex) {
//                             maxIndex = index;
//                         }
//                     }
//                 }

//                 // Tạo key mới
//                 const newKey = `MCId${maxIndex + 1}`;

//                 // Thay đổi notiRef để sử dụng key mới
//                 const notiRef = userRef.child(newKey);
//                 const medListRef = notiRef.child("MedicineList");
//                 const medTimetRef = notiRef.child("Time");

//                 const newMedicPick = {
//                     "idMed": {
//                         name: name,
//                         quantity: quantity,
//                     }
//                 };
//                 const newTimePick = {
//                     "idTime": {
//                         hour: hours,
//                         min: minutes,
//                     }
//                 };
//                 const newDatePick = {
//                     DateStart: dateStart,
//                     DateEnd: dateEnd,
//                     Everyday: "false",
//                     MCName: "Toa thuoc",
//                 };

//                 // Đặt thông tin vào Firebase Realtime Database
//                 await notiRef.set(newDatePick);
//                 await medListRef.set(newMedicPick);
//                 await medTimetRef.set(newTimePick);

//                 res.status(200).json({message: "Notification picker added successfully"});
//             } else {
//                 console.log("Nút người dùng không tồn tại.");
//                 res.status(404).json({error: "User node not found"});
//             }
//         });
//     } catch (error) {
//         console.error("Error adding notification picker:", error);
//         res.status(500).json({ error: "An error occurred while adding notifications" });
//         throw error;
//     }

// };

// const times = [
//   { hour: "12", min: "00" },
//   { hour: "12", min: "00" },
// ];
// const medicines = [
//     { name: "medincine name", quantiy: "01" },
//     { name: "medincine name", quantiy: "01" },
//   ];
// const dateStart = "22/10/2023";
// const dateEnd = "25/10/2023";
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
  const { MCName, dateStart, dateEnd } = req.body;
  const { medicines, times } = req.body;
  try {
    const userRef = db.ref("MedicineCalendar").child("userId");
    // Lấy dữ liệu hiện tại
    await userRef.once("value", async (snapshot) => {
      if (snapshot.exists()) {
        // Lấy danh sách các child node
        const children = snapshot.val();
        // Tìm child node cuối cùng với key có định dạng MCId
        let maxIndex = 1;
        for (const key in children) {
          if (key.startsWith("MCId")) {
            const index = parseInt(key.slice(4)); // Lấy số sau "MCId"
            if (!isNaN(index) && index > maxIndex) {
              maxIndex = index;
            }
          }
        }

        // Tạo key mới
        const newKey = `MCId${maxIndex + 1}`;

        // Thay đổi notiRef để sử dụng key mới
        const notiRef = userRef.child(newKey);
        const medListRef = notiRef.child("MedicineList");
        const medTimetRef = notiRef.child("Time");

        // const newMedicPick = {
        //   idMed: {
        //     name: name,
        //     quantity: quantity,
        //   },
        // };
        const newDatePick = {
          DateStart: dateStart,
          DateEnd: dateEnd,
          Everyday: "false",
          MCName: MCName,
        };

        // Đặt thông tin vào Firebase Realtime Database
        await notiRef.set(newDatePick);
        await medListRef.set(medicines);
        await medTimetRef.set(times);

        res
          .status(200)
          .json({ message: "Notification picker added successfully" });
      } else {
        console.log("Nút người dùng không tồn tại.");
        res.status(404).json({ error: "User node not found" });
      }
    });
  } catch (error) {
    console.error("Error adding notification picker:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding notifications" });
    throw error;
  }
};
// const times = [
//   { hour: "12", min: "00" },
//   { hour: "12", min: "00" },
// ];

const PushTime = async (req, res, firebaseApp) => {
  const db = getDatabase();
  const times = req.body;
  console.log(typeof times);
  try {
    // Check if the times array is empty
    if (!times || times.length === 0) {
      return res.status(400).json({ error: "Missing required times array" });
    }
    await db.ref("MedicineCalendar/userId/MCId3").update({ times });
    // await db.ref("Test_time").update(times);
  } catch (error) {
    console.error("Error pushing times:", error);
    res.status(500).json({ error: "An error occurred while pushing times" });
    throw error;
  }
};
const addNotificationPicker = async (req, res, firebaseApp) => {
  const db = getDatabase();
  let MCId = 1,
    idMed,
    idTime;

  try {
    const notiRefTest = db
      .ref("MedicineCalendar")
      .child("userId")
      .child("MCId1");
    const medListRefTest = notiRefTest.child("MedicineList");
    const medTimetRefTest = notiRefTest.child("Time");
    console.log(notiRefTest.toString());
    const newMedicPickTest = {
      idMed: {
        name: "Panadol",
        quantity: "2",
      },
    };
    const newTimePickTest = {
      idTime: {
        hour: "2",
        min: "23",
      },
    };
    const newDatePickTest = {
      DateStart: "27/04/2023",
      DateEnd: "29/04/2023",
      Everyday: "true",
      MCName: "Don thuoc 1",
    };

    await notiRefTest.set(newDatePickTest);
    await medListRefTest.set(newMedicPickTest);
    await medTimetRefTest.set(newTimePickTest);
    res.status(200).json({ message: "added successfully" });
  } catch (error) {
    console.error("Error adding Test ref:", error);
    res.status(500).json({ error: "An error occurred while adding" });
    throw error;
  }
};

module.exports = {
  createNotification,
  addNotificationPicker,
  getAllNotifications,
  getNotificationById,
  PushTime,
};
