import "./App.css";
import Navbar from "./components/Navbar.js";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Homescreen from "./screens/Homescreen.js";
import Bookingscreen from "./screens/Bookingscreen.js";
import Registerscreen from "./screens/Registerscreen.js";
import Loginscreen from "./screens/Loginscreen.js";
import Profilescreen from "./screens/Profilescreen.js";
import AdminScreen from "./screens/AdminScreen.js";
import Landingscreen from "./screens/Landingscreen.js";
import { useState,useEffect,createContext } from "react";
import axios from "axios";
export const UserContext = createContext(null);
function App() {
  const [user, setUser] = useState(null);
  // useEffect(() => {
  //   axios.get('http://127.0.0.1:5000/api/user/verify', {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('token')}`
  //     }
  //   })
  //   .then(res => {
  //     if (res.data.success) {  
  //       setUser(res.data.user);
  //     }
  //   }).catch(err => {
  //     console.log(err);
  //   });
  // }, []);
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
      <UserContext.Provider value={{ user, setUser}} >
        <Routes>
          <Route path="/home" exact Component={Homescreen} />
          <Route
            path="/book/:roomid/:fromdate/:todate"
            exact
            Component={Bookingscreen}
          />
          <Route path="/register" exact Component={Registerscreen} />
          <Route path="/login" exact Component={Loginscreen} />
          <Route path="/profile" exact Component={Profilescreen} />
          <Route path="/admin" exact Component={AdminScreen} />
          <Route path="/" exact Component={Landingscreen}/>
        </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
