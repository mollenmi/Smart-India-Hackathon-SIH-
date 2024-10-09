import React, { useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { MdNumbers, MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate, Link } from "react-router-dom";
import default_photo from "../assets/profile_picture.jpg"; // Import your default photo
import axios from "axios";
import "./Signup.css";

const BASE_URL = 'http://localhost:8898/auth';

export default function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    admissionNumber: "",
    password: "",
    photo: null,
  });
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setError("");
    setIsSuccess(false);

    try {
      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("username", formData.username);
      formPayload.append("email", formData.email);
      formPayload.append("password", formData.password);

      const defaultPhotoBlob = await fetch(default_photo).then(res => res.blob());
      const defaultPhotoFile = new File([defaultPhotoBlob], "default_photo.jpg", { type: "image/jpeg" });
      formPayload.append("photo", defaultPhotoFile);

      let response;
      // Send registration request based on user role
      if (role === "alumni") {
        formPayload.append("admissionNumber", formData.admissionNumber);
        response = await axios.post(`${BASE_URL}/register-alumni`, formPayload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else if (role === "student") {
        response = await axios.post(`${BASE_URL}/register-student`, formPayload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        response = await axios.post(`${BASE_URL}/register-admin`, formPayload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      // Check for successful response
      if (response.status >= 202 && response.status < 300) {
        localStorage.setItem("token", response.data.auth.jwt);
        setIsSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="page">
      <div className="wrapper">
        <div className="form-box signup">
          <form onSubmit={handleSubmit}>
            <p className="form-heading">Sign Up</p>
            {error && <p className="error-message">{error}</p>}
            {isSuccess && <p className="success-message">Registration successful! Redirecting...</p>}

            <div className="input-box">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <FaUserGraduate className="icon" />
            </div>

            <div className="input-box">
              <input
                type="text"
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
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <MdEmail className="icon" />
            </div>

            {role === "alumni" && (
              <div className="input-box">
                <input
                  type="text"
                  name="admissionNumber"
                  placeholder="Admission Number"
                  value={formData.admissionNumber}
                  onChange={handleChange}
                  required
                />
                <MdNumbers className="icon" />
              </div>
            )}

            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <RiLockPasswordFill className="icon" />
            </div>

            <div className="role-selection">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={role === "student"}
                  onChange={handleRoleChange}
                />
                Student
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="alumni"
                  checked={role === "alumni"}
                  onChange={handleRoleChange}
                />
                Alumni
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === "admin"}
                  onChange={handleRoleChange}
                />
                Admin
              </label>
            </div>

            <button type="submit">Sign Up</button>

            <div className="signup-link">
              <p className="account">
                Already have an account?{" "}
                <Link onClick={() => navigate("/login")}>Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
