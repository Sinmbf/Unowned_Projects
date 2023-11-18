/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState } from "react";

import { useContext, createContext } from "react";
import { loginUser, signupUser } from "../helpers/apiCommunicators";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Function to login
  const login = async ({ email, password, userType }) => {
    const data = await loginUser(email, password, userType);
    if (data) {
      setUser({
        email: data.email,
        password: data.password,
        userType: data.userType,
      });
      setIsLoggedIn(true);
    }
  };

  // Function to signup
  const signup = async ({ email, password, userType }) => {
    const data = await signupUser(email, password, userType);
    if (data) {
      setUser({
        email: data.email,
        password: data.password,
        userType: data.userType,
      });
      setIsLoggedIn(true);
    }
  };
  const value = {
    user,
    isLoggedIn,
    login,
    signup,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
