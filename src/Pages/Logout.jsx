import React from 'react';
import { useAuth } from '@/context/Authcontext';

const Logout = () => {
  const { logout } = useAuth();  // Access the logout function from context
  
  const handleLogout = async () => {
    try {
      await logout();  // Call the logout function from the context
      console.log('Logged out successfully');
      // Optionally, you can add an alert or message
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="logout-container">
      <button
        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
