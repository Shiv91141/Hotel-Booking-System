const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const moment = require("moment");
const Room = require("../models/room");
// const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
router.post("/bookroom", async (req, res) => {
    const {
        room,
      userid,
      fromdate,
      todate,
      totalamount,
      totaldays,
      token
    } = req.body;

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });
    
        const payment = await stripe.charges.create({
            amount: totalamount * 100,
            customer: customer.id,
            currency: 'inr',
            receipt_email: token.email
        });
        // const payment = await stripe.charges.create({
        //     amount: totalamount * 100,
        //     customer: customer.id,
        //     currency: 'inr',
        //     receipt_email: token.email
        // }, {
        //     idempotency_key: uuidv4()
        // });
    
        console.log("Payment successful:", payment);        

        if (payment) {
            console.log('done');
            const newBooking = new Booking({
                room: room.name,
                roomid: room._id,
                userid,
                fromdate,
                todate,
                totalamount,
                totaldays,
                transactionId: '1234'
            });

            const booking = await newBooking.save();

            const roomtemp = await Room.findOne({ _id: room._id });

            roomtemp.currentbookings.push({
                bookingid: booking._id,
                fromdate: fromdate,
                todate: todate,
                userid: userid,
                status: booking.status
            });

            await roomtemp.save();
        }
        res.json({ message: "Payment successful, your room is booked"});
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }
});

module.exports = router;
