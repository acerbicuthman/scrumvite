import React from "react";
import displayimg from "../../assets/amico.png";

const SignIn = () => {
  return (
    <div className="mt-18 flex items-center justify-center md:flex-row h-screen bg-slate-300">
      <div className="w-full px-10">
        <img src={displayimg} alt="" />
      </div>
      <div
        className="  bg-white h-screen w-full p-20
       "
      >
        <div className="items-center justify-center px-10">
          <h2 className="text-left text-2xl sm:text-3xl md:text-xl font-bold tracking-tight text-gray-600 mb-4 md:mb-1 xl:text-3xl">
            Welcome Back
          </h2>
          <p className="text-center lg:text-sm text-xs mb-2 md:text-xs md:text-left xl:text-base">
            Welcome, create an account and begin your learning Journey
          </p>
          <form action="">
            <div>
              <label
                htmlFor="email"
                className="text-sm sm:text-base md:text-base xl:text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={`block w-full border rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600`}
              />
              <label
                htmlFor="password1"
                className="text-sm sm:text-base md:text-base xl:text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                name=""
                id=""
                className={`block w-full border rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600`}
              />
            </div>
            <div className="flex ">
              <p className="flex-1">Remember me</p>
              <a href="" className="text-blue-600">
                Forgot password?
              </a>
            </div>
          </form>
          <div className="my-9 text-center">
            <button className="bg-indigo-900 text-white py-3 rounded-lg w-full ">
              Continue
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-auto">
          <p className="text-blue-600"> Don’t have an account? Sign Up</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
