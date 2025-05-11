import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { base_url } from '../../library/api';
import { AuthContext } from '../../context/Authcontext';
import '../../Styles.css'

const LinkedInCallback = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const returnedState = urlParams.get('state');
    const storedState = sessionStorage.getItem('linkedin_oauth_state');
    const redirectUri = import.meta.env.VITE_LINKEDIN_REDIRECT_URI;
  
    setLoading(true);

    if (!code || !returnedState || returnedState !== storedState) {
        setLoading(true);
        setError('State validation failed. Possible CSRF attack.');
       
        return;
      }
    sessionStorage.removeItem('linkedin_oauth_state');
  
    // Send only code + redirectUri to your backend
    fetch(`${base_url}api/auth/linkedin/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: code,
        redirectUri: redirectUri,
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Backend rejected the code');
        return res.json();
      })
      .then(data => {
        console.log("Backend response:", data);
  
        // Ensure user id is handled properly in login
        const userId = Array.isArray(data.user.id) ? data.user.id[0] : data.user.id;
  
        // Update user data to fix user id handling
        const updatedUserData = {
          ...data.user,
          id: userId,
        };
  
        // Call login function
        login(data.access, data.refresh, updatedUserData);
  
        // Navigate to dashboard
        navigate('/student-dashboard');
      })
      .catch(err => {
        console.error('Error during LinkedIn login:', err);
        setError('An error occurred during LinkedIn login.');
      })
      .finally(() => setLoading(false));
  }, [navigate]);
  

  

 // Show loading text while waiting for LinkedIn callback
if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner text-center h-screen text-4xl justify-center items-center">Loading...</div>
        </div>
    )}
  
    if   (error) {
        return (
          <div className="mt-20 text-red-500 text-center h-screen">
            <p>{error}</p>
          </div>
        )}
      
  
  return null; // Nothing to render if everything works
  
};


export default LinkedInCallback;
