import React from 'react';
import { FaHome, FaBook, FaUserGraduate, FaVideo, FaFileAlt, FaUniversity } from 'react-icons/fa';

const LeftSidebar: React.FC = () => {
  const navigationItems = [
    { name: 'Home', icon: <FaHome size={20} />, link: '/' },
    { name: 'Virtual Classroom', icon: <FaBook size={20} />, link: '/classroom' },
    { name: 'Alumni Connect', icon: <FaUserGraduate size={20} />, link: '/alumni' },
    { name: 'Seminar/Webinars', icon: <FaVideo size={20} />, link: '/webinars' },
    { name: 'Notes & PYQs', icon: <FaFileAlt size={20} />, link: '/notes' },
    { name: 'Library', icon: <FaUniversity size={20} />, link: '/library' },
  ];

  return (
    <div className="p-4 h-full">
      <div className="font-bold text-2xl mb-8 pl-2">BeyondClassroom</div>
      <nav>
        <ul>
          {navigationItems.map((item, index) => (
            <li key={index} className="mb-4">
              <a 
                href={item.link} 
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-gray-600 mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default LeftSidebar; 