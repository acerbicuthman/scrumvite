import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext";
import { base_url } from "../../library/api";
import { useGoogleLogin } from "@react-oauth/google";
import google from "../../assets/googleIcon.png";

const GoogleAuth = ({ buttonText = "Continue with Google" }) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const { access_token } = response;

        if (!access_token) throw new Error("Access token is missing.");

        const res = await fetch(`${base_url}api/auth/google/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ access_token }),
        });

        const data = await res.json();

        if (res.ok && data.access && data.user) {
          await login(data.access, data.refresh, data.user);
          navigate("/student-dashboard");
        } else {
          console.error("Invalid login response:", data);
          throw new Error("Failed to authenticate user.");
        }
      } catch (err) {
        console.error("Error logging in:", err);
      }
    },
    onError: (err) => {
      console.error("Google Login Failed", err);
    },
  });

  return (
    <>
      {/* Desktop / Medium+ screens */}
      <div className="text-center my-2 rounded-lg hidden md:block">
        <button
          onClick={loginWithGoogle}
          className="flex items-center border-opacity-10 md:px-6 lg:px-8 py-3 rounded-lg border-black border-2  hover:bg-gray-100 transition"
        >
          <img
            src={google}
            alt="Google"
            className="w-5 h-5 mr-2 lg:-ml-5 md:-ml-3"
          />
          <span className="text-sm text-nowrap">Sign in with Google</span>
        </button>
      </div>

      {/* Small screens only */}
      <div className="md:hidden flex justify-center my-3">
        <button
          onClick={loginWithGoogle}
          className="rounded-full hover:bg-gray-100 transition"
        >
          <img
            src={google}
            alt="Google"
            className="w-12 h-12 border-2 rounded-full border-black"
          />
        </button>
      </div>
    </>
  );
};

export default GoogleAuth;
