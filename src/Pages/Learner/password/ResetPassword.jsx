// Pages/Learner/ResetPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { base_url } from "../../../library/api";
import Loading from "../../../Components/student/Loading";
import {BeatLoader} from 'react-spinners'

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const uid = searchParams.get("uid");

  const [new_password1, setPassword] = useState("");
  const [new_password2, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (new_password1 !== new_password2) {
      setMessage("Passwords do not match.");
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
      console.log("UID:", uid);
    console.log("Token:", token);
      console.log(res.data)
      setMessage(res.data.message)
      setMessage("Password Successfully Changed! ");
    } catch (err) {
      if (err.response && err.response.data) {
        console.error("Reset error:", err.response.data);
        const errorMsg =
          err.response.data.detail ||
          Object.values(err.response.data).flat().join(" ") ||
          "Failed to reset password.";
        setMessage(errorMsg);
      } else {
        console.error("Unexpected error:", err);
        setMessage("Something went wrong.");
      }
     
  } finally {
    setLoading(false); 
  }
    
  };

  return (
    <div className="h-screen flex items-center justify-center text-center">
      <div className="flex flex-col w-full md:w-1/2 h-1/2 px-10 md:px-1">
        <h2 className="text-xl font-bold">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="border p-2 w-full mt-4"
            type="password"
            placeholder="New password"
            value={new_password1}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="border p-2 w-full mt-2"
            type="password"
            placeholder="Confirm password"
            value={new_password2}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            className="bg-blue-800 text-white w-full mt-4 px-4 py-2 rounded-lg"
            type="submit"
            disabled={loading}
          >
            {loading ? 
            <BeatLoader color="white" />
          : 
           " Reset Password"
            }
          </button>
        </form>
        {message && <p className="mt-4 text-base font-bold text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
