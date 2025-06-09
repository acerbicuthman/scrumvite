import React from 'react'
import goalGetterImg from '../../../assets/goalGetter.png'
import consistencyChampImg from '../../../assets/consistencyChampion.png'
import moduleMasterImg from '../../../assets/moduleMaster.png'
import quizWhizImg from '../../../assets/quizwhiz.png'

const MilestoneBadges = () => {
  return (
    <div className='mt-10 mx-6'>
      <h1 className='text-2xl font-semibold my-4'>Milestones & Badges</h1>
      <div className='flex flex-col md:flex-row gap-4'>
        <div>
            <img src={goalGetterImg} alt="" />
            <div className='mt-4'>
                <p>Goal Getter</p>
                <p className='text-[#9696C4]'>Set weekly goals for 4 weeks</p>
            </div>
        </div>
        <div>
            <img src={consistencyChampImg} alt="" />
            <div className='mt-4'>
                <p >Consistency Champion</p>
                <p className='text-[#9696C4]'>Complete 3 Modules in a week</p>
            </div>
        </div>
        <div>
            <img src={moduleMasterImg} alt="" />
            <div className='mt-4'>
                <p>Module Master</p>
                <p className='text-[#9696C4]'>Complete all Modules</p>
            </div>
        </div>
        <div>
            <img src={quizWhizImg} alt="" />
            <div className='mt-4'>
                <p>Quiz Whiz</p>
                <p className='text-[#9696C4]'>Ace all quizzes</p>
            </div>
        </div>

      </div>
    </div>
  )
}

export default MilestoneBadges
