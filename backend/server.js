const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { initializeFirebaseApp } = require("./config/database");
const apiRoute = require("./src/routes/apiRoute");

const app = express();
const port = process.env.PORT | 8080;
const host = process.env.HOST;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

apiRoute(app);
initializeFirebaseApp();

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
