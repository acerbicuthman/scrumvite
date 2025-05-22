import { useRef, useState, useEffect } from "react";
import ImageUploadBox from './ProfileImgUpload';
import axios from "axios";
import { base_url } from "../../../library/api";
import { supabase } from "../../../SupabaseFile";
import { getCurrentUserId } from "../../../lib/utilityCurrent";
import useHydratedProfile from "../../../hooks/useHydratedProfile";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router";

const CardLearnerProfileForm = () => {
  const isUsingExistingImage = useRef(false);
  const [isEditing, setIsEditing] = useState(true);
  const [localError, setLocalError] = useState(null);
  const [success, setSuccess] = useState("");
  // const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const { formData, setFormData, userEmail, profileId, refetchProfile,   loading: loadingProfile, } = useHydratedProfile();


  const safeUserId = userEmail?.replace(/[@.]/g, "_") || null;


  useEffect(() => {
    if (!loadingProfile && profileId) {
      setIsEditing(false); // switch to view mode only if profile exists
    }
  }, [loadingProfile, profileId]);
  
  
  useEffect(() => {
    if (
      localError === "Profile not found. Please create a profile." &&
      safeUserId
    ) {
      setIsEditing(true);
    }
  }, [localError, safeUserId]);

  const handleEditClick = (e) => {
    e.preventDefault();
    setIsEditing(true);

  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = async (file) => {
    setLocalError(null);

    if (!file || !file.type.startsWith("image/")) {
      setLocalError("Please upload a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setLocalError("Image must be under 5MB.");
      return;
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
        setLocalError("Image upload failed.");
        return;
      }

      const { data: urlData } = supabase.storage
        .from("img-profile")
        .getPublicUrl(fileName);

      const publicUrl = urlData?.publicUrl;
      if (!publicUrl) {
        setLocalError("Failed to retrieve uploaded image URL.");
        return;
      }

      setFormData((prev) => ({ ...prev, profilePicture: publicUrl }));
    } catch (err) {
      setLocalError("Unexpected error during image upload.");
    }
  };
  const handleSaveProfile = async (e) => {
    e.preventDefault();
   
    // Example: parse fullName into firstName and lastName
    const [firstName, ...rest] = formData.fullName.trim().split(' ');
    const lastName = rest.join(' ') || '';
  
    // Validate required fields here if needed
  
    const profileData = {
      student: {
        first_name: firstName,
        last_name: lastName,
      },
      username: userEmail, // optionally send userEmail if needed, or omit if backend uses authenticated user
      profile_picture: formData.profilePicture || '',
      phone_number: formData.phone || '',
      gender: formData.gender || 'male',
      date_of_birth: formData.dob || null,
      city: formData.city || '',
      country: formData.country || '',
      nationality: formData.nationality || '',
      status: 'active',
      education_level: formData.education_level || '',
      current_role: formData.current_role || '',
      industry: formData.industry || '',
      linkedin_profile: formData.linkedin_profile || '',
      updated_at: new Date().toISOString(),
    };
  
    if (profileId) {
      // Remove email before sending PATCH
      delete profileData.student.email;
    }
    
    try {
      const token = localStorage.getItem('accessToken');
  
      let response;
  
      if (profileId) {
        // Update existing profile
        response = await axios.patch(
          `${base_url}api/userProfile/student_profile/${profileId}/`,
          profileData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        
        );
        await refetchProfile();
      } else {
        // Create new profile (if needed)
        response = await axios.post(
          `${base_url}api/userProfile/student_profile/`,
          profileData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
  
      await refetchProfile();
      setSuccess('Profile updated!');
      setIsEditing(false);
      // Optionally handle response, e.g. show success message
      console.log('Profile saved successfully:', response.data);
  
    } catch (error) {
      // Handle errors properly
      console.error('Failed to save profile:', error.response?.data || error.message);
    }
   
  };
  
  
  
  

  const handleCancel = () => {
   
    if (profileId) {
      setIsEditing(false); // Just go back to view mode
    } else {
      setFormData({ ...initialEmptyForm }); // Reset form if creating
    }
    setLocalError(null);
  };

  // if (loading) return <div className="text-center text-lg my-20">Loading...</div>;
  if (localError && localError !== "Profile not found. Please create a profile.") {
    return <div className="text-red-600 text-xl text-center mt-28">{localError}</div>;
  }



      return (
        <div className="w-full max-w-[800px] mx-auto mt-10 md:mt-20 p-4 md:p-6 bg-black bg-opacity-10 text-white rounded-xl shadow-md">
       

        
         
          <div className="bg-[#0A0A0A] md:p-8 px-4 rounded-md md:w-[800px] mx-auto">

            <div className="m-5">
            <h2 className="text-3xl font-semibold">
            
            {localError ? "Create Profile" : "Profile"}
          </h2>
            </div>
          
          <form onSubmit={handleSaveProfile} id="profile-form">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-[300px] aspect-square ">
                <ImageUploadBox
                  onImageChange={handleImageChange}
                  defaultImage={formData.profilePicture}
                  disabled={!isEditing}
                />
              </div>
              <div className="w-full space-y-4 md:mt:0 mt-10">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className=" bg-white bg-opacity-10 w-full rounded-sm p-2"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
  id="email"
  value={userEmail || ''}
  readOnly
  className={`w-full p-2  ${!userEmail ? "bg-gray-100 text-gray-400" : "bg-white bg-opacity-10 w-full rounded-sm p-2"} cursor-not-allowed`}
  placeholder="Loading email..."
/>


                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <input
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className="bg-white bg-opacity-10 w-full rounded-sm p-2"
                  />
                </div>
              </div>
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label htmlFor="gender" className="block text-sm font-medium mb-1">
                  Gender
                </label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="bg-white bg-opacity-10 w-full rounded-sm p-2"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
    
              <div>
                <label htmlFor="dob" className="block text-sm font-medium mb-1">
                  Date of Birth
                </label>
                <input
                  id="dob"
                  type="date"
                  value={formData.dob || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="bg-white bg-opacity-10 w-full rounded-sm p-2"
                />
              </div>
    
              {["city", "nationality", "country", "education_level", "current_role", "industry", "linkedin_profile"].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium mb-1 capitalize">
                    {field.replace("_", " ")}
                  </label>
                  <input
                    id={field}
                    value={formData[field]}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className="bg-white bg-opacity-10 w-full rounded-sm p-2"
                  />
                </div>
              ))}
            </div>
    
    
          </form>
          <div className="flex justify-end gap-4 mt-6">
  {isEditing ? (
    <>
      <button
        type="submit"
        form="profile-form"
        className="px-4 py-2 bg-[#4318D1] text-white rounded"
      >
        Save
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className="px-4 py-2 bg-gray-600 text-white rounded"
      >
        Cancel
      </button>
    </>
  ) : (
    <button
      type="button"
      onClick={handleEditClick}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      <FaEdit className="inline mr-2" /> Edit
    </button>
  )}
</div>
</div>
        </div>
      );
    }
export default CardLearnerProfileForm    