import React, { useEffect, useState } from 'react';
import Congrats from '../../../assets/congratulations.gif';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { base_url } from '../../../library/api';
import { useAuth } from '../../../context/Authcontext';
import { BeatLoader } from 'react-spinners';

const SuccessfulReg = () => {
  const [message, setMessage] = useState('');
  const [errorType, setErrorType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState('');
  const [autoLoggingIn, setAutoLoggingIn] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const verificationKey = new URLSearchParams(location.search).get('key');

  const { login, tempCredentials, setTempCredentials } = useAuth();
  const email = tempCredentials?.email || localStorage.getItem("tempEmail");

  const handleAutoLogin = async () => {
    const storedPassword = tempCredentials?.password || localStorage.getItem("tempPassword");

    if (!email || !storedPassword) {
      setMessage("Email verified, but login credentials are missing. Please log in manually.");
      setErrorType("login-failed");
      return;
    }

    setAutoLoggingIn(true);

    try {
      const res = await axios.post(`${base_url}api/auth/login/`, {
        email: email,
        password: storedPassword,
      });

      const { access: accessToken, refresh: refreshToken, user } = res.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      await login(accessToken, refreshToken, user);

      // Clean up temp credentials
      setTempCredentials(null);
      localStorage.removeItem("tempEmail");
      localStorage.removeItem("tempPassword");

      // Redirect after login
      const accountType = user?.account_type?.toLowerCase();
      switch (accountType) {
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'teacher':
          navigate('/teacher-dashboard');
          break;
        case 'tutor':
          navigate('/educator/tutor-dashboard');
          break;
        case 'student':
        default:
          navigate('/student-dashboard');
          break;
      }

    } catch (loginError) {
      console.error("Auto-login failed:", loginError.response?.data || loginError.message);
      setMessage("Email verified, but login failed. Please log in manually.");
      setErrorType("login-failed");
    } finally {
      setAutoLoggingIn(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      setResendMsg("Cannot resend verification. Email not available.");
      return;
    }

    setResending(true);
    setResendMsg('');

    try {
      await axios.post(`${base_url}api/auth/registration/resend-email/`, {
        email,
      });

      setResendMsg("Verification email has been resent. Please check your inbox.");
    } catch (err) {
      console.error("Resend failed:", err.response?.data || err.message);
      setResendMsg("Failed to resend verification email. Please try again later.");
    } finally {
      setResending(false);
    }
  };

  useEffect(() => {
    const verifyEmail = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(`${base_url}api/auth/registration/verify-email/`, {
          key: verificationKey,
        });

        setMessage("Your email has been successfully verified.");
        await handleAutoLogin();
      } catch (err) {
        const status = err.response?.status;
        const data = err.response?.data;

        if (status === 404 || data?.detail === "Not found.") {
          setMessage("This verification link has expired.");
          setErrorType("expired");
        } else if (status === 400) {
          const keyError = data?.key?.[0];
          if (keyError?.toLowerCase().includes("invalid")) {
            setMessage("This verification link is invalid. Please check your email or contact support.");
            setErrorType("invalid");
          } else {
            setMessage("Verification failed. The link may be expired or invalid.");
            setErrorType("generic");
          }
        } else {
          setMessage("An unexpected error occurred during verification. Please try again later.");
          setErrorType("server");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (verificationKey) {
      verifyEmail();
    } else {
      setMessage("No verification token provided.");
      setErrorType("missing");
    }
  }, [verificationKey]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-85 px-4">
      <div className="w-full max-w-2xl bg-transparent rounded-xl shadow-lg overflow-hidden border-white border-2">
        <div className="flex flex-col bg-black bg-opacity-50 text-white items-center justify-center p-8 m-4">
          <img
            src={Congrats}
            alt="Congratulations"
            className="h-48 md:h-60 object-contain mb-6"
          />
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            {errorType ? "Verification Status" : "Congratulations!"}
          </h1>
          <p className="opacity-50 text-center text-sm md:text-base mb-6">
            {(isLoading || autoLoggingIn) ? (
              <>
                <BeatLoader color="#000" size={10} />
                <span className="block mt-2">
                  {isLoading ? 'Verifying your email...' : 'Logging you in...'}
                </span>
              </>
            ) : (
              message
            )}
          </p>

          {!isLoading && errorType === "expired" && (
            <div className="flex flex-col items-center gap-3 w-full">
              <button
                type="button"
                onClick={handleResendVerification}
                className="bg-[#4045E1] hover:bg-yellow-600 text-white text-sm font-semibold px-6 py-3 rounded-md transition duration-300"
                disabled={resending}
              >
                {resending ? "Resending..." : "Resend Verification Email"}
              </button>

              {resendMsg && <p className="text-sm text-gray-700">{resendMsg}</p>}
            </div>
          )}

          {!isLoading && ["login-failed", "expired", "invalid", "generic", "server", "missing"].includes(errorType) && (
            <button
              type="button"
              onClick={() => navigate('/signin')}
              className="mt-6 w-full md:w-auto bg-[#4045E1] hover:bg-indigo-600 text-white text-sm font-semibold px-6 py-3 rounded-md transition duration-300"
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
