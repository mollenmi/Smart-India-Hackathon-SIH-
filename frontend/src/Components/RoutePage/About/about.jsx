import React from "react";
import './about.css';
import Card from '@mui/material/Card';


export const About = ()  =>{
    return(
        <div className="about" >
            <h1>WHY BEYOND CLASSROOM ?</h1>
            <p>Beyond Classroom is your bridge to college alumni, helping you navigate your <br/>
               academic and professional journey. From personalized mentorship to placement<br/>
               support, we've got you covered.</p>

        
            <h1>ABOUT US</h1>
            <div className='card-box'>
            <div className="card" >
       
        <div className="card-content">
        <h3 >
          Our Impact</h3><br/>
        <p>
        Our impact is measured by the<br/>
success and growth of our users.<br/>
We are proud to contribute to<br/>
the professional and personal <br/>
development of students and <br/>
alumni alike.<br/></p>

<p>Through our platform, many <br/>
students have secured internships<br/>
and job placements with top<br/>
companies thanks to the guidance<br/>
and referrals from alumni.<br/></p>

       
      </div>
    </div>
    <div className="card">
      
        <div className="card-content">
        <h3 >
          Our Vision</h3><br/>
        <p>
        Our vision is to build a global<br/>
community where students and<br/>
alumni collaborate, offering <br/>
mentorship and support that <br/>
extends beyond the classroom.<br/></p>

<p>We aim to create a network <br/>
where professional guidance and<br/>
career opportunities are easily<br/>
accessible, ensuring every<br/>
student has the chance to thrive.<br/></p>

       
      </div>
    </div>
    </div>
      </div>
    )
}