const  express=require( 'express');
const router = express.Router();
const { Register, Login, Auth ,GetAllUsers}= require ('../controller.js/userController.js')
const { BookRoom, GetUserBookings, CancelBooking, GetAllBookings } = require("../controller.js/bookingController.js");
const {GetRoom,AddRoom, GetAllRooms}=require('../controller.js/roomController.js');
const { body }= require ('express-validator')
const { VerifyUser } =require('../middleware/VerifyUser.js');
// USER ROUTES
router.post('/register',[
  body('name').trim().notEmpty().withMessage("Name is Required"),
  body('email').trim().notEmpty().withMessage("Email ID is Required")
  .isEmail().withMessage("Email Invalid"),
  body('password').trim().notEmpty().withMessage("Password is Required")
  .isLength({min: 5, max: 30}).withMessage("Password Length must Be 3-50 Characters")
], Register )

router.post('/login',[
  body('email').trim().notEmpty().withMessage("Email ID is Required")
  .isEmail().withMessage("Email Invalid"),
  body('password').trim().notEmpty().withMessage("Password is Required")
  .isLength({min: 5, max: 30}).withMessage("Password Length must Be 3-50 Characters")
], Login )

router.get('/getallusers', VerifyUser,GetAllUsers )
router.get('/verify', VerifyUser,Auth )
module.exports = router;
