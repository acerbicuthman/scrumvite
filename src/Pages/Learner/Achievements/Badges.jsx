import React from 'react'
import topTutor from '../../../assets/bestTutor.png'
import studentFavorite from '../../../assets/studentFavorite.png'
import mostHelpful from '../../../assets/mostHelpful.png'

const Badges = () => {
  return (
    <div className='px-4 py-4 mx-auto max-w-screen-xl'>
      <h1 className='text-2xl font-semibold my-3 px-2'>Badges</h1>
      <div className='flex flex-col md:flex-row gap-3 px-3'>
    <div>
        <img src={topTutor} alt="" />
        <p className="font-semibold text-base mt-3">Agile Coach Certification</p>
        <p className="text-[#9696C4]">Issued by ScrumConsult</p>
    </div>
    <div>
        <img src={studentFavorite} alt="" />
        <p className="font-semibold text-base mt-3">Agile Coach Certification</p>
        <p className="text-[#9696C4]">Issued by ScrumConsult</p>
    </div>
    <div>
        <img src={mostHelpful} alt="" />
        <p className="font-semibold text-base mt-3">Agile Coach Certification</p>
        <p className="text-[#9696C4]">Issued by ScrumConsult</p>
    </div>
      </div>
    
    </div>
  )
}

export default Badges
