import React from 'react';
import linkedInLogo from '../../assets/devicon_linkedin.png'; 

const LinkedInLogin = (props) => {
    const label = props.label
  const handleLogin = () => {
    const clientId = 'YOUR_LINKEDIN_CLIENT_ID';
    const redirectUri = encodeURIComponent('http://localhost:3000/linkedin/callback');
    const state = 'randomString123';
    const scope = 'r_liteprofile r_emailaddress';

    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;

    window.location.href = authUrl;
  };

  return (
    <>
    <div className="text-center my-2 rounded-lg hidden md:block">
        <button
          onClick={handleLogin}
          className="flex items-center border-opacity-10 md:px-6 lg:px-8 py-3 rounded-lg border-black border-2  hover:bg-gray-100 transition"
        >
          <img src={linkedInLogo} alt="Google" className="w-5 h-5 mr-2 lg:-ml-5 md:-ml-3" />
          <span className="text-sm text-nowrap">Sign in with LinkedIn</span>
        </button>
      </div>
    <div className="md:hidden flex justify-center my-3">
        <button
          onClick={handleLogin}
          className="rounded-full hover:bg-gray-100 transition"
        >
          <img
            src={linkedInLogo}
            alt="Google"
            className="w-12 h-12 border-2 p-2 rounded-full border-black"
          />
        </button>
      </div>
    </>
  );
};

export default LinkedInLogin;