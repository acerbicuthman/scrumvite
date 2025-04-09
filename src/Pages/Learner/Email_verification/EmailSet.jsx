import React from 'react'
import { Link } from 'react-router-dom'

const EmailSet = () => {
  return (
    <div className='bg-neutral-200 h-screen mt-10 content-center justify-items-center'>
      <div className='bg-white justify-self-center w-2/5 p-6'>
    <h1 className='text-3xl'>You’re All Set!</h1>
    <div className='text-sm'>

   
<p className='my-3'>Hi Dorcas,</p>
<p>
Thank you for signing up on Scrum Consult! To complete your registration, please verify your email address by clicking the link below:
</p>
<a href="">https://scrumconsult.com/verify?token=123456abcdef</a>
<p>Or tap the button to verify your email</p>
<Link to='/success_email_verification'>
<button className='bg-blue-900 text-white lg:text-sm text-xs my-8 lg:px-20 px-20 py-3  rounded-lg'>Verify Email Account</button>
</Link>
<p>Welcome aboard! We're excited to have you with us.</p>
<div>
Best regards,
<br />
Scrum Consult Team.
</div>
</div>
 </div>
    </div>
  )
}

export default EmailSet
