import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error.js";
import axios from "axios";
import { Tabs } from "antd";
export default function Users() {
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
        {loading && <Loader />}
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
            {users && (users.map(user => {
              return <tr>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
              </tr>
            }))}
          </tbody>
        </table>
      </div>
    );
  }