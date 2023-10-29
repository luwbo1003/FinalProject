const { getDatabase, ref, child, get } = require("firebase-admin/database");

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
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred" });
    throw error;
  }
};

module.exports = {
  getAllPills,
  getPillByUserID,
};
