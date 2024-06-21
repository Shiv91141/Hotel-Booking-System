const express = require("express");
const app = express();

const dbconfig = require("./db.js");
const roomsRoute =require('./routes/roomsRoute.js')

app.use('/api/rooms', roomsRoute)
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port ${port}`));
