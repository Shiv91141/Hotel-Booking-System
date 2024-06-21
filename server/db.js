const mongoose = require("mongoose");

var mongoURL =
  "mongodb+srv://PrasannaKante:Prasanna%40123@roomsserver.klsw6az.mongodb.net/roomsDB";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on("error", () => console.log("MongoDB connection failed"));
connection.on("connected", () => {
  console.log("MongoDB conenction successful");
});

module.exports = mongoose;
