import { VscAccount } from "react-icons/vsc";
const User = ({onClick , username } :{
    onClick : ()=> void,
    username : string  
})=>{
    return <div className = "px-4 shadow bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 flex rounded-md font-semibold justify-center ">
        <div onClick = {onClick} className = "flex m-1 items-center justify-between p-1 cursor-pointer">
            <div className = ""><VscAccount size = {20}/></div>
            <div className = "flex items-center pl-2 capitalize">
                {username}
            </div>
        </div>
    </div>
}


export default User; 