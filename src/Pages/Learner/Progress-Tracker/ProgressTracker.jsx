import React, { useState } from 'react'
import AsidesNav from '../Learner-Dashboard/AsidesNav'
import ProgressBody from './ProgressBody'
import MilestoneBadges from './MilestoneBadges'

const ProgressTracker = () => {
    const [collapsed, setCollapse] = useState(false)
  return (
    <div className=' text-white mt-20 flex overflow-x-hidden mx-auto md:mx-4 bg-[#121221] '>
       <AsidesNav collapsed={collapsed} setCollapse={setCollapse} />
        <div className={`pr-10 transition-all duration-300 ${collapsed ? `w-[calc(100%-90px)]` : `w-[calc(100%-108px)]`}`}>
            <ProgressBody/>
            <MilestoneBadges/>
        </div>
      
    </div>
  )
}

export default ProgressTracker
