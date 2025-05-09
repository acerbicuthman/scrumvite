import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { base_url } from '../../library/api';

const LinkedInCallback = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    // Extract the authorization code and state from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    // const state = urlParams.get('state');

    if (code) {
      // Exchange the authorization code for an access token
      fetch(`${base_url}api/auth/linkedin/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code })
      })
        .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
       return response.json()
        })
        .then((data) => {
          if (data.accessToken) {
            // Store the access token in localStorage (or React state)
            localStorage.setItem('linkedin_access_token', data.accessToken);
            localStorage.setItem('linkedin_id_token', data.id_token);
            // After successful login, navigate to the existing Dashboard
            navigate('/linked-dashboard'); 
          } else {
            setError('Failed to exchange code for access token.');
          }
        })
        .catch((error) => {
          setError('An error occurred while exchanging the authorization code.');
          console.error(error);
        })
        .finally(() => setLoading(false));
    } else {
      setError('Authorization code is missing.');
      setLoading(false);
    }
  }, [navigate]); // The navigate function is stable, so no need to worry about it

  if (loading) return <p className='mt-20 p-4 h-screen text-center text-xl'>Loading...</p>;
  if (error) return <p className='mt-20 text-red-500 p-4 h-screen text-center text-xl'>{error}</p>;

  return null; // Nothing to render on this page after successful OAuth
};

export default LinkedInCallback;
