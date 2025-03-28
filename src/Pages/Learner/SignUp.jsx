import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Learner/signup.css";
import Amico from "../../assets/amico.png";
import GoogleIcon from "../../assets/googleIcon.png";
import LinkedinIcon from "../../assets/devicon_linkedin.png";
import axios from "axios";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcCheckmark } from "react-icons/fc";

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] =
    useState(false);
  const [checkBoxValid, setCheckBoxValid] = useState(false);
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

  const isLengthValid = minLength.test(password);
  const isUpperValid = upperCase.test(password);
  const isLowerValid = lowerCase.test(password);
  const isNumberValid = number.test(password);

  const isPasswordWeak =
    !isLengthValid || !isUpperValid || !isLowerValid || !isNumberValid;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    const isValid =
      isLengthValid && isUpperValid && isLowerValid && isNumberValid;

    setIsPasswordValid(isValid);
  }, [password]);

  useEffect(() => {
    const isConfirmValid = confirmPassword === password;
    setIsConfirmPasswordValid(isConfirmValid);
  }, [confirmPassword, password]);

  useEffect(() => {
    const isEmailValid = emailRegex.test(email);
    setIsEmailValid(isEmailValid);
  }, [email]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsPasswordTouched(true);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
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

    try {
      const response = await axios.post(
        "http://localhost:5000/send-auth-code",
        { email }
      );
      if (response.data.success) {
        setCodeMessage("Code successfully sent to your email");
        setAuthCodeSent(true);
      } else {
        setCodeMessage("Error sending authentication code");
      }
    } catch (error) {
      setCodeMessage(
        "An error occurred while sending the authentication code."
      );
      console.error("Error", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen sm:p-6 md:overflow-hidden overflow-x-hidden">
    <div className="flex-1 justify-center items-center p-6 sm:p-12 md:object-bottom hidden md:block mt-36"> {/* Added mt-12 for margin-top */}
  <img
    className="w-full h-auto object-contain"
    src={Amico}
    alt="Amico"
  />
</div>


      <div className="flex-1 px-6 sm:px-8 md:px-12 mb-4 md:mb-4 xl:py-18 2xl:py-96 h-screen overflow-x-hidden">
        <div className="w-full max-w-lg mx-auto pt-8 xl:h-screen ">
          <h2 className="text-left text-2xl sm:text-3xl md:text-xl font-bold tracking-tight text-gray-600 mb-4 md:mb-1 xl:text-3xl">
            Create Account
          </h2>
          <p className="text-center lg:text-sm text-xs mb-2 md:text-xs md:text-left xl:text-xl">
            Welcome, create an account and begin your learning Journey
          </p>
          <form
            className="space-y-5 md:space-y-0 lg:space-y-5 xl:space-y-1"
            action="#"
            method="POST"
          >
            <div>
              <label
                htmlFor="name"
                className="text-sm sm:text-base md:text-base xl:text-sm font-medium text-gray-600"
              >
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter First Name"
                className="block w-full border rounded-md bg-white px-3 py-2 text-base text-gray-600 outline-1 outline-offset-1 outline-black-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="text-sm sm:text-base md:text-base xl:text-sm font-medium text-gray-900"
              >
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter Last Name"
                className="block w-full border rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-sm sm:text-base md:text-base xl:text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  autoComplete="email"
                  placeholder="Enter your Email"
                  required
                  className={`block w-full border rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 ${
                    email && (isEmailValid ? "valid-input" : "invalid-input")
                  }`}
                />
                {!isEmailValid && email && (
                  <div className="text-red-600 text-xs mt-1">
                    Please enter a valid email
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm sm:text-base md:text-base xl:text-sm font-medium text-gray-900"
              >
                Create Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter Password"
                  autoComplete="current-password"
                  required
                  className="block w-full border rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {isPasswordTouched && password && isPasswordWeak && (
                <div className="mb-1 text-red-600 text-xs">Weak Password</div>
              )}
              {isPasswordTouched && password && !isPasswordWeak && (
                <div className="mb-1 text-green-600 text-xs">
                  Strong Password
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="password-confirm"
                className="text-sm sm:text-base md:text-base xl:text-sm font-medium text-gray-900"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="password-confirm"
                  id="password-confirm"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Confirm Password"
                  autoComplete="current-password"
                  required
                  className="block w-full border rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
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
                confirmPassword &&
                !isConfirmPasswordValid && (
                  <div className="text-red-600 text-xs">
                    Passwords do not match
                  </div>
                )}
            </div>

            <div className="text-sm flex py-2">
              <input
                type="checkbox"
                id="terms"
                required
                onClick={handleCheckboxChange}
                className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded "
              />
              <span className="text-xs sm:text-sm md:text-sm xl:text-sm">
                I agree to&nbsp;
                <a href="#">Terms & Conditions</a>&nbsp;and&nbsp;
                <a href="#">Privacy Policy</a>
              </span>
            </div>
            {password && (
              <div className="overflow-hidden px-1 sm:px-1 lg:px-2">
                <ul className="mt-1 list-none text-xs sm:text-sm md:text-sm xl:text-sm">
                  {Criteria.map(({ regex, label }, index) => {
                    const isValid = regex.test(password);
                    return (
                      <li key={index} className="flex items-center space-x-2">
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

            <div className="text-center py-3">
              <Link to="/successfulReg">
                <button
                  type="submit"
                  disabled={
                    !isPasswordValid ||
                    !isConfirmPasswordValid ||
                    !isEmailValid ||
                    !checkBoxValid
                  }
                  className={`w-full rounded-md px-6 py-3 text-white font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Continue
                </button>
              </Link>
            </div>
          </form>

          {codeMessage && <p>{codeMessage}</p>}
          {authCodeSent && <p>Please check your email</p>}

          <div className="text-center my-4">
            <span>Or Continue with</span>
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <a
              href="#"
              className="w-12 h-12 rounded-full border flex items-center justify-center"
            >
              <img className="w-10 h-10" src={GoogleIcon} alt="Google" />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full border flex items-center justify-center  "
            >
              <img className="w-9 h-9  p-1" src={LinkedinIcon} alt="LinkedIn" />
            </a>
          </div>

          <div className="text-center mt-4 text-sm">
            <p>
              Already have an account?&nbsp;
              <a href="#" className="font-semibold text-indigo-600">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
