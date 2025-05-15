import React, { useEffect, useState } from 'react'
import Image from '../Landing/LandingImg/IMAGE.png'

const WhatOurUserSays = () => {
    const testimonials = [
        {
            name: "Sarah Chan",
            role: "Student",
            image: Image, // Replace with actual image
            text: "Found my perfect math tutor here. The platform made learning calculus actually enjoyable!"
          },
          {
            name: "Leo Lee",
            role: "Parent",
            image: Image,
            text: "This platform has helped my son improve his grades tremendously. Highly recommended!"
          },
          {
            name: "Janet Jackson",
            role: "Tutor",
            image: Image,
            text: "I enjoy teaching here. The tools are intuitive and make scheduling a breeze."
          },
          {
            name: "Adunola Babs",
            role: "Parent",
            image: Image,
            text: "The flexibility and quality of tutors on this platform have made a huge difference in our homeschooling journey"
          }
    ]
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);
    
        return () => clearInterval(timer); 
    }, [currentIndex]);
    
    const prevTestimonials =() => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
    }
    const nextPrevTestimonials = () => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }
    const { name, role, image, text} = testimonials[currentIndex]
  return (
<div className='mx-4'>
     
    <div className='text-white px-4  '>
  <h1 className=' text-4xl font-semibold my-2 text-center'>What Our Users Say</h1>
  <p className='text-gray-400 text-center'>Join thousands of satisfied learners and tutors</p>
      
      <div className='flex flex-col items-center justify-center my-10 px-2 '>
        <div className='flex items-center justify-center md:gap-10 gap-3 w-full max-w-3xl'>
      <div onClick={prevTestimonials} className='text-white text-4xl cursor-pointer select-none'> &lt;</div>
   
    <div className='flex-1 rounded-lg bg-gray-900 md:w-1/2 mx-auto p-14 text-white shadow-lg'>
   
  
  
      <div className="flex items-center mb-4">
            <img src={image} alt={name} className="w-16 h-16 rounded-full mr-4 object-cover" />
            <div>
              <p className="font-semibold">{name}</p>
              <p className="text-sm text-gray-300">{role}</p>
            </div>
          </div>
          <p className="text-left">{text}</p>
        </div>
    
    
      {/* Right Arrow */}
  <div onClick={nextPrevTestimonials} className='text-white  text-4xl cursor-pointer'>&gt;</div>
    </div>
    </div>

    </div>
    </div>
  )
}

export default WhatOurUserSays
