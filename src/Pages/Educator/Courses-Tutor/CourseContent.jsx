import React, { useState } from 'react'
import axios from 'axios'
import { base_url } from '../../../library/api'
import { useNavigate } from 'react-router'

const CourseContent = () => {
    const token = localStorage.getItem("accessToken")
    const navigate = useNavigate()
    const [message, setMessage] = useState("")
    const [courseFormData, setCourseFormData] = useState({
        title: "",
        description: "",
        objectives: "",
        category: "",
        price_tier: "",
        custom_price: ""
    })

    // const createCourseContentHandle = async (e) => {
    //     e.preventDefault();
    
    //     if (!token) {
    //       console.error('Missing access token');
    //       setMessage("❌ You're not authorized to perform this action.");
    //       return;
    //     }
    
    //     const { title, description, objectives, category, price_tier, custom_price } = courseFormData;


    //     const payload = {
    //         title,
    //         description,
    //         objectives,
    //         category,
    //         price_tier,
    // }
    //     // let finalPrice;
    //     if (price_tier === "custom-price") {
    //       const parsedCustomPrice = parseInt(custom_price);
    //       if (isNaN(parsedCustomPrice)) {
    //         setMessage("❌ Please  enter a valid custom price.");
    //         return;
    //       }
    //     } 
    //     payload.custom_price = parsedCustomPrice
      
       
      
    //     try {

             
    //       const req = await axios.post(`${base_url}api/courses/`, payload, {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       });
    
    //       console.log('Course created:', req.data);
    
    //       if (req.status === 200 || req.status === 201) {
    //         setMessage('✅ Course successfully created');
    //         setCourseFormData({
    //           title: '',
    //           description: '',
    //           objectives: '',
    //           category: '',
    //           price_tier: '',
    //           custom_price: ""
    //         });
    //       }
    //     } catch (error) {
    //       console.error(
    //         'Failed to create course:',
    //         error.response?.status || error.message
    //       );
    //       setMessage('❌ Failed to create course. Please try again.');
    //     }
    //   };
    const createCourseContentHandle = async (e) => {
        e.preventDefault();
      
        if (!token) {
          console.error("Missing access token");
          setMessage("❌ You're not authorized to perform this action.");
          return;
        }
      
        const { title, description, objectives, category, price_tier, custom_price } = courseFormData;
      
        const payload = {
          title,
          description,
          objectives,
          category,
        };
      
        let parsedCustomPrice;
      
        if (price_tier === "custom-price") {
          parsedCustomPrice = parseInt(custom_price);
          if (isNaN(parsedCustomPrice)) {
            setMessage("❌ Please enter a valid custom price.");
            return;
          }
          payload.custom_price = parsedCustomPrice;
        } else {
            payload.price_tier = price_tier
        }
      
        try {
          const req = await axios.post(`${base_url}api/courses/`, payload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          if (req.status === 200 || req.status === 201) {
            navigate("/educator/course-module")
            setMessage("✅ Course successfully created");
            setCourseFormData({
              title: "",
              description: "",
              objectives: "",
              category: "",
              price_tier: "",
              custom_price: "",
            });
          }
         
        } catch (error) {
          console.error("Course creation failed:", error.response?.data || error.message);
          setMessage("❌ Failed to create course. Please check your inputs and try again.");
        }
      };
      
  return (
    <div className=''>
        <div className=''>
            <form action="" onSubmit={createCourseContentHandle} >
            <p>Create a Course</p>
            <div className='mt-5'>
               <div>
               <label htmlFor="course_title">Course Title</label>
               </div>    
            <input value={courseFormData.title}
            onChange={(e) => setCourseFormData({...courseFormData, title: e.target.value})}
             type="text" name="course_title" id="course_title"  className='bg-[#1C1C30]  h-10 w-full md:w-1/2' placeholder='Enter  Course Title'/>

            </div>
            <div className='mt-5'>
               <div>
               <label htmlFor="course_decription">Course Description</label>
                </div> 
                <textarea value={courseFormData.description}
                onChange={(e) => setCourseFormData({...courseFormData, description: e.target.value})}
                name="course_decription" id="course_decription" cols="20" rows="10"  className='bg-[#1C1C30] w-full md:w-1/2'></textarea>
            </div>
            <div className='mt-5'>
            <div>
               <label htmlFor="course_objectives">Course Objectives</label>
                </div> 
                <textarea value={courseFormData.objectives}
                onChange={(e) => setCourseFormData({...courseFormData, objectives: e.target.value})}
                name="course_objectives" id="course_objectives"  cols="20" rows="10"   className='bg-[#1C1C30]  w-full md:w-1/2 '></textarea>
            </div>
            <div className='mt-5'>
               
                <div>
                <label htmlFor="Category" className='bg-[#1C1C30]'>Category</label>
                </div>
                <div className='my-4'>
                <select value={courseFormData.category}
                onChange={(e) => setCourseFormData({...courseFormData, category: parseInt(e.target.value) || ""})}
                name="category" id="category"  className='bg-[#1C1C30] w-full md:w-1/2 h-10 '>
                <option value="">--Select category---</option>
                    <option value="1">1</option>
                    {/* <option value="2">2</option>
                    <option value="3">UI</option>
                    <option value="4">Cyber Security</option> */}
                </select>
                </div>
               
            </div>
            <div className='mt-5'>
               
               <div>
               <label htmlFor="Price" className='bg-[#1C1C30]'>Price</label>
               </div>
               <div className='my-4'>
               <select value={courseFormData.price_tier}
               onChange={(e) => setCourseFormData({...courseFormData, price_tier: e.target.value})}
               name="Price" id="Price"  className='bg-[#1C1C30] w-full md:w-1/2 h-10 '>
               <option value="">--Select Price---</option>
               <option value="Free">Free</option>
                   <option value="100">$100</option>
                   <option value="200">$200</option>
                   <option value="300">$300</option>
                   <option value="400">$400</option>
                   <option value="custom-price">Custom Price</option>
               </select>
               </div>
               {courseFormData.price_tier === 'custom-price' && (
            <div className="mt-5">
              <label htmlFor="custom_price">Enter Custom Price</label>
              <input
                type="number"
                id="custom_price"
                value={courseFormData.custom_price}
                onChange={(e) =>
                  setCourseFormData({
                    ...courseFormData,
                    custom_price: e.target.value,
                  })
                }
                className="bg-[#1C1C30] h-10 w-full md:w-1/2"
              />
            </div>
          )}
              
           </div>
           <div className='flex flex-1 mx-auto justify-center mt-10'>
           <button type='submit' className='bg-[#4045E0] p-4 rounded-md font-semibold'>Create Course</button>
           </div>
          
            </form>
            {message && (
  <div  className="mt-5 text-center text-white font-semibold">
    {message}</div>
            )}
      
        </div>
    </div>
  )
}

export default CourseContent
