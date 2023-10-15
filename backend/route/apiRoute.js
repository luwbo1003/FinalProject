const express = require("express");
const apiRouter = express.Router();

const { getAllUsers, getUserById } = require("../controller/userController");

const apiRoute = (app) => {
  //auth
  apiRouter.get("/users", getAllUsers);
  apiRouter.get("/users/:userId", getUserById);

  app.use("/", apiRouter);
};

module.exports = apiRoute;
