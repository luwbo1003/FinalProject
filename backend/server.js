const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { initializeFirebaseApp } = require("./src/config/database");
const apiRoute = require("./src/route/apiRoute");

const app = express();
const port = process.env.PORT | 8083;
const host = process.env.HOST;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

initializeFirebaseApp();
apiRoute(app);

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
