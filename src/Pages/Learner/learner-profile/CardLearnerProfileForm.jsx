import { useRef, useState, useEffect } from "react";
import ImageUploadBox from './ProfileImgUpload';
import axios from "axios";
import { base_url } from "../../../library/api";
import { supabase } from "../../../SupabaseFile";
import useHydratedProfile from "../../../hooks/useHydratedProfile";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router";

const CardLearnerProfileForm = () => {
  const isUsingExistingImage = useRef(false);
  const [isEditing, setIsEditing] = useState(true);
  const [localError, setLocalError] = useState(null);
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { formData, setFormData, userEmail, profileId, refetchProfile,  userId, loading: loadingProfile } = useHydratedProfile();

 
  // Define initial empty form
  const initialEmptyForm = {
    fullName: '',
    phone: '',
    gender: '',
    city: '',
    nationality: '',
    country: '',
    dob: '',
    profilePicture: null,
    education_level: '',
    current_role: '',
    industry: '',
    linkedin_profile: '',
  };

  // Sanitize userEmail for Supabase
  const safeUserId = userEmail ? userEmail.replace(/[@.]/g, "_") : null;

  useEffect(() => {
    if (!loadingProfile && profileId) {
      setIsEditing(false);
    }
  }, [loadingProfile, profileId]);

  useEffect(() => {
    if (localError === "Profile not found. Please create a profile." && safeUserId) {
      setIsEditing(true);
    }
  }, [localError, safeUserId]);

  useEffect(() => {
    console.log("userEmail:", userEmail);
  }, [userEmail]);

  const handleEditClick = (e) => {
    e.preventDefault();
    console.log("Edit button clicked");
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(`Changing ${id} to:`, value);
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

    if (!safeUserId) {
      setLocalError("No valid user ID for image upload.");
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
        setLocalError("Image upload failed: " + uploadError.message);
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
      console.error("Image upload error:", err);
      setLocalError("Unexpected error during image upload.");
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLocalError(null);
    setSuccess("");
    setSaving(true);

    console.log("handleSaveProfile called");

    const [firstName, ...rest] = formData.fullName.trim().split(" ");
    const lastName = rest.join(" ").trim();

    // Minimal validation to match SystemInfo
    // if (!firstName) {
    //   setLocalError("First name is required.");
    //   setSaving(false);
    //   return;
    // }

    const profileData = {
      student: {
        id: userId,
        first_name: firstName,
        last_name: lastName || "",
        // Include email for POST only
        ...(profileId ? {} : { email: userEmail }),
      },
      studentId: profileId || `student_${safeUserId}_${Date.now()}`,
      username: userEmail,
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

    console.log("profileData:", profileData);

    try {
      const token = localStorage.getItem("accessToken");
      console.log("accessToken:", token);
      console.log("profileId:", profileId);

      if (!token) {
        setLocalError("No valid session. Please log in.");
        setSaving(false);
        setTimeout(() => navigate("/signin"), 2000);
        return;
      }

      let response;
      if (profileId) {
        console.log("PATCH payload:", profileData);
        response = await axios.patch(
          `${base_url}api/userProfile/student_profile/${profileId}/`,
          profileData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        console.log("POST payload:", profileData);
        response = await axios.post(
          `${base_url}api/userProfile/student_profile/`,
          profileData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      console.log("API response:", response.data);
      await refetchProfile();
      setSuccess("Profile updated!");
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving profile:", err);
      console.log("Error response:", err.response?.data);
      setLocalError(
        err.response?.status === 401
          ? "Session expired. Please log in again."
          : err.response?.status === 400
          ? (err.response?.data?.detail || JSON.stringify(err.response?.data) || "Invalid profile data. Please check your input.")
          : err.message === "Network Error"
          ? "Cannot connect to server. Please try again later."
          : "Failed to save profile."
      );
      if (err.response?.status === 401) {
        localStorage.removeItem("accessToken");
        setTimeout(() => navigate("/signin"), 2000);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (profileId) {
      setIsEditing(false);
    } else {
      setFormData({ ...initialEmptyForm });
    }
    setLocalError(null);
    setSuccess("");
  };

  if (loadingProfile) {
    return <div className="text-center text-lg my-20">Loading...</div>;
  }

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
            <div className="w-full md:w-[400px] md:h-[260px] aspect-square">
              <ImageUploadBox
                onImageChange={handleImageChange}
                defaultImage={formData.profilePicture}
                disabled={!isEditing}
              />
            </div>
            <div className="w-full space-y-4 md:mt-0 mt-10">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  id="fullName"
                  value={formData.fullName || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="bg-white bg-opacity-10 w-full rounded-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  value={userEmail || ""}
                  readOnly
                  className={`w-full p-2 ${
                    !userEmail ? "bg-gray-100 text-gray-400" : "bg-white bg-opacity-10"
                  } rounded-sm cursor-not-allowed`}
                  placeholder="Loading email..."
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone
                </label>
                <input
                  id="phone"
                  value={formData.phone || ""}
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
                value={formData.gender || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="bg-white bg-opacity-10 w-full rounded-sm p-2"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
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
                  value={formData[field] || ""}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="bg-white bg-opacity-10 w-full rounded-sm p-2"
                />
              </div>
            ))}
          </div>

          
        </form>
        <div>
        {localError && <p className="text-red-500 mt-4 text-center h-10">{localError}</p>}
          {success && <p className="text-green-500 mt-4 text-center">{success}</p>}
        </div>


        <div className="flex justify-end gap-4 mt-6">
          {isEditing ? (
            <>
              <button
                type="submit"
                form="profile-form"
                className="px-4 py-2 bg-[#4318D1] text-white rounded hover:bg-[#3510a1] disabled:bg-gray-400"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                disabled={saving}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleEditClick}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <FaEdit className="inline mr-2" /> Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardLearnerProfileForm;