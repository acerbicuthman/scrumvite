import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../Learner/home.css'
import Amico from "../../assets/amico.png";
import GoogleIcon from '../../assets/googleIcon.png'
import LinkedinIcon from '../../assets/devicon_linkedin.png'
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import {LinkedIn} from 'react-linkedin-login-oauth2';
import axios from 'axios'

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcCheckmark } from "react-icons/fc";

const Home = () => {
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
 const [checkBoxValid, setCheckBoxValid] = useState(false)
 const [codeMessage, setCodeMessage] = useState("")
 const [authCodeSent, setAuthCodeSent] = useState(false)

  const minLength = /.{8,}/;
  const upperCase = /[A-Z]/;
  const lowerCase = /[a-z]/;
  const number = /[0-9]/;


  const Criteria = [
  {regex: minLength, label: "Be a minimum of 8 characters" },
  {regex: lowerCase, label: "Include at least one lowecase letter (a-z)"},
  {regex: upperCase, label: "Include at least one uppercase letter (A-Z)"},
  {regex: number, label: "Include at least one number (0-9)"}

]
  const isLengthValid = minLength.test(password);
  const isUpperValid = upperCase.test(password);
  const isLowerValid = lowerCase.test(password);
  const isNumberValid = number.test(password);
 

  const isPasswordWeak =
    !isLengthValid ||
    !isUpperValid ||
    !isLowerValid ||
    !isNumberValid;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    const isValid =
      isLengthValid &&
      isUpperValid &&
      isLowerValid &&
      isNumberValid;

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
    setCheckBoxValid(e.target.checked)
}

const handleAuthCodeChange = async(e) => {
    e.preventDefault()

    try {
        const response = await axios.post("http://localhost:5000/send-auth-code", {email})
        if(response.data.success){
            setCodeMessage("Code successfully sent to your email")
            setAuthCodeSent(true)
        } else {
            setCodeMessage("Error sending authentication code")
        } 
    }  catch (error) {
        setCodeMessage("An error occurred while sending the authentication code.")
        console.error("Error", error)
    }
}

//   const handleGoogleAuth = (response) => {
//     if(response.credentials)
//     {
//         console.log('Google Login Successful', response)
//     } else{
//         console.error(response.error)
//         console.log("login Failed")
//     }
    
//   }

//   const handleLinkedInAuth = (data) => {
//     console.log("Linkedin Login Successful", data)
//   }
  return (
    <div className="flex flex-col md:flex-row h-screen sm:p-6 md:overflow-hidden">
      <div className="flex-1 flex justify-center items-center p-16 hidden md:block ">
        <img
          className="w-full md:h-full h-full object-scale-down py-2 md:mx-5 "
          src={Amico}
          alt="Your Company"
        />
      </div>

      <div className="flex-1 px-6 mb-2 md:mb-4 xl:py-18 2xl:py-96 h-screen overflow-hidden">
  <div className="w-full max-w-lg mx-auto pt-8 xl:h-screen">

          <h2 className="text-left text-2xl md:text-xl font-bold tracking-tight text-gray-600 mb-4 md:mb-1 xl:text-3xl">
            Create Account
          </h2>
          <p className="text-center lg:text-sm text-xs mb-2 md:text-xs md:text-left xl:text-xl m">
            Welcome, create an account and begin your learning Journey
          </p>
          <form className="space-y-1 md:space-y-0 lg:space-y-5 xl:space-y-1 " action="#" 
          method="POST" 
          // onSubmit={handleAuthCodeChange}
          >
            <div>
              <label
                htmlFor="name"
                className="text-xs md:text-sm sm:text-xl xl:text-sm font-medium text-gray-600"
              >
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter First Name"
                className="text-xs md:text-xs xl:text-sm block w-full border-black border rounded-md bg-white px-2 sm:px-3 py-1 text-base text-gray-600 outline-1 outline-offset-1 outline-black-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="text-xs md:text-xs xl:text-sm font-medium text-gray-900"
              >
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter Last Name"
                className="text-xs md:text-xs xl:text-sm  block w-full border-black border rounded-md bg-white px-3 py-1 md:-py-1 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-xs md:text-xs xl:text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  autoComplete="email"
                  placeholder="Enter your Email"
                  required
                  className={`text-xs md:text-xs xl:text-sm block w-full border-black border 
                  rounded-md bg-white px-3 py-1 text-base text-gray-900 outline-1 outline-offset-1 
                  outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600
                   sm:text-sm 
                   ${
                   email && (isEmailValid ? "valid-input" : "invalid-input")
                }
                   `}
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
                className="text-xs md:text-xs xl:text-sm font-medium text-gray-900"
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
                  className={`text-sm md:text-xs  xl:text-sm block w-full border-black border rounded-md bg-white px-3 py-1 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm ${
                    isPasswordTouched && password && !isPasswordValid
                      ? "invalid-input"
                      : ""
                  } `}
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
                <div className="mb-1 text-green-600 text-xs">Strong Password</div>
              )}
            </div>

            <div>
              <label
                htmlFor="password-confirm"
                className="text-xs md:text-xs xl:text-sm font-medium text-gray-900"
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
                  className={`block w-full border-black border rounded-md bg-white px-3 py-1 text-xs md:text-xs xl:text-sm text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm ${
                    isConfirmPasswordTouched &&
                    confirmPassword &&
                    !isConfirmPasswordValid
                      ? "invalid-input"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-2 "
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
            <div className="text-sm flex max-w-full whitespace-nowrap py-2 ">
              <input
                type="checkbox"
                id="terms"
                required
                onClick={handleCheckboxChange}
                className="mr-2  h-4 w-4 text-indigo-600 border-gray-300 rounded "
              />
              <div className=" mb-1 md:mb-1  md:text-xs md:inline inline sm-inline text-xs xl:text-sm xl:mb-2 pr-12">
                I agree to&nbsp;
                <span className="Terms">
                  <a href="" >Terms & Conditions</a>
                  
                </span>
                &nbsp;and
                <span className="Terms">
                  <a href="">&nbsp;Privacy Policy</a>
                </span>
              </div>
            </div>
                {password && 
                <div className="">
            <ul className="mt-1 list-style-none text-xs sm:text-xs xl:text-sm ">
                {Criteria.map(({regex, label}, index) => {
                    const isValid =regex.test(password);
                    return (
                        <li key={index}                        >
                        <span 
                        className={`inline-block w-3 h-3 mx-2  border ${isValid ? "" : "border-gray-300"}`}>
                            {isValid && <FcCheckmark />}
                        </span>
                        {label}
                        </li>
                    )
                })}

            </ul>
            </div>
            }
      


            
            <div>
              <Link to="/successfulReg">
                <button
                  type="submit"
                  disabled={
                    !isPasswordValid || !isConfirmPasswordValid || !isEmailValid || !checkBoxValid
                  }
                  className={`continueBtn w-full flex justify-center rounded-md px-3 ml-2 py- sm:py-3 md:py-1 text-sm xl:text-xl xl:py-2  font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 ${
                    !isPasswordValid || !isConfirmPasswordValid || !isEmailValid || !checkBoxValid
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Continue
                </button>
              </Link>
            </div>
          </form>

                  {codeMessage && <p>{codeMessage}</p>}
                  {authCodeSent && <p>Please check your email</p>}

          <div className="line-with-text my-2 md:my-1 sm:my-2 text-sm xl:text-sm ">
            <span>Or Continue with</span>
          </div>

          {/* Social Login Buttons */}
          <div className="flex flex-wrap gap-4 items-center justify-center mt-1 xl:mt-1 sm:mt-4 md:mt-0">
          
                
              
            <button href="#" 
            //   onClick={handleGoogleAuth}
            className={`social-btn google-btn `} 
            >
                
              <img className="w-12 h-12 mr-2 border rounded-full border-black" src={GoogleIcon} alt="Google" />
              
            </button>
            
           
           
      {/* <GoogleLogin 
        onSuccess={handleGoogleAuth} 
        onError={() => console.log('Google login failed')}
        useOneTap={true} 
        shape="circle"
        width="50"
      /> */}
   
           
            <a href="#" className="social-btn linkedin-btn rounded-full border-black border">
              <img className="w-12 h-12 p-2 " src={LinkedinIcon} alt="LinkedIn" />
            </a>
          
          
            
          </div>

          <div className="mb-4 md:mb-1 ">
            <p className="mt-1 sm:mt-4 text-center text-sm xl:text-sm xl:mt-1 xl:pb-2 text-gray-500">
              Already have an Account? &nbsp;
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;