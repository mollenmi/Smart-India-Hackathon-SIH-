import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./Navbar.module.css";
import { getImageUrl } from "../../../utils";
import bc from "../../.././components/RoutePage/Navbar/gu_logo.png"

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate hook

  return (
    <nav className={styles.navbar}>
      <img
        src={bc}
        alt="logo"
        className={styles.heroImg}
      />
      <div className={styles.menu}>
        <img
          className={styles.menuBtn}
          src={
            menuOpen
              ? getImageUrl("nav/closeIcon.png")
              : getImageUrl("nav/menuIcon.png")
          }
          alt="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <ul
          className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
          onClick={() => setMenuOpen(false)}
        >
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <a href="#Signup" className={styles.contactBtn}
            onClick={(e) => {
              e.preventDefault(); // Prevent default link behavior
              navigate("/login");  // Navigate to the login page
            }}
          >
            Signup
          </a>
          <a
            href="#Login"
            className={styles.contactBtn}
            onClick={(e) => {
              e.preventDefault(); // Prevent default link behavior
              navigate("/login");  // Navigate to the login page
            }}
          >
            Login
          </a>
        </ul>
      </div>
    </nav>
  );
};
