import React from 'react'
import ErrorImg from '../../assets/emaillinkexpired.png'
import { Link } from 'react-router-dom'

const ExpiredLink = () => {
  return (
    <div className='mt-10 h-screen content-center justify-items-center text-center'>
        <div className='lg:h-3/6 lg:w-2/5 items-center mx-10 p-4'>
          <div className='flex justify-center'>
            <img className='h-52 lg:h-42 ' src={ErrorImg} alt="" />
          </div>
          <div className='lg:justify-items-center'>

        
<p className='m-2 py-2 lg:px-6 w-full lg:w-4/5 px-4 lg:text-2xl font-semibold'>Oops! Looks like your magic link has expired.</p>     
<p className='text-sm'>But no worries, we can send you a fresh one!</p> 
   
  </div> 
  <Link>
    <button
      type="button"
      className="bg-blue-900 p-2 my-6 lg:px-20 lg:my-6 lg:w-4/5 lg:py-3 text-white text-sm rounded-lg w-full"
    >
      Resend Verification Email
    </button>
    </Link>
   </div>
    </div>
  )
}

export default ExpiredLink
