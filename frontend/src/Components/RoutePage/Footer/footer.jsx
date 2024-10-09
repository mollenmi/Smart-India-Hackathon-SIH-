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
            <div className='col'>
                <div className='header'><p>About Beyond Classroom</p> </div>
                <div><ul>
                    <li className="quote">Empowering Students,<br/>Connecting Alumni</li>
                    <li className='description'>Beyond Classroom is a platform <br/>
                designed to bridge the gap between <br/>
                students and alumni, offering <br/>
                mentorship, career guidance, and<br/>
                community engagement.</li></ul>
                </div>
            </div>
           
            
          
                
            <div className='col'>
            <div  className='header'><p>Quick Links</p></div>
            <div><ul><li><a href='#home'>Home</a></li>
                     <li><a href='#about'>About Us</a></li>
                     <li><a href='#features'>Our Features</a></li>
                     <li><a href='#alumni'>Meet Our Alumni</a></li></ul></div>
                    </div>

            <div className='col'>
            <div  className='header'><p>Resources</p></div>
            <div><ul> <li><a href='#blog'>Blog</a></li>
                      <li><a href='#faqs'>FAQs</a></li>
                      <li><a href='#pp'>Privacy Policy</a></li>
                      <li><a href='#t&c'>Terms & Conditions</a></li></ul></div>
                    </div>
            
            <div className="col">
            <div className='header'><p >Socials</p></div>
                <div><ul><li><a href='/'><MdEmail/></a></li>
                         <li><a href='www.instagram.com'><FaInstagram/></a></li>
                         <li><a href='/'><FaFacebook/></a></li>
                         <li><a href='/'><FaLinkedin/></a></li>
                         <li><a href='/'><FaYoutube/></a></li></ul></div>
            </div>
            </div>
            </div>
           
            
            <div>
            <p className="copyright">© 2024 Beyond Classroom. All rights reserved.</p>
            </div>
        </footer>
    )
}
