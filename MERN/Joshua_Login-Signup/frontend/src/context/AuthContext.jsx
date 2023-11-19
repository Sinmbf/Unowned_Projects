/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { useContext, createContext } from "react";
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
  signupUser,
} from "../helpers/apiCommunicators";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Check the auth-status of the user
  useEffect(() => {
    const checkStatus = async () => {
      const data = await checkAuthStatus();
      if (data) {
        setUser({
          username: data.username,
          userType: data.userType,
        });
        setIsLoggedIn(true);
      }
    };
    checkStatus();
  }, []);
  // Function to login
  const login = async (username, password, userType) => {
    const data = await loginUser(username, password, userType);
    if (data) {
      setUser({
        username: data.username,
        userType: data.userType,
      });
      setIsLoggedIn(true);
    }
  };

  // Function to signup
  const signup = async (username, password, userType) => {
    const data = await signupUser(username, password, userType);
    if (data) {
      setUser({
        username: data.username,
        userType: data.userType,
      });
      setIsLoggedIn(true);
    }
  };

  // Function to logout
  const logout = async () => {
    const data = await logoutUser();
    if (data) {
      setUser(null);
      setIsLoggedIn(false);
      window.location.reload();
    }
  };
  const value = {
    user,
    isLoggedIn,
    login,
    signup,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
