import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error.js";
import { Tabs } from "antd";
import axios from "axios";
function AdminScreen() {
  useEffect(()=>{
    if(!JSON.parse(localStorage.getItem("currentUser")).isAdmin){
      window.location.href='/home'
    }
  },[])

  return (
    <div className="mt-3 ml-3 bs mr-3">
      <h2 className="text-center">
        <b>Admin Panel</b>
      </h2>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: "Bookings",
            key: "1",
            children: <Bookings />,
          },
          {
            label: "Rooms",
            key: "2",
            children: <Rooms />,
          },
          {
            label: "Add Rooms",
            key: "3",
            children: <h1>Add Rooms</h1>,
          },
          {
            label: "Users",
            key: "4",
            children: <Users />,
          },
        ]}
      />
    </div>
  );
}

export default AdminScreen;

export function Bookings() {
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

export function Rooms() {
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

export function Users() {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState([true]);
  const [error, seterror] = useState();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const { data } = await axios.get("/api/users/getallusers");
        setusers(data);
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
    <div className="col-md-12">
      <h1>Users</h1>
      {loading && <Loader/>}
      <table className="table table-dark table-bordered">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Is Admin</th>
          </tr>
        </thead>
        <tbody>
          {users && (users.map(user=>{
            return <tr>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin?'YES':'NO'}</td>
            </tr>
          }))}
        </tbody>
      </table>
    </div>
  );
}
