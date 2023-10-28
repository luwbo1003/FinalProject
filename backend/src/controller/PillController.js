const { getDatabase, ref, child, get } = require("firebase-admin/database");

const getPillData = async (userId, mcId) => {
  const db = getDatabase();
  const mcIdRef = ref(db, `MedicineCalendar/${userId}/${mcId}`);

  try {
    const snapshot = await get(mcIdRef);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching pill data from Firebase:", error);
    throw error;
  }
};

module.exports = {
  getPillData,
};
