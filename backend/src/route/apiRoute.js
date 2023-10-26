const express = require("express");
const apiRouter = express.Router();

const {
  getAllUsers,
  getUserById,
  registerUser,
} = require("../controller/userController");
const {
  generateOTP,
  verifyOTP,
  setSession,
} = require("../controller/otpController");
const {
  createNotification,
  getAllNotifications,
  getNotificationById,
} = require("../controller/notificationController");

const apiRoute = (app) => {
  //user
  apiRouter.get("/users", getAllUsers);
  apiRouter.get("/users/:userId", getUserById);
  apiRouter.post("/register", registerUser);

  //notification
  apiRouter.get("/notifications", getAllNotifications);
  apiRouter.get("/notifications/:notificationId", getNotificationById);
  apiRouter.post("/notifications/create", createNotification);

  //auth
  apiRouter.post("/generateOTP", generateOTP);
  apiRouter.post("/verifyOTP", verifyOTP);
  apiRouter.post("/api/setSession", setSession);

  app.use("/", apiRouter);
};

module.exports = apiRoute;
