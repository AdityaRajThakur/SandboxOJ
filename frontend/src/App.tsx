import Login from "./components/Login"; 
import Signup from "./components/Signup"
import Navbar  from "./components/Navbar"; 
import { Route , Routes , BrowserRouter as Router  } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  return <Router>
    <Navbar/>
    <Routes>
      <Route path = "/login" element = {<Login/>}> </Route>
      <Route path = "/signup" element = {<Signup/>}> </Route>
      <Route path = "/dashboard" element = {<Dashboard/> }> </Route>
    </Routes>
  </Router>
}

export default App
