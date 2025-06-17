import React, { useState } from 'react'
import AsideTutor from '../Dashboard/AsideTutor'
import completionCert from '../../../assets/Certificate-customFrame.png'

const CertCustomization = () => {
  const [collapsed, setCollapse] = useState(false)

  return (
      <div className='text-white mt-20 flex bg-[#121221] overflow-x-hidden '>
      <aside>
        <AsideTutor collapsed={collapsed} setCollapse={setCollapse}/>
      </aside>
      <main className={`p-6 transition-all duration-300 ${collapsed ? `md:w-[calc(100%-90px)] `: `md:w-[calc(100%-100px)]`}`}>
        <h1 className='text-[#9696C4]'>Settings / <span className='text-white'>Certificates</span></h1>
        <p className='text-3xl mt-5 font-semibold'>Certificate customization</p>
        <div className='my-5'>
          <p className='font-semibold my-2'>Preview</p>
          <div className='flex md:flex-row flex-col gap-5'>
          <div className='flex'><img src={completionCert} alt="" /></div>
          <div className='py-5'>
            <p className='font-semibold my-2'>Certificate of Completion</p>
            <p className='max-w-sm text-[#9696C4]'>This certificate confirms that the student has successfully completed the tutoring session.</p>
          </div>
          </div>
        </div>
        <div>
        <fieldset className='space-y-5 mt-10'>
  <legend>Published status</legend>
  <div className='flex gap-5 border border-[#363863] p-4 rounded-lg'>
  <input id="draft" 
  className="peer/draft w-6 h-6 checked:border-indigo-500 my-2"
  type="radio" name="status" checked />
  <label for="draft" class="peer-checked/draft ">
  <p className='text-lg font-semibold'>Manual</p>
    <p className='text-[#9696C4] md:text-base text-xs'>Issue certificates manually after each session.</p>
  </label>
  </div>
  <div className='flex gap-5 border border-[#363863] p-4 rounded-lg'>
  <input id="published" 
   type="radio" name="status" 
     className="peer/published w-6 h-6 checked:border-indigo-500 my-2 bg-[#363863] border border-blue-800" />
  <label for="published" class="peer-checked/published" className=''>
    <p className='text-lg font-semibold'>Automatic</p>
  <p className='text-[#9696C4] md:text-base text-sm'>Certificates are automatically issued upon session completion.</p>
  </label>
  </div>


  <div class="hidden peer-checked/draft:block"></div>
  <div class="hidden peer-checked/published:block"></div>
</fieldset>
<div className='flex  flex-row-reverse md:mx-10'>
  <button type="submit" className='bg-[#4045E0] py-2 px-4 mt-10 rounded-lg'>Save</button>
</div>
        </div>
</main>
    </div>
  )
}

export default CertCustomization
