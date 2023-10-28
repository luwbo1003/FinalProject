const express = require("express");
const apiRouter = express.Router();

const { getAllUsers, getUserById } = require("../controller/userController");
const { generateOTP, verifyOTP } = require("../controller/otpController");

// Import PillController
const PillController = require("../controller/PillController"); // Đảm bảo đường dẫn đúng

apiRouter.get("/users", getAllUsers);
apiRouter.get("/users/:userId", getUserById);
apiRouter.post("/generateOTP", generateOTP);
apiRouter.post("/verifyOTP", verifyOTP);

apiRouter.get("/getPillData", async (req, res) => {
  const userId = "47010663-66e9-42e0-a057-0d9006ff7fd9"; 
  const mcId = "MCId1";
  try {
    const pillData = await PillController.getPillData(userId, mcId);
    if (pillData) {
      res.status(200).json(pillData);
    } else {
      res.status(404).json({ error: "Pill data not found" });
    }
  } catch (error) {
    console.error("Error fetching pill data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = apiRouter;
