import React, { useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { MdNumbers, MdEmail} from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import './Signup.css';
import { useNavigate ,Link} from "react-router-dom";

 export default function Signup(){

  const navigate=useNavigate();
  const loginLink=()=>{
    navigate("/login");
  };

return(
     <div className="page">
      <div className='wrapper'>
      <div className='form-box signup'>
        <form >
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
            <p className="account">Already have an account? <Link onClick={loginLink}>Login</Link></p>
          </div>
        </form>
      </div>
    </div>
     </div>
   );
};
      

