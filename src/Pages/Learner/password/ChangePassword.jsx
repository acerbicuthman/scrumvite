import React, { useState } from 'react';
import { base_url } from '../../../library/api';
import axios from 'axios';
import keyImg from '../../../assets/forgetpassword-key.png'

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
    <div className='h-screen flex items-center justify-center text-white px-4 md:px-0'>
       <div className='md:mx-auto   w-full md:w-1/3 lg:w-1/3  my-40 justify-center items-center bg-white bg-opacity-[4%]  border-white border-opacity-10 border-2 text-white'>

       <div className='my-8 p-4 md:p-1 '>
      <div className='items-center justify-center mx-auto flex flex-col mb-4'>
        <img src={keyImg} alt="" />
        <p className='my-4 text-2xl'>Reset Your Password</p>
        <p className='text-center mb-4'>Your new password must be different from previously used passwords.</p>
      </div>
     
      <div className='flex flex-col px-4 '>
        <form onSubmit={HandlePasswordSubmit} 
        className='space-y-3'>
          <div > 
            <label htmlFor='newpassword1'>New Password</label>
            <input
            className='w-full bg-white/5 border-white/10 border text-[#999999] px-2'
            placeholder='New Password'
              type='password'
              value={new_password1}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <br />
          <div >
            <label htmlFor='new-password2'>Confirm New Password</label>
            <input
             className='w-full bg-white/5 border-white/10 border text-[#999999] px-2'
             placeholder='New Password'
              type='password'
              value={new_password2}
              onChange={(e) => setNewPassword2(e.target.value)}
              required
            />
            
          </div>
          <div>
            <button type='submit' className='w-full my-4 bg-[#4045E1] p-2 text-white'>
            Change Password
          </button>
            </div>
        </form>
        {message && <div className='text-base mt-4'>{message}</div>}
      </div>
      </div>
      </div>
    </div>
  );
};

export default ChangePassword;
