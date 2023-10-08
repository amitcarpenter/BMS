const mongoose = require("mongoose");

const DbConnect = mongoose
  .connect("mongodb://127.0.0.1:27017/BMS")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = { DbConnect };
