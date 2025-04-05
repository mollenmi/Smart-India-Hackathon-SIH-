import React from 'react';
import { FaLaptopCode, FaDatabase, FaCode, FaRobot, FaShieldAlt, FaCloud, FaPlus } from 'react-icons/fa';

const RightSidebar: React.FC = () => {
  const communities = [
    { name: 'Machine Learning', icon: <FaLaptopCode size={18} />, members: 5432, joined: false },
    { name: 'Data Science', icon: <FaDatabase size={18} />, members: 4865, joined: false },
    { name: 'Web Development', icon: <FaCode size={18} />, members: 7298, joined: true },
    { name: 'AI/ML', icon: <FaRobot size={18} />, members: 6574, joined: false },
    { name: 'Cybersecurity', icon: <FaShieldAlt size={18} />, members: 3921, joined: true },
    { name: 'Cloud Computing', icon: <FaCloud size={18} />, members: 4356, joined: false },
  ];

  return (
    <div className="p-4 h-full bg-white">
      <div className="font-bold text-xl mb-6 text-center text-primary">Communities</div>
      <div className="space-y-4">
        {communities.map((community, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
          >
            <div className="flex items-center">
              <div className="text-primary mr-3">{community.icon}</div>
              <div>
                <div className="font-medium">{community.name}</div>
                <div className="text-sm text-gray-500">{community.members.toLocaleString()} members</div>
              </div>
            </div>
            
            {community.joined ? (
              <button className="px-3 py-1 rounded-full text-sm joined-button">
                Joined
              </button>
            ) : (
              <button className="px-3 py-1 rounded-full text-sm flex items-center join-button">
                <FaPlus className="mr-1" size={12} /> Join
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 px-2 text-center">
        <button className="text-primary hover:text-secondary font-medium text-sm transition-colors">
          Discover more communities
        </button>
      </div>
    </div>
  );
};

export default RightSidebar; 