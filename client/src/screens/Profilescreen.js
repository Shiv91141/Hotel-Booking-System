import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs } from "antd";
import Loader from "../components/Loader";
import Error from "../components/Error.js";
function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.loacation.href = "/login";
    }
  }, []);
  return (
    <div className="ml-3 mt-3">
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: "Profile",
            key: "1",
            children: (
              <div>
                <h1>My Profile</h1>
                <br />
                <h1>Name: {user.name}</h1>
                <h1>Email : {user.email}</h1>
                <h1>isAdmin : {user.isAdmin ? "YES" : "NO"}</h1>
              </div>
            ),
          },
          {
            label: "Bookings",
            key: "2",
            children: (
              <div>
                <h1>
                  <MyBookings />
                </h1>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

export default Profilescreen;

function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        setloading(true);
        const promise = await axios.post("api/bookings/getbookingsbyuserid", {
          userid: user._id,
        });

        const data = promise.data;
        //user._id is present
        console.log(data);
        setbookings(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);
      }
    };
    fetchdata();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader />}
          {bookings &&
            bookings.map((booking) => {
              return (
                <div className="bs">
                  <h1>{booking.room}</h1>
                  <p>
                    <b>BookingId</b>: {booking._id}
                  </p>
                  <p>
                    <b>CheckIn:</b> {booking.fromdate}
                  </p>
                  <p>
                    <b>CheckOut:</b> {booking.todate}
                  </p>
                  <p>
                    <b>Amount:</b> {booking.totalAmount}
                  </p>
                  <p>
                    Status:{" "}
                    {booking.status == "booked" ? "Confirmed" : "Canceled"}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
