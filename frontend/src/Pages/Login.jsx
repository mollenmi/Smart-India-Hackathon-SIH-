import React, { useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { MdNumbers, MdEmail} from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import './Signup.css';
import { useNavigate ,Link} from "react-router-dom";

export default function Login(){

  const navigate=useNavigate();
  const signupLink=()=>{
    navigate("/signup");
  };
  return(
    <div class='page'>
      <div className='wrapper'>
     

     {/* Login page */}
 
       <div className='form-box login'>
         <form >
           <p className="form-heading">Sign In</p>
           <div className="input-box">
             <input type='text' placeholder="Username" required/>
             <FaUserGraduate className="icon"/>
           </div>
           <div className="input-box">
             <input type='password' placeholder="Password" required/>
             <RiLockPasswordFill className="icon"/>
           </div>
 
           <div className="remember-forgot">
             <label><input type='checkbox' />Remember me</label>
             <a href="#" >Forgot password?</a>
           </div>
           <button type='submit' >Sign In</button>
           <br/><br/>
           <div className='signup-link'>
             <p className="account">Don't have an account? <Link onClick={signupLink}>Signup</Link></p>
           </div>
         </form>
       </div>
     
       
       
     </div>
    </div>
  );
};

