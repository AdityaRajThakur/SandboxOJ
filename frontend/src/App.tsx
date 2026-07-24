import Login from "./components/Login";
import Signup from "./components/Signup";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./components/Dashboard";

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
      </Routes>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          {" "}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
