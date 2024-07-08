const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL =
  "mongodb+srv://PrasannaKante:PrasannaKante@roomsserver.klsw6az.mongodb.net/?retryWrites=true&w=majority&appName=RoomsServer";

mongoose
  .connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.log("MongoDB connection failed: ", err));

const connection = mongoose.connection;

connection.on("error", (err) => console.log("MongoDB connection error: ", err));

module.exports = mongoose;
