const express = require("express");
const router = express.Router();

const { VerifyUser } = require("../middleware/VerifyUser");
const { BookRoom, GetUserBookings, CancelBooking, GetAllBookings } = require("../controller.js/bookingController");
router.post("/bookroom", VerifyUser,BookRoom);
// router.post("/bookroom",BookRoom);

router.post("/getbookingsbyuserid", VerifyUser,GetUserBookings);

router.post("/cancelbooking",VerifyUser,CancelBooking);

router.get("/getallbookings", VerifyUser,GetAllBookings);
module.exports = router;
