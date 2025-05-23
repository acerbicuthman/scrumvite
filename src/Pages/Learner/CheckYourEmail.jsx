
import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { base_url } from "../../library/api";

const CheckYourEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, first_name } = location.state || {};

  const handleResend = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Email not found. Please return and try again.");
      return;
    }
  
    try {
      const req = await axios.post(`${base_url}api/auth/registration/resend-email/`, { email });
      console.log("Response", req.data);
      alert("Verification email resent!");
    } catch (error) {
      console.error("Error:", error?.response?.data || error.message);
      alert("Failed to resend verification email. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-4 ">
      <div className="max-w-md w-full text-center p-8 bg-white/5 text-white/10 rounded-xl shadow-xl border-4 border-white/10">
        <h1 className="text-2xl font-semibold text-white/50 mb-4">
          Confirm Your Email
        </h1>

        <p className="text-white/50  mb-4">
          We've sent a verification link to:
        </p>
    <p className="my-5"> <strong className="bg-[#4045E1] rounded-sm text-white p-3">{email}</strong></p>
        <p className="text-sm text-white/50 mb-6">
          Please check your inbox (and spam folder) to verify your account before signing in.
        </p>

      
        <button
          onClick={handleResend}
          className="w-full mb-3 text-blue-500 text-sm underline"
        >
          Resend Verification Email
        </button>

        <button
          onClick={() => navigate("/signin")}
          className="w-full mt-3 border bg-blue-900 border-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500 "
        >
          Return to Login
        </button>
      </div>
    </div>
  );
};

export default CheckYourEmail;
