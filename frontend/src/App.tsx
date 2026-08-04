import Login from "./components/Login";
import Signup from "./components/Signup";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./auth/protectedRoute";
import Home from "./components/Home" ; 
import {Toaster} from "react-hot-toast" ; 

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
          <Route path="/" element={<Home />}/>
        </Route>
      </Routes>
      <Toaster/>
    </Router>
  );
}

export default App;
