import {React, useState, useEffect} from 'react'
import bgPlay from '../../../assets/bg-play.png';
import tvicon from '../../../assets/tv-withbg.png';
import NineDots from '../../../assets/9dots.png';
import { FaPlus } from "react-icons/fa6";
import { base_url } from '../../../library/api';
import { IoIosDocument } from "react-icons/io";
import { IoText } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";

import axios from 'axios';
import useCourseModuleManager from '../../../hooks/useCourseModuleManager'; 

const ModuleMaterials = ({ selectedCourseId, selectedModuleId, setSelectedModuleId, modules, token }) => {
  // console.log("Received modules:", modules);
  const [materials, setMaterials] = useState([])
  const [materialTitle, setMaterialTitle] = useState('');
  const [materialType, setMaterialType] = useState('');
  const [materialUrl, setMaterialUrl] = useState('');

  const materialTypeOptions = [
    { label: "Video", value: "video" },
    { label: "Slide", value: "slides" }, 
    { label: "Text", value: "text" },
    { label: "Link", value: "link" },
  ];
  
    const modulesObjects= [{ title: 'Introduction to Scrum', type: 'Video', icon: bgPlay },
    { title: 'Scrum Roles and Responsibilities', type: 'Slides', icon: tvicon },
    { title: 'Scrum Events and Artifacts', type: 'Video', icon: bgPlay }
  ]

useEffect(() => {
    if (!selectedCourseId || !selectedModuleId || !token) return;

        const fetchModulesMaterials = async(e) =>{

            try{
                const fetchMaterials = await axios.get(`${base_url}api/courses/${selectedCourseId}/modules/${selectedModuleId}/materials/`,
                {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  }
                  )
                  setMaterials(fetchMaterials.data.results); 
                  console.log("Fetched Materials:", fetchMaterials.data);
            } catch (error){
                console.error("Error fecthing module materials", error?.response || error.message)
            }
          
    }
    
    fetchModulesMaterials();
}, [selectedCourseId, selectedModuleId, token]); 

  
      const addMaterial = async () => {
        if (!selectedModuleId) return alert('No module selected');
      
        try {
          const res = await axios.post(
            `${base_url}api/courses/${selectedCourseId}/modules/${selectedModuleId}/materials/`,
            {
                title: materialTitle,
                material_type: materialType,   
                url: materialUrl
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
      
          console.log("Material posted:", res.data);
          setMaterialTitle('');
          setMaterialType('');
          setMaterialUrl('');
        } catch (error) {
            console.error('Error adding material', error.response?.data || error.message);
        }
      };
      
   
  return (
    <div>



<label htmlFor="">Module</label>
<select
  className="bg-[#1C1C30] border border-[#363863] w-full p-4 mb-4"
  value={selectedModuleId || ''}
  onChange={(e) => setSelectedModuleId(e.target.value)}
>
  <option value="" disabled>Select a module</option>

  {Array.isArray(modules) && modules.length > 0 ? (
    modules.map((mod) => (
      <option key={mod.id} value={mod.id}>
        {mod.title}
      </option>
    ))
  ) : (
    <option disabled>No modules found</option>
  )}
</select>


<div className="mt-6">
  <h3 className="text-white font-bold mb-2">Add Material</h3>
  <input
    type="text"
    value={materialTitle}
    onChange={(e) => setMaterialTitle(e.target.value)}
    placeholder="Material Title"
    className="mb-2 p-2 w-full bg-gray-800 text-white"
  />
   <select
    value={materialType}
    onChange={(e) => setMaterialType(e.target.value)}
    className="w-full p-3 mb-3 rounded bg-[#2A2A40] text-white"
  >
    <option value="">Select Material Type</option>
    {materialTypeOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
  <input
    type="url"
    value={materialUrl}
    onChange={(e) => setMaterialUrl(e.target.value)}
    placeholder="Material URL"
    className="mb-2 p-2 w-full bg-gray-800 text-white"
  />
  <button
    onClick={addMaterial}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    Add Material
  </button>
</div>



<div>
{materials.map((material, index) => (
  <div key={index} className="flex gap-5 my-4">
    <div className="flex flex-1 gap-5 items-center">
      {material.material_type === "video" ? (
        <img src={bgPlay} alt="Video Icon" className="w-8 h-8" />
      ) : material.material_type === "slide" ? (
        <img src={tvicon} alt="Slide Icon" className="w-8 h-8" />
      ) : material.material_type === "link" ? (
        <IoIosLink className="text-2xl text-blue-400" />
      ) : material.material_type === "text" ? (
        <IoText className="text-2xl text-green-400" />
      ) : material.material_type === "document" ? (
        <IoIosDocument className="text-2xl text-gray-300" />
      ) : null}

      <div>
        <p className="font-semibold">{material.title}</p>
        <p className="text-sm text-gray-400">{material.material_type}</p>
      </div>
    </div>
    <img src={NineDots} alt="Options" className="w-5 h-5" />
  </div>
))}
   
</div>
       {modulesObjects.map((material, index) => (
                <div key={index} className="flex gap-5 my-4">
                  <div className="flex flex-1 gap-5">
                    <img src={material.icon} alt="" />
                    <div>
                      <p>{material.title}</p>
                      <p>{material.type}</p>
                    </div>
                  </div>
                  <img src={NineDots} alt="" />
                </div>
              ))}

              <button type="button" className="mt-5">
                <div className='flex gap-3 bg-[#262645] px-4 py-2 rounded-md'>
                    <div className='my-1'>
                    <FaPlus />
                    </div>
                    <div>
                        Add Materials
                    </div>

                </div>
              </button>

    </div>
  )
}

export default ModuleMaterials
