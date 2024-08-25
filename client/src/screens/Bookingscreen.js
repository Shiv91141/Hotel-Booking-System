import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { useParams } from "react-router-dom";
import Error from "../components/Error.js";
import moment from "moment";

function Bookingscreen() {
  var { roomid, fromdate, todate } = useParams();
  const [room, setroom] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);

  const totaldays =
    moment(todate, "DD-MM-YYYY").diff(moment(fromdate, "DD-MM-YYYY"), "days") +
    1;

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setloading(true);
        const { data } = await axios.post("/api/rooms/getroombyid", { roomid });
        setroom(data);
        // console.log(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.error("Error fetching room:", error);
        setloading(false);
      }
    };

    if (roomid) {
      fetchRoom();
    }
  }, [roomid]);

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
              <img src={room.imageurls[0]} className="bigimg" />
            </div>
            <div className="col-md-5">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>Name: </p>
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
                  <p>Rent per day : {room.rentperday}</p>
                  <p>Total Amount : {totaldays * room.rentperday}</p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                <button className="btn btn-primary">Pay Now</button>
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
