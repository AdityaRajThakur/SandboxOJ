import Login from "./components/Login";
import Signup from "./components/Signup";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./auth/protectedRoute";
import Home from "./components/Home" ; 
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
          <Route path="/" element={<Dashboard />}>
            {" "}
          </Route>
        </Route>
        <Route path="/dashboard" element={<Home />}/>
      </Routes>
    </Router>
  );
}

export default App;
