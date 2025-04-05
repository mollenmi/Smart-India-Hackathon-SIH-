import React from 'react';
import { FaHome, FaBook, FaUserGraduate, FaVideo, FaFileAlt, FaUniversity } from 'react-icons/fa';

const LeftSidebar: React.FC = () => {
  const navigationItems = [
    { name: 'Home', icon: <FaHome size={20} />, link: '/', active: true },
    { name: 'Virtual Classroom', icon: <FaBook size={20} />, link: '/classroom', active: false },
    { name: 'Alumni Connect', icon: <FaUserGraduate size={20} />, link: '/alumni', active: false },
    { name: 'Seminar/Webinars', icon: <FaVideo size={20} />, link: '/webinars', active: false },
    { name: 'Notes & PYQs', icon: <FaFileAlt size={20} />, link: '/notes', active: false },
    { name: 'Library', icon: <FaUniversity size={20} />, link: '/library', active: false },
  ];

  return (
    <div className="p-4 h-full bg-white shadow-sm">
      {/* Logo and Brand Styling - Improved */}
      <div className="flex items-center justify-center mb-10 mt-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-xl font-bold shadow-md">
          BC
        </div>
      </div>
      
      <div className="font-bold text-xl mb-6 text-center text-primary">BeyondClassroom</div>
      
      <nav className="mt-8">
        <ul className="space-y-2">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <a 
                href={item.link} 
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-gray-100 text-primary font-medium shadow-sm border-l-4 border-primary' 
                    : 'hover:bg-gray-100 hover:text-primary'
                }`}
              >
                <span className={`mr-4 ${item.active ? 'text-secondary' : 'text-gray-500'}`}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* User Profile Section at Bottom - Improved */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
            <img 
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="Your profile" 
              className="w-10 h-10 rounded-full mr-3 border border-secondary"
            />
            <div>
              <div className="font-medium text-primary">current_user</div>
              <div className="text-xs text-gray-500">View your profile</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar; 