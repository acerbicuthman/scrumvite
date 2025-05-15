import React, { useState } from "react";
import Eclipse from "../Landing/LandingImg/Ellipse 102.png";
import ManInSuit from "../Landing/LandingImg/FullSuit-man.png";
import { useNavigate } from "react-router";

const HEroLanding = () => {
  const [account_type, setAccount_type] = useState("");
  const navigate = useNavigate();

  const handleNavigateType = (type) => {
    setAccount_type(type);
    navigate(type === "educator" ? "/educator/tutorSignUp" : "signup", {
      state: { account_type: type },
    });
  };

  return (
    <div className="mb-20">
      <div className="relative h-[90vh] overflow-hidden rounded-b-[600px] pb-10">
        <img
          src={Eclipse}
          alt=""
          className="absolute top-0 left-0 object-cover z-0 h-full w-full"
        />

<img
    src={ManInSuit}
    alt=""
    className="absolute z-0 object-cover md:bg-contain md:top-0 md:right-12 md:object-contain md:h-full h-3/4 bottom-0 ml-36"
  />
  <div className="relative z-10 flex pt-24 flex-col md:items-center md:justify-center h-full text-center px-4">
    <h1 className="md:text-6xl text-4xl font-bold bg-gradient-to-r from-[#AB4DFF] to-[#4318D1] text-transparent bg-clip-text mb-4">
      Transform Your Learning Journey
    </h1>
          <p className="text-white max-w-2xl text-xl ">
            Connect with expert tutors worldwide and unlock your full potential
            through personalized learning experiences.
          </p>
          <div className="md:flex mt-10 mx-10 ">
            <button
              onClick={() => handleNavigateType("educator")}
              className="bg-[#4318d1] text-white md:px-10 py-4 rounded-lg md:mx-4 mb-5 w-full text-nowrap "
            >
              Become a Tutor
            </button>
            <button
              onClick={() => handleNavigateType("learner")}
              className="bg-white border-[#4318d1] border-2 text-blue-700 md:px-10 py-4 rounded-lg md:mx-4 mb-5 w-full "
            >
              Start Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HEroLanding;
