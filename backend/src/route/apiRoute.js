const express = require("express");
const apiRouter = express.Router();

const { getAllUsers, getUserById } = require("../controller/userController");
const { generateOTP, verifyOTP, setSession } = require("../controller/otpController");

const apiRoute = (app) => {
  //auth
  apiRouter.get("/users", getAllUsers);
  apiRouter.get("/users/:userId", getUserById);
  apiRouter.post("/generateOTP",generateOTP)
  apiRouter.post("/verifyOTP",verifyOTP);
  apiRouter.post("/api/setSession",setSession);
  
  app.use("/", apiRouter);
};

module.exports = apiRoute;
