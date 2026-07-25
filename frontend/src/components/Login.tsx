import {login , logout} from "../auth/user"; 
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {useSelector , useDispatch} from "react-redux"

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch() ;
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate() ; 

  // Handle input changes
  const handleChange = (e : any ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e : any ) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Replace this URL with your actual backend authentication endpoint
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid email or password');
      }

      // Handle successful login (e.g., save JWT to localStorage and redirect)
      localStorage.setItem('token', data.token);
      localStorage.setItem("user" , JSON.stringify(data.user));
      const payload = {...data.user , isAuthenticated : true}
      dispatch(login(payload)) ; 
      // console.log("this is using redux " + email) ; 
      
      // console.log('Login successful!', data.user);
      
      // Redirect user or update global auth state here
      // window.location.href = '/dashboard';
      navigate('/dashboard') ; 

    } catch (err : any ) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar/>
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Sign In</h2>
        
        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}
              {/* <div>
                {username} - {id } - {email} 
              </div> */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;