import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import EmailVerify from '../../assets/emailverification.png'
import axios from 'axios';
import { base_url } from '../../library/api';

const EmailVerification = ({ isOpen, onClose, email, first_name }) => {
  const navigate = useNavigate();
  const [localEmail, setLocalEmail] = useState("");
  const [localFirstName, setLocalFirstName] = useState("");
  useEffect(() => {
    if (isOpen && email && first_name) {
      setLocalEmail(email);
      setLocalFirstName(first_name);
    }
  }, [isOpen, email, first_name]);

  if (!isOpen) return null;

  const handleResend = async (e) => {
    e.preventDefault();
    try {
      const req = await axios.post(`${base_url}api/auth/registration/resend-email/`, { email });
      console.log("Resend email response:", req.data);
      alert("Verification email resent!");
    } catch (error) {
      console.error("Resend error:", error?.response?.data || error.message);
      alert("Failed to resend email. Please try again.");
    }
    console.log("Trying to resend email to:", email);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="md:w-2/5 w-full items-center justify-center rounded-xl p-2 m-10 md:m-1 overflow-hidden bg-transparent border-2 border-white">
        <div className='flex flex-col justify-center items-center text-center rounded-xl bg-white'>
          <div className="w-full max-w-lg h-auto px-6 py-8 bg-transparent">
            <div className="flex justify-center items-center m-auto">
              <button
                className="absolute top-2 right-4 text-gray-600 hover:text-black text-3xl"
                onClick={onClose}
              >
                ✕
              </button>
              <img
                className="lg:my-4 my-10 lg:h-32 h-42"
                src={EmailVerify}
                alt="Email Verification Illustration"
              />
            </div>
            <h1 className="font-semibold lg:text-2xl text-xl">
              You are just one click away!
            </h1>
            <p className="text-sm">
  Hey <span>{localFirstName}</span>, we just sent you an email.
</p>
            <p className="text-sm">Just confirm your email to get started!</p>

            <div className="flex flex-col gap-3 mt-6">
            <button
            className='w-full bg-blue-900 text-white px-3 py-2 rounded-lg '
  onClick={() => navigate("/check-your-email", { state: { email: localEmail, first_name: localFirstName } })}
>
  Continue
</button>

              {/* <button
                onClick={() => window.open("https://mail.google.com", "_blank")}
                className="text-blue-600 text-sm hover:underline"
              >
                Open Gmail
              </button> */}

              {/* <button
                onClick={handleResend}
                className="text-indigo-600 text-sm underline"
              >
                Resend Verification Email
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
