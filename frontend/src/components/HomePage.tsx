import React from 'react';
import LeftSidebar from './LeftSidebar';
import Feed from './Feed';
import RightSidebar from './RightSidebar';

const HomePage: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="hidden md:block w-64 fixed h-full bg-white shadow-sm z-10">
        <LeftSidebar />
      </div>
      
      {/* Main Content - Feed */}
      <div className="md:ml-64 md:mr-64 w-full">
        <Feed />
      </div>
      
      {/* Right Sidebar */}
      <div className="hidden lg:block w-64 fixed right-0 h-full bg-white shadow-sm">
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage; 