const express = require("express");
const Booking = require("../models/booking");
const Room = require("../models/room");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const BookRoom=async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totaldays, token } =
    req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create({
      amount: totalamount * 100,
      customer: customer.id,
      currency: "inr",
      receipt_email: token.email,
    });

    if (payment) {
      const newBooking = new Booking({
        room: room.name,
        roomid: room._id,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays,
        transactionId: payment.id,
      });

      const booking = await newBooking.save();

      const roomtemp = await Room.findOne({ _id: room._id });

      roomtemp.currentbookings.push({
        bookingid: booking._id,
        fromdate: fromdate,
        todate: todate,
        userid: userid,
        status: booking.status,
      });

      await roomtemp.save();
    }
    res.json({ message: "Payment successful, your room is booked" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

const GetUserBookings=async (req, res) => {
  const userid = req.body.userid;

  try {
    const bookings = await Booking.find({ userid: userid });
    // console.log(userid);
    res.send(bookings);

    // console.log(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const CancelBooking=async (req, res) => {
  const { bookingid, roomid } = req.body;

  try {
    const bookingitem = await Booking.findOne({ _id: bookingid });
    bookingitem.status = "cancelled";
    await bookingitem.save();
    const room = await Room.findOne({ _id: roomid });
    const bookings = room.currentbookings;
    const temp = bookings.filter(
      (booking) => booking.bookingid.toString() !== bookingid
    );
    room.currentbookings = temp;

    await room.save();
    res.send("Your booking cancelled successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const GetAllBookings=async (req, res) => {
  try {
    const bookings = await Booking.find();
    // console.log(bookings);
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
};
module.exports = {BookRoom,GetUserBookings,CancelBooking,GetAllBookings};
