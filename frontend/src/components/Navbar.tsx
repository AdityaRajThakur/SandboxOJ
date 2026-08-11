import LinkButton from "./LinkButton";
import { useNavigate , useLocation } from "react-router-dom";
import User from "./account/User" ; 
import {useSelector} from "react-redux"; 
// import { Button } from "@chakra-ui/react"
// import { useColorMode } from "@/components/ui/color-mode"
export default function Navbar(){
    const {isAuthenticated , username }:{
        isAuthenticated : boolean,
        username : string 
    }  = useSelector((state :any )=>state.user) ; 
//   const { toggleColorMode } = useColorMode(); 

    const navigate = useNavigate();
    const location = useLocation();
    function to_home_page(){
        navigate('/') ; 
    }
    return <nav className = "flex justify-between px-4 py-2 border-b bg-codingDark sticky top-0 z-50 backdrop-blur-sm text-white">
        <div className = "text-2xl cursor-pointer bg-clip-text text-transparent font-semibold bg-gradient-to-r from-red-200 to-blue-400" onClick = {to_home_page}>RuntimeX</div>
        <div className = "flex justify-between">
            {/* <div>
                    <Button  children = {"Toggle"} variant="outline" onClick={toggleColorMode}/>
            </div> */}
            {location.pathname ==="/login"?<LinkButton onClick ={()=>{navigate("/signup")}}>Signup</LinkButton>:<></>}
            {location.pathname ==="/signup"?<LinkButton onClick ={()=>{navigate("/login")}}>Login</LinkButton>:<></>}
            {isAuthenticated?<User username = {username} onClick = {()=>{navigate("/account")}}/>:<></>}
        </div>
    </nav>
}