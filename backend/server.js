const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectToDb, getDb } = require("./config/database");

const app = express();
const port = process.env.PORT | 8081;
const host = process.env.HOST;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectToDb();

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
