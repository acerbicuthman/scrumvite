import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../../../library/api';

const StudentBackground = () => {
  const [formData, setFormData] = useState({
    education_level: '',
    current_role: '',
    industry: '',
    linkedin_profile: '',
  });

  const [isEditing, setIsEditing] = useState(true); // Editable until saved
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchProfile = async () => {
    const token = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user?.email;

    if (!token || !email) {
      console.error('No token or email found');
      setError('Authentication data missing');
      return;
    }

    try {
      const res = await axios.get(`${base_url}api/userProfile/student_profile/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('GET response:', res.data); // Debug backend response

      if (res.status === 200 && res.data?.results?.length > 0) {
        const profile = res.data.results.find(item => item?.student?.email === email);
        if (profile) {
          const apiData = {
            education_level: profile.education_level || '',
            current_role: profile.current_role || '',
            industry: profile.industry || '',
            linkedin_profile: profile.linkedin_profile || '',
          };
          setFormData(apiData);
          setIsEditing(false); // Set read-only after fetching
          setSuccess('Profile loaded successfully');
          console.log('Profile loaded:', profile);
        } else {
          console.log('No profile found, ready to create new profile');
          setIsEditing(true);
        }
      } else {
        console.log('No profiles found in response');
        setIsEditing(true);
      }
    } catch (err) {
      console.error('Error fetching profile:', err.response?.data || err.message);
      if (err.response?.status === 404) {
        console.log('No profile exists, ready to create new profile');
        setIsEditing(true);
      } else {
        setError('Failed to fetch profile: ' + (err.response?.data?.detail || err.message));
      }
    }
  };

  useEffect(() => {
    console.log('Component mounted, fetching profile'); // Debug mount
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    if (!isEditing) return; // Prevent changes in read-only mode

    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log('handleSave triggered'); // Debug save trigger

    setError(null);
    setSuccess(null);

    const token = localStorage.getItem('accessToken');
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }

    const profileData = new FormData();
    profileData.append('education_level', formData.education_level || '');
    profileData.append('current_role', formData.current_role || '');
    profileData.append('industry', formData.industry || '');
    profileData.append('linkedin_profile', formData.linkedin_profile || '');

    console.log('Sending POST with FormData:', Object.fromEntries(profileData)); // Debug payload

    try {
      const response = await axios.post(
        `${base_url}api/userProfile/student_profile/`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('POST response:', response.data); // Debug backend response

      if (response.status === 201) {
        setSuccess('Profile saved successfully');
        setIsEditing(false); // Set read-only
        await fetchProfile(); // Re-fetch to update displayed data
      }
    } catch (err) {
      console.error('Error saving profile:', err.response?.data || err.message);
      setError(`Failed to save profile: ${err.response?.data?.detail || JSON.stringify(err.response?.data) || err.message}`);
    }
  };

  return (
    <div className='h-screen flex justify-center items-center px-4'>
      <div className='md:mx-auto w-full md:w-3/4 lg:w-3/6 lg:h-3/5 my-40 justify-center items-center bg-white bg-opacity-[4%] border-white border-opacity-10 border-2 text-white'>
        <div className='my-8 p-4 md:p-1'>
          <div className='flex justify-between items-center m-5'>
            <h1 className='lg:text-2xl font-semibold'>Professional & Education Info</h1>
            <button
              type='button'
              onClick={() => {
                console.log('Edit Details clicked'); // Debug edit button
                setIsEditing(true);
              }}
              className='bg-transparent text-[#4318D1] border-white/10 border-2 px-2 rounded-md md:flex hidden'
              disabled={isEditing}
            >
              Edit Details
            </button>
          </div>

          {error && <div className='text-red-500 m-5'>{error}</div>}
          {success && <div className='text-green-500 m-5'>{success}</div>}

          <form onSubmit={(e) => {
            console.log('Form submitted'); // Debug form submission
            handleSave(e);
          }}>
            <div className='flex-1 mx-4 my-2'>
              <label htmlFor="education_level" className='text-white/50'>Education</label>
              <div>
                <input
                  type="text"
                  id="education_level"
                  className='bg-white bg-opacity-10 w-full rounded-sm p-2'
                  value={formData.education_level}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className='flex md:flex-row flex-col'>
              <div className='flex-1 m-5'>
                <label htmlFor="current_role" className='text-white/50'>Current Role</label>
                <div>
                  <input
                    type="text"
                    id="current_role"
                    className='bg-white bg-opacity-10 w-full rounded-sm p-2'
                    value={formData.current_role}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className='flex-1 m-5'>
                <label htmlFor="industry" className='text-white/50'>Industry</label>
                <div>
                  <input
                    type="text"
                    id="industry"
                    className='bg-white bg-opacity-10 w-full rounded-sm p-2'
                    value={formData.industry}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            <div className='flex-1 mx-4 my-2'>
              <label htmlFor="linkedin_profile" className='text-white/50'>LinkedIn Profile</label>
              <div>
                <input
                  type="text"
                  id="linkedin_profile"
                  className='bg-white bg-opacity-10 w-full rounded-sm p-2'
                  value={formData.linkedin_profile}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {isEditing && (
              <div className='flex justify-center mt-6'>
                <button
                  type="submit"
                  className='bg-[#4318D1] text-white px-4 py-2 rounded-md'
                  onClick={() => console.log('Save button clicked')} // Debug save button
                >
                  Save
                </button>
              </div>
            )}
          </form>

          {!isEditing && (
            <div className='md:hidden flex justify-center mt-6'>
              <button
                type='button'
                onClick={() => {
                  console.log('Mobile Edit Details clicked'); // Debug mobile edit button
                  setIsEditing(true);
                }}
                className='bg-transparent text-[#4318D1] border-white/10 border-2 px-2 rounded-md'
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