import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { base_url } from '../../../library/api';

const StudentBackground = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({
    education_level: '',
    current_role: '',
    industry: '',
    linkedin_profile: ''
  });

  const fetchProfile = async () => {
    const token = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user?.email;

    if (!token || !email) {
      setError('Authentication data missing');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${base_url}api/userProfile/student_profile/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const existingProfile = res.data.results.find(
        (item) => item.student?.email.toLowerCase() === email.toLowerCase()
      );

      if (existingProfile) {
        setProfile(existingProfile);
        setFormValues({
          education_level: existingProfile.education_level || '',
          current_role: existingProfile.current_role || '',
          industry: existingProfile.industry || '',
          linkedin_profile: existingProfile.linkedin_profile || ''
        });
      } else {
        setProfile(null);
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching profile:', err.response?.data || err.message);
      setError('Failed to fetch profile');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user) {
      setError('No token or user found. Please log in.');
      return;
    }

    const profileData = {
      education_level: formValues.education_level,
      current_role: formValues.current_role,
      industry: formValues.industry,
      linkedin_profile: formValues.linkedin_profile
    };

    try {
      const res = await axios.get(`${base_url}api/userProfile/student_profile/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const existingProfile = res.data.results.find(
        (item) => item.student?.email === user.email
      );

      if (existingProfile) {
        const response = await axios.patch(
          `${base_url}api/userProfile/student_profile/${existingProfile.studentId}/`,
          profileData,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200 || response.status === 201) {
          setSuccess('Profile saved successfully');
          setIsEditing(false);
          fetchProfile(); // Re-fetch profile after save
        }
      } else {
        setError('No matching profile found to update.');
      }
    } catch (err) {
      console.error('Error saving profile:', err.response?.data || err.message);
      setError(`Failed to save profile: ${err.response?.data?.detail || err.message}`);
    }
  };

  return (
    <div className="my-10  justify-center items-center px-4">
      <div className="md:mx-auto ] w-full max-w-[800px] lg:h-3/5 my-2 justify-center items-center bg-white bg-opacity-[4%] border-white border-opacity-10 border-2 text-white">
        <div className="my-2 p-4 md:p-1">
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

          {loading ? (
            <div className="flex justify-center items-center my-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4318D1]" />
            </div>
          ) : (
            <form onSubmit={handleSave}>
              <div className="flex-1 mx-4 my-2">
                <label htmlFor="education_level" className="text-white/50">Education</label>
                <input
                  type="text"
                  name="education_level"
                  className="bg-white bg-opacity-10 w-full rounded-sm p-2"
                  value={formValues.education_level}
                  onChange={(e) => setFormValues({ ...formValues, education_level: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="flex md:flex-row flex-col">
                <div className="flex-1 m-5">
                  <label htmlFor="current_role" className="text-white/50">Current Role</label>
                  <input
                    type="text"
                    name="current_role"
                    className="bg-white bg-opacity-10 w-full rounded-sm p-2"
                    value={formValues.current_role}
                    onChange={(e) => setFormValues({ ...formValues, current_role: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex-1 m-5">
                  <label htmlFor="industry" className="text-white/50">Industry</label>
                  <input
                    type="text"
                    name="industry"
                    className="bg-white bg-opacity-10 w-full rounded-sm p-2"
                    value={formValues.industry}
                    onChange={(e) => setFormValues({ ...formValues, industry: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="flex-1 mx-4 my-2">
                <label htmlFor="linkedin_profile" className="text-white/50">LinkedIn Profile</label>
                <input
                  type="text"
                  name="linkedin_profile"
                  className="bg-white bg-opacity-10 w-full rounded-sm p-2"
                  value={formValues.linkedin_profile}
                  onChange={(e) => setFormValues({ ...formValues, linkedin_profile: e.target.value })}
                  disabled={!isEditing}
                />
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
