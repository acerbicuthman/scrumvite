import React, { useState } from "react";
import ErrorImg from "../../assets/emaillinkexpired.png";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { base_url } from "../../library/api";

const ExpiredLink = () => {
  const location = useLocation();
  const email = location.state?.email;
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleResendEmail = async () => {
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const response = await axios.post(`${base_url}api/auth/registration/resend-verification/`, {
        email,
      });
      setSuccessMsg("Verification email sent! Check your inbox.");
    } catch (error) {
      setErrorMsg("Failed to resend email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 h-screen content-center justify-items-center text-center bg-black text-white">
      <div className="lg:h-3/5 lg:w-3/5 items-center mx-10 p-4">
        <div className="flex justify-center">
          <img className="h-52 lg:h-42 " src={ErrorImg} alt="Expired link" />
        </div>
        <div className="lg:justify-items-center">
          <p className="m-2 py-2 lg:px-6 w-full lg:w-4/5 px-4 lg:text-2xl font-semibold">
            Oops! Looks like your magic link has expired!
          </p>
          <p className="text-sm">But no worries, we can send you a fresh one!</p>
        </div>

        {successMsg && <p className="text-green-400 text-sm mt-4">{successMsg}</p>}
        {errorMsg && <p className="text-red-500 text-sm mt-4">{errorMsg}</p>}

        <button
          type="button"
          onClick={handleResendEmail}
          disabled={!email || loading}
          className="bg-[#4045E1] p-2 my-6 lg:px-20 lg:my-6 lg:w-4/5 lg:py-3 text-white text-sm rounded-lg w-full disabled:opacity-50"
        >
          {loading ? "Sending..." : "Resend Verification Email"}
        </button>

        {/* {!email && (
          <p className="text-xs text-red-400 mt-2">Email not found in session.</p>
        )} */}
      </div>
    </div>
  );
};

export default ExpiredLink;
