import React, { useState } from 'react';
import { base_url } from '../../../library/api';
import axios from 'axios';

const ChangePassword = () => {
  const [new_password1, setNewPassword] = useState('');
  const [new_password2, setNewPassword2] = useState('');
  const [message, setMessage] = useState('');

  const HandlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (new_password1 !== new_password2) {
      setMessage("Passwords don't match");
      return;
    }

    try {
      const access = localStorage.getItem('access'); // Adjust based on how you store it

      const res = await axios.post(
        `${base_url}api/auth/password/change/`,
        {
          new_password1,
          new_password2,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );      
      if (!access) {
        setMessage("No access token found. Please log in again.");
        return;
      }
      
      console.log('Success:', res.data);
      setMessage(res.data.detail || 'Password changed successfully.');
    } catch (err) {
      if (err.response && err.response.data) {
        console.error('Change password error:', err.response.data);
        const errorMsg =
          err.response.data.detail ||
          Object.values(err.response.data).flat().join(' ') ||
          'Failed to change password.';
        setMessage(errorMsg);
      } else {
        console.error('Unexpected error:', err);
        setMessage('Something went wrong.');
      }
    }
  };

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='flex flex-col'>
        <form onSubmit={HandlePasswordSubmit}>
          <div>
            <label htmlFor='newpassword1'>New Password</label>
            <input
              type='password'
              value={new_password1}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor='new-password2'>Confirm New Password</label>
            <input
              type='password'
              value={new_password2}
              onChange={(e) => setNewPassword2(e.target.value)}
              required
            />
          </div>
          <button type='submit' className='w-full bg-blue-900 text-white'>
            Change Password
          </button>
        </form>
        {message && <div className='text-base mt-4'>{message}</div>}
      </div>
    </div>
  );
};

export default ChangePassword;
