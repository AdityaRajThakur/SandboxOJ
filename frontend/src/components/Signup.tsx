import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios" ; 
import  AxiosError from "axios" ; 
import {login } from "../auth/user"; 

import {useDispatch} from "react-redux" ; 
import toast from "react-hot-toast"; 
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch() ; 
  const responseGoogle = async (authResult: any)=>{
    setIsLoading(true) ; 
    try{
      const res = await axios.post("http://localhost:8000/google" , {
        code :authResult.code 
      });  
      console.log(res.data) ; 
      localStorage.setItem("token" , res.data.token) ; 
      toast.success(res.data.message) ; 
      localStorage.setItem("user" , JSON.stringify(res.data.user));
      const payload :{
        id : number , 
        username : string , 
        email : string , 
        isAuthenticated : boolean
      } = {...res.data.user ,isAuthenticated : true  }
      dispatch(login(payload)) ; 
      setIsLoading(false) ; 
      navigate('/') ; 
    }catch(err : any ){
      console.log(err) ; 
      toast.error("something went wrong,signup"); 
      setIsLoading(false) ;
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess : responseGoogle,
    onError :responseGoogle ,
    flow : "auth-code"
  })
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      // Replace with your actual backend registration endpoint
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Only send the necessary data to the backend
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log(data) ; 
      if (!response.ok) {
        throw new Error(data.message || "Failed to create account");
      }
      // aditya you are storing toking in localstorage, using route login to redirect. 
    //   localStorage.setItem("token", data.token);
      console.log("Registration successful!", data);

      navigate("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar/>
       <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8  space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Create an Account
        </h2>

        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <form className="space-y-2" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 font-medium text-white bg-dark rounded-md hover:bg-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
        <div className = "h-1 text-sm font-thin flex justify-center "><div>or</div></div>
        <div className = "flex justify-center mt-10">
          <button onClick={googleLogin}className = "p-2 w-full flex justify-center cursor-pointer bg-gray-100 hover:bg-gray-200 shadow-md rounded-sm p-1">
            <div className ="pr-2 pt-1"><FcGoogle /></div>
            <div>{isLoading?"Signing in with Google...":"Continue With Google"}</div>
          </button>
        </div>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-blue-600 hover:underline" >
            Sign in
          </a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Signup;
