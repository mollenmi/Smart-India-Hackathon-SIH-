import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './alumni.css';
import alumni1 from '../../../assets/alumni1.jpg';
import alumni2 from '../../../assets/alumni2.jpg';
import alumni3 from '../../../assets/alumni3.jpg';
import alumni4 from '../../../assets/alumni4.png';
import alumni5 from '../../../assets/alumni5.jpg';
import { useNavigate,Link } from 'react-router-dom';

export const Alumni=()=>{
  const navigate=useNavigate();
  const signupLink=()=>{
      navigate("./signup");
 }
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
      
    return(
         <div className='carousel'>
            <h1>MEET OUR ALUMNI</h1>
            <Carousel 
            responsive={responsive}>
            
               <div className='alumni-card'>
                <img className='alumni-img' src={alumni1} alt="Alumni img" />
                <p className='name'>Ayushi Sharma</p><br/>
                <p>Placed at Accenture</p>
                <p>Batch : 2022</p>

              
               </div>
               <div className='alumni-card'>
               <img className='alumni-img'  src={alumni2} alt="Alumni img" />
               
                <p className='name'>Aadit Bhardwaj</p><br/>
                <p>PLaced at Infosys</p>
                <p>Batch : 2020</p>
               
             
               </div >
               <div className='alumni-card'>
               <img className='alumni-img'  src={alumni3} alt="Alumni img" />
               
                <p className='name'>Ayush Shankar Pathak</p><br/>
                <p>Placed at TCS</p>
                <p>Batch : 2020</p>

              
               </div>
               <div className='alumni-card'>
               <img className='alumni-img' src={alumni4} alt="Alumni img" />
               
                <p className='name'>Gautam Arya</p><br/>
                <p>Accenture</p>
                <p>Batch : 2021</p>
              
               </div>
               <div className='alumni-card'>
               <img className='alumni-img'  src={alumni5} alt="Alumni img" />
               
                <p className='name'>Pranav Gandhi</p><br/>
                <p>Algoworks</p>
                <p>Batch : 2020</p>
              
               </div>
      </Carousel>
      <br/>
      <br/>
      <div className='Btn-div'>
          <button className='Btn' onClick={signupLink}>Let's Connect</button>
         </div>
         <br/>
         <br/>
         </div>
        
    )
}