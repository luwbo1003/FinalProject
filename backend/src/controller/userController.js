const { getDatabase } = require("firebase-admin/database");

const getAllUsers = async (req, res, firebaseApp) => {
  const db = getDatabase();
  try {
    const snapshot = await db.ref("User").once("value");
    const data = snapshot.val();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred" });
    throw error;
  }
};

const getUserById = async (req, res, firebaseApp) => {
  const db = getDatabase();
  const userId = req.params.userId;
  try {
    const snapshot = await db.ref(`User/${userId}`).once("value");
    const data = snapshot.val();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "An error occurred" });
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
};