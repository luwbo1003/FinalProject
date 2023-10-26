const express = require("express");
const apiRouter = express.Router();

const { getAllUsers, getUserById } = require("../controller/userController");
const { TestController } = require("../controller/Test");
const { generateOTP, verifyOTP } = require("../controller/otpController");
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
  PushTime,
} = require("../controller/notificationController");

const apiRoute = (app) => {
  //auth
  apiRouter.get("/users", getAllUsers);
  apiRouter.get("/users/:userId", getUserById);

  apiRouter.post("/generateOTP", generateOTP);
  apiRouter.post("/verifyOTP", verifyOTP);

  apiRouter.post("/test", TestController);

  apiRouter.get("/employees", getAllEmployees);
  apiRouter.get("/employees/:employeeId", getEmployeeById);
  apiRouter.post("/employees/create", createEmployee);
  apiRouter.get("/notifications/add", addNotificationPicker);
  apiRouter.get("/notifications", getAllNotifications);
  apiRouter.get("/notifications/:notificationId", getNotificationById);
  apiRouter.post("/notifications/create", createNotification);

  app.use("/", apiRouter);
};

module.exports = apiRoute;
