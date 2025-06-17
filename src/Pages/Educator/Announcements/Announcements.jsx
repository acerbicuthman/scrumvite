import React, { useEffect, useState, useRef } from 'react'
import AsideTutor from '../Dashboard/AsideTutor'
import UpcomingExam from '../../../assets/ExamFrame.png'
import studygroup from '../../../assets/StudyGroupFrame.png'
import newResources from '../../../assets/New-ResourcesFrame.png'
import elipse from '../../../assets/Ellipse 122.png'
import uploadImg from '../../../assets/uploadImage.png'
import sentIcon from '../../../assets/Sent.png'
import axios from 'axios'
import { base_url } from '../../../library/api'
import ImageUploader from './ImageUpload'
import useAuthenticatedUser from '../../../hooks/useAuthenticatedUser'
import { PiUserDuotone } from "react-icons/pi";


const Announcements = () => {
    const [collapsed, setCollapse] = useState(false)
    const token = localStorage.getItem("accessToken")
    const [title, setTitle] = useState('');
    const [content, setContent] = useState("")
    const [announcements, setAnnouncements] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const {user: AuthUser} = useAuthenticatedUser()
    const userImg = AuthUser?.profile?.profile_picture

// console.log("UserImg", userImg)
    useEffect(() => {
    const RecentAnnouncemnets = async (e) => {
        try{
            const req = await axios.get(`${base_url}api/announcements/recent/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
)  
setAnnouncements(req.data.results); 
 const recent =req.data.results
console.log("Recent AAnouncement", recent)

        } catch(error){
            console.error("Error fetching announcements:", error?.response || error.message);
        } }
        RecentAnnouncemnets(); 
    }, [token])
   


    const sebumitbAnnouncements = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            if (imageFile) {
                formData.append("image", imageFile); // must match backend field name
              }
              const response = await axios.post(`${base_url}api/announcements/`, formData, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data',
                },
              });
          
              console.log("Announcement published", response.data);
              setTitle("");
              setContent("");
              setImageFile(null);
            } catch (error) {
              const errorMsg = error.response?.data?.detail || error.message || 'Something went wrong';
              console.error("Upload error:", errorMsg);
            }
          };
       
    
  return (
    <div className='flex text-white mt-20 bg-[#121221] min-h-screen'>   
       <aside>
       <AsideTutor collapsed={collapsed} setCollapse={setCollapse} />
        </aside>
        <main className={`p-6 transition-all duration-300 ${collapsed ? `md:w-[calc(100%-90px)]`: `md:w-[calc(100%-100px)]`}`}>
        <form action=""
        onSubmit={sebumitbAnnouncements}>
        <div className='flex flex-col md:flex-row mb-5'>

                <div className='flex-1'>
                    <p className='text-3xl font-semibold '>Announcements</p>
                </div>
                <div className=''>
                    <div className='bg-[#262645] px-5 py-2 md:m-2 my-2 rounded-md md:text-base text-sm'>New Annoucement</div>
                </div>
        </div>


      
        <div className='my-5'>
           <label htmlFor="" className='text-lg '>Announcement Title</label> 
           <div className='my-2'>
           <input type="text" name="title" id=""
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
            className='bg-[#1C1C30] w-full p-2  rounded-md border border-[#363863]'/>
           </div>
           
        </div>
        <label htmlFor="">Content</label>
        <div className='bg-[#1C1C30] p-5 rounded-md border border-[#363863]'>
            
        {userImg ?
       ( <div>
  <img src={userImg} 
        alt="profile picture" 
        className="h-14 w-14 rounded-full " />
        </div>
          ) : (
            <div>
            <PiUserDuotone
            className="h-14 w-14 rounded-full " />
            </div>
          )}
        
        <textarea name="content" id="" cols="30" rows="10"
            className='w-full h-[272px] bg-[#1C1C30]'
            value={content}
            onChange={(e) => setContent(e.target.value)}>
            </textarea>
            
            <div className='flex'>
    <div className='flex-1'>

<ImageUploader imageFile={imageFile} setImageFile={setImageFile} />    
    </div>
    <button type='submit' className='md:hidden block mt-5'>
        <img src={sentIcon} alt="" />
    </button>
  
            </div>
        </div>
       
        <div>
                <button type='submit' className='bg-[#4045E0] hidden md:block px-2 py-4 mt-5 rounded-lg'>Submit Announcements</button>
            </div>
            <div className='space-y-10 mt-10'>
    <h1 className='text-xl md:text-2xl font-semibold'>Recent Announcements</h1>

   


            </div>
           
            </form>
            {announcements.map((announcement) => (
        <div key={announcement.id} className='flex md:flex-row flex-col gap-4 mt-10'>
            <div className='flex-1 lg:pr-14 space-y-5'>
                <p className='text-[#9696C4]'>
                    Posted by {announcement.author_info?.full_name || "Unknown"}
                </p>
                <p className='font-semibold text-xl'>{announcement.title}</p>
                <p className='text-[#9696C4]'>{announcement.content}</p>
            </div>
            <div className='flex-1'>
                {/* Placeholder image or show something if `announcement.image` exists */}
                {/* {console.log("Announcement image:", announcement.image)} */}
{announcement.image && (
  <img
    src={announcement.image}
    alt="announcement"
    className="w-full max-h-60 object-cover"
  />
)}


            </div>
        </div>
    ))}
        </main>
      
    </div>
  )
}

export default Announcements
