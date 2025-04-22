import React from 'react';
import linkedInLogo from '../../../assets/devicon_linkedin.png'; 

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
    <button
      onClick={handleLogin}
      className="flex items-center md:border-opacity-10 md:px-4 md:py-2 rounded-full  sm:border-black sm:border-2 md:mx-5  md:rounded hover:bg-gray-100 transition"
    >
      <img src={linkedInLogo} alt="LinkedIn" className="md:w-5 md:h-5 md:mr-2 w-12 h-12 p-2 md:p-0" />
      <span className='text-sm hidden md:flex text-nowrap'>Sign in with LinkedIn</span>
    </button>
  );
};

export default LinkedInLogin;