import React, { useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import EmailVerify from '../../assets/emailverification.png'
import SuccessfulReg from '../Learner/SuccesfulRegPage/SuccessfullRegPage';


const EmailVerification = ({ isOpen, onClose, children})=> {
  if (!isOpen) return null
  const location = useLocation();
  const first_name = location.state?.first_name;



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50  ">
    <div className="md:w-2/5 w-full items-center justify-center rounded-xl p-2 m-10 md:m-1 overflow-hidden bg-transparent border-2 border-white">
          <div className='flex flex-col  m-1 justify-center items-center text-center rounded-xl bg-white'>
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
      {/* <Link to="/success_email_verification">
     
        </Link>
    */}
       
        {children}
      {/* </Link> */}
    
      <div className="py-3">
        <button type="button" className="text-blue-700">
          Resend Email Verification Code
        </button>
      </div>
    </div>
      </div>
    </div>
    </div>
  );
};

export default EmailVerification;
