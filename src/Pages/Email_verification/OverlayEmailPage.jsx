import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import EmailVerify from "../../assets/emailverification.png";

const OverlayEmailPage = () => {
    const location = useLocation();
  const first_name = location.state?.first_name;
  return (
    <div className="bg-neutral-200 h-screen flex items-center justify-center">
    <div className="w-full max-w-lg h-auto lg:bg-white text-center px-6 py-8 xl:justify-center xl:items-center xl:m-48">
      <div className="flex justify-center items-center m-auto">
        <img
          className="lg:my-4 my-10 lg:h-32 h-42"
          src={EmailVerify}
          alt="Email Verification"
        />
      </div>
      <h1 className="font-semibold lg:text-2xl text-xl">
        You are just one click away!
      </h1>
      <p className="text-sm">
        Hey <span>{first_name}</span> we just sent you an email.
      </p>
      <p className="text-sm">Just confirm your email to get started!</p>
      <Link to="/success_email_verification">
        <button className="bg-blue-900 text-white lg:text-sm text-xs my-8 lg:px-20 px-8 w-full py-3 rounded-lg">
          Verify Email Address
        </button>
      </Link>
      <div className="py-3">
        <button type="button" className="text-blue-700">
          Resend Email Verification Code
        </button>
      </div>
    </div>
      
    </div>
  )
}

export default OverlayEmailPage
