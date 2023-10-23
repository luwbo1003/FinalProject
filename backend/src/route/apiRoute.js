const express = require("express");
const apiRouter = express.Router();

const {
  getAllUsers,
  getUserById,
  registerUser,
} = require("../controller/userController");
const { generateOTP, verifyOTP } = require("../controller/otpController");

const apiRoute = (app) => {
  //user
  apiRouter.get("/users", getAllUsers);
  apiRouter.get("/users/:userId", getUserById);
  apiRouter.post("/register", registerUser);

  //auth
  apiRouter.post("/generateOTP", generateOTP);
  apiRouter.post("/verifyOTP", verifyOTP);

  app.use("/", apiRouter);
};

module.exports = apiRoute;
