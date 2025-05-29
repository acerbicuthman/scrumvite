import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { supabase } from '../../../SupabaseFile'
import ProfileImgUpload from '../../../Pages/Learner/learner-profile/ProfileImgUpload'
import CountryForm from '../../../library/CountryForm'
import { useAuth } from '../../../context/Authcontext'

const TutorProfileCard = () => {

  const [isEditing, setIsEditing] = useState(true);
  const [localError, setLocalError] = useState(null);
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();
  const {user} = useAuth()

  const mailGoogle = user?.email
  //THE FORM DATA HERE
// const [formData, setFormData] ={ }

  const googleEmail = localStorage.getItem("userEmail")
  const email = mailGoogle || googleEmail;


  const token = localStorage.getItem("accessToken");
  const safeUserId = email ? email.replace(/[@.]/g, "_") : null;

  useEffect(() => {
    // if (!profileId || !token) return;

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          //THE ENDPOINT HERE/`,
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //     "Content-Type": "application/json"
          //   },
          // }
        );

        const result = response.data;
        console.log("object", result)
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLocalError("Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setLocalError(null);
    setSuccess("");
  };
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setLocalError(null);
    setSuccess("");

    // const [firstName, ...rest] = formData.fullName.trim().split(" ");
    // const lastName = rest.join(" ").trim();

    const profileData = {
      //The Updated Form data HERE 
    }

    if ("---------PROFILE EXIST-------------") {
      //  PATCH existing profile
      const patchProfile = await axios.patch(
        //`THE ENDPOINT HERE/`,
       
      );
      console.log("PatchProfile", patchProfile.data);
      setSuccess("Profile updated successfully!");
      setIsEditing(false);
    } else {
      // POST a new profile
      const response = await axios.post(
        //`THE ENDPOINT HERE`,
      );
      console.log("Response Data:", response.data.results);
      setSuccess("Profile created successfully!");
      setIsEditing(false);
    }
    
  };



  const handleImageChange = async (file) => {
    setLocalError(null);
    if (!file || !file.type.startsWith("image/")) {
      return setLocalError("Please upload a valid image file.");
    }
    if (file.size > 5 * 1024 * 1024) {
      return setLocalError("Image must be under 5MB.");
    }
    if (!safeUserId) {
      return setLocalError("No valid user ID for image upload.");
    }

    const fileName = `user_${safeUserId}/${Date.now()}_${file.name}`;

    try {
      if (formData.profilePicture) {
        const oldFileName = formData.profilePicture.split("/").pop();
        if (oldFileName) {
          await supabase.storage
            .from("img-profile")
            .remove([`user_${safeUserId}/${oldFileName}`]);
        }
      }

      const { error: uploadError } = await supabase.storage
        .from("img-profile")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) {
        return setLocalError("Image upload failed: " + uploadError.message);
      }

      const { data: urlData } = supabase.storage
        .from("img-profile")
        .getPublicUrl(fileName);

      if (!urlData?.publicUrl) {
        return setLocalError("Failed to retrieve uploaded image URL.");
      }

      setFormData((prev) => ({ ...prev, profilePicture: urlData.publicUrl }));
    } catch (err) {
      console.error("Image upload error:", err);
      setLocalError("Unexpected error during image upload.");
    }
  };
  const handleChange = (e) => {
    const {id, value} = e.target;
    setFormData((prev) => ({...prev,  [id]: value}))
  }


  const renderInputField = (id, label, type = "text", disabled = false) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1 capitalize text-white/50">
        {label || id.replace("_", " ")}
      </label>
      <input
        id={id}
        type={type}
        // value={formData[id] || ""}
        onChange={handleChange}
        readOnly={!isEditing || disabled}
        placeholder={`Enter ${label || id.replace(/_/g, '')}`}
        className="bg-white bg-opacity-10 w-full rounded-sm p-2 placeholder-white/50"
      />
    </div>
  );
  if (loading) {
    return  <div className="flex justify-center items-center my-8 h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4318D1]" />
  </div>;
  }

  if (
    localError &&
    localError !== "Profile not found. Please create a profile."
  ) {
    return <div className="text-red-600 text-xl text-center mt-28 h-screen">{localError}</div>;
  }
  return (
    <div className="w-full max-w-[800px] mx-auto mt-10 md:mt-20 p-4 md:p-6 bg-black bg-opacity-10 text-white rounded-xl shadow-md">
    <div className="bg-[#0A0A0A] md:p-8 px-4 rounded-md">

    <form onSubmit={handleSaveProfile} id="profile-form">
      <div className='px-4 mt-10'>
          <div className="p-4  md:mx-auto w-full max-w-[800px] my-2 bg-white bg-opacity-[4%] border-white border-opacity-10 border-2 text-white">
           <h2 className="text-3xl font-semibold m-5">
           {localError ? "Create Profile" : "Update Tutor Profile"}</h2>
           <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-[400px] aspect-square">
              <ProfileImgUpload
              onImageChange={handleImageChange}
              // defaultImage={formData.profilePicture}
              onImageDeleted={() => setFormData(prev => ({ ...prev, profilePicture: '' }))}
              userId={safeUserId}
              disabled={!isEditing}
              />
              </div>
              <div className="w-full space-y-4 md:mt-0 mt-2 ">
              {renderInputField("fullName", "Full Name")}
              {renderInputField("email", "Email", "text", true)}
              {renderInputField("phone", "Phone")}
            </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label htmlFor="gender" className="block text-sm font-medium mb-1">
                Gender
              </label>
              <select
                id="gender"
                // value={formData.gender}
                onChange={handleChange}
                disabled={!isEditing}
                className="bg-white bg-opacity-10 w-full rounded-sm p-2 text-white"
              >
                <option value="" className="bg-white bg-opacity-10 ">Select Gender</option>
                <option value="male" className="bg-white bg-opacity-10 ">Male</option>
                <option value="female" className="bg-white bg-opacity-10 ">Female</option>
                <option value="other" className="bg-white bg-opacity-10 ">Other</option>
              </select>
            </div>
            {renderInputField("dob", "Date of Birth", "date")}
{[
  "city",
  "nationality",

].map((field) => (
  <div key={field}>{renderInputField(field)}</div>
))}
</div>
<div>
  <CountryForm 
  // value={formData.country}
   onChange={(val)=> setFormData((prev) => ({...prev, country: val}))}
   disabled={!isEditing}/>
</div>
           
            </div>
            </div>
<div className='px-4 mt-10'>
      <div className='md:mx-auto w-full max-w-[800px] my-2 bg-white bg-opacity-[4%] border-white border-opacity-10 border-2 text-white p-4'>
        <h3 className="text-xl font-semibold mb-4">Education & Professional Details</h3>
<div className="mt-10  pt-3">
  <div className="grid grid-cols-1 md:grid-cols-1 gap-6 text-white/50">
    {["education_level"].map((field) => (
      <div key={field}>{renderInputField(field)}</div>
    ))}
  </div>
  </div>
  <div className="mt-10  pt-3">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/50">
    {["current_role", "industry"].map((field) => (
      <div key={field}>{renderInputField(field)}</div>
    ))}
  </div>
  </div>
  <div className="mt-10  pt-3">
  <div className="grid grid-cols-1 md:grid-cols-1 gap-6 text-white/50">
    {["linkedin_profile", "Years of Experience", "skills"].map((field) => (
      <div key={field}>{renderInputField(field)}</div>
    ))}
  </div>
  </div>
</div>
<div className='pt-3 mt-10'>
      <div className='md:mx-auto w-full max-w-[800px] my-2 bg-white bg-opacity-[4%] border-white border-opacity-10 border-2 text-white p-4'>
      <div className='flex'> <h3 className="text-xl flex-1 font-semibold mb-4 p-3">Certification</h3>
      <button className='md:flex flex-row-reverse justify-end hidden mb-4  p-3 bg-[#4318D1]'>Add Certificate</button>
        </div>  
<div className="mt-10  pt-3">
  <div className="grid grid-cols-1 md:grid-cols-1 gap-6 text-white/50">
    {["Name of Certificate"].map((field) => (
      <div key={field}>{renderInputField(field)}</div>
    ))}
  </div>
  </div>
  <div className='mt-10 pt-3'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-white/50'>
      {["Issuing Organizzation", "Date Obtained"].map((field) => (
        <div key={field}>{renderInputField(field)}</div>
      ))}
      </div>
  </div>
  <div className='mt-10 pt-3 '><button className='p-4 bg-white/10 md:mx-0 mx-auto flex'>Upload Certificate</button></div>
  <button className='flex justify-center md:hidden items-center mx-auto my-6 p-3 bg-[#4318D1]'>Add Certificate</button>

  </div>
  
  </div>
  <div className='pt-3 mt-10'>
      <div className='md:mx-auto w-full max-w-[800px] my-2 bg-white bg-opacity-[4%] border-white border-opacity-10 border-2 text-white p-4'>
      <div className='flex'> <h3 className="text-xl  font-semibold mb-4">Course Specialization</h3>
      <button className='flex-1 justify-end hidden md:ml-28 mb-4 bg-[#4318D1]'>Add Certificate</button>
        </div>  
<div className="mt-10  pt-3">
  <div className="grid grid-cols-1 md:grid-cols-1 gap-6 text-white/50">
    {["Specialization", "Preferred Learner Level", ].map((field) => (
      <div key={field}>{renderInputField(field)}</div>
    ))}
  </div>
  </div>
  </div>
  </div>
  <div className='pt-3 mt-10'>
  <div className='md:mx-auto w-full max-w-[800px] my-2 bg-white bg-opacity-[4%] border-white border-opacity-10 border-2 text-white p-4'>
      <div className='flex'> <h3 className="text-xl  font-semibold mb-4">Professional Bio</h3>
    
      </div>
      <textarea type="text"
      className='h-[243px] w-full bg-white/10 p-3 ' 
      placeholder='Write a short bio about yourself' ></textarea>
        </div>
  </div>
            </div>
            <button className='mx-auto flex justify-center bg-[#4318D1] mt-10 py-2 px-10'>Save</button>
      </form>
      </div>
      <div>
        fhbdjnkms,
      </div>
      {localError && <p className="text-red-500 mt-4 text-center justify-center items-center">{localError}</p>}
        {success && <p className="text-green-500 mt-4 text-center">{success}</p>}
      </div>
  )
}

export default TutorProfileCard
