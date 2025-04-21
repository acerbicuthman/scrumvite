import React, { useState } from "react";
import welcomeImg from "../../assets/rafiki.png";
import { Link, useNavigate } from "react-router-dom";
import google from "../../assets/googleIcon.png";
// import {  SignedIn, SignedOut, SignInButton,useClerk, UserButton, useUser } from '@clerk/clerk-react'

const ScrumLanding = () => {
  const [account_type, setAccount_type] = useState("");
  const navigate = useNavigate(); // React Router v6 hook for navigation

  const handleChange = (e) => {
    setAccount_type(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to signup with selectedOption in the state
    navigate("/signup", { state: { account_type } });
  };
  //   const {openSignIn} = useClerk()
  //   const {user} = useUser()

  return (
    <div className="flex flex-col lg:flex-row mt-12  lg:p-">
      <div className="flex-1 px-12 py-10 hidden md:flex bg-gray-200 justify-center items-center">
        <img src={welcomeImg} alt="Welcome" className=" h-auto" />
      </div>
      <div className="flex-1  mx-12 my-6 lg:p-6 flex flex-col justify-center text-center">
        <h1 className="text-3xl lg:text-3xl font-semibold text-gray-800 mb-4">
          Create Your Account on Scrum Consult
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Welcome to Scrum Consult! Join as a Learner or Tutor and start Your
          Journey today.
        </p>
        <div className="w-full max-w-md mx-auto">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col">
            <label
    htmlFor="dropdown"
    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
  >
    Select Account Type
  </label>
  <select
    id="dropdown"
    name="accountType"
    value={account_type}
    onChange={handleChange}
    className="w-full appearance-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 pr-10 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
  >
    <option value="" disabled hidden>
      -- Please choose an option --
    </option>
    <option value="learner">👩‍🎓 Learner</option>
    <option value="educator">👨‍🏫 Educator</option>
  </select>
  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 dark:text-gray-500">
    <svg
      className="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.23 8.27a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-6 bg-indigo-900 text-white text-lg font-medium rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Continue
            </button>
           
          </form>
          <Link to="/signin">
              <button className="my-4 text-blue-600 hover:bg-blue-900 rounded-lg p-2 hover:text-white">
                Already a member? Log in
              </button>
            </Link>
          {/* {user ? (
        <header className="flex justify-center p-4 border-b">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
      ) : ( */}
          <div className="flex justify-center p-4 border-b">
            {/* <SignedOut>
            <SignInButton mode="modal"> */}
            {/* {({ openSignIn }) => ( */}
            <button
            // onClick={openSignIn}
            >
              <img
                src={google}
                alt="Sign in with Google"
                className="w-10 h-10 object-contain"
              />
            </button>
            {/* )} */}
            {/* </SignInButton>
          </SignedOut> */}
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default ScrumLanding;
