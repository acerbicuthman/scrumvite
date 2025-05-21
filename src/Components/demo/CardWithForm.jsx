import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import InputField from "@/Components/demo/InputField";
import SelectField from "@/Components/demo/SelectField";
import ImageUploadBox from "@/Pages/Learner/learner-profile/ProfileImgUpload";
import axios from "axios";
import { base_url } from "@/library/api";
import { useNavigate } from "react-router-dom";
import { supabase } from '@/SupabaseFile';

// Utility to decode JWT token
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Failed to parse token:", e);
    return null;
  }
}

export function CardWithForm() {
  const navigate = useNavigate();
  const isUsingExistingImage = useRef(false);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    city: "",
    nationality: "",
    country: "",
    dob: "",
    profilePicture: null,
  });

  // Handlers
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value, field) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = async (file) => {
    setError(null);
  
    if (!file) {
      setError("No file selected.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be under 5MB.");
      return;
    }
  
    const fileName = `${Date.now()}_${file.name}`;
  
    // Upload the file to Supabase Storage
    const { data, error: uploadError } = await supabase.storage
      .from("profile-pics") // ✅ use your actual bucket name
      .upload(fileName, file);
  
    if (uploadError) {
      console.error("Upload error:", uploadError.message);
      setError("Failed to upload image.");
      return;
    }
  
    // Get the public URL of the uploaded image
    const { data: urlData } = supabase.storage
      .from("profile-pics")
      .getPublicUrl(fileName);
  
    const publicUrl = urlData?.publicUrl;
  
    if (!publicUrl) {
      setError("Unable to retrieve image URL.");
      return;
    }
  
    // Update formData with the public image URL
    setFormData((prev) => ({
      ...prev,
      profilePicture: publicUrl,
    }));
  };
  

  const handleEditProfile = () => {
    setSuccess(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/signin");
  };

  const saveToLocalStorage = (data) => {
    const token = localStorage.getItem("accessToken");
    const decoded = parseJwt(token);
    const userId = data.email || decoded?.email || decoded?.user_id || "default";
    localStorage.setItem(`userProfileData_${userId}`, JSON.stringify(data));
  };

  const loadFromLocalStorage = () => {
    const token = localStorage.getItem("accessToken");
    const decoded = parseJwt(token);
    const userId = decoded?.email || decoded?.user_id;
    if (userId) {
      const stored = localStorage.getItem(`userProfileData_${userId}`);
      if (stored) return JSON.parse(stored);
    }
    return null;
  };

  const clearStaleLocalStorage = (currentUserId) => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("userProfileData_") && !key.includes(currentUserId)) {
        localStorage.removeItem(key);
      }
    });
  };

  const refreshToken = async () => {
    try {
      const res = await axios.post(`${base_url}api/token/refresh/`, {
        refresh: localStorage.getItem("refreshToken"),
      });
      localStorage.setItem("accessToken", res.data.access);
      return res.data.access;
    } catch (err) {
      console.error("Token refresh failed", err);
      return null;
    }
  };

  const fetchProfileFromAPI = async (token, userId) => {
    const res = await axios.get(`${base_url}api/userProfile/student_profile/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const profile = res.data.results.find(
      (item) => item.email === userId || item.student?.email === userId
    );

    if (profile) {
      const apiData = {
        fullName: `${profile.first_name || ""} ${profile.last_name || ""}`.trim(),
        email: profile.email || "",
        phone: profile.phone_number || "",
        gender: profile.gender || "",
        dob: profile.date_of_birth || "",
        city: profile.city || "",
        country: profile.country || "",
        nationality: profile.nationality || "",
        profilePicture: profile.profile_picture || null,
      };
      setFormData(apiData);
      setSuccess(true);
      isUsingExistingImage.current = !!profile.profile_picture;
      saveToLocalStorage(apiData);
    } else {
      setSuccess(false);
    }
  };

  const fetchProfile = async () => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("Missing access token. Please log in.");
      setLoading(false);
      return;
    }

    const decoded = parseJwt(token);
    const userId = decoded?.email || decoded?.user_id;

    if (!userId) {
      setError("Invalid token. Please log in again.");
      setLoading(false);
      return;
    }

    clearStaleLocalStorage(userId);
    const localData = loadFromLocalStorage();
    if (localData) {
      setFormData(localData);
      setSuccess(true);
      setLoading(false);
    }

    try {
      await fetchProfileFromAPI(token, userId);
    } catch (err) {
      if (err.response?.status === 401) {
        const newToken = await refreshToken();
        if (newToken) {
          await fetchProfileFromAPI(newToken, userId);
        } else {
          setError("Authentication failed. Please log in.");
          navigate("/signin");
        }
      } else {
        setError("Failed to fetch profile.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setError(null);

    const token = localStorage.getItem("accessToken");
    const decoded = parseJwt(token);
    const userId = decoded?.email || decoded?.user_id;

    const { fullName, email, phone, gender, city, nationality, country, dob } = formData;
    const [firstName, ...rest] = fullName.trim().split(" ");
    const lastName = rest.join(" ");

    if (!firstName || !email || !city || !country) {
      setError("Required fields are missing.");
      return;
    }

    const profileData = new FormData();
    profileData.append("first_name", firstName);
    profileData.append("last_name", lastName);
    profileData.append("email", email);
    profileData.append("phone_number", phone);
    profileData.append("gender", gender);
    profileData.append("date_of_birth", dob);
    profileData.append("city", city);
    profileData.append("country", country);
    profileData.append("nationality", nationality);
    profileData.append("status", "active");

    if (imageFile) {
      profileData.append("profile_picture", imageFile);
    } else if (formData.profilePicture && isUsingExistingImage.current) {
      profileData.append("keep_existing_picture", "true");
    }

    try {
      const res = await axios.get(`${base_url}api/userProfile/student_profile/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const existing = res.data.results.find(
        (item) => item.email === userId || item.student?.email === userId
      );

      let response;
      if (existing) {
        response = await axios.patch(
          `${base_url}api/userProfile/student_profile/${studentId}/`,
          profileData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        response = await axios.post(
          `${base_url}api/userProfile/student_profile/`,
          profileData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (response.status === 200 || response.status === 201) {
        alert("Profile saved.");
        const updatedData = {
          ...formData,
          profilePicture: response.data.profile_picture || formData.profilePicture,
        };
        setFormData(updatedData);
        setImageFile(null);
        saveToLocalStorage(updatedData);
        setSuccess(true);
        isUsingExistingImage.current = !!response.data.profile_picture;
      }
    } catch (err) {
      console.error("Save failed", err);
      setError("Failed to save profile.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <div className="text-center text-lg my-20">Loading...</div>;

  return (
    <Card className="w-full max-w-[800px] mx-auto mt-20 p-6 bg-black bg-opacity-10 text-white">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSaveProfile} id="profile-form">
          <ImageUploadBox
            onImageChange={handleImageChange}
            defaultImage={formData.profilePicture}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <InputField id="fullName" label="Full Name" value={formData.fullName} onChange={handleChange} />
            <InputField id="email" label="Email" value={formData.email} onChange={handleChange} disabled />
            <InputField id="phone" label="Phone" value={formData.phone} onChange={handleChange} />
            <SelectField label="Gender" value={formData.gender} onChange={(val) => handleSelectChange(val, "gender")} options={["Male", "Female", "Other"]} />
            <InputField id="dob" label="Date of Birth" value={formData.dob} onChange={handleChange} type="date" />
            <InputField id="city" label="City" value={formData.city} onChange={handleChange} />
            <InputField id="nationality" label="Nationality" value={formData.nationality} onChange={handleChange} />
            <InputField id="country" label="Country" value={formData.country} onChange={handleChange} />
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        {success ? (
          <button onClick={handleEditProfile} className="bg-[#4318D1] px-6 py-2 text-white rounded">
            Edit Profile
          </button>
        ) : (
          <button type="submit" form="profile-form" className="bg-[#4318D1] px-6 py-2 text-white rounded">
            Save
          </button>
        )}
        <button onClick={handleLogout} className="bg-gray-600 px-6 py-2 text-white rounded">
          Log Out
        </button>
      </CardFooter>
    </Card>
  );
}
