import React from 'react'
import Profile1 from '../../assets/Profile_images/profile_img.png'
import Profile2 from '../../assets/Profile_images/profile_img2.png'
import Profile3 from '../../assets/Profile_images/profile_img3.png'
import Profile4 from '../../assets/Profile_images/profile_img_1.png'
import Profile5 from '../../assets/Profile_images/profile_img_2.png'

const StudentDashboard = () => {
  return (
    <div className='flex flex-col md:flex-row h-screen mt-20 overflow-hidden'>

      {/* Sidebar */}
      <div className='md:flex hidden md:flex-col px-10 '>
        <h1 className='pb-6 text-xl font-semibold text-nowrap'>Scrum LMS</h1>
        <div className='my-4 text-base'>
          <ul className='flex flex-col space-y-4'>
            <li>Dashboard</li>
            <li>Schedule</li>
            <li>My Courses</li>
            <li>Reports</li>
            <li>Teams</li>
            <li>Library</li>
            <li>Settings</li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex flex-col md:flex-col md:px-10 bg-gradient-to-r from-blue-500 via-indigo-300 to-cyan-200'>

        <h1 className='text-xl font-semibold mb-4'>Live Broadcast</h1>

        {/* Profile Images */}
        <div className='flex flex-row items-center space-x-4 w-full mb-6'>
          <img className='flex-none  border-blue-700 border-2 rounded-full h-12 w-12' src={Profile1} alt="Profile 1" />
          <img className='flex-none  border-blue-700 border-2 rounded-full h-12 w-12' src={Profile2} alt="Profile 2" />
          <img className='flex-none  border-blue-700 border-2 rounded-full h-12 w-12' src={Profile3} alt="Profile 3" />
          <img className='flex-none  border-blue-700 border-2 rounded-full h-12 w-12' src={Profile4} alt="Profile 4" />
          <img className='flex-none  border-blue-700 border-2 rounded-full h-12 w-12' src={Profile5} alt="Profile 5" />
          <div className='flex-none  bg-blue-300 rounded-lg px-3 py-2 text-sm font-medium'>More</div>
        </div>

        {/* Content Sections */}
        <div className='flex-col w-full '> 
          <h2 className='text-lg font-semibold mb-2'>My Courses</h2>
          <div className=' bg-gradient-to-r from-gray-300 via-white-300 to-gray-300 p-4 rounded-lg'>
          <p className='text-gray-600'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente dolorem unde libero fuga!
            Fuga corrupti hic, temporibus quasi repellendus quas!
          </p>         
        </div>
        <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis rem illo repudiandae ducimus et! Obcaecati vitae ab ducimus ea illo tenetur quisquam pariatur voluptas accusantium nulla sapiente at, illum totam laborum aliquid doloribus, impedit sit eveniet porro vero consequatur nisi!</div>
        </div>

        <div className='flex-1 mt-6'>
          <h2 className='text-lg font-semibold'>Upcoming Broadcast</h2>
          {/* Add more content here if needed */}
        </div>
      </div>
      <div className='flex flex-col px-5'>
        <h2 className='text-xl font-semibold mb-4'>Search Courses</h2>
        <p className='text-gray-600'>
          This section can contain upcoming session schedules, reminders, or notes.
        </p>
          </div>
        

    </div>
  )
}

export default StudentDashboard
