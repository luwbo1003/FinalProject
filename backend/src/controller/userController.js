// const admin = require("firebase-admin");
// const db = admin.database();

const getAllUsers = async () => {
  // try {
  //   const snapshot = await db.ref("users").once("value");
  //   const data = snapshot.val();
  //   return data;
  // } catch (error) {
  //   console.error(
  //     "Error fetching data from Firebase Realtime Database:",
  //     error
  //   );
  //   throw error;
  // }
};

const getUserById = async (userId) => {
  // try {
  //   const snapshot = await db.ref("users/" + userId).once("value");
  //   const data = snapshot.val();
  //   return data;
  // } catch (error) {
  //   console.error(
  //     "Error fetching user data from Firebase Realtime Database:",
  //     error
  //   );
  //   throw error;
  // }
};

module.exports = {
  getAllUsers,
  getUserById,
};
