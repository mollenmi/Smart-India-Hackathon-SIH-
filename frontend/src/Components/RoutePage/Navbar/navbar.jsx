import React, { useState } from "react";
import "./navbar.css"; 
import logo from '../../../assets/gu_logo.png'; 
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useNavigate ,Link} from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleMode=()=>{
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  const navigate=useNavigate();
  const aboutLink=()=>{
      navigate("./about");
 }
  const featLink=()=>{
      navigate("./features");
 }
  const alumniLink=()=>{
      navigate("./alumni");
 }
  const loginLink=()=>{
      navigate("./login");
 }

  return (
   
      <nav className="navBar"> 
      <img className="logo" src={logo} alt="Logo" /> 
      <div className="menu"> 
        <div className="menuBtn" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? (
          <RxCross2 size={35} color={darkMode ? "white" : "black"}
          />
        ) : (
          <RxHamburgerMenu  size={35} color={darkMode ? "white" : "black"}
          />
        )}
      </div>
        <ul
          className={`menuItems ${menuOpen ? "menuOpen" : ""}`} 
          onClick={() => setMenuOpen(false)}
        >
          <li>
            <a onClick={aboutLink}>About</a>
          </li>
          <li>
            <a onClick={featLink}>Features</a>
          </li>
          <li>
            <a onClick={alumniLink}>Alumni</a>
          </li>
          <div className={darkMode? 'dark':'light'}>
          <i onClick={toggleMode} >
            {darkMode ? <MdLightMode className="icon" /> : <MdDarkMode className="icon"/>}
          </i>
          </div>
          
            <button className="loginBtn" onClick={loginLink}>Login</button>
        </ul>
      </div>
    </nav>
   
    
  );
};
