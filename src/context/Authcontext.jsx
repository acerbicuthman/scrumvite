import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || null);
    const [isLoading, setIsLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
  
    // Load user from localStorage on mount
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
  
      if (storedUser && storedUser !== "undefined") {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && typeof parsedUser === 'object') {
            setUser(parsedUser);
            setLoggedIn(true); // Set the user as logged in
          } else {
            setUser(null);
            setLoggedIn(false);
          }
        } catch (error) {
          console.error("Failed to parse stored user:", error);
          setUser(null);
          setLoggedIn(false);
        }
      }
      setIsLoading(false); // Done loading
    }, []);
  
    // Login function to store tokens and user data
    const login = async (accessToken, refreshToken, userData) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500))

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(userData);
      setLoggedIn(true);
  
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(userData));

      setIsLoading(false)
    };
  
    // Logout function
    const logout = async() => {
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 500))
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);
      setLoggedIn(false);
  
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      setIsLoading(false)
    };
  
    return (
      <AuthContext.Provider value={{ user, accessToken, refreshToken, login, logout, isLoading, loggedIn }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
