import React from 'react';
import LeftSidebar from './LeftSidebar';
import Feed from './Feed';
import RightSidebar from './RightSidebar';

const HomePage: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-[#EEEEEE]">
      {/* Left Sidebar */}
      <div className="hidden md:block w-64 fixed h-full z-10 border-r border-tertiary">
        <LeftSidebar />
      </div>
      
      {/* Main Content - Feed */}
      <div className="md:ml-64 md:mr-72 w-full">
        <Feed />
      </div>
      
      {/* Right Sidebar - wider now (w-72 instead of w-64) */}
      <div className="hidden lg:block w-72 fixed right-0 h-full bg-white shadow-sm border-l border-tertiary">
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage; 