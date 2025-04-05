import React, { useState, useRef } from 'react';
import { FaCamera, FaVideo, FaTimes, FaSmile, FaPlus } from 'react-icons/fa';
import { PostType } from '../types';

interface CreatePostProps {
  onPostCreate: (post: PostType) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreate }) => {
  const [caption, setCaption] = useState('');
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const [currentStep, setCurrentStep] = useState<'initial' | 'media' | 'caption'>('initial');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileType = file.type.split('/')[0];
    
    if (fileType === 'image' || fileType === 'video') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
        setMediaType(fileType as 'image' | 'video');
        setCurrentStep('caption');
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload an image or video file');
    }
  };

  const handleSubmitPost = () => {
    if (!mediaPreview) return;
    
    const newPost: PostType = {
      id: Date.now(),
      username: 'current_user',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      imageUrl: mediaPreview,
      caption,
      likes: 0,
      comments: 0,
      timestamp: new Date().toISOString(),
      commentList: [],
    };
    
    onPostCreate(newPost);
    
    // Reset form
    setCaption('');
    setMediaPreview(null);
    setMediaType(null);
    setCurrentStep('initial');
  };

  const handleCancel = () => {
    setCaption('');
    setMediaPreview(null);
    setMediaType(null);
    setCurrentStep('initial');
  };

  const triggerFileInput = (type: 'image' | 'video') => {
    setCurrentStep('media');
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      {currentStep === 'initial' && (
        <>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-primary flex items-center">
              <FaPlus className="mr-2 text-secondary" /> Create Post
            </h3>
          </div>
          <div className="flex items-center mb-4">
            <img 
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="Your profile" 
              className="w-10 h-10 rounded-full mr-3 border-2 border-secondary"
            />
            <div 
              className="flex-1 p-2.5 bg-gray-100 rounded-full text-gray-500 cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => setCurrentStep('caption')}
            >
              What's on your mind?
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <button 
              className="flex items-center justify-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={() => triggerFileInput('image')}
            >
              <FaCamera className="text-secondary mr-2" />
              <span className="font-medium text-primary">Photo</span>
            </button>
            
            <button 
              className="flex items-center justify-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={() => triggerFileInput('video')}
            >
              <FaVideo className="text-primary mr-2" />
              <span className="font-medium text-primary">Video</span>
            </button>
            
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,video/*"
              className="hidden"
            />
          </div>
        </>
      )}
      
      {(currentStep === 'media' || currentStep === 'caption') && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg text-primary flex items-center">
              <FaPlus className="mr-2 text-secondary" /> Create Post
            </h3>
            <button 
              className="text-gray-500 hover:text-primary p-1.5 transition-colors"
              onClick={handleCancel}
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="border-b border-gray-200 pb-3">
            <div className="flex items-center">
              <img 
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="Your profile" 
                className="w-10 h-10 rounded-full mr-3 border border-secondary"
              />
              <span className="font-medium text-primary">current_user</span>
            </div>
          </div>
          
          <textarea
            placeholder="What's on your mind?"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full border-none focus:ring-0 resize-none h-20 bg-gray-100 rounded-md p-2"
          />
          
          {mediaPreview && (
            <div className="relative">
              {mediaType === 'image' ? (
                <img
                  src={mediaPreview}
                  alt="Post preview"
                  className="w-full rounded-lg object-cover max-h-80 border border-gray-200"
                />
              ) : (
                <video
                  src={mediaPreview}
                  controls
                  className="w-full rounded-lg object-cover max-h-80 border border-gray-200"
                />
              )}
              <button 
                className="absolute top-2 right-2 bg-primary bg-opacity-70 text-white rounded-full p-1"
                onClick={() => {
                  setMediaPreview(null);
                  setMediaType(null);
                }}
              >
                <FaTimes />
              </button>
            </div>
          )}
          
          <div className="flex items-center justify-between border-t border-gray-200 pt-3">
            <div className="flex items-center">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <FaCamera className="text-secondary" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <FaSmile className="text-secondary" />
              </button>
            </div>
            
            <button
              className={`px-4 py-2 rounded-lg font-medium ${
                mediaPreview && caption 
                  ? 'bg-primary text-white hover:bg-secondary transition-colors' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!mediaPreview || !caption}
              onClick={handleSubmitPost}
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost; 