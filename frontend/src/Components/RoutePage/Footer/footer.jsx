import React from "react";
import './footer.css';
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { useNavigate,Link } from "react-router-dom";

export const Footer=()=>{

  const navigate=useNavigate();
  const homeLink=()=>{
        navigate("./home");
   }
  const aboutLink=()=>{
      navigate("./about");
 }
  const featLink=()=>{
      navigate("./features");
 }
  const alumniLink=()=>{
      navigate("./alumni");
 }
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
            <div><ul><li onClick={homeLink}>Home</li>
                    <li onClick={aboutLink}>About Us</li>
                    <li onClick={featLink}>Our Features</li>
                    <li onClick={alumniLink}>Meet Our Alumni</li></ul></div>
                    </div>

            <div className='col'>
            <div  className='header'><p>Resources</p></div>
            <div><ul><li>Blog</li>
                    <li>FAQs</li>
                    <li>Privacy Policy</li>
                    <li>Terms & Conditions</li></ul></div>
                    </div>
            
            <div className="col">
            <div className='header'><p >Socials</p></div>
                <div><ul><li><a href='/'><MdEmail/></a></li><br/>
                <li><a href='www.instagram.com'><FaInstagram/></a></li><br/>
                <li><a href='/'><FaFacebook/></a></li><br/>
                <li><a href='/'><FaLinkedin/></a></li><br/>
                <li><a href='/'><FaYoutube/></a></li><br/></ul></div>
            </div>
            </div>
            </div>
           
            
            <div>
            <p className="copyright">© 2024 Beyond Classroom. All rights reserved.</p>
            </div>
        </footer>
    )
}
