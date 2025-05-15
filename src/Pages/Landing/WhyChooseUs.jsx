import React from "react";
import Cuate from "../Landing/LandingImg/cuate.png";
import Pana from "../Landing/LandingImg/pana.png";
import Bro from "../Landing/LandingImg/bro.png";

const WhyChooseUs = () => {
  return (
    <div>
    <div className="text-white my-4 px-4 bg-[#0F0F14] py-20 hidden md:block ">
      <div className="text-center text-white">
        <h1 className="text-4xl font-semibold my-2">Why Choose Us</h1>
        <p className="text-gray-400 ">Experience the future of learning with our cutting-edge platform</p>
      </div>
      <div className="flex flex-col md:flex-row md:my-10 my-4 gap-4 ">
        {/* First Pair (Text + Image) */}
        <div className="flex flex-col md:flex-row my-5 md:text-left text-center">
          <div className="flex-1 m-5">
            <h1 className="text-3xl">AI-Powered Matching</h1>
            <p className="text-gray-400">
              Our intelligent system pairs you with the perfect tutor based on
              your learning style and goals.
            </p>
          </div>
          <div className="flex-1 mx-5">
            <img
              src={Cuate}
              alt="AI Matching Illustration"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Second Pair (Text + Image) */}
        <div className="flex flex-col md:flex-row my-5 md:text-left text-center">
          <div className="flex-1 m-5 py-auto">
            <h1 className="text-3xl">Live Interactive Sessions</h1>
            <p className="text-gray-400">
              Engage in real-time learning with advanced video conferencing and
              collaborative tools.
            </p>
          </div>
          <div className="flex-1 mx-5">
            <img
              src={Pana}
              alt="Live Interactive Sessions"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Third Pair (Text + Image) */}
        <div className="flex flex-col md:flex-row my-5 md:text-left text-center">
          <div className="flex-1 m-5">
            <h1 className="text-3xl">Flexible Scheduling</h1>
            <p className="text-gray-400">
              Book sessions at your convenience with our smart calendar system.
            </p>
          </div>
          <div className="flex-1 mx-5">
            <img
              src={Bro}
              alt="Flexible Scheduling"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
     {/* {Mobile View} */}
    </div>
    <div className="space-y-20 px-4 md:hidden ">
    
    <div className="relative text-white text-center md:hidden justify-center items-center mx-4 ">
    <div className="text-center text-white my-10">
        <h1 className="text-4xl font-semibold my-2">Why Choose Us</h1>
        <p className="text-gray-400">Experience the future of learning with our cutting-edge platform</p>
      </div>
    
        <img src={Cuate} alt="" className="relative -mb-20 z-10 mx-auto" />
        <div className="bg-white/5 bg-opacity-5 border-2 border-[#C0C0C01A] backdrop-blur-lg py-20 ">
          <div className="mt-5 z-10 px-1">
            <h1 className="my-2 text-lg font-semibold">AI-Powered Matching</h1>
            <p className="text-gray-400 text-xs">
              Our intelligent system pairs you with the perfect tutor based on
              your learning style and goals.
            </p>
          </div>
        </div>
      </div>
      <div className="relative text-white text-center md:hidden justify-center items-center mx-4 ">
        <img src={Pana} alt="" className="relative -mb-20 z-10 mx-auto" />
        <div className="bg-white bg-opacity-5 border-2 border-[#C0C0C01A] backdrop-blur-md py-20 ">
          <div className="mt-5 z-10 px-2">
            <h1 className="my-2 text-lg font-semibold">Live Interactive Sessions</h1>
            <p className="text-gray-400 text-xs">
            Engage in real-time learning with advanced video conferencing and
              collaborative tools.
            </p>
          </div>
        </div>
      </div>
      <div className="relative text-white text-center md:hidden justify-center items-center mx-4 ">
        <img src={Bro} alt="" className="relative -mb-20 z-10 mx-auto" />
        <div className="bg-white bg-opacity-5  border-2 border-[#C0C0C01A] backdrop-blur-md py-20 ">
          <div className="mt-5 z-10 ">
            <h1 className="my-2 text-lg font-semibold">Flexible Scheduling</h1>
            <p className="text-gray-400 text-xs">
            Book sessions at your convenience with our smart calendar system.
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
