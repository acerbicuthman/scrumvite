import React from "react";
import { Link } from "react-router";
import SuccessfulVerify from "../../assets/pana.png";

const SuccessfulEmailVerification = () => {
  return (
    <div className="bg-neutral-200 h-screen mt-10 content-center justify-items-center">
      <div className="lg:w-2/5 lg:h-3/6 text-center lg:bg-white mx-10 px-6">
        <div className="flex justify-center items-center">
          <img className=" my-8 h-42 lg:h-32" src={SuccessfulVerify} alt="" />
        </div>
        <h1>Boom! You’re in! 🎉🥳</h1>
        <p>
          Your email is verified, and your learning journey officially begins.
        </p>
        <p> Let’s dive in!</p>
        <Link to="/expired_link_page">
          <button className="bg-blue-900 text-white text-xs my-8 lg:px-20 px-20 py-3  rounded-lg">
            Go to dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessfulEmailVerification;
