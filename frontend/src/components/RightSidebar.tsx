import React from 'react';
import { FaLaptopCode, FaDatabase, FaCode, FaRobot, FaShieldAlt, FaCloud } from 'react-icons/fa';

const RightSidebar: React.FC = () => {
  const communities = [
    { name: 'Machine Learning', icon: <FaLaptopCode size={18} />, members: 5432 },
    { name: 'Data Science', icon: <FaDatabase size={18} />, members: 4865 },
    { name: 'Web Development', icon: <FaCode size={18} />, members: 7298 },
    { name: 'AI/ML', icon: <FaRobot size={18} />, members: 6574 },
    { name: 'Cybersecurity', icon: <FaShieldAlt size={18} />, members: 3921 },
    { name: 'Cloud Computing', icon: <FaCloud size={18} />, members: 4356 },
  ];

  return (
    <div className="p-4 h-full">
      <div className="font-bold text-xl mb-6 pl-2">Communities</div>
      <div className="space-y-4">
        {communities.map((community, index) => (
          <div 
            key={index} 
            className="flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
          >
            <div className="text-gray-600 mr-3">{community.icon}</div>
            <div>
              <div className="font-medium">{community.name}</div>
              <div className="text-sm text-gray-500">{community.members.toLocaleString()} members</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 px-2">
        <button className="text-blue-500 hover:text-blue-700 font-medium text-sm">
          Discover more communities
        </button>
      </div>
    </div>
  );
};

export default RightSidebar; 