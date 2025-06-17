import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { base_url } from '../../../library/api';
import useHydratedProfile from '../../../hooks/useHydratedProfile';
import { useNavigate } from 'react-router';

const SystemInfo = () => {
  const [systemInfo, setSystemInfo] = useState(null);
  const [message, setMessage] = useState('');
  const { profileId } = useHydratedProfile();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  // Token refresh logic
  const refreshAccessToken = async () => {
    if (!refreshToken) {
      console.warn('No refresh token found');
      return null;
    }

    try {
      const response = await axios.post(`${base_url}api/auth/token/refresh/`, {
        refresh: refreshToken,
      });
      const newAccess = response.data.access;
      localStorage.setItem('accessToken', newAccess);
      return newAccess;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return null;
    }
  };

  // Authenticated fetch with retry logic
  const getWithAuthRetry = async (url) => {
    try {
      return await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      if (error.response?.status === 401) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          return await axios.get(url, {
            headers: {
              Authorization: `Bearer ${newToken}`,
              'Content-Type': 'application/json',
            },
          });
        }
      }
      throw error;
    }
  };

  const fetchSystemInfo = async () => {
    if (!profileId) return;
    try {
      const response = await getWithAuthRetry(`${base_url}api/userProfile/student_profile/${profileId}/`);
      setSystemInfo(response.data);
    } catch (error) {
      console.error('Failed to fetch system info:', error);
      setMessage('Unable to load system information. Please try again later.');
    }
  };

  // Delay fetch to prevent premature request
  useEffect(() => {
    if (!accessToken || !profileId) return;
    const delay = setTimeout(() => {
      fetchSystemInfo();
    }, 100);
    return () => clearTimeout(delay);
  }, [profileId, accessToken]);

  const formattedDate = useMemo(() => {
    return systemInfo?.created_at
      ? new Date(systemInfo.created_at).toLocaleDateString()
      : '';
  }, [systemInfo?.created_at]);

  const renderSystemInfo = useMemo(() => {
    if (!systemInfo) {
      return <p className='text-white/50 m-5 animate-pulse'>Loading system information...</p>;
    }

    return (
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
              value={formattedDate}
              readOnly
            />
          </div>
        </div>
      </div>
    );
  }, [systemInfo, formattedDate]);

  return (
    <div className='px-4'>
      <div className='md:mx-auto w-full max-w-[800px] my-2 bg-white bg-opacity-[4%] border-white border-opacity-10 border-2 text-white'>
        <div className='my-2 p-4 md:p-1'>
          <h1 className='text-2xl font-semibold m-5'>System Information</h1>
          {message && <p className='text-red-400 m-5'>{message}</p>}
          {renderSystemInfo}
        </div>
      </div>
      <div>
        <p className='text-white/50 md:text-base text-[11px] text-nowrap'>
          * This information is system-generated and cannot be modified
        </p>
      </div>
    </div>
  );
};

export default SystemInfo;
