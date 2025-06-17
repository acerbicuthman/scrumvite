import {React, useState} from 'react'
import AsideTutor from '../Dashboard/AsideTutor'
import CourseContent from './CourseContent'


const CreateCourse = () => {
    const [collapsed, setCollapse] = useState(false)
    return (
      <div className="flex min-h-screen bg-[#121221] mt-20 text-white">
        {/* Sidebar */}
        <aside className=" shadow-md ">
          <AsideTutor collapsed={collapsed} setCollapse={setCollapse} />
        </aside>
        <main className={`p-6 transition-all duration-300 ${collapsed ? `md:w-[calc(100%-90px)] `: `md:w-[calc(100%-100px)]`}`}>
       <CourseContent/>

        {/* Example dashboard widgets */}
        
      </main>
      
    </div>
  )
}

export default CreateCourse
