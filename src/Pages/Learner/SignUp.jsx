import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import "../Learner/signup.css";
import "./signup.css";
// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   useClerk,
//   UserButton,
//   useUser,
// } from "@clerk/clerk-react";
import google from "../../assets/googleIcon.png";
import LinkedinIcon from "../../assets/devicon_linkedin.png";
import axios from "axios";
import { base_url } from "../../library/api";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcCheckmark } from "react-icons/fc";
import ImageSlideShow from "./ImageSlideShow";

const SignUp = () => {
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [account_type, setAccount_type] = useState("");
  const [password1, setpassword1] = useState("");
  const [password2, setpassword2] = useState("");
  const [email, setEmail] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkBoxValid, setCheckBoxValid] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedOption } = location.state || {};
  const [codeMessage, setCodeMessage] = useState("");
  const [authCodeSent, setAuthCodeSent] = useState(false);

  const minLength = /.{8,}/;
  const upperCase = /[A-Z]/;
  const lowerCase = /[a-z]/;
  const number = /[0-9]/;

  const Criteria = [
    { regex: minLength, label: "Be a minimum of 8 characters" },
    { regex: lowerCase, label: "Include at least one lowercase letter (a-z)" },
    { regex: upperCase, label: "Include at least one uppercase letter (A-Z)" },
    { regex: number, label: "Include at least one number (0-9)" },
  ];

  const isLengthValid = minLength.test(password1);
  const isUpperValid = upperCase.test(password1);
  const isLowerValid = lowerCase.test(password1);
  const isNumberValid = number.test(password1);

  const isPasswordWeak =
    !isLengthValid || !isUpperValid || !isLowerValid || !isNumberValid;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    const isValid =
      isLengthValid && isUpperValid && isLowerValid && isNumberValid;
    setIsPasswordValid(isValid);
  }, [password1]);

  useEffect(() => {
    const isConfirmValid = password2 === password1;
    setIsConfirmPasswordValid(isConfirmValid);
  }, [password2, password1]);

  useEffect(() => {
    const isEmailValid = emailRegex.test(email);
    setIsEmailValid(isEmailValid);
  }, [email]);

  const handlePasswordChange = (e) => {
    setpassword1(e.target.value);
    setIsPasswordTouched(true);
  };

  const handleConfirmPasswordChange = (e) => {
    setpassword2(e.target.value);
    setIsConfirmPasswordTouched(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setCheckBoxValid(e.target.checked);
  };

  const handleAuthCodeChange = async (e) => {
    e.preventDefault();

    const data = {
      account_type,
      email,
      first_name,
      last_name,
      password1,
      password2,
    };

    try {
      // Use userData instead of data
      const response = await axios.post(
        `${base_url}api/auth/registration/`,
        data
      );
      console.log("Response:", response.data);
      navigate("/emailverification");
    } catch (error) {
      if (error.response) {
        // Request was made and server responded with a status code other than 2xx
        console.error("Error response data:", error.response.data);
        console.error("Error status:", error.response.status);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("Error request:", error.request);
      } else {
        // Something else went wrong
        console.error("Error message:", error.message);
      }
    }
  };

  useEffect(() => {
    // Retrieve `account_type` from the location state (from the previous page)
    if (location.state && location.state.account_type) {
      setAccount_type(location.state.account_type);
    }
  }, [location.state]);

  // useEffect(() => {
  //   console.log(handleAuthCodeChange());
  // });

  // const { openSignIn } = useClerk();
  // const { user } = useUser();

  return (
    <div className="flex flex-col md:flex-row  min-h-screen overflow-hidden ">
      <div className="md:flex-1 justify-center items-center sm:p-12 hidden md:flex  ">
        <div className=" w-full  z-[-1] ">
          <ImageSlideShow />
        </div>
      </div>

      <div className="flex-1 px-8 sm:px-8 md:px-12 overflow-hidden min-h-screen lg:mt-2">
        <div className="w-full max-w-lg mx-auto mt-6 xl:h-screen pt-2 ">
          <h2 className="hidden md:block text-center text-xl sm:text-3xl md:text-xl font-medium tracking-tight text-gray-600 mb-3 md:mb-1 xl:text-3xl">
            Welcome!
          </h2>
          <h2 className="text-center text-xl md:hidden font-medium text-gray-600 py-2">
            Create Account
          </h2>
          <div className="text-center md:px-0 px-2 lg:text-base text-sm mb-4 md:text-xs  md:text-nowrap xl:text-base">
            <p>
              <span className="md:hidden ">Welcome,</span> Create an account and
              begin your learning Journey
            </p>
          </div>
          <div className="md:flex flex-row md:justify-center xl:gap-5 gap-5 hidden ">
            <div className="rounded-xl border-2 p-1 content-center xl:px-8 m">
              <button className="flex gap-4 md:gap-1 pr-2">
                <img
                  src={google}
                  alt="Sign in with Google"
                  className="w-8 h-8 object-contain"
                />
                <span className="mt-1.5 text-xs text-nowrap md:hidden lg:block md:text-sm ">
                  Sign up with Google
                </span>
              </button>
              {/* {user ? (
  <></> // Nothing rendered for signed-in users
) : (
  
  <SignedOut>
   
    <SignInButton mode="modal" redirectUrl="/landing">
      
      <button className="flex gap-4">
        <img
          src={google}
          alt="Sign in with Google"
          className="w-8 h-8 object-contain"
        />
        <span className="mt-1 text-xs text-nowrap md:text-base">Sign up with Google</span>
      </button>
    </SignInButton>
  
  </SignedOut>
)} */}
            </div>
            <div className="rounded-xl border-2 p-1 content-center xl:px-8 m">
              <button className="flex gap-4 md:gap-1 pr-2">
                <img
                  src={LinkedinIcon}
                  alt="Sign in with Google"
                  className="w-8 h-8  object-contain "
                />
                <span className="mt-1.5 text-xs text-nowrap md:hidden lg:block lg:text-sm">
                  Sign up with LinkedIn
                </span>
              </button>
              {/* {user ? (
              <></>

            ) : (
             
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="flex gap-4">
                        <img
                          src={LinkedinIcon}
                          alt="Sign in with Google"
                          className="w-8 h-8  object-contain "
                        />
                    <span className="mt-1">Sign up with LinkedIn</span>
                      </button>
                    </SignInButton>
                  </SignedOut>
               
            )} */}
            </div>
          </div>
          <div className="md:flex hidden items-center gap-4 my-1 ">
            <div className="flex-1">
              <hr />
            </div>
            <div className="text-gray-400">OR</div>
            <div className="flex-1">
              <hr />
            </div>
          </div>
          <div className="overflow-y-auto max-h-screen">
            <form
              className="space-y-5 md:space-y-0 lg:space-y-5 xl:space-y-1"
              onSubmit={handleAuthCodeChange}
            >
              <div>
                <label
                  htmlFor="first_name"
                  className="text-sm sm:text-base md:text-base xl:text-sm font-medium text-gray-600"
                >
                  First Name
                </label>
                <input
                  type="text"
                  value={first_name}
                  onChange={(e) => setfirst_name(e.target.value)}
                  placeholder="Enter First Name"
                  className="block w-full border rounded-md bg-white px-3 py-1 text-base text-gray-600 outline-1 outline-offset-1 outline-black-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                />
              </div>

              <div>
                <label
                  htmlFor="last_name"
                  className="text-sm sm:text-base md:text-base xl:text-sm font-medium text-gray-900"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  value={last_name}
                  onChange={(e) => setlast_name(e.target.value)}
                  placeholder="Enter Last Name"
                  className="block w-full border rounded-md bg-white px-3 py-1 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                />
              </div>

              <div>
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
                    className={`block w-full border rounded-md bg-white px-3 py-1 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 ${
                      email && (isEmailValid ? "valid-input" : "invalid-input")
                    }`}
                  />
                </div>
                {!isEmailValid && email && (
                  <div className="text-red-600 text-xs mt-1">
                    Please enter a valid email
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="password1"
                  className="text-sm sm:text-base md:text-base xl:text-sm font-medium text-gray-900"
                >
                  Create Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password1"
                    id="password1"
                    value={password1}
                    onChange={handlePasswordChange}
                    placeholder="Enter Password"
                    required
                    className={`block w-full border rounded-md bg-white px-3 py-1 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600
                  ${
                    isPasswordTouched && password1 && !isPasswordValid
                      ? "invalid-input"
                      : ""
                  }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {isPasswordTouched && password1 && isPasswordWeak && (
                  <div className="mb-1 text-red-600 text-xs">Weak Password</div>
                )}
                {isPasswordTouched && password1 && !isPasswordWeak && (
                  <div className="mb-1 text-green-600 text-xs">
                    Strong Password
                  </div>
                )}
                {password1 && (
                  <div className="overflow-hidden px-1 sm:px-1 lg:px-2">
                    <ul className="mt-1 list-none text-xs ">
                      {Criteria.map(({ regex, label }, index) => {
                        const isValid = regex.test(password1);
                        return (
                          <li
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <span
                              className={`inline-block w-3 h-3 border ${
                                isValid ? "border-green-500" : "border-gray-300"
                              }`}
                            >
                              {isValid && <FcCheckmark />}
                            </span>
                            <span className="truncate">{label}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="password2"
                  className="text-sm sm:text-base md:text-base xl:text-sm font-medium text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="password2"
                    id="password2"
                    value={password2}
                    onChange={handleConfirmPasswordChange}
                    placeholder="Confirm Password"
                    required
                    className={`block w-full border rounded-md bg-white px-3 py-1 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                ${
                  isConfirmPasswordTouched &&
                  password2 &&
                  !isConfirmPasswordValid
                    ? "invalid-input"
                    : ""
                }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {isConfirmPasswordTouched &&
                  password2 &&
                  !isConfirmPasswordValid && (
                    <div className="text-red-600 text-xs">
                      Passwords do not match
                    </div>
                  )}
              </div>
              {/* Account Type (pre-filled and non-editable) */}
              <label
                htmlFor="account_type"
                className="text-sm font-medium text-gray-700"
              >
                You Selected:
              </label>
              <div className="mt-2 p-1 border-2 border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700">
                {account_type
                  ? account_type.charAt(0).toUpperCase() + account_type.slice(1)
                  : "No option selected"}
              </div>

              <div className="text-sm flex py-2 ">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  onClick={handleCheckboxChange}
                  className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded  "
                />
                <span className="text-xs lg:text-sm  md:font-normal ">
                  I agree to&nbsp;
                  <a href="#" className="text-blue-600">
                    Terms & Conditions
                  </a>
                  &nbsp;and&nbsp;
                  <a href="#" className="text-blue-600">
                    Privacy Policy
                  </a>
                </span>
              </div>

              <div>
                <div className="text-center py-3">
                  <Link
                    to="/emailverification"
                    state={{ first_name: first_name }}
                  >
                    <button
                      type="submit"
                      disabled={
                        !isPasswordValid ||
                        !isConfirmPasswordValid ||
                        !isEmailValid ||
                        !checkBoxValid
                      }
                      className={`w-full rounded-md px-4 py-3 text-white font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      Continue
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
          <div className="flex items-center gap-4 my-2 md:hidden">
            <div className="flex-1">
              <hr />
            </div>
            <div className="text-gray-400">OR Continue With</div>
            <div className="flex-1">
              <hr />
            </div>
          </div>

          <div className="flex flex-row my-3 gap-5 justify-center md:hidden ">
            <div className="mt-1 rounded-full border-2 border-black">
              {/* <SignedOut>
                    <SignInButton mode="modal" redirectUrl="/landing"> */}
              <button className="flex ">
                <img src={google} alt="Sign in with Google" className=" " />
                {/* <span className="my-2">Create Account</span> */}
              </button>
              {/* </SignInButton>
                  </SignedOut> */}
            </div>
            <div className="mt-1 rounded-full border-2 border-black">
              <img className="p-3" src={LinkedinIcon} alt="" />
            </div>
          </div>

          <div className="text-center text-sm">
            <p>
              Already have an account?&nbsp;
              <Link to="/signin">
                <button href="#" className="font-semibold text-indigo-600">
                  Sign in
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
