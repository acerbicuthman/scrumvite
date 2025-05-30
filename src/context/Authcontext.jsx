import React, { createContext, useState, useEffect, useContext } from 'react';



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || null);
    const [isLoading, setIsLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const storedUser = localStorage.getItem('user');

    

    
    const [tempCredentials, setTempCredentialsState] = useState(() => {
      const stored = localStorage.getItem("tempCredentials");
      return stored ? JSON.parse(stored) : null;
    });
    
    const setTempCredentials = (credentials) => {
      setTempCredentialsState(credentials);
      if (credentials) {
        localStorage.setItem("tempCredentials", JSON.stringify(credentials));
      } else {
        localStorage.removeItem("tempCredentials");
      }
    };
  
    // Load user from localStorage on mount
    useEffect(() => {
    

  
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
  
    useEffect(() => {
      const checkStorageIntegrity = () => {
        const stored = localStorage.getItem('user');
        if (!stored || stored === "undefined") {
          if (user !== null) {
            console.warn("User signed out externally — clearing auth context.");
            logout(); // Triggers reset and redirect
          }
        }
      };
    
      // Run once every few seconds or on tab focus
      const interval = setInterval(checkStorageIntegrity, 2000);
    
      // Also check when user refocuses the tab
      window.addEventListener("focus", checkStorageIntegrity);
    
      return () => {
        clearInterval(interval);
        window.removeEventListener("focus", checkStorageIntegrity);
      };
    }, [user]);
    
    // Login function to store tokens and user data
    const login = async (accessToken, refreshToken, userData, newProfilePictureUrl) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500))

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      const updatedUser = {
        ...userData,
          profile:{
          ...userData.profile,
          profile_picture: newProfilePictureUrl
        }
       
      }
      setUser(updatedUser)     
      setLoggedIn(true);
  
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(updatedUser));


      


      setIsLoading(false)
    };
  
    // Updated Logout function
    const logout = async() => {
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Clear tokens and user data from localStorage
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
        setLoggedIn(false);
  
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        // Remove all keys that start with 'userProfileData_'
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith("userProfileData_")) {
            localStorage.removeItem(key);
          }
        });

        // Redirect to the login page
        window.location.href = "/signin";  // Redirect to the login page

        setIsLoading(false);
    };
  
    return (
      <AuthContext.Provider value={{ user, storedUser, accessToken, refreshToken, login, logout, isLoading, setIsLoading, loggedIn,  tempCredentials, setTempCredentials }}>
        {children}
      </AuthContext.Provider>
    );
};
  
export const useAuth = () => useContext(AuthContext);
