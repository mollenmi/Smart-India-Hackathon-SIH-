import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerSection}>
          <h3>About Beyond Classroom</h3>
          <p>
            Beyond Classroom is a platform that bridges the gap between students
            and alumni, providing mentorship, networking, and career guidance.
          </p>
        </div>

        <div className={styles.footerSection}>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/events">Events</a></li>
            <li><a href="/mentorship">Mentorship</a></li>
            <li><a href="/careers">Career Opportunities</a></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Contact Us</h3>
          <p>Email: info@beyondclassroom.com</p>
          <p>Phone: +1 (123) 456-7890</p>
          <p>Address: Galgotias University, Greater Noida</p>
        </div>

        <div className={styles.footerSection}>
          <h3>Follow Us</h3>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>&copy; {new Date().getFullYear()} Beyond Classroom. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;