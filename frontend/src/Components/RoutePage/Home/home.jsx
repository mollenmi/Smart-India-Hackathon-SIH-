import React from "react";
import  bc_logo_lm from '../../../assets/bc_logo_lm.png'; 
import  bc_logo_dm from '../../../assets/bc_logo_dm.png'; 
import "./home.css";
import '../Navbar/navbar.jsx';
import { useNavigate,Link } from "react-router-dom";

export const Home = () => {

  const navigate=useNavigate();
  const signupLink=()=>{
      navigate("./signup");
 }

  return (
   
    <section id='home' className="home">
      <div className="content">
      <div className="col-md-6">
        <h1 >From Alumni Support <br/> to Student Success </h1>  
        <p className='definition'>
        Get guidance , access placement support and connect <br/>with professionals from your college , communities and <br/> beyond . 
      </p>
        <button className="connectBtn" onClick={signupLink}>Sign Up to Connect</button>
      </div>
      <div className="bclogo">
        <img 
        className="bclogo" 
       
        src={bc_logo_lm} 
        alt="BC Logo"
       />
       </div>
       </div>
  
      
    </section>
  );
};

    