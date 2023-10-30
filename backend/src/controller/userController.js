const { getDatabase } = require("firebase-admin/database");
const { v4: uuidv4 } = require("uuid");

const getAllUsers = async (req, res) => {
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

const getUserById = async (req, res) => {
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

const registerUser = async (req, res) => {
  const db = getDatabase();
  const userId = uuidv4();
  const newUser = req.body;
  try {
    const userRef = db.ref("User").child(userId);
    await userRef.set(newUser);
    res.status(201).json({ userId });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
};
