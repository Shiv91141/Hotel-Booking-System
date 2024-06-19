const express = require("express");
const app = express();

const dbconfig = require("./db.js");

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port ${port}`));
