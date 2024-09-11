import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error.js";
import Bookings from "../components/Bookings.js";
import Rooms from "../components/Rooms.js";
import Addroom from "../components/Addroom.js";
import Users from "../components/Users.js";
import { Tabs } from "antd";
import axios from "axios";
function AdminScreen() {
  const [Admin,SetAdmin]=useState(false);
  const user = localStorage.getItem("currentUser")
  useEffect(() => {
    if (!user){
      window.location.href = '/login'
    } else if (!JSON.parse(user).isAdmin) {
      window.location.href = '/home'
    } else {
      SetAdmin(true);
    }
  }, [])

  return (
    Admin?<div className="mt-3 ml-3 bs mr-3">
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
            children: <Addroom/>,
          },
          {
            label: "Users",
            key: "4",
            children: <Users />,
          },
        ]}
      />
    </div>:<></>
  );
}

export default AdminScreen;


