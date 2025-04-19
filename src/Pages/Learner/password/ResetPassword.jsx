// Pages/Learner/ResetPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { base_url } from "../../../library/api";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const uid = searchParams.get("uid");

  const [new_password, setPassword] = useState("");
  const [new_password2, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new_password !== new_password2) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post(
        `${base_url}api/auth/password/reset/confirm`,
        {
          uid,
          token,
          new_password,
          new_password2,
        }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Failed to reset password.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center text-center">
      <div className="flex flex-col w-1/2 h-1/2 ">
        <h2 className="text-xl font-bold">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="border p-2 w-full mt-4"
            type="password"
            placeholder="New password"
            value={new_password}
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
            className="bg-blue-800 text-white mt-4 px-4 py-2 rounded-lg"
            type="submit"
          >
            Reset Password
          </button>
        </form>
        {message && <p className="mt-4 text-sm">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
