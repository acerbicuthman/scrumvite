import React, { useState } from "react";
import axios from "axios";
import { base_url } from "../../../library/api";
import { BeatLoader } from "react-spinners";
import passwordkey from '../../../assets/forgetpassword-key.png'
import { Link } from "react-router";


const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState("")
  const [loading, setLoading] =  useState(false)
  const [submitted, setSubmitted] = useState(false)

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Make the POST request to the server
      const req = await axios.post(`${base_url}api/auth/password/reset`, {
        email,
      });
  
      // Log and set success message if request is successful
      console.log("Response object:", req);
      setMessage(req.data.message);
      setMessage("We’ve sent a secure link to your registered email address, Please check your inbox and follow the instructions to reset your password.");
    
    } catch (err) {
      console.error("Error during the API request:", err);
      
      // Handling different error scenarios:
      
      // If there is a response from the server, handle it
      if (err.response) {
        // Check if the server provided specific error data
        if (err.response.data) {
          console.error("Error Response Data:", err.response.data);
          setIsError(err.response.data.message || "Something went wrong with the server.");
        } else {
          // If no data is available in the response
          console.error("Error Response Without Data:", err.response);
          setIsError("The server responded, but no error details were provided.");
        }
  
        // Check if the error response has a specific status code (e.g., 400 or 500)
        if (err.response.status === 400) {
          setIsError(" Please check the provided information!");
        } else if (err.response.status === 401) {
          setIsError("Unauthorized: Your session may have expired or you are not authorized.");
        } else if (err.response.status === 500) {
          setIsError("Server error: Please try again later.");
        }
  
      } 
      // If the error is related to the request setup, or if the response is undefined
      else if (err.request) {
        console.error("No response received:", err.request);
        setIsError("No response from server. Please check your internet connection.");
      
      } 
      // If the error is related to something in the setup of the axios request (invalid URL, etc.)
      else {
        console.error("Error in setting up the request:", err.message);
        setIsError("There was an issue with the request configuration.");
      }
  
      // Log the full error for debugging purposes
      console.error("Full error details:", err);
    }
  
    // Reset loading state and set submission flag
    setLoading(false);
    setSubmitted(true);
  };
  
  return (
    <div className="h-screen flex items-center justify-center text-center px-5 ">
      <div className="flex flex-col w-full  h-1/2 ">
      <div className="flex justify-center">
  <img src={passwordkey} alt="Password Icon" className="w-15 h-15" />
</div>

        <div className="my-2">
        <h2 className="text-xl font-bold my-3 ">Forgot Password?</h2>
        <p className="text-sm ">No Worries, we will send you reset instruction</p>

        </div>

        <form onSubmit={handleSubmit} action="">
        <div className=" w-full md:w-1/3 mt-5 mx-auto text-left">
          <label htmlFor="enter-email" className="">Email Address</label></div>

          <input
            type="email"
            className="w-full md:w-1/3 px-3 border-2"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-900 w-full md:w-1/3 mt-5 px-2 py-2 rounded-lg text-white"
            >
              {loading ? 
              (<BeatLoader
                color="white" size={12} />
              ) : submitted ?("Link Sent"
              ): 
              "Continue"}
            </button>
          </div>
          <div className="my-5 mx-auto">
          <Link to="/signin" className="text-blue-900 underline hover:text-blue-700">
  Back to login
  </Link>
               </div>
        </form>
        <div className="md:w-3/6 w-full justify-center mx-auto">
        {message && <p className="mt-4 text-base font-bold text-gray-900 px-4 text-center justify-center items-center">{message}</p>}
                <div className="text-red-600 mt-2 ">{isError}</div>
        </div>

      </div>
              
    </div>
  );
};

export default ForgetPassword;
