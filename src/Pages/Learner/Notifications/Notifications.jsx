import React, { useState } from 'react'
import AsidesNav from '../Learner-Dashboard/AsidesNav'
import calendarIcon from '../../../assets/Depth 6, Frame 0 (1).png'
import peopleIcon from '../../../assets/Depth 6, Frame 0 (2).png'
import spanner from '../../../assets/Depth 6, Frame 0 (3).png'
import markIcon from '../../../assets/Depth 6, Frame 0.png'

const Notifications = () => {
  const [collapsed, setCollapse] = useState(false)
  return (
    <div className='text-white mt-20 flex bg-[#121221]'>
      <AsidesNav collapsed={collapsed} setCollapse={setCollapse}/>
      <div className={` transition-all duration-300 ${collapsed ? `w-[calc(100%-90px)]` : `w-[calc(100%-100px)]`}`}>
      <div className='flex-1 p-4'>
    <h1>Notifications</h1>
    <div className='flex gap-6 my-4  border-b-4 border-[#262645]'>
      <div className='underline underline-offset-8'>All</div>
      <div className='underline underline-offset-8'>Unread</div>
      <div className='underline underline-offset-8'>Archived</div>
    </div>
  {/* <div>  <p>New</p></div> */}
      </div>
      <div className='space-y-4 md:p-4'>
    <h1>New</h1>
    <div className='flex '>
      <div className='bg-[#262645] p-3 items-center justify-center  hidden md:block rounded-md h-[48px] w-[48px'>
      <img src={markIcon} alt="" />
      </div>
     <div className='mx-4'>
      <p className='md:text-xl text-base'>Course Application Approved</p>
      <p className='text-[#9696C4] md:text-base text-sm'>Your application for the 'Advanced Calculus' course has been approved.</p>
     </div>
    </div>
    <div className='flex'>
      <div className='bg-[#262645] p-3 items-center justify-center  hidden md:block  rounded-md h-[48px] w-[48px'>
      <img src={calendarIcon} alt="" />
      </div>
     <div className='mx-4'>
      <p className='md:text-xl text-base'>Assignment Deadline Extended</p>
      <p className='text-[#9696C4] md:text-base text-sm'>The deadline for the 'Linear Algebra' assignment has been extended to next Friday.</p>
     </div>
    </div>
    <h1>Earlier</h1>
    <div className='flex'>
      <div className='bg-[#262645] p-3 items-center justify-center  hidden md:block rounded-md h-[48px] w-[48px'>
      <img src={peopleIcon} alt="" />
      </div>
     <div className='mx-4'>
      <p className='md:text-xl text-base'>New Study Group Available</p>
      <p className='text-[#9696C4] md:text-base text-sm'>A new study group for 'Differential Equations' has been created. Join now!</p>
     </div>
    </div>
    <div className='flex'>
      <div className='bg-[#262645] p-3 items-center justify-center  hidden md:block rounded-md h-[48px] w-[48px'>
      <img src={spanner} alt="" />
      </div>
     <div className='mx-4'>
      <p className='md:text-xl text-base'>Platform Maintenance Announcement</p>
      <p className='text-[#9696C4] md:text-base text-sm'>The platform will be undergoing maintenance this weekend. Some features may be temporarily unavailable.</p>
     </div>
    </div>
    </div>
      </div>
    </div>
  )
}

export default Notifications
