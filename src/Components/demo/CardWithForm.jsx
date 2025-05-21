import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import InputField from "@/Components/demo/InputField";
import SelectField from "@/Components/demo/SelectField";
import ImageUploadBox from "@/Pages/Learner/learner-profile/ProfileImgUpload";
import axios from "axios";
import { base_url } from "@/library/api";
import { useNavigate } from "react-router-dom";

// Manual JWT decode function
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Failed to parse token:', e);
    return null;
  }
}

export function CardWithForm() {
  const [imageFile, setImageFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const isUsingExistingImage = useRef(false);
  const navigate = useNavigate();

  // Handle image change from ImageUploadBox
  const handleImageChange = (file) => {
    if (success || !file) {
      setError("No file selected. Please choose an image.");
      return;
    }

    // Validate file
    if (!file.type.startsWith('image/')) {
      setError("Invalid file type. Please select an image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError("File too large. Please select an image under 5MB.");
      return;
    }

    setImageFile(file);
    setFormData((prev) => ({
      ...prev,
      profilePicture: URL.createObjectURL(file), // Local preview
    }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e }));
  };

  // Save form data to localStorage with email as key
  const saveToLocalStorage = (data) => {
    try {
      const token = localStorage.getItem("accessToken");
      const decoded = parseJwt(token);
      const userId = data.email || decoded?.email || decoded?.user_id || 'default';
      localStorage.setItem(`userProfileData_${userId}`, JSON.stringify(data));
      console.log(`Saved to localStorage: userProfileData_${userId}`, data);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  // Load form data from localStorage
  const loadFromLocalStorage = () => {
    try {
      // Prioritize email-based keys
      for (let key of Object.keys(localStorage)) {
        if (key.startsWith("userProfileData_")) {
          const data = JSON.parse(localStorage.getItem(key));
          if (data && data.email && Object.keys(data).length > 0) {
            console.log("Loaded from localStorage:", data);
            return data;
          }
        }
      }
      // Fallback to token-based lookup
      const token = localStorage.getItem("accessToken");
      if (token) {
        const decoded = parseJwt(token);
        const userId = decoded?.email || decoded?.user_id;
        if (userId) {
          const savedData = localStorage.getItem(`userProfileData_${userId}`);
          if (savedData) {
            const data = JSON.parse(savedData);
            console.log("Loaded from localStorage (token):", data);
            return data;
          }
        }
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
    return null;
  };

  // Clear localStorage for other users
  const clearStaleLocalStorage = (currentUserId) => {
    try {
      if (currentUserId) {
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith("userProfileData_") && !key.includes(currentUserId)) {
            localStorage.removeItem(key);
            console.log(`Cleared stale localStorage key: ${key}`);
          }
        });
      }
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  };

  // Logout function
  const handleLogout = () => {
    try {
      localStorage.removeItem("accessToken");
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      navigate("/login");
    }
  };

  // Refresh token if expired
  const refreshToken = async () => {
    try {
      const refreshResponse = await axios.post(`${base_url}api/token/refresh/`, {
        refresh: localStorage.getItem("refreshToken"),
      });
      localStorage.setItem("accessToken", refreshResponse.data.access);
      return refreshResponse.data.access;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setError(null);

    let token = localStorage.getItem("accessToken");
    if (!token || !token.includes('.')) {
      setError("No valid token found. Please log in.");
      return;
    }

    let decoded = parseJwt(token);
    let userId = decoded?.email || decoded?.user_id;
    if (!userId) {
      setError("Invalid authentication data. Please log in again.");
      return;
    }

    const { fullName, email, phone, gender, city, nationality, country, dob } = formData;
    const [firstName, ...rest] = fullName.trim().split(" ");
    const lastName = rest.join(" ") || "";

    // Basic validation
    if (!firstName || !email || !city || !country) {
      setError("Please fill in all required fields: Full Name, Email, City, and Country");
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
      profileData.append("profile_picture", imageFile); // Send file to backend
    } else if (formData.profilePicture && isUsingExistingImage.current) {
      profileData.append("keep_existing_picture", "true");
    }

    try {
      // Check for existing profile
      const checkResponse = await axios.get(`${base_url}api/userProfile/student_profile/`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000,
      });

      const existingProfile = checkResponse.data.results?.find(
        item => item?.email === userId || item?.student?.email === userId
      );

      let response;
      if (existingProfile) {
        response = await axios.patch(
          `${base_url}api/userProfile/student_profile/${existingProfile.id}/`,
          profileData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
            timeout: 10000,
          }
        );
      } else {
        response = await axios.post(
          `${base_url}api/userProfile/student_profile/`,
          profileData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
            timeout: 10000,
          }
        );
      }

      console.log('Save response:', response.data);

      if (response.status === 200 || response.status === 201) {
        alert("Profile saved successfully.");
        const updatedData = {
          ...formData,
          profilePicture: response.data.profile_picture || formData.profilePicture,
        };
        setFormData(updatedData);
        saveToLocalStorage(updatedData);
        setImageFile(null);
        setSuccess(true);
        isUsingExistingImage.current = !!response.data.profile_picture;
      }
    } catch (err) {
      console.error("Error saving profile:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        const newToken = await refreshToken();
        if (newToken) {
          try {
            const retryResponse = existingProfile
              ? await axios.patch(
                  `${base_url}api/userProfile/student_profile/${existingProfile.id}/`,
                  profileData,
                  {
                    headers: {
                      Authorization: `Bearer ${newToken}`,
                      'Content-Type': 'multipart/form-data',
                    },
                    timeout: 10000,
                  }
                )
              : await axios.post(
                  `${base_url}api/userProfile/student_profile/`,
                  profileData,
                  {
                    headers: {
                      Authorization: `Bearer ${newToken}`,
                      'Content-Type': 'multipart/form-data',
                    },
                    timeout: 10000,
                  }
                );

            if (retryResponse.status === 200 || retryResponse.status === 201) {
              alert("Profile saved successfully after token refresh.");
              const updatedData = {
                ...formData,
                profilePicture: retryResponse.data.profile_picture || formData.profilePicture,
              };
              setFormData(updatedData);
              saveToLocalStorage(updatedData);
              setImageFile(null);
              setSuccess(true);
              isUsingExistingImage.current = !!retryResponse.data.profile_picture;
              return;
            }
          } catch (retryErr) {
            console.error("Retry failed:", retryErr.response?.data || retryErr.message);
          }
        }
        setError("Authentication failed. Please log in again.");
        navigate("/login");
      } else if (err.response?.status === 400 && err.response?.data?.detail?.includes('already exists')) {
        setError("Profile already exists. Please try editing or contact support.");
      } else {
        setError(`Failed to save profile: ${err.response?.data?.detail || JSON.stringify(err.response?.data) || err.message}`);
      }
    }
  };

  // Handle Edit Profile click
  const handleEditProfile = (e) => {
    e.preventDefault();
    setSuccess(false);
  };

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      // Load from localStorage first
      let localData = loadFromLocalStorage();
      if (localData && Object.keys(localData).length > 0) {
        setFormData(localData);
        setSuccess(true);
        isUsingExistingImage.current = !!localData.profilePicture;
      }

      const token = localStorage.getItem("accessToken");
      let userId = null;
      if (token && token.includes('.')) {
        const decoded = parseJwt(token);
        userId = decoded?.email || decoded?.user_id;
      }

      // Clear stale localStorage after loading current data
      if (userId) {
        clearStaleLocalStorage(userId);
      }

      if (!token || !token.includes('.') || !userId) {
        if (!localData) {
          setError("No valid token found and no saved data. Please log in.");
          navigate("/login");
        }
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${base_url}api/userProfile/student_profile/`, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000,
        });

        console.log('GET response:', res.data);

        if (res.status === 200 && res.data?.results?.length > 0) {
          const profile = res.data.results.find(item => item?.email === userId || item?.student?.email === userId);
          if (profile) {
            const apiData = {
              fullName: `${profile.first_name || ''} ${profile.last_name || ''}`.trim(),
              email: profile.email || "",
              phone: profile.phone_number || "",
              gender: profile.gender || "",
              dob: profile.date_of_birth || "",
              city: profile.city || "",
              country: profile.country || "",
              nationality: profile.nationality || "",
              profilePicture: profile.profile_picture || localData?.profilePicture || null,
            };
            saveToLocalStorage(apiData);
            setFormData(apiData);
            setSuccess(true);
            isUsingExistingImage.current = !!profile.profile_picture;
          } else if (!localData) {
            setSuccess(false);
          }
        } else if (!localData) {
          setSuccess(false);
        }
      } catch (err) {
        console.error("Failed to load profile from API:", err.response?.data || err.message);
        if (err.response?.status === 401) {
          const newToken = await refreshToken();
          if (newToken) {
            try {
              const retryRes = await axios.get(`${base_url}api/userProfile/student_profile/`, {
                headers: { Authorization: `Bearer ${newToken}` },
                timeout: 10000,
              });

              if (retryRes.status === 200 && retryRes.data?.results?.length > 0) {
                const profile = retryRes.data.results.find(item => item?.email === userId || item?.student?.email === userId);
                if (profile) {
                  const apiData = {
                    fullName: `${profile.first_name || ''} ${profile.last_name || ''}`.trim(),
                    email: profile.email || "",
                    phone: profile.phone_number || "",
                    gender: profile.gender || "",
                    dob: profile.date_of_birth || "",
                    city: profile.city || "",
                    country: profile.country || "",
                    nationality: profile.nationality || "",
                    profilePicture: profile.profile_picture || localData?.profilePicture || null,
                  };
                  saveToLocalStorage(apiData);
                  setFormData(apiData);
                  setSuccess(true);
                  isUsingExistingImage.current = !!profile.profile_picture;
                } else if (!localData) {
                  setSuccess(false);
                }
              }
            } catch (retryErr) {
              console.error("Retry fetch failed:", retryErr.response?.data || retryErr.message);
              if (!localData) {
                setError("Authentication failed. Please log in again.");
                navigate("/login");
              }
            }
          } else if (!localData) {
            setError("Authentication failed. Please log in again.");
            navigate("/login");
          }
        } else if (!localData) {
          setError("Failed to load profile. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center px-4">
        <div className="flex flex-col items-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4318D1]"></div>
          <p className="mt-4 text-lg">Loading profile information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex justify-center items-center px-4">
        <div className="flex flex-col items-center text-red-500 text-lg">
          <p>{error}</p>
          <div className="flex gap-4 mt-4">
            {error.includes("log in") ? (
              <Button
                onClick={handleLogout}
                className="bg-[#4318D1] px-4 py-2"
              >
                Log In
              </Button>
            ) : (
              <Button
                onClick={() => fetchProfile()}
                className="bg-[#4318D1] px-4 py-2"
              >
                Retry
              </Button>
            )}
            <Button
              onClick={handleLogout}
              className="bg-gray-500 px-4 py-2"
            >
              Log Out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-[800px] my-auto mt-20 md:mt-20 p bg-black bg-opacity-10 text-white">
      <CardHeader className="pb-8">
        <CardTitle className="mb-2">Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSaveProfile}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="md:w-[200px] md:h-[200px] flex-1">
              <ImageUploadBox
                imageUrl={formData.profilePicture}
                onImageChange={handleImageChange}
                disabled={success}
              />
            </div>
            <div className="flex-1 lg:-ml-24 space-y-4 mt-2">
              <InputField
                id="fullName"
                label="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                disabled={success}
              />
              <InputField
                id="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                disabled={success}
              />
              <InputField
                id="phone"
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+234 123 456 7890"
                disabled={success}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-5">
            <div className="flex-1 space-y-4 w-full">
              <SelectField
                id="gender"
                label="Gender"
                value={formData.gender}
                onChange={(value) => handleSelectChange(value, "gender")}
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "non-binary", label: "Non-binary" },
                  { value: "other", label: "Other" },
                  { value: "prefer-not-to-say", label: "Prefer not to say" },
                ]}
                placeholder="Select gender"
                disabled={success}
              />
              <InputField
                id="city"
                label="City"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                disabled={success}
              />
              <SelectField
                id="nationality"
                label="Nationality"
                value={formData.nationality}
                onChange={(value) => handleSelectChange(value, "nationality")}
                options={[
                  { value: "nigerian", label: "Nigerian" },
                  { value: "american", label: "American" },
                  { value: "canadian", label: "Canadian" },
                ]}
                placeholder="Select nationality"
                disabled={success}
              />
            </div>
            <div className="flex-1 space-y-4">
              <InputField
                id="dob"
                label="Date of Birth"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                placeholder=""
                disabled={success}
              />
              <SelectField
                id="country"
                label="Country"
                value={formData.country}
                onChange={(value) => handleSelectChange(value, "country")}
                options={[
                  { value: "ng", label: "Nigeria" },
                  { value: "us", label: "United States" },
                  { value: "ca", label: "Canada" },
                ]}
                placeholder="Select country"
                disabled={success}
              />
            </div>
          </div>

          {error && <div className="text-red-500 m-5">{error}</div>}
        </form>
        <CardFooter className="md:flex justify-center md:justify-end m-2">
          {success ? (
            <Button
              type="button"
              onClick={handleEditProfile}
              className="bg-[#4318D1] px-4 py-5"
            >
              Edit Profile
            </Button>
          ) : (
            <Button type="submit" form="profile-form" className="bg-[#4318D1] px-10 py-6">
              Save
            </Button>
          )}
          <Button
            type="button"
            onClick={handleLogout}
            className="bg-gray-500 px-4 py-5 ml-4"
          >
            Log Out
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}