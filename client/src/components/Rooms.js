import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error.js";
import axios from "axios";
export default function Rooms() {
    const [rooms, setrooms] = useState([]);
    const [loading, setloading] = useState([true]);
    const [error, seterror] = useState();
    useEffect(() => {
      const fetchdata = async () => {
        try {
          const { data } = await axios.get("/api/rooms/getallrooms");
          setrooms(data);
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
          <h1>Rooms</h1>
          {loading && <Loader />}
          <table className="table table-bordered table-dark">
            <thead className="bs">
              <tr>
                <th>Room Id</th>
                <th>Name</th>
                <th>Type</th>
                <th>Rent per day</th>
                <th>Max Count</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            {rooms.length &&
              rooms.map((room) => {
                return (
                  <tr>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentperday}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phonenumber}</td>
                  </tr>
                );
              })}
            <tbody></tbody>
          </table>
          {rooms.length && <h1>There are total {rooms.length} rooms</h1>}
        </div>
      </div>
    );
  }