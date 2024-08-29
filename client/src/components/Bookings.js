import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error.js";
import axios from "axios";
import { Tabs } from "antd";
export default function Bookings() {
    const [bookings, setbookings] = useState([]);
    const [loading, setloading] = useState([true]);
    const [error, seterror] = useState();
    useEffect(() => {
      const fetchdata = async () => {
        try {
          const { data } = await axios.get("/api/bookings/getallbookings");
          setbookings(data);
          console.log(data);
          setloading(false);
        } catch (error) {
          console.log(error);
          setloading(false);
          seterror(error);
        }
      };
  
      fetchdata();
    }, []);
    return (
      <div className="row">
        <div className="col-md-12">
          <h1>Bookings</h1>
          {loading && <Loader />}
          <table className="table table-bordered table-dark">
            <thead className="bs">
              <tr>
                <th>Booking Id</th>
                <th>User Id</th>
                <th>Room</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
              </tr>
            </thead>
            {bookings.length &&
              bookings.map((booking) => {
                return (
                  <tr>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.room}</td>
                    <td>{booking.fromdate}</td>
                    <td>{booking.todate}</td>
                    <td>{booking.status}</td>
                  </tr>
                );
              })}
            <tbody></tbody>
          </table>
          {bookings.length && <h1>There are total {bookings.length} bookings</h1>}
        </div>
      </div>
    );
  }