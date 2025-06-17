import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCog} from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import playBtn from '../../../assets/playbutton.png'
import messageIcon from '../../../assets/messageIcon.png'
import progressIcon from '../../../assets/progress-trackerIcon.png'
import homeIcon from '../../../assets/homeicon.png'
import settings from '../../../assets/Settings.png'
import useAuthenticatedUser from "../../../hooks/useAuthenticatedUser";
import { PiUserDuotone } from "react-icons/pi";



const AsidesNav = ({collapsed, setCollapse}) => {
  const {user} = useAuthenticatedUser()
  const first_name =  user?.profile?.student?.first_name
  const last_name = user?.profile?.student?.last_name
  const account_type = user?.account_type
  const userImg = user?.profile?.profile_picture

  const navItems= [
    { icon:<img src={homeIcon} alt="Home" />, text: "Home", link: '/student-dashboard' },
    { icon: <img src={playBtn} alt="" />, text: "My Courses", link: '/course-list' },
    { icon: <img src={progressIcon} alt="" />, text: "Progress Tracker", link: '/progress-tracker' },
    { icon: <img src={messageIcon} alt="messages"/>, text: "Messages", link: '/chat-dashboard' },
    { icon: <IoMdNotificationsOutline size={25} />, text: "Notifications", link: '/notifications' },
    { icon: <img src={settings} alt="Settings" />, text: "Settings", link: '' },
  ]
  
  
  return (
    
      <div className={`md:flex flex-col ${collapsed ? `md:w-[100px] w-1/4` : `lg:w-[308px] md:w-[208px] w-[100px]`} h-full bg-[#121221] text-white px-4 py-8 transition-all duration-300 shadow-[4px_0_12px_rgba(0,0,0,0.3)]`  }>
        <div className="p-3 shadow-gray-500/50 shadow-[4px_0_12px_rgba(0,0,0,0.3)]  h-screen  drop-shadow-indigo-500/50 ">

     
     <div className="flex mb-10 gap-4 ">
     
     {userImg ?
     ( <div>
<img src={userImg} 
      alt="profile picture" 
      className="h-14 w-14 rounded-full " />
      </div>
        ) : (
          <div>
          <PiUserDuotone
          className="h-14 w-14 rounded-full " />
          </div>
        )}
      
      {!collapsed &&
      (<div  className="hidden md:text-base ">
      <h2>{first_name} {last_name}</h2>
      <p className="text-[#9696C4]">{account_type }</p>
      </div>)
      }
      
     </div>
        <ul className="space-y-2">
          {navItems.map(({ icon, text, link }, index) => (
            <Link to={link} key={index} className="block">            
            <li
              className="flex items-center space-x-3 cursor-pointer hover:bg-[#262645] px-3 py-2 rounded-md"
            >
              <div className="min-w-[24px]">
              {icon}
              </div>
              {!collapsed &&  <span className="hidden md:block">{text}</span>}
             
              
            </li>
            </Link>

          ))}
          <Link to="/learner-profile" className="block">
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-blue-700 px-3 py-2 rounded-md">
              <FaCog />
              {!collapsed && <span  className="hidden md:block">Learner Profile</span>}
              
            </li>
          </Link>
          <li className="">
            <div className="flex flex-row  cursor-pointer hover:bg-[#262645] px-3 py-2">

            <button 
           
            onClick={() => setCollapse(!collapsed)} 
            className="mb-6 ml-auto text-white "> 
            {collapsed ? <MdOutlineKeyboardDoubleArrowRight size={24}
              /> : <MdOutlineKeyboardDoubleArrowLeft size={24}/> }
            </button>     
            </div>       
</li>
          </ul>
          </div>
          </div>
  )
}

export default AsidesNav
