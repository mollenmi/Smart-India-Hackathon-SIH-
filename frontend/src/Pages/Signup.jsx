import React, { useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { MdNumbers, MdEmail} from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import './Signup.css';

const Signup=()=>{

  const[action, setAction]=useState('signup');
  const signupLink = () => {
    setAction('');
  };

  const loginLink = () => {
    setAction('active');
  };
 
  return(
    <div href='/signup' className={`wrapper ${action}`}>
      

      {/* Signup page */}
      <div className='form-box signup'>
        <form action="">
          <p className="form-heading">Sign Up</p>
          <div className="input-box">
            <input type='text' placeholder="Username" required/>
            <FaUserGraduate className="icon"/>
          </div>
          <div className="input-box">
            <input type='email' placeholder="Email" required/>
            <MdEmail className="icon"/>
          </div>
          <div className="input-box">
            <input type='text' placeholder="Admission Number" required/>
            <MdNumbers className="icon"/>
          </div>
          <div className="input-box">
            <input type='password' placeholder="Password" required/>
            <RiLockPasswordFill className="icon"/>
          </div>

          <div className="remember-forgot">
            <label><input type='checkbox' />I agree to the terms & conditions.</label>
            
          </div>
          <button type='submit'>Sign Up</button>

          <div className='signup-link'>
            <p className="account">Already have an account? <a href='#' onClick={signupLink}>Login</a></p>
          </div>
        </form>
      </div>
     

    {/* Login page */}

      <div className='form-box login'>
        <form action="">
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
            <p className="account">Don't have an account? <a href='#' onClick={loginLink}>Signup</a></p>
          </div>
        </form>
      </div>
    
      
      
    </div>
  );
};

export default Signup;