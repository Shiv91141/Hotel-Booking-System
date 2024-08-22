import React, { useState, useEffect } from "react";

function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  function login() {
    const user = {
      email,
      password,
    };
    console.log(user);
  }

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          <div className="bs">
            <h2>Login</h2>

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
            <button className="btn btn-primary mt-3" onClick={login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
