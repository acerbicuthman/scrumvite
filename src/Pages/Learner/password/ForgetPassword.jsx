import React, { useState } from "react";
// import { useNavigate } from "react-router";
import axios from "axios";
import { base_url } from "../../../library/api";
import { BeatLoader } from "react-spinners";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] =  useState(false)
  const [submitted, setSubmitted] = useState(false)
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const req = await axios.post(`${base_url}api/auth/password/reset`, {
        email,
      });
      console.log("object:", req)
      setMessage(req.data.message);
      setMessage("We’ve sent a secure link to your registered email address, Please check your inbox and follow the instructions to reset your password.")
     
    } catch (err) {
      console.error("Error:", err);
      if (err.response && err.response.data) {
        setMessage(err.response.data.message || "Something went wrong");
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
    setLoading(false)
    setSubmitted(true)
  };
  return (
    <div className="h-screen flex items-center justify-center text-center px-5">
      <div className="flex flex-col w-full   h-1/2 ">
        <h2 className="text-xl font-bold mt-20 mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit} action="">
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
              className="bg-blue-800 w-full md:w-1/3 mt-4 px-2 py-2 rounded-lg text-white"
            >
              {loading ? 
              (<BeatLoader
                color="white" size={12} />
              ) : submitted ?("Link Sent"
              ): 
              "Send Reset Link"}
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-base font-bold text-gray-900 px-4 text-center justify-center items-center">{message}</p>}

      </div>

    </div>
  );
};

export default ForgetPassword;
