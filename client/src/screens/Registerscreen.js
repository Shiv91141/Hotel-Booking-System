import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
function Registerscreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(null);
  const [exist,setexist]=useState(null);
  async function register() {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };

      try {
        setloading(true);
        const res = await axios.post("/api/users/register", user);
        console.log(res);
        setloading(false);
        setname("");
        setemail("");
        setpassword("");
        setcpassword("");
        setsuccess(res.data.success);
        console.log(res.data.exist)
        setexist(res.data.exist);
        // window.location.href = "/login";
      } catch (error) {
        setloading(false);
        seterror(true);
        console.log(error);
      }
    } else {
      alert("Passwords not matched");
    }
  }

  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}
      {success && exist && <Error message={"User Already Exists"}/>}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          {success && !exist && <Success message="Registration Successful" />}

          <div className="bs">
            <h2>Register</h2>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => setcpassword(e.target.value)}
            />
            <button className="btn btn-primary mt-3" onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
