const express = require("express");
const apiRouter = express.Router();

const { getAllUsers, getUserById } = require("../controller/userController");
const { generateOTP, verifyOTP } = require("../controller/otpController");

const apiRoute = (app) => {
  //auth
  apiRouter.get("/users", getAllUsers);
  apiRouter.get("/users/:userId", getUserById);
  apiRouter.post("/generateOTP",generateOTP)
  apiRouter.post("/verifyOTP",verifyOTP);


  app.use("/", apiRouter);
};

module.exports = apiRoute;
