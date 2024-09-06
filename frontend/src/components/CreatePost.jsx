// src/components/CreatePost.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8898/posts/create', new URLSearchParams({ content }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      setContent('');
      alert('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-neutral-800 p-4 rounded-lg shadow-lg max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-4 border border-gray-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-neutral-700 dark:text-white resize-none placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 shadow-sm"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          rows="4"  // Reduced height of textarea
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-all duration-300 shadow-md transform hover:scale-105"
        >
          Post
        </button>
      </form>
    </div>
  );   
};

export default CreatePost;
