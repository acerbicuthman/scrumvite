import React, { useState } from 'react'
import Certificate from './Certificate'
import Badges from './Badges'
import AsidesNav from '../Learner-Dashboard/AsidesNav'


const Achievements = () => {
    const [collapsed, setCollapse] = useState(false)
  return (
    <div className='mt-20 text-white flex  flex-row overflow-hidden '>
        <AsidesNav collapsed={collapsed} setCollapse={setCollapse}/>
        <div
    className={` transition-all duration-300 ${
      collapsed ? "md:w-[calc(100%-90px)]"  : "md:w-[calc(100%-100px)] "
    }`}
  >
    <div className='max-w-screen-sm md:max-w-screen-md'>
    <Certificate/>
    </div>
    
      <div className='max-w-screen-md'>
      <Badges/>
      </div>
   
     </div>
    </div>
  )
}

export default Achievements
