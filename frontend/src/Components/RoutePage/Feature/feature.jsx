import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './feature.css';
import cardimg1 from '../../../assets/card1.jpg';
import cardimg2 from '../../../assets/card2.png';
import cardimg3 from '../../../assets/card3.jpg';
import cardimg4 from '../../../assets/card4.jpeg';
import cardimg5 from '../../../assets/card5.jpg';


export const Feature=()=>{
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
         <div id='features' className='carousel'>
            <h1>FEATURES</h1>
            <Carousel 
            responsive={responsive}>
            
               <div className='carousel-card'>
                <img className='carousel-img' src={cardimg1} alt="Card1 img" />
                <div className='carousel-content'>
                <p className='heading'>Connect with Alumni</p>
                <p>Build meaningful relationships with
                   alumni to gain career guidance,
                   mentorship, and networking
                   opportunities.</p>
                <button class='cardBtn'>Learn more</button>
                </div>
                
             
               </div>
               <div className='carousel-card'>
               <img className='carousel-img'  src={cardimg2} alt="Card2 img" />
               <div className='carousel-content'>
               <p className='heading'>Live Events & Webinars</p>
                <p>Attend exclusive webinars and live
                   sessions hosted by industry experts
                   and alumni to enhance your learning
                   and skills.</p>
               <button class='cardBtn'>Join an event</button>
               </div>
               
             
               </div >
               <div className='carousel-card'>
               <img className='carousel-img'  src={cardimg3} alt="Card3 img" />
               <div className='carousel-content'>
               <p className='heading'>Placement Support</p>
                <p>Access internship and job
                   opportunities shared by alumni and
                   industry partners tailored to your 
                   skills and career goals.</p>

               <button class='cardBtn'>Explore Opportunities</button>
               </div>
               
              
               </div>
               <div className='carousel-card'>
               <img className='carousel-img' src={cardimg4} alt="Card4 img" />
               <div className='carousel-content'>
               <p className='heading'>Communities</p>
                <p>Engage with communities focused on 
                   specific industries or career interests.
                   Share experiences, and 
                   opportunities with like-minded peers.</p>
                <button class='cardBtn'>Join communities</button>
               </div>
               
              
               </div>
               <div className='carousel-card'>
               <img className='carousel-img'  src={cardimg5} alt="Card5 img" />
               <div className='carousel-content'>
               <p className='heading'>Direct Messaging</p>
                <p>Connect with alumni for personalized advice, mentorship, and networking, helps you navigate your career path with real-world insights.</p>
                <button class='cardBtn'>Start connecting</button>
               </div>
               
              
               </div>
      </Carousel>
         </div>
    )
}