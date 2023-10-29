const { getDatabase } = require("firebase-admin/database");

const getAllPills = async (req, res, firebaseApp) => {
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

const getPillByUserID = async (req, res, firebaseApp) => {
  const db = getDatabase();
  const userId = req.params.userId;
  try {
    const snapshot = await db.ref(`MedicineCalendar/${userId}`).once("value");
    const data = snapshot.val();

    const dt = [];
    for (const k in data) {
      const child_data = data[k];
      for (const time in child_data.Time) {
        dt.push({
          id: k,
          MCName: data[k].MCName,
          hour: child_data.Time[time].hour,
          min: child_data.Time[time].min,
        });
      }
    }
    res.status(200).json(dt);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred" });
    throw error;
  }
};

const getMedicineListByUserID = async (req, res, firebaseApp) => {
  const db = getDatabase();
  const userId = req.params.userId;

  try {
    const snapshot = await db.ref(`MedicineCalendar/${userId}`).once("value");
    const data = snapshot.val();

    const medicineList = [];
    for (const medicineId in data) {
      const medicine = data[medicineId];
      medicineList.push({
        id: medicineId,
        name: medicine.name,
        quantity: medicine.quantity,
      });
    }

    res.status(200).json(medicineList);
  } catch (error) {
    console.error("Error fetching medicine list:", error);
    res.status(500).json({ error: "An error occurred" });
    throw error;
  }
};

module.exports = {
  getAllPills,
  getPillByUserID,
  getMedicineListByUserID,
};
