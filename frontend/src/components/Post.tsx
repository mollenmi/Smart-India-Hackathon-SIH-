import React, { useState } from 'react';
import { FaHeart, FaRegHeart, FaRegComment, FaBookmark, FaRegBookmark, FaEllipsisH, FaPaperPlane } from 'react-icons/fa';
import { PostType, CommentType } from '../types';

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<CommentType[]>(post.commentList || []);
  
  const handleLike = () => {
    setLiked(!liked);
  };
  
  const handleSave = () => {
    setSaved(!saved);
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    
    const newComment: CommentType = {
      id: Date.now(),
      username: 'current_user',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      text: commentText,
      timestamp: new Date().toISOString(),
    };
    
    setComments([...comments, newComment]);
    setCommentText('');
    setShowComments(true);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      {/* Post Header with gradient background */}
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-white to-gray-100">
        <div className="flex items-center">
          <img 
            src={post.avatar} 
            alt={post.username} 
            className="w-8 h-8 rounded-full object-cover mr-2 border-2 border-secondary"
          />
          <span className="font-medium text-primary">{post.username}</span>
        </div>
        <button className="text-primary hover:text-secondary">
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
      <div className="p-3 bg-white">
        <div className="flex justify-between mb-2">
          <div className="flex space-x-4">
            <button 
              onClick={handleLike}
              className={`${liked ? 'text-primary' : 'text-gray-700 hover:text-primary'} transition-colors`}
            >
              {liked ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
            </button>
            <button 
              className="text-gray-700 hover:text-secondary transition-colors"
              onClick={toggleComments}
            >
              <FaRegComment size={24} />
            </button>
          </div>
          <button 
            onClick={handleSave}
            className={`${saved ? 'text-secondary' : 'text-gray-700 hover:text-secondary'} transition-colors`}
          >
            {saved ? <FaBookmark size={24} /> : <FaRegBookmark size={24} />}
          </button>
        </div>
        
        {/* Likes count */}
        <div className="font-medium mb-1 text-primary">
          {liked ? post.likes + 1 : post.likes} likes
        </div>
        
        {/* Caption */}
        <div className="mb-2">
          <span className="font-medium mr-2 text-primary">{post.username}</span>
          <span>{post.caption}</span>
        </div>
        
        {/* Comments count button */}
        <button 
          className="text-secondary font-medium text-sm mb-2 hover:text-primary transition-colors"
          onClick={toggleComments}
        >
          View all {comments.length + post.comments} comments
        </button>
        
        {/* Comments section */}
        {showComments && (
          <div className="mt-2 border-t border-gray-200 pt-2">
            <div className="max-h-40 overflow-y-auto mb-3">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="flex items-start mb-2">
                    <img 
                      src={comment.avatar} 
                      alt={comment.username} 
                      className="w-6 h-6 rounded-full mr-2 mt-1 border border-gray-200"
                    />
                    <div>
                      <div>
                        <span className="font-medium text-sm mr-2 text-primary">{comment.username}</span>
                        <span className="text-sm">{comment.text}</span>
                      </div>
                      <div className="text-gray-400 text-xs mt-1">
                        {new Date(comment.timestamp).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-sm text-center py-2">
                  No comments yet. Be the first to comment!
                </div>
              )}
            </div>
            
            {/* Add comment input */}
            <div className="flex items-center mt-2 border-t border-gray-200 pt-3">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 border-none text-sm focus:ring-0 bg-transparent"
              />
              <button 
                className={`ml-2 ${commentText.trim() ? 'text-secondary hover:text-primary' : 'text-gray-300'} transition-colors`}
                disabled={!commentText.trim()}
                onClick={handleComment}
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        )}
        
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