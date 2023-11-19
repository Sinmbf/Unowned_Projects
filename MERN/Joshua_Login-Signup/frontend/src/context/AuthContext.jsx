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
      try {
        const data = await checkAuthStatus();
        if (data) {
          setUser({
            username: data.username,
            userType: data.userType,
          });
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkStatus();
  }, []);
  // Function to login
  const login = async (username, password, userType) => {
    try {
      const data = await loginUser(username, password, userType);
      if (data) {
        setUser({
          username: data.username,
          userType: data.userType,
        });
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to signup
  const signup = async (username, password, userType) => {
    try {
      const data = await signupUser(username, password, userType);
      if (data) {
        setUser({
          username: data.username,
          userType: data.userType,
        });
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to logout
  const logout = async () => {
    try {
      const data = await logoutUser();
      if (data) {
        setUser(null);
        setIsLoggedIn(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
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
