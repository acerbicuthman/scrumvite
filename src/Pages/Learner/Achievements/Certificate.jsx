import React from 'react'
import scrumMasterImg from '../../../assets/ScrumMasterCert.png'
import productOwnerImg from '../../../assets/ProductOwner.png'
import agileCert from '../../../assets/AgileCertificate.png'
import shareIcon from '../../../assets/Share.png'

const Certificate = () => {
  return (
    <div className='text-white px-4 mx-auto '>
        <h1 className='text-3xl font-semibold'>My Achievements</h1>
        <p className='text-2xl my-3 font-semibold'>Certificates</p>
        <div className='flex gap-4 flex-col md:flex-row'>
    <div className=''>
        <img src={scrumMasterImg} alt="" />
        <p className="font-semibold text-base mt-3">Scrum Master Certification</p>
        <p className="text-[#9696C4]">Issued by ScrumConsult</p>
        <div className='flex mt-3 gap-3 px-1' >
            <div className=''>
                <button className='py-2 px-4 bg-blue-600 rounded-md'>View</button>
            </div>
             <div className=''>
                <button className='py-2 px-4 bg-[#262645] rounded-md'>Download</button>
             </div>
             <div className=''>
                <button className='py-2 px- rounded-md'>
                    <img src={shareIcon} alt="" />
                </button>
             </div>

        </div>
    </div>
    <div>
        <img src={productOwnerImg} alt="" />
        <p className="font-semibold text-base mt-3">Product Owner Certification</p>
        <p className="text-[#9696C4]">Issued by ScrumConsult</p>
        <div className='flex mt-3 gap-3 px-1' >
            <div className=''>
                <button className='py-2 px-4 bg-blue-600 rounded-md'>View</button>
            </div>
             <div className=''>
                <button className='py-2 px-4 bg-[#262645] rounded-md'>Download</button>
             </div>
             <div className=''>
                <button className='py-2 px- rounded-md'>
                    <img src={shareIcon} alt="" />
                </button>
             </div>

        </div>
    </div>
    <div>
        <img src={agileCert} alt="" />
        <p className="font-semibold text-base mt-3">Agile Coach Certification</p>
        <p className="text-[#9696C4]">Issued by ScrumConsult</p>
        <div className='flex mt-3 gap-3 px-1' >
            <div className=''>
                <button className='py-2 px-4 bg-blue-600 rounded-md'>View</button>
            </div>
             <div className=''>
                <button className='py-2 px-4 bg-[#262645] rounded-md'>Download</button>
             </div>
             <div className=''>
                <button className='py-2 px- rounded-md'>
                    <img src={shareIcon} alt="" />
                </button>
             </div>

        </div>
    </div>
    

        </div>
    </div>
  )
}

export default Certificate
