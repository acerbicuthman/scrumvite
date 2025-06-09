import React, { useState } from 'react'
import AsidesNav from '../Learner-Dashboard/AsidesNav'
import SideChat from './SideChat'
import Chatboard from './Chatboard'
import instructor1Img from '../../../assets/instructor1.png'
import instructorImg2 from '../../../assets/instructor2.png'
import instructorImg3 from '../../../assets/instructor3.png'
import instructorImg4 from '../../../assets/instructor4.png'

const ChatDashboard = () => {
  const [collapsed, setCollapse] = useState(false) 
  const [chatCollapsed, setChatCollapsed] = useState(false) 

  return (
    <div className="bg-[#121221] flex  mt-20 text-white  overflow-hidden">
      <AsidesNav collapsed={collapsed} setCollapse={setCollapse} />

      <div
    className={`w-full transition-all duration-300 ${
      collapsed ? "md:w-[calc(100%-90px)]" : "md:w-[calc(100%-208px)]"
    }`}
  >
        <div className="flex md:flex-row flex-col">
          {/* Pass state to SideChat and Chatboard */}
          <SideChat collapsed={chatCollapsed} setCollapsed={setChatCollapsed} />
 
          <div className="flex-1 flex flex-col w-full ">
  {/* Mobile instructor preview */}

  {!chatCollapsed && (
    <div className="flex items-center gap-8 px-4 py-2 md:hidden border-b border-[#333] overflow-x-auto">
      <img src={instructor1Img} alt="Instructor 1" className="w-10 h-10 rounded-full" />
      <img src={instructorImg2} alt="Instructor 2" className="w-10 h-10 rounded-full" />
      <img src={instructorImg3} alt="Instructor 3" className="w-10 h-10 rounded-full" />
      <img src={instructorImg4} alt="Instructor 4" className="w-10 h-10 rounded-full" />
    </div>
  )}

  {/* Chatboard below */}
  <Chatboard />
</div>
        </div>
      </div>
    </div>
  )
}


export default ChatDashboard
