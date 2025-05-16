import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { base_url } from "../../library/api";
import axios from "axios";
import { AuthContext } from "../../context/Authcontext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../Styles.css";
// import image from "../../assets/Frame 1984078024.png";
import { BeatLoader } from "react-spinners";
import {
  useGoogleLogin,
} from "@react-oauth/google";
import LinkedInLogin from "../SocialMediaLogIn/Linkedin";
import GoogleAuth from "../SocialMediaLogIn/GoogleAuth";
import TutorSignUpCoverImg from '../Educator/Tutur-images/Rectangle 39.png'
import Book from '../Educator/Tutur-images/Untitled design (2) 1.png'

const TutorSignIn = () => {
    const { login, isLoading, loggedIn } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [localLoading, setLocalLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [userData, setUserData] = useState(null);
  
    const navigate = useNavigate();
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleLogInSubmit = async (e) => {
      e.preventDefault();
      setLocalLoading(true);
      console.log(localLoading);
      const data = { email, password };
  
      try {
        const response = await axios.post(`${base_url}api/auth/login/`, data);
        console.log("API Response:", response);
        console.log("Response Data:", response.data); // Log response data for debugging
  
        // Check for valid token and user
        const { access, refresh, user } = response.data;
        if (!access || !refresh || !user) {
          console.error(
            "Missing access token, refresh token, or user in response."
          );
          alert("Login failed. Please check your credentials.");
          return;
        }
  
        // Call login from AuthContext
        login(access, refresh, user);
  
        // Store in sessionStorage
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem("user", JSON.stringify(user));
  
        // Navigate to landing page
        navigate("/student-dashboard");
      } catch (error) {
        console.error("Login failed:", error);
  
        // Set loading state to false when error occurs
        setLocalLoading(false);
  
        // Handle different error types
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Error Response:", error.response);
          if (error.response.data && error.response.data.detail) {
            setMessage(`Error: ${error.response.data.detail}`);
          } else if (error.response.status === 400) {
            setMessage("Incorrect Email or Password!");
          } else if (error.response.status === 401) {
            setMessage("Unauthorized. Please check your credentials.");
          } else if (error.response.status === 500) {
            setMessage("Server error. Please try again later.");
          } else {
            setMessage(`Unexpected error: ${error.response.status}`);
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Error Request:", error.request);
          setMessage("Network error. Please check your connection.");
        } else {
          // Something happened in setting up the request
          console.error("Error Message:", error.message);
          setMessage(`Error: ${error.message}`);
        }
        return;
      }
  
      // Reset the loading state
      setLocalLoading(false);
    };
  
    const handleSuccess = async (response) => {
      const { access_token, code, id_token } = response;
      const login = useGoogleLogin({
        onSuccess: handleSuccess,
        onError: handleFailure,
      });
  
      const data = {
        access_token,
        code,
        id_token,
      };
      try {
        const backendResponse = await axios.fetch(
          `${base_url}api/auth/google`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (backendResponse.status === 200) {
          setUserData(backendResponse.data);
        } else {
          console.log("backend authentication failed");
        }
      } catch (error) {
        console.error("Error in the Backend", error);
      }
    };
    const handleFailure = (error) => {
      console.error("Google Sign-In Error", error);
    };
  
    return isLoading ? (
      <div className="loading-spinner">
        <BeatLoader color="white" size={12} />
      </div>
    ) : (
        <div className="flex flex-col md:flex-row  w-full h-screen px-4 md:px-4 mt-18 bg-black text-white">
     <div className="hidden md:flex w-full md:w-1/2 my-10 items-center justify-center px-4">
  <img
    src={TutorSignUpCoverImg}
    alt="Tutor Profile"
    className="w-full max-w-lg h-auto rounded-lg object-contain"
  />
</div>



  
        {/* Right - Sign In Form */}
        <div className="flex-1 mt-10 px-12 sm:px-8 md:px-12 mb-4 md:mb-1  overflow-x-hidden xl:mb-1  lg:overflow-hidden ">
          <div className="w-full max-w-lg mx-auto pt-8">
        
            <h2 className=" block text-center text-xl sm:text-3xl md:text-xl font-medium tracking-tight  mb-4 md:mb-1 xl:text-3xl">
              Welcome Back!
            </h2>
            <div className="text-center text-white opacity-50 px-2 md:px-0 text-base md:text-sm xl:text-base mb-4 whitespace-normal md:whitespace-nowrap">
  <p>
    {/* <span className="md:hidden">Welcome, </span> */}
    Log back in to continue your learning journey
  </p>
</div>

  
            {/* Sign In Form */}
            <form
              className="space-y-5 md:space-y-0 lg:space-y-5 xl:space-y-1"
              onSubmit={handleLogInSubmit}
            >
              <div className="py-2">
                <label
                  htmlFor="email"
                  className="text-sm sm:text-base md:text-base xl:text-sm font-medium"
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
                    className="block w-full border rounded-md text-white  bg-white bg-opacity-5 px-3 py-2  border-gray-700  text-base outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                  />
                </div>
              </div>
  
              <div className="py-2">
                <label
                  htmlFor="password1"
                  className="text-sm sm:text-base md:text-base xl:text-sm font-medium "
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
                    className="block w-full border  rounded-md text-white  bg-white bg-opacity-5 px-3 py-2 text-sm  border-gray-700  outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
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
  
              <div className="flex md:text-sm text-sm lg:text-base">
                <div className="flex-1">
                  <label htmlFor="remember">
                    <input
                      type="checkbox"
                      id="remember"
                      className="mr-2 h-3 w-3 text-indigo-600 border-gray-300 rounded"
                    />
                    Remember Me
                  </label>
                </div>
                <Link to="/forgetpassword">
                  <button className="text-blue-600">Forgot password</button>
                </Link>
              </div>
  
              <div className="flex justify-center py-7">
                <div className="w-full md: text-center">
                  <button
                    type="submit"
                    className="bg-blue-900 w-full rounded-md p py-3 text-white"
                  >
                    {localLoading ? (
                      <BeatLoader color="white" size={12} />
                    ) : (
                      "Continue"
                    )}
                  </button>
                </div>
              </div>

         
       
            </form>
          </div>
           {/* Divider OR */}
        <div className="md:flex hidden md:items-center md:gap-4 text-white opacity-50 mt-10 md:px-14">
          <div className="flex-1 ">
            <hr />
          </div> 
          <div className="">Or Log In with</div>
          <div className="flex-1 ">
            <hr />
          </div>
        </div>
        {/* Divider Mobile View */}
        <div className="md:hidden flex items-center text-sm text-gray-500 gap-2 w-full">
  <hr className="flex-grow border-t border-gray-500" />
  <span className="whitespace-nowrap">Or Sign In With</span>
  <hr className="flex-grow border-t border-gray-500" />
</div>

        <div className=" justify-center items-center py-4 md:mx-4 md:flex hidden md:px-5">
          <div className="App flex justify-center items-center mx-3">
            <div className="text-center my-2 rounded-lg">
              <GoogleAuth buttonText="Sign up with Google" />
            </div>
          </div>

          <div className="App flex justify-center items-center mx-3">
            <div className="text-center my-2 ">
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
        <div></div>
          <div className="text-center my-4"> <p>Don’t have an account? <span className="text-blue-500 cursor-pointer" onClick={()=> navigate('/educator/tutorSignUp')}>Sign Up</span> </p></div>
          <div className="text-base font-bold text-center text-red-600 mt-2">
            {message}
          </div>
        </div>
      </div>  
  )
}

export default TutorSignIn
