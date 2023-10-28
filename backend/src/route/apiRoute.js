const express = require("express");
const apiRouter = express.Router();

const { getAllUsers, getUserById } = require("../controller/userController");
const { generateOTP, verifyOTP, setSession} = require("../controller/otpController");
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
} = require("../controller/employeeController");
const {
  addNotificationPicker,
  createNotification,
  getAllNotifications,
  getNotificationById,
} = require("../controller/notificationController");

const apiRoute = (app) => {
  //auth
  apiRouter.get("/users", getAllUsers);
  apiRouter.get("/users/:userId", getUserById);

  apiRouter.post("/generateOTP",generateOTP)
  apiRouter.post("/verifyOTP",verifyOTP);
  apiRouter.post("/api/setSession",setSession);

  apiRouter.get("/notifications", getAllNotifications);
  apiRouter.get("/notifications/:notificationId", getNotificationById);
  apiRouter.post("/notifications/create", createNotification);

  app.use("/", apiRouter);
};

module.exports = apiRoute;
