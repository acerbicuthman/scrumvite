import React from 'react';
import Congrats from '../../../assets/congratulations.gif';

const SuccessfulReg = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50 px-4">
      <div className="w-full max-w-2xl bg-transparent rounded-xl shadow-lg overflow-hidden border-white border-2 ">
        <div className="flex flex-col bg-white items-center justify-center p-8 m-4">
          <img
            src={Congrats}
            alt="Congratulations"
            className="h-48 md:h-60 object-contain mb-6"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
            Congratulations!
          </h1>
          <p className="text-gray-600 text-center text-sm md:text-base mb-6">
            Your account has been successfully created. Welcome to Scrum Consult LMS! Start learning, growing, and achieving your goals today.
          </p>
          <button
            type="button"
            className="w-full md:w-auto bg-blue-900 hover:bg-indigo-600 text-white text-sm font-semibold px-6 py-3 rounded-md transition duration-300"
          >
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulReg;
