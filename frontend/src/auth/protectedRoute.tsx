import {Outlet , Navigate  } from "react-router-dom";
import {useSelector} from "react-redux";
const ProtectedRoute = ()=>{  
    const {isAuthenticated}  = useSelector((state : any)=>state.user) ; 
    console.log( isAuthenticated) ; 
    if(!isAuthenticated) {
        console.log("not authenticated") ; 
        return <Navigate to= "/signup" replace /> ;
    }  
    return <Outlet/>
}


export default ProtectedRoute ;