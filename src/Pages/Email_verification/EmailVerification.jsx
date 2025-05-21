import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import EmailVerify from '../../assets/emailverification.png'
import axios from 'axios';
import { base_url } from '../../library/api';

const EmailVerification = ({ isOpen, onClose}) => {
  const navigate = useNavigate();
  
  const storedEmail = localStorage.getItem("registered_email");
  const storedFirstName = localStorage.getItem("registered_first_name");

  const email = location.state?.email || storedEmail;
  const first_name = location.state?.first_name || storedFirstName;
  // useEffect(() => {
  //   if (isOpen && email && first_name) {
  //     setLocalEmail(email);
  //     setLocalFirstName(first_name);
  //   }
  // }, [isOpen, email, first_name]);

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
      <div className="md:w-[622px] lg:h-[429px] w-full h items-center justify-center rounded-xl bg-black m-10 md:m-1 overflow-hidden py-10 border-2 border-white">
        <div className='flex flex-col justify-center items-center text-center  '>
          <div className="w-full max-w-lg h-auto px-3 py-2 bg-transparent ">
            <div className="flex justify-center items-center m-auto">
              <button
                className="absolute top-2 right-4 text-white hover:text-black text-4xl"
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
            <h1 className="font-semibold lg:text-2xl text-xl w-3/5 text-center mx-auto">
              You are just one click away!
            </h1>
            <p className="text-sm">
  Hey <span>{first_name}</span>, we just sent you an email.
</p>
            <p className="text-sm">Just confirm your email to get started!</p>

            <div className="flex flex-col gap-3 mt-6 ">
            <button
            className='w-full bg-[#4045E1] text-white px-3 py-2 rounded-lg '
  onClick={() => navigate("/check-your-email", { state: { email: email, first_name: first_name } })}
>
 <p className='text-xl'>Continue</p> 
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
