// Context.js
import React, { createContext, useContext, useState } from 'react';

// Create a UserContext to hold user-related data and functions
const UserContext = createContext();

// UserProvider component that wraps around your application
export const UserProvider = ({ children }) => {
  // State to track if the user is logged in
  const [isLogin, setIsLogin] = useState(false);
  const [userDetails, setUserDetails] = useState({});


  return (
    <UserContext.Provider value={{isLogin,setIsLogin, userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user context values
export const useUserData = () => {
  // Using useContext to access the UserContext values
  const context = useContext(UserContext);
  
  // Throw an error if useUserData is called outside of the UserProvider
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserProvider');
  }
  
  return context;
};
