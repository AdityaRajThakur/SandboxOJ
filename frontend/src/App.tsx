import Login from "./components/Login";
import Signup from "./components/Signup";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./auth/protectedRoute";
import Home from "./components/Home" ; 
import {Toaster} from "react-hot-toast" ; 

import UpdateAccount from "./components/account/UpdateAccount" ;
import Navbar from "./components/Navbar";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}>
          {" "}
        </Route>
        <Route path="/signup" element={<Signup />}>
          {" "}
        </Route>
        <Route element={<ProtectedRoute />}> 
          <Route path="/ide" element={<Dashboard />}>
            {" "}
          </Route>
          <Route path="/account" element={<UpdateAccount />}/>
        </Route>
        <Route path="/" element={<Home />}/>
      </Routes>
      <Toaster/>
    </Router>
  );
}

export default App;
