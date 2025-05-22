import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { base_url } from '../../../library/api';

const StudentBackground = () => {
  const formRef = useRef(); // We'll use a reference to access form values directly
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [profile, setProfile] = useState(null); // To store fetched profile data
  const [loading, setLoading] = useState(true); // State to manage loading

  // Fetch the profile from the backend and populate the form fields
  const fetchProfile = async () => {
    const token = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user?.email;

    if (!token || !email) {
      console.error('No token or email found');
      setError('Authentication data missing');
      setLoading(false); // Stop loading if authentication data is missing
      return;
    }

    try {
      const res = await axios.get(`${base_url}api/userProfile/student_profile/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Find the profile that matches the logged-in user's email
      const existingProfile = res.data.results.find(
        (item) => item.student?.email.toLowerCase() === email.toLowerCase()
      );

      if (existingProfile) {
        setProfile(existingProfile); // Set profile data
      } else {
        setProfile(null); // No profile found
      }
      setLoading(false); // Stop loading after data is fetched
    } catch (err) {
      console.error('Error fetching profile:', err.response?.data || err.message);
      setError('Failed to fetch profile');
      setLoading(false); // Stop loading after error
    }
  };

  // Call fetchProfile when component mounts
  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle saving the form data to the backend
  const handleSave = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    const token = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user'))
    if (!token || !user) {
      setError('No token or user found. Please log in.');
      return;
    }

    // Gather form data using ref
    const profileData = new FormData();
    profileData.append('education_level', formRef.current.education_level.value || '');
    profileData.append('current_role', formRef.current.current_role.value || '');
    profileData.append('industry', formRef.current.industry.value || '');
    profileData.append('linkedin_profile', formRef.current.linkedin_profile.value || '');

    try {
      const res = await axios.get(`${base_url}api/userProfile/student_profile/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const existingProfile = res.data.results.find(
        (item) => item.student?.email === user.email
      );

      let response;
      if (existingProfile) {
        // If the profile exists, patch the existing one
        response = await axios.patch(
          `${base_url}api/userProfile/student_profile/${existingProfile.studentId}/`,
          profileData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // If no profile exists, create a new one
        response = await axios.post(
          `${base_url}api/userProfile/student_profile/`,
          profileData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (response.status === 200 || response.status === 201) {
        setSuccess('Profile saved successfully');
        setIsEditing(false); // Set form to read-only after saving
        fetchProfile(); // Re-fetch to update displayed data from the backend
      }
    } catch (err) {
      console.error('Error saving profile:', err.response?.data || err.message);
      setError(`Failed to save profile: ${err.response?.data?.detail || err.message}`);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center px-4">
      <div className="md:mx-auto w-full md:w-3/4 lg:w-3/6 lg:h-3/5 my-40 justify-center items-center bg-white bg-opacity-[4%] border-white border-opacity-10 border-2 text-white">
        <div className="my-8 p-4 md:p-1">
          <div className="flex justify-between items-center m-5">
            <h1 className="lg:text-2xl font-semibold">Professional & Education Info</h1>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-transparent text-[#4318D1] border-white/10 border-2 px-2 rounded-md md:flex hidden"
              disabled={isEditing}
            >
              Edit Details
            </button>
          </div>

          {error && <div className="text-red-500 m-5">{error}</div>}
          {success && <div className="text-green-500 m-5">{success}</div>}

          {/* Show spinner while loading */}
          {loading ? (
            <div className="flex justify-center items-center my-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4318D1]" />
            </div>
          ) : (
            // Show form only when the profile is fetched
            <form ref={formRef} onSubmit={handleSave}>
              <div className="flex-1 mx-4 my-2">
                <label htmlFor="education_level" className="text-white/50">
                  Education
                </label>
                <div>
                  <input
                    type="text"
                    name="education_level"
                    className="bg-white bg-opacity-10 w-full rounded-sm p-2"
                    defaultValue={profile?.education_level || ''}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="flex md:flex-row flex-col">
                <div className="flex-1 m-5">
                  <label htmlFor="current_role" className="text-white/50">
                    Current Role
                  </label>
                  <div>
                    <input
                      type="text"
                      name="current_role"
                      className="bg-white bg-opacity-10 w-full rounded-sm p-2"
                      defaultValue={profile?.current_role || ''}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="flex-1 m-5">
                  <label htmlFor="industry" className="text-white/50">
                    Industry
                  </label>
                  <div>
                    <input
                      type="text"
                      name="industry"
                      className="bg-white bg-opacity-10 w-full rounded-sm p-2"
                      defaultValue={profile?.industry || ''}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 mx-4 my-2">
                <label htmlFor="linkedin_profile" className="text-white/50">
                  LinkedIn Profile
                </label>
                <div>
                  <input
                    type="text"
                    name="linkedin_profile"
                    className="bg-white bg-opacity-10 w-full rounded-sm p-2"
                    defaultValue={profile?.linkedin_profile || ''}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-center mt-6">
                  <button type="submit" className="bg-[#4318D1] text-white px-4 py-2 rounded-md">
                    Save
                  </button>
                </div>
              )}
            </form>
          )}

          {!isEditing && !loading && (
            <div className="md:hidden flex justify-center mt-6">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-transparent text-[#4318D1] border-white/10 border-2 px-2 rounded-md"
              >
                Edit Details
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentBackground;
