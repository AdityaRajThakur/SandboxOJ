import LinkButton from "./LinkButton";
import { useNavigate } from "react-router-dom";

export default function Navbar(){
    const navigate = useNavigate();
    return <div className = "flex justify-between px-4 py-2 border-b-[1px] ">
        <div className = "text-2xl">RuntimeX</div>
        <div className = "flex justify-between">
            <LinkButton onClick ={()=>{navigate("/login")}}>Login</LinkButton>
            <LinkButton onClick ={()=>{navigate("/signup")}}>Signup</LinkButton>
        </div>
    </div>
}