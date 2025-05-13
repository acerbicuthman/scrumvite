import React from 'react'
import LandingBg from '../Landing/LandingImg/Ellipse 102 (1).png'
import { FaArrowRightLong } from "react-icons/fa6";
import StudentImg1 from '../Landing/LandingImg/Union (1).png'
import StudentImg2 from '../Landing/LandingImg/Union.png'
import VidIcon from '../Landing/LandingImg/Group 3838.png'
import sprinkleImg from '../Landing/LandingImg/Group 3840.png'
import { useNavigate } from 'react-router';

const Landing = () => {
  const navigate = useNavigate()
  return (
    <div className=' flex relative h-screen w-full'>
      {/* Background Image */}
      <img 
        src={LandingBg} 
        className='absolute top-0 left-0 w-full h-full object-cover z-0' 
        alt="" 
      />

      {/* Flex Container */}
      <div className='relative z-10 flex flex-row items-center justify-center h-full px-8'>
        {/* Left Column */}
        <div className='md:w-1/2 '>
          <h1 className='text-black text-center md:text-left text-5xl font-extrabold mb-6 w-full mx-auto md:w-[55%] md:ml-10 '>
            Learn faster with your best tutor.
          </h1>
          <p className='md:mx-10 my-2'>
            Welcome to Scrum Consult! 
          </p>
          <p className='md:mx-10 my-2'>Join as a Learner or Tutor and start your journey today.</p>

          <div className='flex mx-10 text-white my-6'>
            <button onClick={()=> navigate('/role-selection')} className='text-2xl font-bold bg-[linear-gradient(to_right,_#407BFF,_#5A58E5)]  p-3 items-center rounded-lg shadow-2xl hover:shadow-none  flex gap-6'>Get Started <span className=' p-2 bg-blue-500 shadow-xl rounded-full'> <FaArrowRightLong /></span></button>
          </div>
        </div>

        {/* Right Column */}
        <div className='md:w-1/2 text-gray-800 mt-10 flex-1'>
          
            <div className='relative inline-block'>
              <div><img src={StudentImg1} alt="" className='inline-block'/>
              <div>
              <img src={VidIcon} alt="" className='absolute top-12 right-10 p-2 bg-stone-500 bg-opacity-50 rounded-full ' />

              </div>
              </div>
            <img src={sprinkleImg} alt="" className='absolute top-36 right-1/3 z-10 '/>
            <div>
            <img src={VidIcon} alt="" className='absolute bottom-1/3 right-1/3 p-2 bg-green-900 bg-opacity-50 rounded-full z-10 ' />
            <img src={StudentImg2} alt="" className='absolute top-1/2 left-1/2 '/>
            </div>
          
            </div>
          
           
        
        </div>
      </div>
    </div>
  )
}

export default Landing
