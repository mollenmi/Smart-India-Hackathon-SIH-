import React, { useEffect, useState } from 'react';
import { fetchFeed, likePost, addComment } from '../components/Post';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFeed();
  }, [page]);

  const loadFeed = async () => {
    setLoading(true);
    setError(null);
    try {
      const feedData = await fetchFeed(page);
      setPosts(feedData.content); // Adjust based on your actual response structure
    } catch (error) {
      setError('Error loading feed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      await likePost(postId, userId);  // Pass userId with the like request
      loadFeed(); // Reload feed to reflect the updated like count
    } catch (error) {
      setError('Error liking post. Please try again.');
    }
  };

  const handleComment = async (postId, text) => {
    if (text.trim() === '') return; // Prevent empty comments
    try {
      await addComment(postId, text);
      loadFeed(); // Reload feed to reflect the new comment
    } catch (error) {
      setError('Error adding comment. Please try again.');
    }
  };

  return (
    <div className="p-5 max-w-2xl mx-auto bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Latest Posts</h2>
      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      <ul className="space-y-6">
        {posts.length === 0 && !loading && <p className="text-center text-gray-500">No posts available.</p>}
        {posts.map(post => (
          <li key={post.id} className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <p className="mb-4 text-gray-700 text-lg leading-relaxed">{post.content}</p>
            
            <button
              onClick={() => handleLike(post.id)}
              className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block"
            >
              👍 Like ({post.likedBy.length})
            </button>
            
            {/* Comment section */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Add a comment..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleComment(post.id, e.target.value);
                    e.target.value = ''; // Clear input after submission
                  }
                }}
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
              />
              <div className="mt-4">
                {post.comments.length === 0 && (
                  <p className="text-sm text-gray-400">No comments yet.</p>
                )}
                {post.comments.map((comment, index) => (
                  <p key={index} className="text-sm text-gray-600 mt-1">
                    {comment.text}
                  </p>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );  
};

export default Feed;
