// LinkedInLogin.jsx
import React from 'react';
import LinkedIcon from '../../assets/devicon_linkedin.png'
import { base_url } from '../../library/api';

const LinkedInLogin = () => {
  const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_LINKEDIN_REDIRECT_URI;
  const scope = 'openid profile email'; 
 

  const handleLogin = () => {
       const state = crypto.randomUUID(); 
    console.log("Generated state:", state);
    sessionStorage.setItem('linkedin_oauth_state', state);

    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
    `response_type=code&` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `state=${state}&` +
    `scope=${encodeURIComponent(scope)}`;

    window.location.href = authUrl;
  };

  return(
  <div>
  <div className="text-center my-2 rounded-lg hidden md:block">
        <button
          onClick={handleLogin}
          className="flex items-center border-opacity-10 md:px-6 lg:px-8 py-3 rounded-lg border-black border-2  hover:bg-gray-100 transition"
        >
          <img
            src={LinkedIcon}
            alt="Google"
            className="w-5 h-5 mr-2 lg:-ml-5 md:-ml-3"
          />
          <span className="text-sm text-nowrap">Sign in with Google</span>
        </button>
      </div>

      {/* Small screens only */}
      <div className="md:hidden flex justify-center my-3">
        <button
          onClick={handleLogin}
          className="rounded-full hover:bg-gray-100 transition"
        >
          <img
            src={LinkedIcon}
            alt="Google"
            className="w-12 h-12 border-2 rounded-full border-black"
          />
        </button>
      </div>
      </div> )
};

export default LinkedInLogin;
