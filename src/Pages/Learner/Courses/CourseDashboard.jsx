import React from 'react'
import AIimg from '../../../assets/AI.png'
import WebImg from '../../../assets/Web.png'
import DataImg from '../../../assets/Data.png'
import UX from '../../../assets/UX.png'
import MobileImg from '../../../assets/Mobile.png'
import CloudImg from '../../../assets/Cloud.png'


const courses = [
  {
    title: 'Introduction to AI',
    instructor: 'Dr Sarah Chen',
    rating: 4.8,
    students: 2403,
    duration: '8 weeks',
    pace: 'Self-paced',
    price: '₦8000',
    image: AIimg,
  },
  {
    title: 'Web Development',
    instructor: 'Mike Johnson',
    rating: 4.6,
    students: 1800,
    duration: '10 weeks',
    pace: 'Self-paced',
    price: '₦7500',
    image: WebImg,
  },
  {
    title: 'Data Science Basics',
    instructor: 'Emily Roberts',
    rating: 4.9,
    students: 3200,
    duration: '12 weeks',
    pace: 'Self-paced',
    price: '₦9000',
    image: DataImg,
  },
  {
    title: 'UX Design Principles',
    instructor: 'Alex Thompson',
    rating: 4.9,
    students: 3200,
    duration: '6 weeks',
    pace: 'Self-paced',
    price: '₦9000',
    image: UX,
  },
  {
    title: 'Mobile App Development',
    instructor: 'James Wilson',
    rating: 4.9,
    students: 3200,
    duration: '10 weeks',
    pace: 'Self-paced',
    price: '₦8000',
    image: MobileImg,
  },
  {
    title: 'Cloud Computing',
    instructor: 'Lisa Anderson',
    rating: 4.9,
    students: 1203,
    duration: '8 weeks',
    pace: 'Self-paced',
    price: '₦9000',
    image: CloudImg,
  },
  {
    title: 'Introduction to AI',
    instructor: 'Dr Sarah Chen',
    rating: 4.8,
    students: 2403,
    duration: '8 weeks',
    pace: 'Self-paced',
    price: '₦8000',
    image: AIimg,
  },
  {
    title: 'Web Development',
    instructor: 'Mike Johnson',
    rating: 4.6,
    students: 1800,
    duration: '10 weeks',
    pace: 'Self-paced',
    price: '₦7500',
    image: WebImg,
  },
  {
    title: 'Data Science Basics',
    instructor: 'Emily Roberts',
    rating: 4.9,
    students: 3200,
    duration: '12 weeks',
    pace: 'Self-paced',
    price: '₦9000',
    image: DataImg,
  },
  {
    title: 'UX Design Principles',
    instructor: 'Alex Thompson',
    rating: 4.9,
    students: 3200,
    duration: '6 weeks',
    pace: 'Self-paced',
    price: '₦9000',
    image: UX,
  },
  {
    title: 'Mobile App Development',
    instructor: 'James Wilson',
    rating: 4.9,
    students: 3200,
    duration: '10 weeks',
    pace: 'Self-paced',
    price: '₦8000',
    image: MobileImg,
  },
  {
    title: 'Cloud Computing',
    instructor: 'Lisa Anderson',
    rating: 4.9,
    students: 1203,
    duration: '8 weeks',
    pace: 'Self-paced',
    price: '₦9000',
    image: CloudImg,
  },
  
  
]

const CourseDashboard = () => {
  return (
    <div className='mt-20 text-white min-h-screen mb-10'>
      <div className='flex md:flex-row flex-col md:px-32 px-4 gap-4 pt-3 mx-auto '>
        <div className='flex-1 text-4xl md:text-2xl font-bold pt-3 mx-auto '>Course Dashboard</div>
        <div className='flex gap-2 mx-auto'>
          <button className='py-2 px-4 bg-[#4318D1] rounded-md'>Available Courses</button>
          <button className='py-2 px-4 border-[#4318D1] border rounded-md'>My Courses</button>
        </div>
      </div>

      <div className='flex flex-wrap justify-center items-center gap-6 mt-10 px-4'>
        {courses.map((course, index) => (
          <div key={index} className='bg-[#0F0F14] border-white/10 border-4 rounded-md max-w-sm'>
            <div className='relative'>
              <img src={course.image} alt={course.title} />
              <p className='bg-[#000000CC] p-2 rounded-md absolute top-2 right-2 text-sm'>{course.price}</p>
            </div>

            <div className='px-4 space-y-3 mt-4'>
              <h1 className='text-2xl font-semibold'>{course.title}</h1>
              <div className='flex gap-4 items-center'>
                <p className='bg-[#4318D1] px-3 py-1 rounded-full'>p</p>
                <div className='text-white/70'>{course.instructor}</div>
              </div>
              <div className='flex space-x-20'>
                <p className='text-[#FFD700]'>{course.rating}</p>
                <div className='text-white/50'>({course.students.toLocaleString()} students)</div>
              </div>
              <div className='flex text-white/50'>
                <div className='flex-1'>Duration: {course.duration}</div>
                <div>{course.pace}</div>
              </div>
              <div className='flex justify-center items-center'>
                <button className='my-4 py-2 px-10 w-full rounded-md bg-[#4318D1]'>Enroll Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CourseDashboard
