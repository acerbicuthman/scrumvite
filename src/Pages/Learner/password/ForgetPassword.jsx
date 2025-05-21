import React, { useState } from "react";
import axios from "axios";
import { base_url } from "../../../library/api";
import { BeatLoader } from "react-spinners";
import passwordkey from '../../../assets/forgetpassword-key.png'
import { Link } from "react-router-dom"; 


const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Standardize state naming
  const [loading, setLoading] =  useState(false)
  const [submitted, setSubmitted] = useState(false)

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Reset error state before making a new request
    setMessage(""); // Clear previous message if any

    try {
      // Make the POST request to the server
      const req = await axios.post(`${base_url}api/auth/password/reset/`, {
        email,
      });
  
      // Log and set success message if request is successful
      console.log("Response object:", req);
      setMessage("We’ve sent a secure link to your registered email address, Please check your inbox and follow the instructions to reset your password.");
    
    } // Modify the catch block to inspect the error response data
    catch (err) {
      console.error("Full error details:", err);
      if (err.response) {
        console.error("Error Response Data:", err.response.data);
        // Set the error message from the response if available
        if (Array.isArray(err.response.data) && err.response.data.length > 0) {
          setErrorMessage(err.response.data[0] || "An unknown error occurred.");
        } else {
          setErrorMessage("There was an issue with the server request.");
        }
      } else if (err.request) {
        setErrorMessage("No response from server. Please check your internet connection.");
      } else {
        setErrorMessage("There was an issue with the request.");
      }
    }
    
      

      if (!email || email.trim() === "") {
        setErrorMessage("Please enter a valid email address.");
        setLoading(false);
        return;
      }
      
      // Handling different error scenarios:
      
      // If there is a response from the server, handle it
      // if (err.response) {
      //   const errorData = err.response.data;
      //   if (errorData && errorData.message) {
      //     setErrorMessage(errorData.message);
      //   } else if (err.response.status === 400) {
      //     setErrorMessage("Please check the provided information.");
      //   } else if (err.response.status === 401) {
      //     setErrorMessage("Unauthorized: Your session may have expired.");
      //   } else if (err.response.status === 500) {
      //     setErrorMessage("Server error. Please try again later.");
      //   } else {
      //     setErrorMessage("An unknown error occurred.");
      //   }
      // } else if (err.request) {
      //   setErrorMessage("No response from server. Please check your internet connection.");
      // } else {
      //   setErrorMessage("There was an issue with the request.");
      // }
      
  
      // Log the full error for debugging purposes
    //   console.error("Full error details:", err);
    // }
  
    // Reset loading state and set submission flag
    setLoading(false);
    setSubmitted(true);
  };
  
  return (
    <div className="h-screen flex justify-center items-center py-20 px-auto text-center px-5 bg-black text-white  ">
      <div className="flex flex-col w-full px-auto h-1/2">
        <div className="xl:w-1/3 md:w-1/2 w-full mx-auto  bg-white bg-opacity-5 border-white border-opacity-10 border-2 p-5">

    
      <div className="flex justify-center ">
  <img src={passwordkey} alt="Password Icon" className="w-15 h-15" />
</div>

        <div className="my-2">
        <h2 className="text-xl font-semibold my-3 ">Forgot Password?</h2>
        <p className="text-sm ">No Worries, we will send you reset instruction</p>

        </div>

        <form onSubmit={handleSubmit} action="">
        <div className=" w-full  mt-5 mx-auto text-left">
          <label htmlFor="enter-email" className="">Email Address</label></div>

          <input
            type="email"
            className="w-full  px-3 border-white border-opacity-5 text-white opacity-50 border-2 bg-white bg-opacity-10"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#4045E1] w-full mt-5 px-2 py-2 rounded-lg text-white"
            >
             Send Link {/* {loading ? 
              (<BeatLoader
                color="white" size={12} />
              ) : submitted ?("Link Sent"
              ): 
              "Continue"} */}
            </button>
          </div>
          <div className="my-5 mx-auto">
          <Link to="/signin" className="text-[#5621D9] underline hover:text-blue-700">
  Back to login
  </Link>
               </div>
               <div className="md:w-3/6 w-full justify-center  mx-auto">
        {message && <p className="mt-4 text-base font-bold  text- justify-center items-center">{message}</p>}
                <div className="text-red-600 mt-2 ">{errorMessage}</div>
        </div>
        </form>
       
        </div>
      </div>
              
    </div>
  );
};

export default ForgetPassword;
