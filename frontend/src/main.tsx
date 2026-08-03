import { createRoot } from "react-dom/client";
// import { Provider } from "@/components/ui/provider"
import "./index.css";
import App from "./App.tsx";
import {store} from "./redux/store"; 
import {Provider} from "react-redux"; 


createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <Provider store = {store}>
    <App />
    </Provider>
   //</StrictMode>
);
