import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error.js";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
function Bookingscreen() {
  var { roomid, fromdate, todate } = useParams();
  const [room, setroom] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [totalamount, settotalamount] = useState(0);
  const totaldays =
    moment(todate, "DD-MM-YYYY").diff(moment(fromdate, "DD-MM-YYYY"), "days") +
    1;
  
    useEffect(() => {
      // Redirect to login if no user is in localStorage
      if (!localStorage.getItem('currentUser')) {
        window.location.href = '/login';
        return;
      }
  
      const fetchRoom = async () => {
        try {
          setloading(true);
  
          // Include the token in the headers for authorization
          const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          };
  
          // Make the POST request with the roomid and token in headers
          const { data } = await axios.post('http://127.0.0.1:5000/api/rooms/getroombyid', { roomid }, config);
  
          // Update room details and total amount
          setroom(data);
          settotalamount(data.rentperday * totaldays);
          setloading(false);
        } catch (error) {
          setloading(false);
          seterror(true);
          console.error('Error fetching room:', error);
          // Redirect to login if error occurs
          window.location.href = '/login';
        }
      };
  
      if (roomid) {
        fetchRoom();
      }
    }, [roomid, totaldays]);

  async function onToken(token) {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      token,
    };

    console.log(bookingDetails); // Log the data to ensure it's correct

    try {
      setloading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      };

    // Make the POST request with bookingDetails and the Authorization header
    const result = await axios.post('/api/bookings/bookroom', bookingDetails, config);
      setloading(false);
      Swal.fire(
        "Congratulations",
        "Your Room Booked Successfully",
        "success"
      ).then((result) => {
        window.location.href = "/profile";
      });
      console.log(result);
    } catch (error) {
      setloading(false);
      Swal.fire("OOPS", "Something Went Wrong", "error");
      console.log(error);
    }
  }

  return (
    <div className="m-5">
      {loading ? (
        <h1>
          <Loader />
        </h1>
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-5">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="bigimg" alt="Room" />
            </div>
            <div className="col-md-5">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>
                    Name: {JSON.parse(localStorage.getItem("currentUser")).name}
                  </p>
                  <p>From Date: {fromdate}</p>
                  <p>To Date: {todate}</p>
                  <p>Max Count: {room.maxcount}</p>
                </b>
              </div>
              <div style={{ textAlign: "right" }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total Days: {totaldays}</p>
                  <p>Rent per day: {room.rentperday}</p>
                  <p>Total Amount: {totalamount}</p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                {totalamount > 0 && (
                  <StripeCheckout
                    amount={totalamount * 100}
                    token={onToken}
                    currency="INR"
                    stripeKey="pk_test_51Ps3eFAK1krkn2bDwR7uQpx2WzxKVIoDrKUGWdDwMybXuCLhwpd4fnVLmtRcPiNTsept751GF92Ui2gAoCqhaehr00af524Bwx"
                  >
                    <button className="btn btn-primary">Pay Now</button>
                  </StripeCheckout>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
