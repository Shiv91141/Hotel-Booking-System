import "./App.css";
import Navbar from "./components/Navbar.js";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Homescreen from "./screens/Homescreen.js";
import Bookingscreen from "./screens/Bookingscreen.js";
import Registerscreen from "./screens/Registerscreen.js";
import Loginscreen from "./screens/Loginscreen.js";
import Profilescreen from "./screens/Profilescreen.js";
function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
