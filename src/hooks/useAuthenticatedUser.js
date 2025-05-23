// hooks/useAuthenticatedUser.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../library/api';
import { useNavigate } from 'react-router';

export default function useAuthenticatedUser() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [userError, setUserError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setUserError('No token found. Please log in.');
        navigate('/signin');
        setLoadingUser(false);
        return;
      }

      try {
        const response = await axios.get(`${base_url}api/auth/user/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        
        setUser(response.data);
        // console.log("object", user.email)
      } catch (err) {
        const message = err.response?.data?.detail || err.message;
        setUserError(
          err.response?.status === 401
            ? 'Session expired. Please log in again.'
            : message || 'Failed to fetch user.'
        );
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loadingUser, userError };
}
