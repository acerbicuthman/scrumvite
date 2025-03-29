import React from 'react'
import { Link } from 'react-router-dom'; 
import EmailVerify from '../../assets/emailverification.png'

const EmailVerification = () => {
  return (
    <div className='bg-neutral-200 h-screen mt-10 content-center justify-items-center'>
      <div className='lg:w-2/5 lg:h-3/6 text-center lg:bg-white mx-10 px-6'>
        <div className='flex justify-center items-center'>
        <img className='lg:my-4 my-10 lg:h-32 h-42' src={EmailVerify} alt="" />

        </div>
<h1 className='font-semibold lg:text-2xl text-xl'>You are just one click away!</h1>
<p className='text-sm'>Hey Dorcas, We’ve finished setting your Scrum Consult account. </p>
<p className='text-sm'>Just confirm your email to get started!</p>
<Link to='/success_email_verification'>
<button className='bg-blue-900 text-white lg:text-sm text-xs my-8 lg:px-20 px-20 py-3  rounded-lg'>Verify Email Address</button>
</Link>
    <div>
        <div className='py-3'>
            
            <button type="submit" className='text-blue-700'>Resend Email verification Code</button>
          
      

        </div>
    </div>
      </div>
      
      
    </div>
  )
}

export default EmailVerification
