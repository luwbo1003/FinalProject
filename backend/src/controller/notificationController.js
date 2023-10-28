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
// const MCName = "Test";
// const times = [
//   { hour: "12", min: "00" },
//   { hour: "12", min: "00" },
// ];
// const medicines = [
//   { name: "medincine name", quantiy: "01" },
//   { name: "medincine name", quantiy: "01" },
// ];
// const dateStart = "22/10/2023";
// const dateEnd = "25/10/2023";
// const uid = "47010663-66e9-42e0-a057-0d9006ff7fd9";

const createNotification = async (req, res, firebaseApp) => {
  const db = getDatabase();
  const { uid, MCName, dateStart, dateEnd, medicines, times, everday } = req.body;
  const uidRef = db.ref("MedicineCalendar").child(uid);
  let maxIndex = 0;
  
  try {
    const userRef = db.ref("MedicineCalendar");
    await userRef.once("value", async (snapshot) => {
      if (snapshot.exists()) {
        const children = snapshot.val();
        for (const key in children) {
          if (key === uid) { 
            const MCId_child = children[key];
            for (const k in MCId_child) {
              maxIndex += 1; 
            }
            const newKey = `MCId${maxIndex + 1}`;
            const notiRef = uidRef.child(newKey);
            const medListRef = notiRef.child("MedicineList");
            const medTimetRef = notiRef.child("Time");
            const newDatePick = {
              DateStart: dateStart,
              DateEnd: dateEnd, 
              Everyday: everday,
              MCName: MCName,
            }; 
            await notiRef.set(newDatePick);
            await medListRef.set(medicines);
            await medTimetRef.set(times);
            return;
          } else {
            const notiRef = uidRef.child("MCId1");
            const medListRef = notiRef.child("MedicineList");
            const medTimetRef = notiRef.child("Time");
            const newDatePick = {
              DateStart: dateStart,
              DateEnd: dateEnd, 
              Everyday: everday,
              MCName: MCName,
            };
            await notiRef.set(newDatePick);
            await medListRef.set(medicines);
            await medTimetRef.set(times);
            return;
          }
        }
      } else {
        const notiRef = uidRef.child("MCId1");
        const medListRef = notiRef.child("MedicineList");
        const medTimetRef = notiRef.child("Time");
        const newDatePick = {
          DateStart: dateStart,
          DateEnd: dateEnd,
          Everyday: everday,
          MCName: MCName,
        };
        await notiRef.set(newDatePick);
        await medListRef.set(medicines);
        await medTimetRef.set(times);
      }
    });
    res.status(200).json({ message: "Notification picker added successfully" });
  } catch (error) {
    console.error("Error adding notification picker:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding notifications" });
    throw error;
  }
};

const createNotification_ = async (req, res, firebaseApp) => {
  const db = getDatabase();
  const { uid, MCName, dateStart, dateEnd } = req.body;
  const { medicines, times } = req.body;
  try {
    const userRef = db.ref("MedicineCalendar").child("userId");
    await userRef.once("value", async (snapshot) => {
      if (snapshot.exists()) {
        const children = snapshot.val();
        let maxIndex = 1;
        for (const key in children) {
          if (key.startsWith("MCId")) {
            const index = parseInt(key.slice(4)); 
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

        const newDatePick = {
          DateStart: dateStart,
          DateEnd: dateEnd,
          Everyday: everday,
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
};
