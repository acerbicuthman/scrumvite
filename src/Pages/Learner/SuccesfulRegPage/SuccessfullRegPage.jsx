import React, { useEffect, useState } from 'react';
import Congrats from '../../../assets/congratulations.gif';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import { base_url } from '../../../library/api';

const SuccessfulReg = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const verificationKey = new URLSearchParams(location.search).get('key');

  useEffect(() => {
    const verifyEmail = async () => {
      setIsLoading(true);
      try {
        await axios.post(`${base_url}api/auth/registration/verify-email/`, { key: verificationKey });
        setMessage('Your Email has been successfully verified.');
        // Optionally redirect after a few seconds
        setTimeout(() => {
          navigate('/student-dashboard');
        }, 3000);
      } catch (err) {
        console.error('Verification failed:', err);
        if (err.response?.status === 400) {
          setMessage('Verification link is invalid or expired.');
        } else {
          setMessage('An error occurred during verification. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
      
    };

    if (verificationKey) {
      verifyEmail();
    } else {
      setMessage('No verification token provided.');
    }
  }, [verificationKey, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50 px-4">
      <div className="w-full max-w-2xl bg-transparent rounded-xl shadow-lg overflow-hidden border-white border-2">
        <div className="flex flex-col bg-white items-center justify-center p-8 m-4">
          <img
            src={Congrats}
            alt="Congratulations"
            className="h-48 md:h-60 object-contain mb-6"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
            Congratulations!
          </h1>
          <p className="text-gray-600 text-center text-sm md:text-base mb-6">
            {isLoading
              ? 'Verifying your email...'
              : message}
          </p>
          {!isLoading && message.includes('expired') && (
            <button
              type="button"
              onClick={() => navigate('/student-dashboard')}
              className="w-full md:w-auto bg-blue-900 hover:bg-indigo-600 text-white text-sm font-semibold px-6 py-3 rounded-md transition duration-300"
            >
              Go to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessfulReg;
