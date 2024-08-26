import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error.js";
import Success from "../components/Success";
import { DatePicker, Space } from "antd";
import moment from "moment";
// import "antd/dist/antd.css";

const { RangePicker } = DatePicker;
function Homescreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState([]);
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setloading(true);
        const { data } = await axios.get("/api/rooms/getallrooms");
        setrooms(data);
        setduplicaterooms(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.error("Error fetching rooms:", error);
        setloading(false);
      }
    };

    fetchRooms();
  }, []);

  function filterByDate(dates) {
    setfromdate(moment(dates[0].$d).format("DD-MM-YYYY"));
    settodate(moment(dates[1].$d).format("DD-MM-YYYY"));

    var temprooms = [];
    var availability = false;
    for (const room of duplicaterooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (!moment(moment(dates[0].$d).format("DD-MM-YYYY")).isBetween(booking.fromdate, booking.todate)
            && !moment(moment(dates[1].$d).format("DD-MM-YYYY")).isBetween(booking.fromdate, booking.todate)
          ) {

            if (
              moment(dates[0].$d).format('DD-MM-YYYY') !== booking.fromdate &&
              moment(dates[0].$d).format('DD-MM-YYYY') !== booking.todate &&
              moment(dates[1].$d).format('DD-MM-YYYY') !== booking.fromdate &&
              moment(dates[1].$d).format('DD-MM-YYYY') !== booking.todate
            ) {
              availability = true
            }
          }

        }
      }
      if (availability === true || room.currentbookings.length === 0) {
        temprooms.push(room);
      }
      setrooms(temprooms);
    }
  }
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : rooms.length >= 1 ? (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-3" key={room.id}>
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}

export default Homescreen;
