import React from "react";

export default function  LinkButton({children , onClick }:{children:React.ReactNode, onClick:()=>void}){
    return <div onClick = {onClick} className = "px-4 py-2 mr-2 w-25 text-center font-semibold rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 cursor-pointer text-white border border-thin">
        {children}
    </div>
}