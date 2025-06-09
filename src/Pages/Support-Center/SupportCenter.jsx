import React from 'react'
import messageIcon from '../../assets/messageIcon.png'

const SupportCenter = () => {
  return (
    <div className='text-white mt-20 justify-center flex mx-auto items-center bg-[#121221]'>
<div className='md:w-4/5 w-full mx-auto p-5'>

    <h1 className='text-3xl font-semibold'>    Support Center</h1>
    <p className='text-[#9696C4] text-xl my-3'>Welcome to the ScrumConsult Support Center. How can we help you today?</p>
    <p className='text-2xl font-semibold mt-10 py-4'>Quick Actions</p>
    <div className='flex'>
        <div className='flex-1'>
            <button className='px-4 py-2 bg-[#4045E0] rounded-sm'>Submit a Ticket</button>
        </div>
        <div >
            <button className='px-4 py-2 bg-[#262645] rounded-sm'>Browse FAQs</button>
        </div>
    </div>
    <div className='my-5'>
        <h1 className='p-4 text-2xl font-semibold'>Feedback</h1>
        <textarea name="feedback" id="feedback" cols="50" rows="10"
        className='bg-[#1C1C30] border-[#363863] border w-full md:w-[448px] h-[144px]'/>
    </div>
    <div className='flex w-full gap-2 flex-col items-end justify-end'> 
    <div>
    <button className='bg-[#4045E0] p-3'>Submit Feedback</button>
    </div>
    <div className=' flex-row-reverse'>
    <button className='bg-[#4045E0] p-3'>
        <img src={messageIcon} alt="" />
    </button>
   

    </div>
       
    </div>
</div>
    </div>
  )
}

export default SupportCenter
