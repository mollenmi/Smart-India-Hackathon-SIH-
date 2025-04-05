import React from 'react';
import { FaHeart, FaRegHeart, FaRegComment, FaBookmark, FaRegBookmark, FaEllipsisH } from 'react-icons/fa';
import { PostType } from '../types';

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [liked, setLiked] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  
  const handleLike = () => {
    setLiked(!liked);
  };
  
  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center">
          <img 
            src={post.avatar} 
            alt={post.username} 
            className="w-8 h-8 rounded-full object-cover mr-2"
          />
          <span className="font-medium">{post.username}</span>
        </div>
        <button className="text-gray-500">
          <FaEllipsisH />
        </button>
      </div>
      
      {/* Post Image */}
      <div className="w-full">
        <img 
          src={post.imageUrl} 
          alt="Post content" 
          className="w-full object-cover"
          style={{ maxHeight: '600px' }}
        />
      </div>
      
      {/* Post Actions */}
      <div className="p-3">
        <div className="flex justify-between mb-2">
          <div className="flex space-x-4">
            <button 
              onClick={handleLike}
              className={`${liked ? 'text-red-500' : 'text-gray-700'}`}
            >
              {liked ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
            </button>
            <button className="text-gray-700">
              <FaRegComment size={24} />
            </button>
          </div>
          <button 
            onClick={handleSave}
            className="text-gray-700"
          >
            {saved ? <FaBookmark size={24} /> : <FaRegBookmark size={24} />}
          </button>
        </div>
        
        {/* Likes count */}
        <div className="font-medium mb-1">
          {liked ? post.likes + 1 : post.likes} likes
        </div>
        
        {/* Caption */}
        <div className="mb-2">
          <span className="font-medium mr-2">{post.username}</span>
          <span>{post.caption}</span>
        </div>
        
        {/* Comments count */}
        <button className="text-gray-500 text-sm">
          View all {post.comments} comments
        </button>
        
        {/* Timestamp */}
        <div className="text-gray-400 text-xs mt-1">
          {new Date(post.timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </div>
      </div>
    </div>
  );
};

export default Post; 