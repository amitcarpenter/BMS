const mongoose = require("mongoose");
const onlineDatabaseUrl =
  "mongodb+srv://amitcarpenter:amitcarpenter@bms.oboxpe2.mongodb.net/?retryWrites=true&w=majority";
const OffineDatabaseUrl = "mongodb://127.0.0.1:27017/BMS";
const DbConnect = mongoose
  .connect(onlineDatabaseUrl)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = { DbConnect };
