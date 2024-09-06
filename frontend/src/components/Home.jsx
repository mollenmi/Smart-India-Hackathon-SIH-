import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import CategoryPill from "./CategoryPill";
import Navbar from "./Navbar";
import Sidebar from './Sidebar';
import CreatePost from "./CreatePost";
import Feed from "./Feed";  // Import Feed component
import RootPage from "./RootPage";

import { categories } from "../constants";

export default function Home() {
  const [activeTab, setActiveTab] = useState('feed'); // Default to 'feed' tab
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (window.innerWidth >= 768) setIsSidebarOpen(true);
  }, []);

  const handleTabChange = (tab) => {
    if (tab === 'generalChat') {
      window.location.href = 'http://localhost:9090'; // Direct navigation to URL
    }
  };

  return (
    <div className="max-h-screen flex flex-col overflow-hidden dark:bg-neutral-900">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
  
        <div
          onClick={toggleSidebar}
          className={`md:hidden ${
            !isSidebarOpen && "opacity-0 pointer-events-none"
          } transition-all bg-black bg-opacity-50 h-screen w-full fixed left-0 top-0 z-20`}
        ></div>
        
        <div
          className={`flex-1 px-6 py-4 overflow-x-hidden ${
            isSidebarOpen ? "hide_thumb" : "scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-600"
          }`}
        >
          {/* Tab Navigation */}
          <div className="flex gap-6 py-3 border-b border-gray-300 dark:border-neutral-700 mb-4">
            <button
              onClick={() => handleTabChange('feed')}
              className={`py-2 px-6 text-lg font-semibold rounded-lg ${
                activeTab === 'feed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
              } transition-colors duration-300`}
            >
              Feed
            </button>
            <button
              onClick={() => handleTabChange('generalChat')}
              className={`py-2 px-6 text-lg font-semibold rounded-lg ${
                activeTab === 'generalChat' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
              } transition-colors duration-300`}
            >
              General Chat
            </button>
          </div>
          
          {/* Conditional Rendering Based on Active Tab */}
          {activeTab === 'feed' && (
            <div className="space-y-4">
              <CreatePost />
              <div className="sticky top-0 z-20 bg-white dark:bg-neutral-900 shadow-md rounded-lg p-4 mb-4">
                <div className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-600">
                  {categories.map((category) => (
                    <CategoryPill key={category} category={category} />
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <Feed />
              </div>
            </div>
          )}
  
          {activeTab === 'generalChat' && (
            <div className="mt-4">
              <GeneralChat />
            </div>
          )}
        </div>
      </div>
    </div>
  );  
}
