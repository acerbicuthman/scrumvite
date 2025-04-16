import React from 'react'
import Congrats from '../../../assets/congratulations.gif'


const SuccessfulReg = ({isOpen, onClose, children}) => {
  if(!isOpen) return null
  return (
    <div className="fixed inset-0 z-50  flex items-center justify-center bg-black bg-opacity-50  ">
    <div className="md:w-2/5 w-full items-center justify-center rounded-xl p-2 m-10  md:m-1 overflow-hidden bg-transparent border-2 border-white ">
          <div className='flex flex-col  m-1 justify-center items-center text-center rounded-xl bg-white '>
    <div className="w-full max-w-lg h-auto px-10 py-8 bg-transparent">
            <div className="flex justify-center items-center m-auto">
    <img src={Congrats} className="mt-4 h-60 md:h-48 object-contain"></img>
    </div>
    <h1 className="font-semibold lg:text-2xl text-x my-4" >Congratulations!</h1>
  
  <div className='text-sm sm:text-xs'>
  <p>Your account has been successfully created. Welcome to Scrum Consult LMS! Start learning, growing, and achieving your goals today</p>
  </div>
  <div className='mt-6'>
  <button type="submit" className='w-full md:justify-center rounded-md lg:px-32 px-4  py-3 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 bg-blue-900'>Start Learning</button>

  </div>
  <button
          className="absolute top-2 right-4 text-gray-600 hover:text-black text-4xl bg-inherit"
          onClick={onClose}
        >
          ✕
        </button>
  </div>
</div>
</div>
</div>
   
  )
}

export default SuccessfulReg