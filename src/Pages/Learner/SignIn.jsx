import React, { useState } from "react";
import ImageSlideShow from "./ImageSlideShow";
import google from "../../assets/googleIcon.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LinkedinIcon from "../../assets/devicon_linkedin.png";
import { base_url } from "../../library/api";
import axios from "axios";
import { useNavigate } from "react-router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogInSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    try {
      const response = await axios.post(`${base_url}api/auth/login/`, data);
      console.log("Response", response.data);
      navigate("/landing");
    } catch (error) {
      if (error.response) {
        console.error(
          "Error response data",
          error.response.data || "No response Data"
        );
        console.error("Error status", error.response.status);
      } else if (error.request) {
        console.error("Error Request", error.request);
      } else {
        console.error("Error message", error.message);
      }
    }
  };
  return (
    <div className="flex flex-col md:flex-row  sm:p-6 md:overflow-hidden min-h-screen overflow-x-hidden md:-mb-32 ">
      <div className="md:flex-1 h-full justify-center items-center sm:p-12 hidden md:flex  ">
        <div className="  w-full z-[-1] mt-8 ">
          <ImageSlideShow />
        </div>
      </div>

      <div className="flex-1 md:mt-12 px-4 sm:px-8 md:px-12 mb-4 md:mb-1 xl:py-18 h-screen overflow-x-hidden xl:mb-1 lg:mb- lg:min-h-screen lg:overflow-hidden">
        <div className="w-full max-w-lg mx-auto pt-8  ">
          <h2 className="hidden md:block text-center text-xl sm:text-3xl md:text-xl font-medium tracking-tight text-gray-600 mb-4 md:mb-1 xl:text-3xl">
            Welcome Back!
          </h2>
          {/* <h2 className="text-center text-xl md:hidden font-medium text-gray-600 py-3">Create Account</h2> */}
          <div className="text-center md:px-0 px-2 lg:text-base text-sm mb-4 md:text-xs  md:text-nowrap xl:text-base">
            <p>
              <span className="md:hidden ">Welcome,</span> Login back in to and
              continue your learning journey
            </p>
          </div>
          <div className="md:flex flex-row md:justify-center xl:gap-5 gap-5 hidden py-2 ">
            <div className="rounded-xl border-2 p-2 content-center xl:px-8 md:px-1">
              <button className="flex gap-4 md:gap-1">
                <img
                  src={google}
                  alt="Sign in with Google"
                  className="w-8 h-8 object-contain"
                />
                <span className="mt-2 text-sm text-nowrap md:hidden lg:block lg:text-sm">
                  Sign up with Google
                </span>
              </button>
            </div>
            <div className="rounded-xl border-2 p-2 ">
              <button className="flex gap-4 md:gap-1 ">
                <img
                  src={LinkedinIcon}
                  alt="Sign in with Google"
                  className="w-8 h-8  object-contain "
                />
                <span className="mt-2 text-sm text-nowrap md:hidden lg:block lg:text-sm">
                  Sign up with LinkedIn
                </span>
              </button>
            </div>
          </div>
          <div className="md:flex hidden items-center gap-4 ">
            <div className="flex-1">
              <hr />
            </div>
            <div className="text-gray-400">OR</div>
            <div className="flex-1">
              <hr />
            </div>
          </div>
          <form
            className="space-y-5 md:space-y-0 lg:space-y-5 xl:space-y-1 "
            onSubmit={handleLogInSubmit}
          >
            <div className="py-2">
              <label
                htmlFor="email"
                className="text-sm sm:text-base md:text-base xl:text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  autoComplete="email"
                  placeholder="Enter your Email"
                  required
                  className="block w-full border rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 "
                  //   className={`block w-full border rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 ${
                  //     email && (isEmailValid ? "valid-input" : "invalid-input")
                  //   }`}
                />
              </div>
              {/* {!isEmailValid && email && (
                <div className="text-red-600 text-xs mt-1">
                  Please enter a valid email
                </div>
              )} */}
            </div>

            <div className="py-2">
              <label
                htmlFor="password1"
                className="text-sm sm:text-base md:text-base xl:text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password1"
                  id="password1"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter Password"
                  required
                  className="block w-full border rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 "
                  //   className={`block w-full border rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600
                  //   ${
                  //     isPasswordTouched && password1 && !isPasswordValid
                  //       ? "invalid-input"
                  //       : ""
                  //   }`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex md:text-sm lg:text-base">
              <div className="flex-1">
                <label htmlFor="remember">
                  <input
                    type="checkbox"
                    id="remember"
                    // onClick={handleCheckboxChange}
                    className="mr-2 h-3 w-3 text-indigo-600 border-gray-300 rounded "
                  />
                  Remember Me
                </label>
              </div>
              <div className="text-blue-600">Forgot password</div>
            </div>
            <div className="flex justify-center py-5">
              <div className="w-2/3 text-center">
                <button
                  type="submit"
                  className="bg-blue-800 w-full py-2 rounded-lg"
                >
                  Continue
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
