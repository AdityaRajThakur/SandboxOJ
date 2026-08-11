import Navbar from "../Navbar";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { BACKEND } from "../../lib/lib"
import {login , logout} from "../../auth/user" ; 
import {useDispatch} from "react-redux" ; 
const UpdateAccount = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fp, setFp] = useState<string>("");
  const [sp, setSp] = useState<string>("");
  const dispatch = useDispatch() ; 
  const checkPassword: () => boolean = () => {
    if (fp == sp) {
      toast.success("Password  Matched");
      console.log("password matched");
      return true;
    }
    toast.error("Password Does Not Match");
    return false;
  };
  const updatePassword: () => void = async () => {
    setLoading(true);
    if (fp.length == 0 || sp.length == 0) {
      toast.error("Password cannot be empty");
      setLoading(false);
      return false;
    }
    try {
      const res = await axios.put(
        BACKEND + "/update",
        {
          password: fp,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );
      if (res.status == 200) {
        setLoading(false);
        toast.success("Password update successfully");
        return;
      }
      setLoading(false);
      toast.error(res.data.message);
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof Error) {
        if (err.message) toast.error(err.message);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center h-screen">
        <div className="bg-white border-[2px] hover:shadow-lg rounded-md shadow-md p-3 w-100 h-75 mt-30">
          <div className="pb-5">
            <label
              htmlFor="password"
              className="pb-2 block text-sm font-medium text-gray-700"
            >
              {" "}
              New Password{" "}
            </label>
            <input
              type="text"
              onChange={(e) => setFp(e.target.value)}
              placeholder="New Password"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="pb-5">
            <label
              htmlFor="password"
              className="pb-2 block text-sm font-medium text-gray-700"
            >
              {" "}
              Confirm Password{" "}
            </label>
            <input
              type="password"
              onChange={(e) => {
                setSp(e.target.value);
                // //checkPassword() ;
                // console.log(e.target.value) ;
              }}
              onBlur={checkPassword}
              placeholder="Confirm Password"
              className={`w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus`}
            />
          </div>
          <button
            disabled={loading}
            onClick={() => {
              // setLoading(true) ;
              // await new Promise((resolve)=>setTimeout(resolve , 2000)) ;
              // setLoading(false) ;
              // console.log("hello world")
              updatePassword();
            }}
            className="hover:bg-gray-700 cursor-pointer bg-dark text-white rounded-lg  shadow border w-full px-2 py-2 "
          >
            {loading ? "Updating Password..." : "Update"}
          </button>
          <button onClick = {()=>{
            console.log("hello world") ; 
            dispatch(logout()) ; 
          }} className = "hover:bg-gray-700 cursor-pointer bg-dark text-white rounded-lg shadow border w-full px-2 py-2 mt-2">LogOut</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateAccount;
