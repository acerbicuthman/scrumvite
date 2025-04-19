
import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { base_url } from "../../library/api";

const CheckYourEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "your email address";

  const handleResend = async (e) => {
    // Ideally: Make an API call to resend verification
    e.preventDefault()
    try{

    
    const req = await axios.post(`${base_url}api/auth/registration/resend-email/`, {email})
    console.log("Response", req.email)
    alert("Verification email resent!");}
    catch(error){
      console.error("Error", error.req.email)
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold text-indigo-700 mb-4">
          Confirm Your Email
        </h1>

        <p className="text-gray-700 mb-4">
          We've sent a verification link to:
          <br />
          <strong>{email}</strong>
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Please check your inbox (and spam folder) to verify your account before signing in.
        </p>

        <button
          onClick={() => window.open("https://mail.google.com", "_blank")}
          className="w-full mb-3 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500"
        >
          Open Gmail
        </button>

        <button
          onClick={handleResend}
          className="w-full mb-3 text-indigo-600 text-sm underline"
        >
          Resend Verification Email
        </button>

        <button
          onClick={() => navigate("/signin")}
          className="w-full mt-3 border border-indigo-600 text-indigo-700 py-2 rounded-md hover:bg-indigo-50"
        >
          Return to Login
        </button>
      </div>
    </div>
  );
};

export default CheckYourEmail;
