import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { base_url } from '../../../library/api';
import useHydratedProfile from '../../../hooks/useHydratedProfile';
import { useNavigate } from 'react-router';

const SystemInfo = () => {
  const [systemInfo, setSystemInfo] = useState(null);
  const [message, setMessage] = useState('');
  const { profileId } = useHydratedProfile();
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  // Token refresh logic
  const refreshToken = async () => {
    const refresh = localStorage.getItem('refreshToken');
    if (!refresh) {
      console.warn('No refresh token found');
      return null;
    }

    try {
      const response = await axios.post(`${base_url}api/auth/token/refresh/`, {
        refresh,
      });
      const newAccessToken = response.data.access;
      localStorage.setItem('accessToken', newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      return null;
    }
  };

  // Data fetcher
  const fetchSystemInfo = async () => {
    let access = localStorage.getItem('accessToken');

    try {
      const response = await axios.get(
        `${base_url}api/userProfile/student_profile/${profileId}/`,
        {
          headers: {
            Authorization: `Bearer ${access}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setSystemInfo(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          const newAccess = await refreshToken();
          if (newAccess) {
            const retryResponse = await axios.get(
              `${base_url}api/userProfile/student_profile/${profileId}/`,
              {
                headers: {
                  Authorization: `Bearer ${newAccess}`,
                  'Content-Type': 'application/json',
                },
              }
            );
            setSystemInfo(retryResponse.data);
          }
        } catch (err) {
          console.error('Retry after refresh failed:', err);
        }
      } else {
        console.error('Error fetching system info:', error);
      }
    }
  };

  useEffect(() => {
    if (!token || !profileId) return;
    fetchSystemInfo();
  }, [profileId, token]);

  return (
    
    <div className='px-4'>
      <div className='md:mx-auto w-full max-w-[800px] my-2 bg-white bg-opacity-[4%] border-white border-opacity-10 border-2 text-white'>
        <div className='my-2 p-4 md:p-1'>
          <h1 className='text-2xl font-semibold m-5'>System Information</h1>

          {systemInfo ? (
          
            <div className='flex lg:flex-row flex-col'>
              {/* Left Column */}
              <div className='flex-1 m-5'>
                <label className='text-white/50'>Student ID</label>
                <input
                  type='text'
                  className='bg-white bg-opacity-10 w-full rounded-sm px-2 py-1'
                  value={systemInfo.studentId || ''}
                  readOnly
                />

                <div className='mt-8'>
                  <p className='text-white/50'>Membership Status</p>
                  <div className='mt-2 bg-[#4318D1] p-1.5 w-[120px] h-[33px] rounded-md text-center'>
                    {systemInfo.status || 'N/A'}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className='flex-1 m-5'>
                <label className='text-white/50'>Username</label>
                <input
                  type='text'
                  className='bg-white bg-opacity-10 w-full rounded-sm px-2 py-1'
                  value={systemInfo.username || ''}
                  readOnly
                />

                <div className='mt-8'>
                  <p className='text-white/50'>Membership Since</p>
                  <input
                    type='text'
                    className='bg-white bg-opacity-10 w-full rounded-sm px-2 py-1'
                    value={
                      systemInfo.created_at
                        ? new Date(systemInfo.created_at).toLocaleDateString()
                        : ''
                    }
                    readOnly
                  />
                </div>
                
              </div>
              <div>
                
              </div>
            </div>

          ) : (
            <p className='text-white/50 m-5'>Loading system information...</p>
          )}

        </div>
      </div>
      <div>
      <p className='text-white/50 md:text-base text-[11px] text-nowrap '>* This information is system-generated and cannot be modified</p>

      </div>
    </div>
  );
};

export default SystemInfo;
