import React from 'react'
import introToProjectMgt from '../../../assets/INtro-to-ProjectMgt.png'
import AdvancedAgile from '../../../assets/AdvanceAgile.png'
import scrumMasterCert from '../../../assets/ScrumMasterCourse.png'
import agiletest from '../../../assets/Depth 7, Frame 0.png'
import CompletedCourse from '../../../assets/completedCourses.png'
import Activecourse from '../../../assets/ActiveCourses.png'
import HoursStudied from '../../../assets/HoursStudied.png'
import useAuthenticatedUser from "../../../hooks/useAuthenticatedUser";

const MainContent = () => {
    const {user} = useAuthenticatedUser()
    const first_name =  user?.profile?.student?.first_name
    const last_name = user?.profile?.student?.last_name

  return (
    <div className='text-white bg-[#121221]  w-full px-4 mt-4   pb-10'>
        <div className='md:text-left text-center py-3'>
        <h1 className='md:text-4xl text-xl py-4 my-2'>Welcome back, {first_name} {last_name}</h1>
        <p className='text-lg font-semibold'>My Courses</p>
        </div>
        
        <div class="flex flex-col md:flex-row md:justify-start justify-center md:items-start items-center gap-2">
        <div className="flex flex-col  max-w-xs ">
  <img src={introToProjectMgt} alt="" className="block h-[151px] w-[268px]  rounded "  />
  <div className='mt-2 md:w-2/3'>
    <p>Introduction to Project Management</p>
    <p className='text-[#9696C4]'>Learn the basics of project management.</p>
  </div>
</div>
<div className="flex flex-col max-w-xs">
  <img src={agiletest} alt="" className="block h-[151px] w-[268px] rounded"  />
  <div className='mt-2 '>
    <p>Advanced Agile Methodologies</p>
    <p className='text-[#9696C4]'>Master advanced agile techniques.</p>
  </div>
</div>
<div className="flex flex-col max-w-xs">
  <img src={scrumMasterCert} alt="" className="block h-[151px] w-[268px] rounded"  />
  <div className='mt-2 md:w-4/5'>
    <p>Scrum Master Certification Prep</p>
    <p className='text-[#9696C4]'>Prepare for your Scrum Master certification.</p>
  </div>
</div>

        </div>
        {/* {Progress Badges} */}
        <div className='mt-10'>

        <p className='md:text-left text-center my-3 font-semibold'>Progress Badges</p>
        <div class="flex flex-col md:flex-row   md:items-start items-center gap-4 ">
           
        <div className="flex flex-col  max-w-xs ">
  <img src={CompletedCourse} alt="" className="block h-[284px] w-auto  "  />
  <div className='mt-2 w-2/3'>
    <p>Completed Courses</p>
    <p className='text-[#9696C4]'>2.</p>
  </div>
</div>
<div className="flex flex-col max-w-xs">
  <img src={Activecourse} alt="" className="block h-[284px] w-auto "  />
  <div className='mt-2 '>
    <p>Active Courses</p>
    <p className='text-[#9696C4]'>3</p>
  </div>
</div>
<div className="flex flex-col max-w-xs">
  <img src={HoursStudied} alt="" className="block h-[284px] w-auto "  />
  <div className='mt-2 w-4/5'>
    <p>Hours Studied</p>
    <p className='text-[#9696C4]'>44.</p>
  </div>
</div>
</div>
        </div>
      
    </div>
  )
}

export default MainContent
