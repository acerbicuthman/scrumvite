import React, { useState } from "react";
import welcomeImg from "../../assets/rafiki.png";
import { Link, useNavigate } from "react-router-dom";
import google from "../../assets/googleIcon.png";
import jubilation from "../../assets/Property 1=Default.png";
import ImageSlideShow from "../Learner/ImageSlideShow";
import studentIcon from "../../assets/student icon.png";
import tutorIcon from "../../assets/tutor icon.png";
import { FaArrowRightLong } from "react-icons/fa6";

const ScrumLanding = () => {
  const [account_type, setAccount_type] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!account_type) {
      alert("Please select an account type before continuing.");
      return;
    }

    if (account_type === "learner") {
      navigate("/signup", { state: { account_type } });
    }
    if (account_type === "educator") {
      navigate("/educator/tutorSignUp", { state: { account_type } });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row mt-12 h-screen">
      {/* Left side with slideshow */}
      <div className="flex-1 hidden md:flex bg-gray-200 items-center">
        <ImageSlideShow />
      </div>

      {/* Right side with form */}
      <div className="flex-1 mx-4 my-6 lg:p-6 flex mt-20 flex-col">
        <h1 className="text-3xl lg:text-3xl  font-semibold text-black text-center md:text-left mb-4">
          Create Your Account on Scrum Consult
        </h1>
        <p className="text-lg text-gray-600">Welcome to Scrum Consult!</p>
        <p className="text-lg text-gray-600 mb-6">
          Join as a Learner or Tutor and start Your Journey today.
        </p>

        <div className="space-y-4 mb-6">
          {/* Tutor Card */}
          <div
            onClick={() => setAccount_type("educator")}
            className={`w-full max-w-[540px] h-[130px] cursor-pointer border-2 rounded-lg py-4 px-4 flex items-center transition duration-200 ${
              account_type === "educator"
                ? "border-purple-700 bg-custom-periwinkle <FaArrowRightLong />"
                : "border-gray-300 hover:border-purple-500 shadow-xl"
            }`}
          >
            <img src={tutorIcon} alt="Tutor Icon" className="w-12 h-12 mr-4" />
            <div className="px-4 md:p-0">
              <p className="text-lg font-semibold">Tutor</p>
              <p className="text-sm ">Upload your course videos and details.</p>
            </div>
            <div className="flex md:ml-24">
              {account_type === "educator" ? (
                <FaArrowRightLong className="text-black text-xl " />
              ) : (
                ""
              )}
            </div>
          </div>

          {/* Learner Card */}
          <div
            onClick={() => setAccount_type("learner")}
            className={`w-full max-w-[540px] h-[130px]  cursor-pointer border-2 rounded-lg py-4 px-4 flex items-center transition duration-200 ${
              account_type === "learner"
                ? "border-purple-700 bg-custom-periwinkle"
                : "border-gray-300 hover:border-purple-500 shadow-xl"
            }`}
          >
            <img
              src={studentIcon}
              alt="Learner Icon"
              className="w-12 h-12 mr-4"
            />
            <div className="px-4 md:p-0">
              <p className="text-lg font-semibold">Learner</p>
              <p className="text-sm ">
                Take courses tailored to your learning needs.
              </p>
            </div>
            <div className="flex md:ml-16">
              {account_type === "learner" ? (
                <FaArrowRightLong className="text-black text-xl " />
              ) : (
                ""
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <button
              type="submit"
              className="md:w-2/5 w-full py-3 mt-6 bg-blue-900 text-white text-base font-medium rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Next Step
            </button>
          </form>
        </div>

        {/* <div className="w-full max-w-md mx-auto">
          

          <Link to="/signin">
            <button className="my-4 text-blue-600 hover:custom-periwinkle  rounded-lg p-2 hover:text-white">
              Already a member? Log in
            </button>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default ScrumLanding;
