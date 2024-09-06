// src/components/Navbar.jsx

import { Menu, Mic, MoonStar, Search, Sun } from "lucide-react";
import Logo from "../assets/logo.png";
import UserImg from "../assets/user.jpg";
import { useEffect, useState } from "react";
import CreatePost from "./CreatePost";

const Navbar = ({ toggleSidebar }) => {
  // Initialize dark mode state based on localStorage value
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Effect to update body class and localStorage when dark mode state changes
  useEffect(() => {
    document.body.classList[isDarkMode ? "add" : "remove"]("dark");
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Function to toggle dark mode state
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-neutral-900">
      <nav className="flex items-center justify-between py-2 px-4">
        {/* Rendering left section of the navbar */}
        <HeaderLeftSection toggleSidebar={toggleSidebar} />

        
        {/* User and dark mode toggle section */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-neutral-200 hover:dark:bg-neutral-700"
          >
            {isDarkMode ? (
              <Sun className="dark:text-neutral-400" />
            ) : (
              <MoonStar className="dark:text-neutral-400" />
            )}
          </button>
          <img
            className="w-8 h-8 rounded-full cursor-pointer"
            src={UserImg}
            alt="User Image"
          />
        </div>
      </nav>
    </header>
  );
};

// Component for the left section of the navbar
export const HeaderLeftSection = ({ toggleSidebar }) => {
  return (
    <div className="flex gap-4 items-center">
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-full hover:bg-neutral-200 hover:dark:bg-neutral-700"
      >
        <Menu className="dark:text-neutral-400" />
      </button>
      <a className="flex items-center gap-2" href="#">
        <img src={Logo} width={32} alt="Logo" />
        <h2 className="text-xl font-bold dark:text-neutral-300">Beyond Class</h2>
      </a>
    </div>
  );
};

export default Navbar;
