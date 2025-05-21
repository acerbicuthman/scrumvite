import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { base_url } from '../../../library/api';

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

const SystemInfo = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true); // Start loading
      setError(null); // Clear previous errors

      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('Access token not found');
        setError('Authentication required. Please log in.');
        setLoading(false);
        return;
      }

      const decoded = parseJwt(token);
      console.log('Decoded Token:', decoded);

      const userId = decoded?.user_id;
      if (!userId) {
        console.error('user_id not found in token');
        setError('Invalid authentication data.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${base_url}api/userProfile/student_profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const profiles = response.data.results;
        const currentUser = profiles.find(
          (profile) => profile.student?.id === userId
        );

        if (currentUser) {
          setUserProfile(currentUser);
        } else {
          console.warn('Current user not found in profiles');
          setError('Profile not found.');
        }
      } catch (error) {
        console.error('Failed to fetch profiles:', error);
        setError('Failed to load profile. Please try again later.');
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchProfile();
  }, []);

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
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="h-screen flex justify-center items-center px-4">
        <div className="text-white text-lg">No profile data available.</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex justify-center items-center px-4">
      <div className="md:mx-auto w-full md:w-3/4 lg:w-1/2 lg:h-1/2 my-40 justify-center items-center bg-white bg-opacity-[4%] border-white border-opacity-10 border-2 text-white">
        <div className="my-8 p-4 md:p-1">
          <h1 className="text-2xl font-semibold m-5">System Information</h1>
          <div className="flex lg:flex-row flex-col">
            <div className="flex-1 m-5">
              <label htmlFor="Student_Id" className="text-white/50">Student Id</label>
              <div>
                <input
                  type="text"
                  className="bg-white bg-opacity-10 w-full rounded-sm p-2"
                  value={userProfile.studentId}
                  readOnly
                />
              </div>
              <div className="mt-8">
                <p className="text-white/50">Membership Status</p>
                <div className="mt-2 bg-[#4318D1] p-1.5 w-[65px] h-[33px] rounded-md">
                  {userProfile.status}
                </div>
              </div>
            </div>
            <div className="flex-1 m-5">
              <label htmlFor="Username" className="text-white/50">Username</label>
              <div>
                <input
                  type="text"
                  className="bg-white bg-opacity-10 w-full rounded-sm p-2"
                  value={userProfile.username}
                  readOnly
                />
              </div>
              <div className="mt-8">
                <p className="text-white/50">Membership Since</p>
                <div>
                  <input
                    type="text"
                    className="bg-white bg-opacity-10 w-full rounded-sm p-2"
                    value={new Date(userProfile.created_at).toLocaleDateString()}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default SystemInfo;