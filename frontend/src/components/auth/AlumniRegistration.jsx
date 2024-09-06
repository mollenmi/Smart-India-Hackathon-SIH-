import React, { useState } from 'react';
import axios from 'axios';

const AlumniRegistration = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');

  const handleAlumniRegistration = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('photo', photo);

    try {
      const response = await axios.post('http://localhost:8898/auth/register-alumni', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        setMessage('Alumni registered successfully!');
      } else {
        setMessage('Unexpected response from the server.');
      }
    } catch (error) {
      setError("Error")
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-500 to-blue-500">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-2xl transform transition-transform hover:scale-105 duration-300">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Alumni Registration
        </h2>
        <form onSubmit={handleAlumniRegistration} className="space-y-5">
          {/* Name Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-sm"
            />
          </div>
  
          {/* Username Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-sm"
            />
          </div>
  
          {/* Password Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-sm"
            />
          </div>
  
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-sm"
            />
          </div>
  
          {/* Photo Upload */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Photo:</label>
            <input
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors duration-300"
          >
            Register
          </button>
        </form>
  
        {/* Success/Error Message */}
        {message && <p className="text-center mt-4 text-green-500 font-semibold">{message}</p>}
      </div>
    </div>
  );
};

export default AlumniRegistration;
