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
    <div className="flex flex-col lg:flex-row mt-12 p-4 lg:p-">
      <div className="flex-1 bg-gray-200 p-8 lg:p-12 flex justify-center items-center">
        <img src={welcomeImg} alt="Welcome" className="max-w-full h-auto" />
      </div>
      <div className="flex-1 p-12 lg:p-6 flex flex-col justify-center text-center">
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
                className="text-sm font-medium text-gray-700"
              >
                Choose Your Account Type
              </label>
              <select
                id="dropdown"
                value={account_type}
                onChange={handleChange}
                name="accountType"
                className="w-full mt-2 p-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">--Please choose an option--</option>
                <option value="learner">Learner</option>
                <option value="educator">Educator</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-6 bg-indigo-900 text-white text-lg font-medium rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Continue
            </button>
            <Link to="/login">
              <button className="my-4 text-blue-600 hover:bg-blue-900 rounded-lg p-2 hover:text-white">
                Already a member? Log in
              </button>
            </Link>
          </form>
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
