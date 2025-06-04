import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaBook,
  FaChartBar,
  FaUsers,
  FaCog,
} from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import playBtn from '../../../assets/playbutton.png'
import messageIcon from '../../../assets/messageIcon.png'
import progressIcon from '../../../assets/progress-trackerIcon.png'
import homeIcon from '../../../assets/homeicon.png'
import settings from '../../../assets/Settings.png'
import useAuthenticatedUser from "../../../hooks/useAuthenticatedUser";



const AsidesNav = ({collapsed, setCollapse}) => {
  const {user} = useAuthenticatedUser()
  const first_name =  user?.profile?.student?.first_name
  const last_name = user?.profile?.student?.last_name
  const account_type = user?.account_type
  const userImg = user?.profile?.profile_picture
  console.log("ImgUser", userImg)
  
  
  return (
    
      <div className={`hidden md:flex flex-col ${collapsed ? `w-[100px]` : `lg:w-[368px] md:w-[208px]`} h-full bg-[#121221] text-white px-4 py-8 transition-all duration-300 shadow-[4px_0_12px_rgba(0,0,0,0.3)]`  }>
        <div className="p-3 shadow-gray-500/50 shadow-[4px_0_12px_rgba(0,0,0,0.3)]  h-full  drop-shadow-indigo-500/50 ">

     
     <div className="flex mb-10 gap-4 ">
      <div>
      <img src={userImg} 
      alt="profile picture" 
      className="h-14 w-14 rounded-full " />
      </div>
      {!collapsed &&
      (<div>
      <h2>{first_name} {last_name}</h2>
      <p className="text-[#9696C4]">{account_type }</p>
      </div>)
      }
      
     </div>
        <ul className="space-y-6">
          {[
            { icon:<img src={homeIcon} alt="Home" />, text: "Home" },
            { icon: <img src={playBtn} alt="" />, text: "My Courses" },
            { icon: <img src={progressIcon} alt="" />, text: "Progress Tracker" },
            { icon: <img src={messageIcon} alt="messages"/>, text: "Messages" },
            { icon: <IoMdNotificationsOutline size={25} />, text: "Notifications" },
            { icon: <img src={settings} alt="Settings" />, text: "Settings" },
          ].map(({ icon, text }, index) => (
            <li
              key={index}
              className="flex items-center space-x-3 cursor-pointer hover:bg-[#262645] px-3 py-2 rounded-md"
            >
              <div className="min-w-[24px]">
              {icon}
              </div>
              {!collapsed &&  <span>{text}</span>}
             
              
            </li>
          ))}
          <Link to="/learner-profile" className="block">
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-blue-700 px-3 py-2 rounded-md">
              <FaCog />
              {!collapsed && <span>Learner Profile</span>}
              
            </li>
          </Link>
          <li className="">
            <div className="flex flex-row  cursor-pointer hover:bg-[#262645] px-3 py-2">

            <button 
            onClick={() => setCollapse(!collapsed)} className="mb-6 ml-auto text-white"> 
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
