import React, { useState } from 'react'
import AsideTutor from './Dashboard/AsideTutor'

const MyStudents = () => {
    const [collapsed, setCollapse] = useState(false)
    const Table_Heads = ["Student", "Course", "Progress", "Submission", "Feedback"]
    const student_course_details = [
        {
            Student: "Sophia Bennett",
            Course: "Introduction to Programming",
            Progress: "75",
            Submission: "View",
            Feedback: "View"
        },
        {
            Student: "Ethan Carter",
            Course: "Data Structures and Algorithms",
            Progress: "80",
            Submission: "View",
            Feedback: "View"
        },
        {
            Student: "Olivia Davis",
            Course: "Web Development Fundamentals",
            Progress: "10",
            Submission: "View",
            Feedback: "View"
        },
        {
        Student: "Liam Foster",
        Course: "Mobile App Development",
        Progress: "25",
        Submission: "View",
        Feedback: "View"
    },
    {
        Student: "Ava Green",
        Course: "Database Management Systems",
        Progress: "76",
        Submission: "View",
        Feedback: "View"
    }
    ]
  return (
    <div className='flex mt-20 text-white min-h-screen'>
             <aside className=" shadow-md ">
          <AsideTutor collapsed={collapsed} setCollapse={setCollapse} />
        </aside>
        <main className={`p-6 transition-all duration-300 ${collapsed ? `md:w-[calc(100%-90px)] `: `md:w-[calc(100%-100px)]`}`}>
            <div className='px-10 xl:max-w-4xl '>
                <h1 className='my-5 text-3xl font-semibold'>My Students</h1>
                <div>
                    <input type="search" name="" id="" placeholder='🔍   Search students' className='bg-[#262645] w-full px-4 py-2'/>
                </div>
                <div className="overflow-x-auto mt-4 rounded shadow">
                <table className="min-w-[600px] w-full text-left border border-[#363863] rounded-full">
    <thead>
      <tr className="bg-[#121221]">
        {Table_Heads.map((head) => (
          <th key={head} className="text-white p-4 whitespace-nowrap">
            {head}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {student_course_details.map(
        ({ Student, Course, Progress, Submission, Feedback }, index) => (
          <tr key={index} className="border-t ">
            <td className="p-4 whitespace-nowrap">{Student}</td>
            <td className="p-4 whitespace-nowrap text-[#9696C4]">{Course}</td>
            <td className="p-4 whitespace-nowrap flex gap-2">
                <div className='w-full bg-white rounded-md h-1 mt-2'>
                    <div className="bg-blue-500 h-1 rounded-md"
                    style={{width: `${Progress}%`}}>
                    </div>
                </div>
                <span className="text-sm text-white inline-block">{Progress}%</span>
              </td>
            <td className="p-4 whitespace-nowrap text-[#9696C4] cursor-pointer">{Submission}</td>
            <td className="p-4 whitespace-nowrap text-[#9696C4] cursor-pointer">{Feedback}</td>
          </tr>
        )
      )}
    </tbody>
  </table>
</div>

            </div>
            </main>

      
    </div>
  )
}

export default MyStudents
