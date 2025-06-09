import React, { useState } from 'react'
import instructor1Img from '../../../assets/instructor1.png'
import instructorImg2 from '../../../assets/instructor2.png'
import instructorImg3 from '../../../assets/instructor3.png'
import instructorImg4 from '../../../assets/instructor4.png'
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const SideChat = ({ collapsed, setCollapsed }) => {

  return (

   
<div
  className={`
    ${collapsed ? "md:w-[100px]" : "md:w-[300px]"}
    hidden md:flex flex-col py-4 pl-3 transition-all duration-300`}
>

      <div className='flex gap-5 border-b border-[#333] px-6 py-2'>
        <div className='underline underline-offset-8'>Chat</div>
        <div className='underline underline-offset-8'>Q&A</div>
      </div>
      <div>
        <div className={`flex ${collapsed ? `md:w-[100px] ` : `lg:w-[368px] md:w-[208px]`}mt-10 py-4 pl-3  hidden transition-all duration-300`} >
            <div className={`${collapsed ? `flex-row` : ""}`}><img src={instructor1Img} alt="" /></div>
            {!collapsed && (
            <div className='mx-4'>
                <p>Instructor's name</p>
                <p className='text-[#9696C4]'>1:1</p>
            </div>
            )}
        </div>
        <div className='flex my-5'>
            <div className=''><img src={instructorImg2} alt="" /></div>
            {!collapsed && (
            <div className='mx-4'>
                <p>Instructor's name</p>
                <p className='text-[#9696C4]'>1:1</p>
            </div>
            )}
        </div>
        <div className='flex my-5'>
            <div className=''><img src={instructorImg3} alt="" /></div>
            {!collapsed && (
            <div className='mx-4'>
                <p>Instructor's name</p>
                <p className='text-[#9696C4]'>1:1</p>
            </div>
            )}
        </div>
        <div className='flex my-5'>
            <div className=''><img src={instructorImg4} alt="" /></div>
            {!collapsed && (
            <div className='mx-4'>
                <p>Instructor's name</p>
                <p className='text-[#9696C4]'>1:1</p>
            </div>
            )}
        </div>
      </div>
      <button 
      onClick={() => setCollapsed(!collapsed)}
      className="mb-6 ml-auto text-white "> 
            {collapsed ? <MdOutlineKeyboardDoubleArrowRight size={24}
              /> : <MdOutlineKeyboardDoubleArrowLeft size={24}/> }

      </button>
    </div>


  )
}

export default SideChat
