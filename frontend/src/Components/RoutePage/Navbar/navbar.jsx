import React, { useState } from "react";
import "./navbar.css"; 
import logo from '../../../assets/gu_logo.png'; 
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleMode=()=>{
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  return (
   
      <nav className="navBar"> 
      <img className="logo" src={logo} alt="Logo" /> 
      <div className="menu"> 
        <div className="menuBtn" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? (
          <RxCross2 size={30} color="black" />
        ) : (
          <RxHamburgerMenu  size={30} color="black" />
        )}
      </div>
        <ul
          className={`menuItems ${menuOpen ? "menuOpen" : ""}`} 
          onClick={() => setMenuOpen(false)}
        >
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#alumni">Alumni</a>
          </li>
          <div className={darkMode? 'dark':'light'}>
          <i onClick={toggleMode} >
            {darkMode ? <MdLightMode className="icon" /> : <MdDarkMode className="icon"/>}
          </i>
          </div>
          
            <button className="loginBtn">Login</button>
        </ul>
      </div>
    </nav>
   
    
  );
};
