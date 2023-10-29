const express = require("express");
const apiRouter = express.Router();

const { getAllUsers, getUserById } = require("../controller/userController");
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
const {
  getAllPills,
  getPillByUserID,
} = require("../controller/pillController");

const apiRoute = (app) => {
  //auth
  apiRouter.get("/users", getAllUsers);
  apiRouter.get("/users/:userId", getUserById);

  apiRouter.post("/generateOTP", generateOTP);
  apiRouter.post("/verifyOTP", verifyOTP);
  apiRouter.post("/setSession", setSession);

  apiRouter.get("/notifications", getAllNotifications);
  apiRouter.get("/notifications/:notificationId", getNotificationById);
  apiRouter.post("/notifications/create", createNotification);

  apiRouter.get("/getAllPills", getAllPills);
  apiRouter.get("/getPillByUserID/:userId", getPillByUserID);

  app.use("/api", apiRouter);
};

module.exports = apiRoute;
