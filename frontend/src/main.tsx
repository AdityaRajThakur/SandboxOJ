// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { Provider } from "@/components/ui/provider"
import "./index.css";
import App from "./App.tsx";
import {store} from "./redux/store"; 
import {Provider} from "react-redux"; 
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from "./components/Navbar" ; 
createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <GoogleOAuthProvider clientId="561301660228-8l2ek7qe75ikrj4iduth93dae2t6miv6.apps.googleusercontent.com">
      <Provider store = {store}> 
      <App />
      </Provider>
  </GoogleOAuthProvider>

   //</StrictMode>
);
