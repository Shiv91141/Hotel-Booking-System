import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs } from "antd";
import Loader from "../components/Loader";
import Error from "../components/Error.js";
import Swal from "sweetalert2";
import { Divider, Flex, Tag } from "antd";

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
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
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        };
        const promise = await axios.post("api/bookings/getbookingsbyuserid", {
          userid: user._id,
        },config);

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

  async function cancelBooking(bookingid, roomid) {
    try {
      setloading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      };
      const result = (
        await axios.post("/api/bookings/cancelbooking", { bookingid, roomid },config)
      ).data;
      console.log(result);
      setloading(false);
      Swal.fire(
        "Congrates",
        "Your Booking Canceled successfully",
        "success"
      ).then((result) => {
        window.location.reload();
      });
    } catch {
      console.log(error);
      setloading(false);
      Swal("Oops", "Something went wrong", "error");
    }
  }

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
                    <b>Amount:</b> {booking.totalamount}
                  </p>
                  <p>
                    Status:
                    {booking.status == "cancelled" ? (
                      <Tag color="red">CANCELLED</Tag>
                    ) : (
                      <Tag color="green">CONFIRMED</Tag>
                    )}
                  </p>

                  {booking.status !== "cancelled" && (
                    <div className="text-right">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          cancelBooking(booking._id, booking.roomid);
                        }}
                      >
                        CANCEL BOOKING
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
