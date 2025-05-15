import React from "react";
import Cuate from "../Landing/LandingImg/cuate.png";
import Pana from "../Landing/LandingImg/pana.png";
import Bro from "../Landing/LandingImg/bro.png";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  return (
    <div className="text-white my-4 px-4">
      <div className="text-center text-white">
        <motion.h1
          className="text-4xl font-semibold my-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className=" text-4xl font-semibold my-2">Why Choose Us</h1>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p>
            Experience the future of learning with our cutting-edge platform
          </p>
        </motion.p>
      </div>
      <div className="flex flex-col md:flex-row md:my-10 my-4 gap-4">
        {/* First Pair (Text + Image) */}
        <motion.div
          className="flex flex-col md:flex-row my-5 md:text-left text-center"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="flex-1 m-5">
            <h1 className="text-3xl">AI-Powered Matching</h1>
            <p className="text-gray-400">
              Our intelligent system pairs you with the perfect tutor based on
              your learning style and goals.
            </p>
          </div>
          <div className="flex-1 mx-5">
            <motion.img
              src={Cuate}
              alt="AI Matching Illustration"
              className="w-full h-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </motion.div>

        {/* Second Pair (Text + Image) */}
        <motion.div
          className="flex flex-col md:flex-row my-5 md:text-left text-center"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="flex-1 m-5 py-auto">
            <h1 className="text-3xl">Live Interactive Sessions</h1>
            <p className="text-gray-400">
              Engage in real-time learning with advanced video conferencing and
              collaborative tools.
            </p>
          </div>
          <div className="flex-1 mx-5">
            <motion.img
              src={Pana}
              alt="Live Interactive Sessions"
              className="w-full h-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </motion.div>

        {/* Third Pair (Text + Image) */}
        <motion.div
          className="flex flex-col md:flex-row my-5 md:text-left text-center"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <div className="flex-1 m-5">
            <h1 className="text-3xl">Flexible Scheduling</h1>
            <p className="text-gray-400">
              Book sessions at your convenience with our smart calendar system.
            </p>
          </div>
          <div className="flex-1 mx-5">
            <motion.img
              src={Bro}
              alt="Flexible Scheduling"
              className="w-full h-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
