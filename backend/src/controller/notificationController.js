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

const createNotification = async (req, res) => {
  const db = getDatabase();
  const { uid, MCName, dateStart, dateEnd, medicines, times, everday } =
    req.body;
  const uidRef = db.ref("MedicineCalendar").child(uid);
  let maxIndex = 0;
  let check = false;

  try {
    const userRef = db.ref("MedicineCalendar");
    await userRef.once("value", async (snapshot) => {
      if (snapshot.exists()) {
        const children = snapshot.val();
        for (const key in children) {
          if (key === uid) {
            check = true;
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
            break;
          }
        }
        if (!check) {
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

module.exports = {
  createNotification,
  getAllNotifications,
  getNotificationById,
};
