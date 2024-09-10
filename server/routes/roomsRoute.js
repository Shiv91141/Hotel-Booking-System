const express = require("express");
const router =express.Router();

const {GetRoom,AddRoom,GetAllRooms}=require('../controller.js/roomController');
const { VerifyUser } = require("../middleware/VerifyUser");
const {Auth} =require("../controller.js/userController")

// router.get("/getallrooms",VerifyUser,GetAllRooms);
router.get("/getallrooms",GetAllRooms);
// router.post("/getroombyid",VerifyUser,GetRoom);
router.post("/getroombyid",GetRoom);
router .post('/addroom',VerifyUser,AddRoom)
// router .post('/addroom',AddRoom)
module.exports= router;
