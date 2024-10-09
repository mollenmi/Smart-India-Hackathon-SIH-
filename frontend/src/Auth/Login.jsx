import React, { useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; // Make sure axios is installed
import './Signup.css';

const BASE_URL = 'http://localhost:8898/auth'; // Adjust this to your backend URL

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error messages
    setIsSuccess(false); // Reset success state

    try {
      const response = await axios.post(`${BASE_URL}/login`, formData);

      if (response.status >= 200 && response.status < 300) {
        localStorage.setItem("token", response.data.auth.jwt); // Store the JWT token
        setIsSuccess(true); // Indicate success
        setTimeout(() => {
          navigate("/home"); // Redirect to the dashboard or another page
        }, 2000);
      }
    } catch (error) {
      console.error("Error during login:", error);
      
      // Set error message based on the response
      if (error.response && error.response.status === 401) {
        setError("Invalid username or password."); // Customize this message based on your backend response
      } else {
        setError(error.response?.data?.message || "Login failed");
      }
    }
  };

  const signupLink = () => {
    navigate("/signup");
  };

  return (
    <div className='page'>
      <div className='wrapper'>
        {/* Login page */}
        <div className='form-box login'>
          <form onSubmit={handleSubmit}>
            <p className="form-heading">Sign In</p>
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
            {isSuccess && <p className="success-message">Login successful! Redirecting...</p>}

            <div className="input-box">
              <input
                type='text'
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <FaUserGraduate className="icon" />
            </div>
            <div className="input-box">
              <input
                type='password'
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <RiLockPasswordFill className="icon" />
            </div>

            <div className="remember-forgot">
              <label><input type='checkbox' /> Remember me</label>
              <Link to="#">Forgot password?</Link>
            </div>
            <button type='submit'>Sign In</button>
            <br /><br />
            <div className='signup-link'>
              <p className="account">Don't have an account? <Link onClick={signupLink}>Signup</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
