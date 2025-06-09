"use client"
import React from 'react'
import WeeklyProgressChart from './WeeklyProgressChart'
import CompletedModulesChart from './CompletedModulesChart'

const ProgressBody = () => {
  return (
    <div className='text-white mx-auto'>
      <h1 className='p-3 font-semibold text-3xl'>Progress Tracker</h1>
      <div className='flex flex-col md:flex-col lg:flex-row gap-6 '>
        <WeeklyProgressChart />
        <CompletedModulesChart />
      </div>
    </div>
  )
}

export default ProgressBody
