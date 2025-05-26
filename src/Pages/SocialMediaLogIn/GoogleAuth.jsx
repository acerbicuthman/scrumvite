import React from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/Authcontext";
import { base_url } from "../../library/api";
import googleIcon from "../../assets/googleIcon.png";

const GoogleAuth = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const account_type =
  location.state?.account_type || localStorage.getItem("account_type");


  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const accessTokenFromGoogle = response.access_token;

        // Fetch Google user info (email, etc.)
        const googleUserRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${accessTokenFromGoogle}`,
          },
        });

        if (!googleUserRes.ok) throw new Error("Failed to fetch Google user info");

        const googleUser = await googleUserRes.json();

        // Authenticate with your backend
        const backendRes = await fetch(`${base_url}api/auth/google/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ access_token: accessTokenFromGoogle }),
          account_type: account_type, 
        });

        const backendData = await backendRes.json();

        if (backendRes.ok && backendData.access && backendData.user) {
          // Merge backend user data with Google email
          const userWithEmail = { ...backendData.user, email: googleUser.email };

          // Login using context
          await login(backendData.access, backendData.refresh, userWithEmail);

          // Redirect after successful login
          navigate(account_type === "tutor" ? "/educator-dashboard" : "/student-dashboard");
;
        } else {
          throw new Error("Backend authentication failed");
        }
      } catch (error) {
        console.error("Google login error:", error);
        // TODO: Show user-friendly error notification
      }
    },
  });

  return (
    <>
      {/* Desktop / Medium+ screens */}
      <div className="text-center my-2 rounded-lg hidden md:block">
        <button
          onClick={() => loginWithGoogle()}
          className="flex items-center border-opacity-10 md:px-6 lg:px-8 py-2.5 rounded-lg border-black border-2 hover:bg-gray-700 transition"
        >
          <img
            src={googleIcon}
            alt="Google"
            className="w-8 h-8 mr-2 lg:-ml-5 md:-ml-3"
          />
          <span className="text-lg whitespace-nowrap">Google</span>
        </button>
      </div>

      {/* Small screens only */}
      <div className="md:hidden flex justify-center my-3">
        <button
          onClick={() => loginWithGoogle()}
          className="rounded-full hover:bg-gray-100 transition"
          aria-label="Login with Google"
        >
          <img
            src={googleIcon}
            alt="Google"
            className="w-12 h-12 border-2 rounded-full border-black"
          />
        </button>
      </div>
    </>
  );
};

export default GoogleAuth;
