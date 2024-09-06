const express = require("express");
const app = express();

const  cors=require('cors');
const dbconfig = require("./db.js");
const roomsRoute = require("./routes/roomsRoute.js");
const usersRoute = require("./routes/usersRoute.js");
const bookingsRoute= require("./routes/bookingsRoute.js")
app.use(express.json()); //mandatory for receiving paramaters
app.use(cors());
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings",bookingsRoute)
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port ${port}`));
