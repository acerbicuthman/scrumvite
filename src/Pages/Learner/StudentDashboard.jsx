import React from 'react';
import { FaHome, FaCalendarAlt, FaBook, FaChartBar, FaUsers, FaCog, FaLaptop } from 'react-icons/fa';
import Profile1 from '../../assets/Profile_images/profile_img.png';
import Profile2 from '../../assets/Profile_images/profile_img2.png';
import Profile3 from '../../assets/Profile_images/profile_img3.png';
import Profile4 from '../../assets/Profile_images/profile_img_1.png';
import Profile5 from '../../assets/Profile_images/profile_img_2.png';
import { Link } from 'react-router';


const StudentDashboard = () => {
  const user = localStorage.getItem("user")
  console.log("user", user)

  const token = localStorage.getItem("accessToken")
  console.log("Token", token)
  return (
    <div className="flex flex-col mt-20 md:flex-row h-screen overflow-hidden bg-gray-50">

      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-1/4 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 text-white px-6 py-8">
        <h1 className="text-2xl font-semibold mb-8">Scrum LMS</h1>
        <ul className="space-y-6">
          <li className="flex items-center space-x-3 cursor-pointer hover:bg-blue-700 px-3 py-2 rounded-md">
            <FaHome />
            <span>Dashboard</span>
          </li>
          <li className="flex items-center space-x-3 cursor-pointer hover:bg-blue-700 px-3 py-2 rounded-md">
            <FaCalendarAlt />
            <span>Schedule</span>
          </li>
          <li className="flex items-center space-x-3 cursor-pointer hover:bg-blue-700 px-3 py-2 rounded-md">
            <FaBook />
            <span>My Courses</span>
          </li>
          <li className="flex items-center space-x-3 cursor-pointer hover:bg-blue-700 px-3 py-2 rounded-md">
            <FaChartBar />
            <span>Reports</span>
          </li>
          <li className="flex items-center space-x-3 cursor-pointer hover:bg-blue-700 px-3 py-2 rounded-md">
            <FaUsers />
            <span>Teams</span>
          </li>
          <li className="flex items-center space-x-3 cursor-pointer hover:bg-blue-700 px-3 py-2 rounded-md">
            <FaLaptop />
            <span>Library</span>
          </li>
          <li className="flex items-center space-x-3 cursor-pointer hover:bg-blue-700 px-3 py-2 rounded-md">
            <FaCog />
            <span>Settings</span>
          </li>
          <Link to="/learner-profile"
       className='block'>
          <li className="flex items-center space-x-3 cursor-pointer hover:bg-blue-700 px-3 py-2 rounded-md">
            <FaCog />
            <span>Learner Profile</span>
          </li>
          </Link>
          <Link to="/system-info" 
          className='block'>
  <li className="flex items-center space-x-3 cursor-pointer hover:bg-blue-700 px-3 py-2 rounded-md">
    <FaCog />
    <span>System Information</span>
  </li>
</Link>
    <Link to="/student-bg-info "
     className='block'>
<li className="flex items-center space-x-3 cursor-pointer hover:bg-blue-700 px-3 py-2 rounded-md">
  <FaCog />
  <span>Student Background Info</span>
</li>
    </Link>
     
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-8 py-6 bg-gradient-to-r from-blue-100 via-indigo-200 to-cyan-200">
        <h1 className="text-3xl font-semibold mb-6 text-gray-900">Live Broadcast</h1>

        {/* Profile Images */}
        <div className="flex space-x-4 mb-6">
          {[Profile1, Profile2, Profile3, Profile4, Profile5].map((profile, index) => (
            <img
              key={index}
              className="border-2 border-blue-700 rounded-full h-14 w-14"
              src={profile}
              alt={`Profile ${index + 1}`}
            />
          ))}
          <div className="bg-blue-300 rounded-lg px-4 py-2 text-sm font-medium cursor-pointer">More</div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">My Courses</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente dolorem unde libero fuga!
                Fuga corrupti hic, temporibus quasi repellendus quas!
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Upcoming Broadcast</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis rem illo repudiandae ducimus et! Obcaecati vitae ab ducimus ea illo tenetur quisquam pariatur voluptas accusantium nulla sapiente at, illum totam laborum aliquid doloribus, impedit sit eveniet porro vero consequatur nisi!
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Search Courses Section */}
      <div className="flex flex-col w-1/4 px-6 py-8 bg-white shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Search Courses</h2>
        <p className="text-gray-600 mb-6">
          This section can contain upcoming session schedules, reminders, or notes.
        </p>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          placeholder="Search for a course..."
        />
      </div>
    </div>
  );
};

export default StudentDashboard;
