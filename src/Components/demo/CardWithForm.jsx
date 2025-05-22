import { useRef, useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../Components/ui/card";
import InputField from "../../Components/demo/InputField";
import SelectField from "../../Components/demo/SelectField";
import ImageUploadBox from "../../Pages/Learner/learner-profile/ProfileImgUpload";
import axios from "axios";
import { base_url } from "../../library/api";
import { supabase } from "../../SupabaseFile";
import { getCurrentUserId } from "../../lib/utilityCurrent";
import useHydratedProfile from "../../hooks/useHydratedProfile";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router";

export function CardWithForm() {
  const isUsingExistingImage = useRef(false);
  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { formData, setFormData, loading, userEmail, setError: setProfileError } = useHydratedProfile();

  // Auto-enable editing if profile is not found
  useEffect(() => {
    if (error === "Profile not found. Please create a profile.") {
      const userId = getCurrentUserId();
      if (userId) setIsEditing(true);
    }
  }, [error]);

  const handleEditClick = () => {
    setIsEditing(true);  
  };
  

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value, field) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = async (file) => {
    setError(null);

    if (!file || !file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB.");
      return;
    }

    const userId = getCurrentUserId();
    const safeUserId = userId.replace(/[@.]/g, "_");
    const fileName = `user_${safeUserId}/${Date.now()}_${file.name}`;

    if (formData.profilePicture) {
      const oldFileName = formData.profilePicture.split("/").pop();
      await supabase.storage
        .from("img-profile")
        .remove([`user_${safeUserId}/${oldFileName}`]);
    }

    const { error: uploadError } = await supabase.storage
      .from("img-profile")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.type,
      });

    if (uploadError) {
      setError("Image upload failed.");
      return;
    }

    const { data: urlData } = supabase.storage
      .from("img-profile")
      .getPublicUrl(fileName);

    const publicUrl = urlData?.publicUrl;
    if (!publicUrl) {
      setError("Failed to retrieve uploaded image URL.");
      return;
    }

    setFormData((prev) => ({ ...prev, profilePicture: publicUrl }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess("");
  
    const token = localStorage.getItem("accessToken");
    const userId = getCurrentUserId();
  
    if (!token || !userId) {
      setError("No valid session. Please log in.");
      setTimeout(() => navigate("/signin"), 2000);
      return;
    }
  
    const {
      fullName,
      phone,
      gender,
      city,
      nationality,
      country,
      dob,
      profilePicture,
      education_level,
      current_role,
      industry,
      linkedin_profile,
    } = formData;
    const email = userEmail; // This is the email we are trying to update
    const [firstName, ...rest] = fullName.trim().split(" ");
    const lastName = rest.join(" ").trim();
    
    if (!firstName || !lastName) {
      setError("Full name must include at least a first and last name.");
      return;
    }
  
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
  
    if (!city || !country) {
      setError("City and country are required.");
      return;
    }
  
    const profileData = {
      student: {
        first_name: firstName,
        last_name: lastName,
        email, // Only include email if it’s not already part of the profile
        id: userId.includes('@') ? undefined : userId,
      },
      username: email,  // Don't change the email if the user didn't modify it
      profile_picture: profilePicture || "",
      phone_number: phone || "",
      gender: gender || "male",
      date_of_birth: dob || null,
      city: city || "",
      country: country || "",
      nationality: nationality || "",
      status: "active",
      education_level: education_level || "",
      current_role: current_role || "",
      industry: industry || "",
      linkedin_profile: linkedin_profile || "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  
    // If the email is already part of the profile and has not been changed, 
    // don’t include it in the update request to avoid duplicate email errors
    if (userEmail === email) {
      delete profileData.student.email;
    }
  
    try {
      const res = await axios.get(`${base_url}api/userProfile/student_profile/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Filter profiles by email match
      const profiles = res.data.results.filter((item) => {
        const profileEmail = item?.student?.email || item?.email || item?.username;
        return profileEmail?.toLowerCase() === email?.toLowerCase();
      });
  
      let response;
      if (profiles.length > 1) {
        // Handle multiple profiles scenario, take the most recent one
        setError("Multiple profiles detected. Using the most recent. Contact support to resolve duplicates.");
        const existing = profiles.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))[0];
        response = await axios.patch(
          `${base_url}api/userProfile/student_profile/${existing.studentId}/`,
          profileData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else if (profiles.length === 1) {
        // Profile exists, update it
        const existing = profiles[0];
        response = await axios.patch(
          `${base_url}api/userProfile/student_profile/${existing.studentId}/`,
          profileData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // No profile found, create a new profile
        profileData.studentId = `student_${userId.replace(/[@.]/g, '_')}_${Date.now()}`;
        response = await axios.post(
          `${base_url}api/userProfile/student_profile/`,
          profileData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
  
      // Check if the request was successful
      if (response.status === 200 || response.status === 201) {
        const updated = response.data;
        const updatedFormData = {
          fullName: `${updated.student?.first_name || firstName} ${updated.student?.last_name || lastName}`.trim(),
          phone: updated.phone_number || phone,
          gender: updated.gender || gender,
          dob: updated.date_of_birth || dob,
          city: updated.city || city,
          nationality: updated.nationality || nationality,
          country: updated.country || country,
          profilePicture: updated.profile_picture || profilePicture,
          education_level: updated.education_level || education_level,
          current_role: updated.current_role || current_role,
          industry: updated.industry || industry,
          linkedin_profile: updated.linkedin_profile || linkedin_profile,
        };
  
        setFormData(updatedFormData);
        localStorage.setItem(`formData_${userId.replace(/[@.]/g, '_')}`, JSON.stringify(updatedFormData));
        setSuccess("Profile saved successfully.");
        setIsEditing(false);
        isUsingExistingImage.current = !!updated.profile_picture;
      }
    } catch (err) {
      setError('Failed to save profile. Please try again.');
    }
  };
  
  
  const handleCancel = () => {
    const userId = getCurrentUserId();
    const safeUserId = userId.replace(/[@.]/g, "_");
    const savedData = localStorage.getItem(`formData_${safeUserId}`);
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    setIsEditing(false);
    setError(null);
  };

  if (loading) return <div className="text-center text-lg my-20">Loading...</div>;
  if (error && error !== "Profile not found. Please create a profile.") {
    return <div className="text-red-600 text-xl text-center mt-28">{error}</div>;
  }

  return (
    <Card className="w-full max-w-[800px] mx-auto mt-10 md:mt-20 p-4 md:p-6 bg-black bg-opacity-10 text-white">
      <CardHeader>
        <CardTitle>{error ? "Create Profile" : "Profile"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSaveProfile} id="profile-form">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-[200px] aspect-square">
              <ImageUploadBox
                onImageChange={handleImageChange}
                defaultImage={formData.profilePicture}
                disabled={!isEditing}
              />
            </div>
            <div className="w-full space-y-4">
              <InputField id="fullName" label="Full Name" value={formData.fullName} onChange={handleChange} readOnly={!isEditing} />
              <InputField id="email" label="Email" value={userEmail} defaultValue={true} />
              <InputField id="phone" label="Phone" value={formData.phone} onChange={handleChange} readOnly={!isEditing} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <SelectField
              id="gender"
              label="Gender"
              value={formData.gender}
              onChange={(val) => handleSelectChange(val, "gender")}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
              ]}
              placeholder="Select Gender"
              disabled={!isEditing}
            />
            <InputField id="dob" label="Date of Birth" value={formData.dob || ""} onChange={handleChange} type="date" readOnly={!isEditing} />
            <InputField id="city" label="City" value={formData.city} onChange={handleChange} readOnly={!isEditing} />
            <InputField id="nationality" label="Nationality" value={formData.nationality} onChange={handleChange} readOnly={!isEditing} />
            <InputField id="country" label="Country" value={formData.country} onChange={handleChange} readOnly={!isEditing} />
            <InputField id="education_level" label="Education Level" value={formData.education_level} onChange={handleChange} readOnly={!isEditing} />
            <InputField id="current_role" label="Current Role" value={formData.current_role} onChange={handleChange} readOnly={!isEditing} />
            <InputField id="industry" label="Industry" value={formData.industry} onChange={handleChange} readOnly={!isEditing} />
            <InputField id="linkedin_profile" label="LinkedIn Profile" value={formData.linkedin_profile} onChange={handleChange} readOnly={!isEditing} />
          </div>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          {success && <p className="text-green-500 mt-4 text-center">{success}</p>}
          {/* <CardFooter className="flex justify-end gap-4"> */}
          {isEditing ? (
      <>
        
      <div className="flex ">

     
        <button 
          type="submit" 
          className="px-4 py-2 bg-[#4318D1] text-white rounded hover:bg-[#3510a1]"
        >
          Save
        </button>
        <button 
          type="button" 
          onClick={handleCancel} 
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Cancel
        </button>
        </div> 
      </>
   ) : (<div>
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        <FaEdit className="inline mr-2" /> Edit
      </button>
      
      </div>)}
      {/* </CardFooter> */}
        </form>
      </CardContent>

    
    
    </Card>
  );
}
