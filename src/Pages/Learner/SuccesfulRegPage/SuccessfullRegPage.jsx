import React from 'react'

import Congrats from '../../../assets/congratulations.gif'

const SuccessfulReg = () => {
  return (
    <div>
<main className="grid min-h-full place-items-center bg-white px-2 md:px-8 py-32 sm:py-32 lg:px-8">
  <div className="text-center">
    <img src={Congrats} className="mt-4 h-60 md:h-48 h-48"></img>
    <p className="my-4 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Congratulations!</p>
  </div>
  <div className='md:text-center md:w-2/3 md:justify-center w-100 text-sm px-4 md:px-8 py-4 lg:px-32 xl:px-48 2xl:max-w-4xl'>
  <p>Your account has been successfully created. Welcome to Scrum Consult LMS! Start learning, growing, and achieving your goals today</p>
  </div>
  <div className='mt-6'>
  <button type="submit" className='w-full md:justify-center rounded-md md:px-32 px-24  py-3 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 bg-blue-900'>Start Learning</button>

 

  </div>

</main>
    </div>
  )
}

export default SuccessfulReg