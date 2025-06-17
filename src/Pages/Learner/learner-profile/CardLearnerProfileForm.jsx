import { useRef, useState, useEffect, useMemo, useCallback, Suspense } from "react";
import ImageUploadBox from "./ProfileImgUpload";
import axiosInstance from "../../../context/axiosInstance";
import { base_url } from "../../../library/api";
import { supabase } from "../../../SupabaseFile";
import useHydratedProfile from "../../../hooks/useHydratedProfile";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router";
import SystemInfo from "./SystemInfo";
import { useAuth } from "../../../context/Authcontext";
import CountryForm from "../../../library/CountryForm";

const CardLearnerProfileForm = () => {
  const [isEditing, setIsEditing] = useState(true);
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const email = user?.email || localStorage.getItem("userEmail") || "";
  // const token = localStorage.getItem("accessToken");
  const safeUserId = email?.replace(/[@.]/g, "_") ?? null;

  const {
    formData,
    setFormData,
    userId,
    profileId,
    loading,
    error,
    localError,
    setLocalError,
    handleImageChange,
    refetchProfile
  } = useHydratedProfile();

  const handleEditClick = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setLocalError(null);
    setSuccess("");
  };

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }, [setFormData]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(false);
    setLocalError(null);
    setSuccess("");
  
    const [firstName, ...rest] = formData.fullName.trim().split(" ");
    const lastName = rest.join(" ").trim();
  
    const profileData = {
      student: {
        id: userId,
        first_name: firstName,
        last_name: lastName || "",
        email: email,
      },
      username: email,
      profile_picture: formData.profilePicture || "",
      phone_number: formData.phone || "",
      gender: formData.gender || "male",
      date_of_birth: formData.dob || null,
      city: formData.city || "",
      country: formData.country || "",
      nationality: formData.nationality || "",
      status: "active",
      education_level: formData.education_level || "",
      current_role: formData.current_role || "",
      industry: formData.industry || "",
      linkedin_profile: formData.linkedin_profile || "",
      updated_at: new Date().toISOString(),
    };
  
    try {
      const requestFn = profileId
        ? axiosInstance.patch(
            "api/userProfile/student_profile/patch_update_student_profile/",
            profileData
          )
        : axiosInstance.post(
            "api/userProfile/student_profile/",
            profileData
          );
  
      await requestFn;
      setSuccess(profileId ? "Profile updated successfully!" : "Profile created successfully!");
      refetchProfile();
      setIsEditing(false);
    } catch (err) {
      console.error("Profile save error:", err?.response || err);
      setLocalError("Error saving profile. Please try again.");
    }
    
     finally {
      setSaving(false);
    }
  };
  

  const renderInputField = useCallback((id, label, type = "text", disabled = false) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1 capitalize text-white/50">
        {label || id.replace("_", " ")}
      </label>
      <input
        id={id}
        type={type}
        value={formData[id] || ""}
        onChange={handleChange}
        readOnly={!isEditing || disabled}
        placeholder={`Enter ${label || id.replace(/_/g, '')}`}
        className="bg-white bg-opacity-10 w-full rounded-sm p-2 placeholder-white/50"
      />
    </div>
  ), [formData, isEditing, handleChange]);

  if (loading || !formData || !userId) {
    return <div className="flex justify-center items-center my-8 h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4318D1]" />
    </div>;
  }

  if (localError && localError !== "Profile not found. Please create a profile.") {
    return <div className="text-red-600 text-xl text-center mt-28 h-screen">{localError}</div>;
  }

  return (
    <div className="w-full max-w-[800px] mx-auto mt-10 md:mt-20 p-4 md:p-6 bg-black bg-opacity-10 text-white rounded-xl shadow-md">
      <div className="bg-[#0A0A0A] md:p-8 px-4 rounded-md">
        <form onSubmit={handleSaveProfile} id="profile-form">
          <div className='px-4 mt-10'>
            <div className="p-4 md:mx-auto w-full max-w-[800px] my-2 bg-white bg-opacity-[4%] border-white border-opacity-10 border-2 text-white">
              <h2 className="text-3xl font-semibold m-5">
                {localError ? "Create Profile" : "Update Profile"}
              </h2>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-[400px] aspect-square">
                  <ImageUploadBox
                    onImageChange={handleImageChange}
                    defaultImage={formData.profilePicture}
                    onImageDeleted={() => setFormData(prev => ({ ...prev, profilePicture: '' }))}
                    userId={userId}
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
                  <label htmlFor="gender" className="block text-sm font-medium mb-1">Gender</label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="bg-white/10 bg-opacity-10 w-full rounded-sm p-2 text-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {renderInputField("dob", "Date of Birth", "date")}
                {renderInputField("city")}
                {renderInputField("nationality")}
              </div>
              <div className="mt-4">
                <CountryForm 
                  value={formData.country}
                  onChange={(val) => setFormData(prev => ({ ...prev, country: val }))}
                  disabled={!isEditing} />
              </div>
            </div>
          </div>

          <div className='px-4 mt-10'>
            <div className='md:mx-auto w-full max-w-[800px] my-2 bg-white bg-opacity-[4%] border-white border-opacity-10 border-2 text-white p-4'>
              <h3 className="text-xl font-semibold mb-4">Education & Professional Details</h3>
              <div className="mt-10 pt-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
                  {["education_level", "current_role", "industry", "linkedin_profile"].map((field) => (
                    <div key={field}>{renderInputField(field)}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="my-10">
          <SystemInfo />
        </div>

        {localError && <p className="text-red-500 mt-4 text-center justify-center items-center">{localError}</p>}
        {success && <p className="text-green-500 mt-4 text-center">{success}</p>}

        <div className="flex justify-center gap-4 mt-10 py-4">
        {isEditing && (
  <>
    <button type="submit" form="profile-form"
     className="px-10 py-2 bg-[#4318D1] text-white rounded"
    >Save</button>
    <button type="button" onClick={handleCancel}>Cancel</button>
  </>
)}

{!isEditing && (
  <button type="button" onClick={handleEditClick}
  className="px-10 py-2 bg-[#4318D1] text-white rounded">
    <FaEdit className="inline mr-2" /> Edit
  </button>
)}

</div>
      </div>
    </div>
  );
};

export default CardLearnerProfileForm;
