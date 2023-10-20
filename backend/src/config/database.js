const admin = require("firebase-admin");

const initializeFirebaseApp = () => {
  const serviceAccount = require("../../finalproject-group1-firebase-adminsdk-mk97o-4c975c4f67.json");
  const firebaseConfig = {
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      "https://finalproject-group1-default-rtdb.asia-southeast1.firebasedatabase.app/",
  };

  const firebaseApp = admin.initializeApp(firebaseConfig);
  const db = firebaseApp.database();

  db.ref(".info/connected").on("value", (snapshot) => {
    if (snapshot.val() === true) {
      console.log("Firebase Realtime Database is connected");
    } else {
      console.log("Firebase Realtime Database is not connected");
    }
  });
};

module.exports = {
  initializeFirebaseApp,
};
