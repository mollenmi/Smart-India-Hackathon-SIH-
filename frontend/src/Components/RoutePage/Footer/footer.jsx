import React from "react";
import './footer.css';
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";


export const Footer=()=>{
    return(
        <footer className='footer'>
            <div className='footer-content'>
            <div className='flex'>
            <div>
                <p className='header'>About Beyond Classroom</p>
                <p className="quote">Empowering Students,<br/>Connecting Alumni</p>
                <p className='description'>Beyond Classroom is a platform <br/>
designed to bridge the gap between <br/>
students and alumni, offering <br/>
mentorship, career guidance, and<br/>
community engagement.</p>
            </div>

            <div>
                <p className='header'>Quick Links</p>
                    <a>Home</a><br/><br/>
                    <a>About Us</a><br/><br/>
                    <a>Our Features</a><br/><br/>
                    <a>Meet Our Alumni</a><br/><br/>
                    
               
            </div>
            <div>
                <p className='header'>Resources</p>
                    <a>Blog</a><br/><br/>
                    <a>FAQs</a><br/><br/>
                    <a>Privacy Policy</a><br/><br/>
                    <a>Terms & Conditions</a><br/>
               
            </div>
            <div className='socials'>
                <p className='header'>Socials</p>
                <a href='/'><MdEmail/></a><br/>
                <a href='www.instagram.com'><FaInstagram/></a><br/>
                <a href='/'><FaFacebook/></a><br/>
                <a href='/'><FaLinkedin/></a><br/>
                <a href='/'><FaYoutube/></a><br/>
            </div>
            </div>
            
           
            <p className="copyright">© 2024 Beyond Classroom. All rights reserved.</p>
            </div>
        </footer>
    )
}
