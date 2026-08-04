import React from "react";

export default function  LinkButton({children , onClick }:{children:React.ReactNode, onClick:()=>void}){
    return <div onClick = {onClick} className = "px-4 py-2 mr-2 w-25 text-center rounded bg-dark hover:bg-gray-700 cursor-pointer text-white border border-thin">
        {children}
    </div>
}