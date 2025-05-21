import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import "../Learner/signup.css";
import "./signup.css";
import axios from "axios";
import { base_url } from "../../library/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcCheckmark } from "react-icons/fc";
import ImageSlideShow from "./ImageSlideShow";
import EmailVerification from "../Email_verification/EmailVerification";
import LinkedInLogin from "../SocialMediaLogIn/Linkedin";
import { BeatLoader } from "react-spinners";
import { AuthContext, useAuth } from "../../context/Authcontext";
import GoogleAuth from "../SocialMediaLogIn/GoogleAuth";

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
  const [localLoading, setLocalLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [validationErrors, setValidationErrors] = useState(null); //
  const { setTempCredentials } = useAuth();


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
    if (
      password1.toLowerCase().includes(first_name.toLowerCase()) ||
      password1.toLowerCase().includes(last_name.toLowerCase()) ||
      password1.toLowerCase().includes(email.split("@")[0].toLowerCase())
    ) {
      setMessage("Password should not contain your name or email.");
      return;
    } else {
      setMessage("");
    }
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
    setLocalLoading(true);
    setErrorMessage(""); 

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

      setTempCredentials({ email, password: password1 });
      localStorage.setItem("registered_email", email);
      localStorage.setItem("registered_first_name", first_name);

    setfirst_name("");
    setlast_name("");
    setEmail("");
    setpassword1("");
    setpassword2("");
    setCheckBoxValid(false);

    setIsModalOpen(true);

      // navigate("/emailverification");
    } catch (error) {
      if (error.response && error.response.data) {
        const data = error.response.data;
    
        // Convert the backend error object to a nicely formatted JSON string
        const rawMessage = JSON.stringify(data, null, 2);
    
        // Set the raw backend error message to display in the UI
        setErrorMessage(rawMessage);
    
        // Log detailed error info
        console.error("Error response data:", data);
        console.error("Error status:", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        setErrorMessage("No response received from server.");
      } else {
        // Something happened while setting up the request
        console.error("Request setup error:", error.message);
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setLocalLoading(false);
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);


  return (
    <div className="flex flex-col md:flex-row h-screen w-full  mt-16 overflow-hidden px-4 md:px-0 bg-black text-white">
      {/* Left - Image SlideShow */}
      <div className="hidden lg:flex  h-full my-auto w-full justify-center  ">
        <div className="w-full my-12 mx-auto items-center justify-center py-auto ml-20 ">
          <ImageSlideShow />
        </div>
      </div>
      <div className="w-full lg:w-10/12 px-4 sm:px-8 pt-6 pb-10 overflow-auto">

        <div className="w-full max-w-lg mx-auto mt-10 ">
          <h2 className="text-center text-4xl md font-semibold text-white p-2">
          Welcome Learner!
          </h2>
          <div className="text-center  text-sm font-medium mb-4 opacity-50 ">
            <p> Create an account and begin your learning Journey</p>
          </div>
          <form className="space-y-5" onSubmit={handleAuthCodeChange}>
            <div>
              <label
                htmlFor="first_name"
                className="text-base sm:text-base font-medium text-white"
              >
                First Name
              </label>
              <input
                type="text"
                value={first_name}
                onChange={(e) => setfirst_name(e.target.value)}
                placeholder="Enter First Name"
                className="block w-full border rounded-md mt-2  text-white   bg-white bg-opacity-5 border-gray-700 px-3 py-2 text-sm outline-1 outline-offset-1 outline-black-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
              />
            </div>
            {/* Other form fields with similar fixes */}
            <div>
              <label
                htmlFor="last_name"
                className="text-base sm:text-base font-medium text-white"
              >
                Last Name
              </label>
              <input
                type="text"
                value={last_name}
                onChange={(e) => setlast_name(e.target.value)}
                placeholder="Enter Last Name"
                className="block w-full border mt-2  rounded-md text-white   bg-white bg-opacity-5 border-gray-700 px-3 py-2 text-sm outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
              />
            </div>

            <div>
              <label htmlFor="text-base sm:text-base font-medium text-white">
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
                  className={`block w-full mt-2  border rounded-md text-white   bg-white bg-opacity-5 border-gray-700 px-3 py-2 text-sm outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 ${
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
                className="text-base sm:text-base font-medium text-white"
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
                  className={`block w-full border mt-2  rounded-md text-white   bg-white bg-opacity-5 border-gray-700 px-3 py-2 text-sm  outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 ${
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
                  {showPassword ?  <div className="text-white opacity-50">Hide</div> : <div className="text-white opacity-50">Show</div>}
                   {/* <FaEyeSlash /> : <FaEye /> */}
                </button>
              </div>
              {password1 && (
                <div className="px-1 sm:px-2">
                  <ul className="mt-1 list-none text-xs space-y-1">
                    {Criteria.map(({ regex, label }, index) => {
                      const isValid = regex.test(password1);
                      return (
                        <li key={index} className="flex items-center space-x-2">
                          <span
                            className={`inline-block w-3 h-3 border ${
                              isValid ? "border-green-500" : "border-gray-300"
                            }`}
                          >
                            {isValid && <FcCheckmark />}
                          </span>
                          <span className="break-words">{label}</span>
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
                className="text-base sm:text-base font-medium text-white"
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
                  className={`block w-full border mt-2 rounded-md text-white   bg-white bg-opacity-5 border-gray-700 px-3 py-2 text-sm  outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600
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
                  {showConfirmPassword ?  <div className="text-white opacity-50">Hide</div> : <div className="text-white opacity-50">Show</div>}
                    {/* <FaEyeSlash /> : <FaEye /> */}
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
            <div>
              <label
                htmlFor="account_type"
                className="text-base sm:text-base font-medium text-white"
              >
                You Selected:
              </label>
              <div className="mt-2 py-2 px-1 border-2 text-sm   bg-white bg-opacity-20  border-gray-700 rounded-md shadow-sm text-white">
                {account_type
                  ? account_type.charAt(0).toUpperCase() + account_type.slice(1)
                  : "No option selected"}
              </div>
            </div>
            {!validationErrors && errorMessage && (
  <div className="text-red-500 text-xs mt-1 space-y-1">
    {Object.values(JSON.parse(errorMessage)).flat().map((msg, index) => (
      <div key={index}>{msg}</div>
    ))}
  </div>
)}
            <div className="text-sm flex py-1 ">
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

            {/* Other form fields */}
            <div className="text-center py-2">
              <button
                type="submit"
                // onClick={() => setIsModalOpen(true)}
                disabled={
                  !isPasswordValid ||
                  !isConfirmPasswordValid ||
                  !isEmailValid ||
                  !checkBoxValid
                }
                className="w-full rounded-md px-4 py-3 text-white font-semibold bg-[#4045E1] hover:bg-blue-700  disabled:cursor-not-allowed"
              >
                {localLoading ? <BeatLoader /> : "Sign Up"}
              </button>
            </div>
          </form>
          {/* {errorMessage && (
  <div className="text-red-500 text-center text-xs mt-1">
    {JSON.parse(errorMessage)?.email?.[0]}
  </div>
)} */}

        </div>

         {/* Divider OR */}
         <div className="md:flex hidden md:items-center md:gap-4 text-white opacity-50 mt-10 md:px-14">
          <div className="flex-1 ">
            <hr />
          </div> 
          <div className="">Or Sign Up With</div>
          <div className="flex-1 ">
            <hr />
          </div>
        </div>
        {/* Divider Mobile View */}
        <div className="md:hidden flex items-center text-sm text-gray-500 gap-2 w-full my-6">
  <hr className="flex-grow border-t border-gray-500" />
  <span className="whitespace-nowrap">Or Sign Up With</span>
  <hr className="flex-grow border-t border-gray-500" />
</div>

        <div className=" justify-center items-center py-4 md:mx-4 md:flex hidden md:px-5">
          <div className="App flex justify-center items-center mx-3">
            <div className="text-center my-2 rounded-lg">
              <GoogleAuth buttonText="Sign up with Google" />
            </div>
          </div>

          <div className="App flex justify-center items-center mx-3">
            <div className="text-center my-2 rounded-lg ">
              <LinkedInLogin label="Sign in with LinkedIn" />
            </div>
          </div>
        </div>

        <div className="md:hidden flex flex-col justify-center mx-auto items-center">
        <div className="flex"> <GoogleAuth /> <p className="my-auto ">Sign in WIth Google</p>
          </div> 

          <div className="md:hidden  ">
            <div className="flex"> <LinkedInLogin /> <p className="my-auto">Sign in WIth Google</p></div>
          </div>
        </div>
        

        <div className="text-center text-base pb-4 ">
          <p>
            Already have an account?&nbsp;
            <Link to="/signin">
              <button className="font-semibold text-indigo-600">Sign in</button>{" "}
            </Link>
          </p>
        </div>
      </div>
{ !errorMessage && (
      <EmailVerification
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  email={email}
  first_name={first_name}
>  

</EmailVerification>
)}
    </div>
  );
};

export default SignUp;
