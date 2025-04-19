import React, { useEffect, useState, useContext } from 'react';
import Congrats from '../../../assets/congratulations.gif';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import { base_url } from '../../../library/api';
import { AuthContext } from '../../../context/Authcontext'

const SuccessfulReg = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(location.search).get('token');
  const { login } = useContext(AuthContext); // Access login function from AuthContext

  useEffect(() => {
    const verifyTokenAndLogin = async () => {
      setIsLoading(true);
      try {
        // Verify email with the token
        const verifyResponse = await axios.post(`${base_url}api/auth/registration/verify-email/`, { token });
        setMessage('Your Email has been successfully verified');

        // Attempt to log in the user with the token
        const loginResponse = await axios.post(`${base_url}api/auth/login/`, { token }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Assuming loginResponse contains user data and possibly a new token
        if (loginResponse.data) {
          // Use the login function from AuthContext to store token and user data
          login(loginResponse.data.token || token, loginResponse.data.user);
          // Redirect to dashboard
          navigate('/dashboard');
        }
      } catch (err) {
        console.error('Error:', err);
        if (err.response?.status === 401) {
          setMessage('Failed to authenticate. Please log in manually.');
          navigate('/signin');
        } else {
          setMessage('Failed to confirm your email or log in. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      verifyTokenAndLogin();
    } else {
      setMessage('No verification token provided.');
      navigate('/signin');
    }
  }, [token, navigate, login]);

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
            Your account has been successfully created. Welcome to Scrum Consult LMS! Start learning, growing, and achieving your goals today.
          </p>
          {isLoading ? (
            <p className="text-gray-600">Verifying your email and logging in...</p>
          ) : (
            <p className="text-gray-600 text-center mb-4">{message}</p>
          )}
          {!isLoading && message.includes('Failed') && (
            <button
              type="button"
              onClick={() => navigate('/signin')}
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