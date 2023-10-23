const express = require("express");
const apiRouter = express.Router();

const { getAllUsers, getUserById } = require("../controller/userController");
const {getAllEmployees, getEmployeeById , createEmployee} = require("../controller/employeeController")
const {addNotificationPicker, createNotification, getAllNotifications, getNotificationById} = require("../controller/notificationController")

const apiRoute = (app) => {
  //auth
  apiRouter.get("/users", getAllUsers);
  apiRouter.get("/users/:userId", getUserById);
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