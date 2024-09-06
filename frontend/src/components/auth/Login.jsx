import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginRequest = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:8898/auth/login', loginRequest, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setMessage('Successfully logged in!');
        console.log('User:', response.data);
		navigate("/home");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage('Invalid username or password');
      } else {
        setMessage('An error occurred during login');
      }
    }
  };

  return (
	<div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
	  <div className="max-w-md mx-auto bg-white shadow-2xl rounded-lg p-8 transform transition-transform hover:scale-105 duration-300">
		<h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
		  Login
		</h2>
		<form onSubmit={handleLogin}>
		  {/* Username Input */}
		  <div className="mb-6">
			<label
			  className="block text-gray-700 text-sm font-bold mb-2"
			  htmlFor="username"
			>
			  Username
			</label>
			<input
			  type="text"
			  id="username"
			  className="shadow-md appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400"
			  value={username}
			  onChange={(e) => setUsername(e.target.value)}
			  placeholder="Enter your username"
			  required
			/>
		  </div>
  
		  {/* Password Input */}
		  <div className="mb-6">
			<label
			  className="block text-gray-700 text-sm font-bold mb-2"
			  htmlFor="password"
			>
			  Password
			</label>
			<input
			  type="password"
			  id="password"
			  className="shadow-md appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400"
			  value={password}
			  onChange={(e) => setPassword(e.target.value)}
			  placeholder="Enter your password"
			  required
			/>
		  </div>
  
		  {/* Submit Button */}
		  <div className="flex justify-center">
			<button
			  type="submit"
			  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
			>
			  Login
			</button>
		  </div>
  
		  {/* Links to Register */}
		  <div className="flex flex-col space-y-4 mt-6 text-center">
			<span>
			  Register as Alumni?{" "}
			  <Link to="/register-alumni" className="text-purple-600 hover:underline">
				Register as Alumni
			  </Link>
			</span>
			<span>
			  Register as Student?{" "}
			  <Link to="/register-student" className="text-purple-600 hover:underline">
				Register as Student
			  </Link>
			</span>
		  </div>
		</form>
  
		{/* Error Message */}
		{message && (
		  <p className="mt-4 text-center text-red-600 font-semibold">
			{message}
		  </p>
		)}
	  </div>
	</div>
  );  
};

export default Login;
