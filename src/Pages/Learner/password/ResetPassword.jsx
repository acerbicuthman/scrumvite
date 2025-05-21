import React, { useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { base_url } from "../../../library/api";
import { BeatLoader } from 'react-spinners';
import key from '../../../assets/forgetpassword-key.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const uid = searchParams.get("uid");

  const [new_password1, setPassword] = useState("");
  const [new_password2, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showError, setShowError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowError(""); // Reset error message before submitting

    if (new_password1 !== new_password2) {
      setShowError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${base_url}api/auth/password/reset/confirm/`,
        {
          new_password1,
          new_password2,
          uid,
          token,
        }
      );

      setMessage("Password successfully changed!");
    } catch (err) {
      if (err.response && err.response.data) {
        console.error("Reset error:", err.response.data);
        const errorMsg =
          err.response.data.detail ||
          Object.values(err.response.data).flat().join(" ") ||
          "Failed to reset password.";
        setShowError(errorMsg);
      } else {
        console.error("Unexpected error:", err);
        setShowError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center px-5 text-white">
      <div className="w-full max-w-lg bg-white/5 mx-auto text-center space-y-6 border-white/10 border-2 p-8">
        <div className="">
          <div className="flex justify-center my-4">
            <img src={key} alt="Password Icon" className="w-15 h-15" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Reset Your Password</h2>
          <p className="">
            Your new password must be different from previously used passwords.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
        <div className="text-left mt-2">Password</div>
          <div className="relative">
           
            <input

              className="w-full px-3 py-2  bg-white/5 border-white/10 border text-[#999999] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type={showPassword1 ? "text" : "password"}
              placeholder="New password"
              value={new_password1}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={() => setShowPassword1(!showPassword1)}
            >
              {showPassword1 ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
       
       
          <div className="text-left pt-4">Confirm Password</div>

          <div className="relative">
            <input
              className="w-full px-3 py-2  bg-white/5 border-white/10 border text-[#999999] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type={showPassword2 ? "text" : "password"}
              placeholder="Confirm password"
              value={new_password2}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={() => setShowPassword2(!showPassword2)}
            >
              {showPassword2 ? <FaEyeSlash /> : <FaEye />}
            </button>
    
          </div>
          <div className="pt-4">
          <button
            className="bg-[#4045E1] text-white w-full px-4 py-2 rounded-lg"
            type="submit"
            disabled={loading}
          >
            {loading ? <BeatLoader color="white" /> : "Reset Password"}
          </button>
          </div>
          

          <div className="py-6 mx-auto">
            <Link to="/signin" className="text-[#4045E1] underline hover:text-blue-700">
              Back to login
            </Link>
          </div>
        </form>

        {message && <p className="text-base text-blue-900">{message}</p>}
        {showError && <p className="text-base font-bold text-red-600">{showError}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
