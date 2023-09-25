const mongoose = require("mongoose");
const db_conn =
  "mongodb+srv://group1:0123456789@datn.r7gptgm.mongodb.net/?retryWrites=true&w=majority";
const db_name = "DATN";

let db_client;

async function connectToDb() {
  try {
    db_client = await mongoose
      .connect(db_conn, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to MongoDB");
      });
  } catch {
    (err) => {
      console.error("Error connecting to MongoDB:", err);
    };
  }
}

function getDb() {
  if (!db_client) {
    throw new Error("MongoDB client is not connected.");
  }
  return db_client.db(db_name);
}

module.exports = {
  connectToDb,
  getDb,
};
