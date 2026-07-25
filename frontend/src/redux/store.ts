import {configureStore} from "@reduxjs/toolkit"; 
import userReducer from "../auth/user" ; 
export const store = configureStore({
    reducer: {
        user: userReducer
    }
}); 



