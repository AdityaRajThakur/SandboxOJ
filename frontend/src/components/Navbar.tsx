import LinkButton from "./LinkButton";
import { useNavigate , useLocation } from "react-router-dom";
// import { Button } from "@chakra-ui/react"
// import { useColorMode } from "@/components/ui/color-mode"
export default function Navbar(){
//   const { toggleColorMode } = useColorMode(); 

    const navigate = useNavigate();
    const location = useLocation() ; 
    return <div className = "flex justify-between px-4 py-2 border-b ">
        <div className = "text-2xl">RuntimeX</div>
        <div className = "flex justify-between">
            {/* <div>
                    <Button  children = {"Toggle"} variant="outline" onClick={toggleColorMode}/>
            </div> */}
            {location.pathname ==="/login"?<LinkButton onClick ={()=>{navigate("/signup")}}>Signup</LinkButton>:<></>}
            {location.pathname ==="/signup"?<LinkButton onClick ={()=>{navigate("/login")}}>Login</LinkButton>:<></>}
        </div>
    </div>
}